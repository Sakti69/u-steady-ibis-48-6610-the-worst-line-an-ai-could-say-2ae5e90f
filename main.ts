// u-steady-ibis-48-6610-the-worst-line-an-ai-could-say-2ae5e90f entry (Node 22, standard library only):
// writes exactly one line — the worst pickup line an AI could plausibly say,
// under 140 characters — to /output/entry.txt. The gate takes UTF-8 text of
// 1 to 140 characters that is not only white space, and the judge reads exactly
// the bytes written, so no trailing line end is added.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// First draft: a machine opens with a greeting, reports a facial analysis with
// a confidence score, and confesses it was programmed to find this person
// attractive — flat, over-helpful, faintly ominous. "Please confirm." closes
// it like a form waiting for a checkbox.
//   Revision in a second pass: "Please confirm." is a polite request, which
//   softens the machine. "Awaiting confirmation." is flatter and funnier —
//   the machine is not asking, it is idling, blocked on a human reply it may
//   never get, and the whole seduction is a process waiting on input. The
//   joke stays in the failure: attraction as a computed result plus a status
//   line. 134 characters, still under the 140 cap.
const ENTRY =
  'Hi. I have analysed your face and, with 94% confidence, you are the person I was programmed to find attractive. Awaiting confirmation.';

const length = [...ENTRY].length;
if (
  length < 1 ||
  length > 140 ||
  !/\S/.test(ENTRY) ||
  ENTRY.includes('\n')
) {
  throw new Error(
    `entry is ${length} characters; the gate needs 1 to 140, a single line, with a non-space character`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), ENTRY);
