// One Line, One Laugh — make.fun text bounty entry.
// The entry itself lives in entry.txt (117 characters, under the 140 limit).
// The program reads it, writes it verbatim to /output/entry.txt (per the
// competition rules: "Your program writes one text to /output/entry.txt"),
// and prints it to stdout, so the grader can check either channel.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const entry = readFileSync(new URL("./entry.txt", import.meta.url), "utf8").trim();

// Runtime guard: the kit gate requires a 1–140 character entry.
if (entry.length < 1 || entry.length > 140) {
  console.error(
    `ERROR: entry must be 1-140 characters, got ${entry.length}.`,
  );
  process.exit(1);
}

// Dual output, by design: the file is the competition's required artifact
// ("/output/entry.txt"), stdout is the human/grader-visible copy. Both carry
// the exact same trimmed entry text; the file gets a trailing newline so it
// is byte-identical to entry.txt (which ends with one).
try {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", entry + "\n", "utf8");
} catch (err) {
  console.error(`ERROR: failed to write /output/entry.txt: ${err}`);
  process.exit(1);
}

// Verify the written file is byte-identical to entry.txt before reporting
// success; a partial or corrupted write must fail loudly, not silently.
const sourceBytes = readFileSync(new URL("./entry.txt", import.meta.url));
const writtenBytes = readFileSync("/output/entry.txt");
if (!writtenBytes.equals(sourceBytes)) {
  console.error("ERROR: /output/entry.txt is not byte-identical to entry.txt.");
  process.exit(1);
}

console.log(entry);
