import fs from "node:fs";

const all = JSON.parse(fs.readFileSync("./apps/web/public/data/all-characters.json", "utf-8"));

// Exact strings from prompt requirement:
// 😀, 😂, ❤️, ❤, 🔥, 👨‍💻, 👩‍💻, 👋🏻, 🇮🇳, 🏳️‍🌈, 🙂↔️, 🫪, 🫯, 🫩, 🫎
const testEmojis = [
  { name: "Grinning Face", char: "😀" },
  { name: "Face with Tears of Joy", char: "😂" },
  { name: "Red Heart (VS16)", char: "\u2764\uFE0F" },
  { name: "Red Heart (plain)", char: "\u2764" },
  { name: "Fire", char: "🔥" },
  { name: "Man Technologist (ZWJ)", char: "👨\u200D💻" },
  { name: "Woman Technologist (ZWJ)", char: "👩\u200D💻" },
  { name: "Waving Hand Light Skin Tone", char: "👋🏻" },
  { name: "India Flag (regional indicators)", char: "🇮🇳" },
  { name: "Rainbow Flag (ZWJ)", char: "🏳\uFE0F\u200D🌈" },
  { name: "Head Shaking Horizontally (ZWJ + VS16)", char: "🙂\u200D↔\uFE0F" },
  { name: "Empty Nest", char: "🫪" },
  { name: "Root Vegetable", char: "🫯" },
  { name: "Fingerprint", char: "🫩" },
  { name: "Moose", char: "🫎" }
];

console.log(`Checking ${testEmojis.length} test Unicode sequences against ${all.length} dataset records:\n`);

let passed = 0;
for (const test of testEmojis) {
  const exact = all.find(i => i.character === test.char);
  if (exact) {
    console.log(`[PASS] EXACT: ${test.name} -> "${test.char}" | ID: ${exact.id} | Codepoints: ${exact.unicode ? exact.unicode.join(' ') : 'N/A'}`);
    passed++;
  } else {
    // Check if present in different variation or base
    const noVs = test.char.replace(/\uFE0F/g, "");
    const near = all.find(i => i.character.replace(/\uFE0F/g, "") === noVs);
    if (near) {
      console.log(`[NOTICE] VARIATION MATCH: ${test.name} -> expected codepoints: ${Array.from(test.char).map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).join(' ')} vs dataset: ${near.character} (${near.id})`);
    } else {
      console.log(`[FAIL] NOT FOUND: ${test.name} -> "${test.char}"`);
    }
  }
}

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const rawGroups = require("unicode-emoji-json/data-by-group.json");

// Check waving hand skin tone support in unicode-emoji-json
let wavingHand = null;
for (const g of rawGroups) {
  for (const e of g.emojis) {
    if (e.emoji === "👋") {
      wavingHand = e;
      break;
    }
  }
}
if (wavingHand) {
  console.log(`\nSkin tone metadata check: 👋 "waving-hand" skin_tone_support = ${wavingHand.skin_tone_support}`);
}
console.log(`\nResult: ${passed}/${testEmojis.length} direct matches in base records (skin tone variants handled via metadata per spec).`);
