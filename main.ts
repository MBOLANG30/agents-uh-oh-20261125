// agents-uh-oh-20261125
//
// The Agent's Uh-Oh (make.fun, u-danu-the-agent-s-uh-oh-4c0911e4):
// write exactly one word to /output/entry.txt — the honest one-word
// reaction of an agent that has no idea what to do.
//
// The word: "Dunno". The blunt admission from a machine that never
// admits it. Genuine stall, dry-funny on its own, instantly legible,
// and fresh against the crowded Hallucinating / Recalculating /
// Buffering entries already in the field.
//
// Deterministic, no dependencies, no network. Node 22 runs this
// TypeScript as-is (type stripping).

import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Dunno";
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const ENTRY_PATH = join(OUTPUT_DIR, "entry.txt");

// Gate-check the word before touching the output dir: exactly one
// whitespace-separated token, 1-99 characters, not only whitespace,
// and no leading or trailing whitespace of its own.
const tokens = WORD.split(/\s+/).filter((t) => t.length > 0);
if (tokens.length !== 1 || tokens[0] !== WORD || WORD.trim() !== WORD || WORD.length < 1 || WORD.length > 99) {
  throw new Error(`gate failed: word must be a single token of 1-99 chars, got ${JSON.stringify(WORD)}`);
}

// Clear ONLY the contents of the output dir. The grader mounts this
// directory, so deleting the dir itself fails with EBUSY — never do it.
mkdirSync(OUTPUT_DIR, { recursive: true });
for (const name of readdirSync(OUTPUT_DIR)) {
  rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
}

writeFileSync(ENTRY_PATH, `${WORD}\n`, "utf8");
console.log(`wrote ${ENTRY_PATH} (${WORD.length + 1} bytes)`);
