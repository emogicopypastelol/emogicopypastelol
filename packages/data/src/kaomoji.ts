import type { CharacterItem } from "@repo/types";

// ============================================================
// Curated Kaomoji Dataset
// Authentic Japanese text emoticons, hand-curated and categorized.
// ============================================================

const rawKaomoji: CharacterItem[] = [
  // ── Happy & Joyful ──────────────────────────────────────────
  { id: "happy-classic", character: "(* ^ ω ^)", name: "Happy Face", slug: "happy-face", type: "kaomoji", category: "happy", keywords: ["happy", "joy", "smile", "cheer"] },
  { id: "happy-blush", character: "(´ ∀ ` *)", name: "Happy Blush", slug: "happy-blush", type: "kaomoji", category: "happy", keywords: ["happy", "blush", "cute", "smile"] },
  { id: "happy-sparkle", character: "(o^▽^o)", name: "Sparkle Joy", slug: "sparkle-joy", type: "kaomoji", category: "happy", keywords: ["happy", "sparkle", "cheerful", "smile"] },
  { id: "happy-arms-up", character: "＼(＾▽＾)／", name: "Yay Hurray", slug: "yay-hurray", type: "kaomoji", category: "happy", keywords: ["yay", "hurray", "celebrate", "arms up"] },
  { id: "happy-glee", character: "(⌒▽⌒)☆", name: "Glee Star", slug: "glee-star", type: "kaomoji", category: "happy", keywords: ["glee", "star", "excited", "happy"] },
  { id: "happy-wide-smile", character: "(*≧ω≦*)", name: "Excited Smile", slug: "excited-smile", type: "kaomoji", category: "happy", keywords: ["excited", "smile", "delight"] },
  { id: "happy-giggle", character: "(＾艸＾)", name: "Giggle", slug: "giggle", type: "kaomoji", category: "happy", keywords: ["giggle", "laugh", "shy", "happy"] },
  { id: "happy-big-grin", character: "(≧◡≦)", name: "Big Grin", slug: "big-grin", type: "kaomoji", category: "happy", keywords: ["grin", "content", "happy", "joy"] },
  { id: "happy-dance", character: "♪(┌・。・)┌", name: "Dancing Joy", slug: "dancing-joy", type: "kaomoji", category: "happy", keywords: ["dance", "music", "celebration", "groove"] },
  { id: "happy-peace", character: "(^_^)v", name: "Peace Sign Smile", slug: "peace-sign-smile", type: "kaomoji", category: "happy", keywords: ["peace", "victory", "smile", "chill"] },
  { id: "happy-sparkling", character: "(✧ω✧)", name: "Sparkling Eyes", slug: "sparkling-eyes-kaomoji", type: "kaomoji", category: "happy", keywords: ["sparkle", "wonder", "admire", "eyes"] },
  { id: "happy-warm", character: "( ´ ▽ ` )b", name: "Warm Thumbs Up", slug: "warm-thumbs-up", type: "kaomoji", category: "happy", keywords: ["thumbs up", "nice", "good job", "warm"] },
  { id: "happy-clapping", character: "(*’ω’ﾉﾉﾞ☆ﾊﾟﾁﾊﾟﾁ", name: "Clapping Hands", slug: "clapping-hands-kaomoji", type: "kaomoji", category: "happy", keywords: ["clap", "applause", "bravo"] },
  { id: "happy-singing", character: "ヾ(´〇`)ﾉ♪♪♪", name: "Singing Joy", slug: "singing-joy", type: "kaomoji", category: "happy", keywords: ["sing", "song", "music", "joy"] },
  { id: "happy-jumping", character: "ヽ(>∀<☆)ノ", name: "Jumping for Joy", slug: "jumping-for-joy", type: "kaomoji", category: "happy", keywords: ["jump", "energetic", "fun", "yay"] },

  // ── Love & Affection ────────────────────────────────────────
  { id: "love-heart-eyes", character: "(♡-_-♡)", name: "Dreamy Love", slug: "dreamy-love", type: "kaomoji", category: "love", keywords: ["love", "heart", "dreamy", "crush"] },
  { id: "love-blowing-kiss", character: "( ´ ∀ `)ノ～ ♡", name: "Blowing a Kiss", slug: "blowing-a-kiss", type: "kaomoji", category: "love", keywords: ["kiss", "love", "heart", "romance"] },
  { id: "love-sweet-heart", character: "(｡♥‿♥｡)", name: "Heart Eyes", slug: "heart-eyes-kaomoji", type: "kaomoji", category: "love", keywords: ["love", "adoring", "heart eyes", "crush"] },
  { id: "love-hug", character: "(つ✧ω✧)つ", name: "Warm Hug", slug: "warm-hug", type: "kaomoji", category: "love", keywords: ["hug", "cuddle", "embrace", "affection"] },
  { id: "love-blush-heart", character: "(´,,•ω•,,)♡", name: "Blushing Love", slug: "blushing-love", type: "kaomoji", category: "love", keywords: ["blush", "cute", "crush", "heart"] },
  { id: "love-kiss", character: "(づ￣ ³￣)づ", name: "Giving Kisses", slug: "giving-kisses", type: "kaomoji", category: "love", keywords: ["kiss", "pout", "affection", "cute"] },
  { id: "love-heart-give", character: "( ˘ ³˘)♥", name: "Sweet Smooch", slug: "sweet-smooch", type: "kaomoji", category: "love", keywords: ["smooch", "kiss", "heart", "love"] },
  { id: "love-couple-hug", character: "(っ´▽｀)っ))", name: "Coming for Hug", slug: "coming-for-hug", type: "kaomoji", category: "love", keywords: ["hug", "running", "arms open", "love"] },
  { id: "love-sparkle-heart", character: "(*♡∀♡)", name: "Starstruck Love", slug: "starstruck-love", type: "kaomoji", category: "love", keywords: ["love", "starstruck", "in love", "obsessed"] },
  { id: "love-tender", character: "(´｡• ᵕ •｡`) ♡", name: "Tender Heart", slug: "tender-heart", type: "kaomoji", category: "love", keywords: ["tender", "gentle", "kind", "heart"] },
  { id: "love-shy-glance", character: "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", name: "Shy Flustered", slug: "shy-flustered", type: "kaomoji", category: "love", keywords: ["shy", "flustered", "blushing", "red cheeks"] },
  { id: "love-flower", character: "(✿ ♥‿♥)", name: "Flower Love", slug: "flower-love", type: "kaomoji", category: "love", keywords: ["flower", "sweet", "gentle", "cute"] },

  // ── Cute & Kawaii ───────────────────────────────────────────
  { id: "cute-flower", character: "(✿◠‿◠)", name: "Cute Flower", slug: "cute-flower", type: "kaomoji", category: "cute", keywords: ["cute", "kawaii", "flower", "sweet"] },
  { id: "cute-sparkle-blush", character: "(◕‿◕✿)", name: "Kawaii Girl", slug: "kawaii-girl", type: "kaomoji", category: "cute", keywords: ["kawaii", "flower", "innocent", "cute"] },
  { id: "cute-soft-smile", character: "(o˘◡˘o)", name: "Soft Smile", slug: "soft-smile", type: "kaomoji", category: "cute", keywords: ["soft", "calm", "peaceful", "cute"] },
  { id: "cute-peek", character: "|ω･)ﾉ", name: "Peeking", slug: "peeking", type: "kaomoji", category: "cute", keywords: ["peek", "shy", "hiding", "hello"] },
  { id: "cute-wave", character: "(´• ω •`)ﾉ", name: "Cute Wave", slug: "cute-wave", type: "kaomoji", category: "cute", keywords: ["wave", "hello", "hi", "bye"] },
  { id: "cute-sparkly-eyes", character: "(✪‿✪)ノ", name: "Star Eyes Wave", slug: "star-eyes-wave", type: "kaomoji", category: "cute", keywords: ["stars", "wave", "cheer", "enthusiastic"] },
  { id: "cute-pat", character: "( ´ ▽ ` )ﾉ", name: "Friendly Wave", slug: "friendly-wave", type: "kaomoji", category: "cute", keywords: ["friendly", "wave", "polite", "sweet"] },
  { id: "cute-innocent", character: "( ˙꒳​˙ )", name: "Blank Cute", slug: "blank-cute", type: "kaomoji", category: "cute", keywords: ["blank", "curious", "stare", "cute"] },
  { id: "cute-sleepy", character: "(∪｡∪)｡｡zZZ", name: "Sleepy Time", slug: "sleepy-time-kaomoji", type: "kaomoji", category: "cute", keywords: ["sleep", "nap", "zzz", "tired"] },
  { id: "cute-pout", character: "(｡•́︿•̀｡)", name: "Cute Pout", slug: "cute-pout", type: "kaomoji", category: "cute", keywords: ["pout", "puppy eyes", "sad cute", "pleading"] },
  { id: "cute-bow", character: "m(_ _)m", name: "Deep Bow", slug: "deep-bow", type: "kaomoji", category: "cute", keywords: ["bow", "apology", "respect", "thank you"] },
  { id: "cute-sip-tea", character: "( -_-)旦~", name: "Sipping Tea", slug: "sipping-tea", type: "kaomoji", category: "cute", keywords: ["tea", "sip", "relax", "cozy"] },

  // ── Shrug & Meh ─────────────────────────────────────────────
  { id: "shrug-classic", character: `¯\\_(ツ)_/¯`, name: "Classic Shrug", slug: "classic-shrug", type: "kaomoji", category: "shrug", keywords: ["shrug", "whatever", "meh", "dunno", "idk"] },
  { id: "shrug-cute", character: `¯\\(°_o)/¯`, name: "Confused Shrug", slug: "confused-shrug", type: "kaomoji", category: "shrug", keywords: ["shrug", "confused", "lost", "idk"] },
  { id: "shrug-casual", character: "┐(‘～` )┌", name: "Casual Shrug", slug: "casual-shrug", type: "kaomoji", category: "shrug", keywords: ["shrug", "carefree", "whatever", "meh"] },
  { id: "shrug-arms-spread", character: "ヽ(´ー` )┌", name: "Carefree Meh", slug: "carefree-meh", type: "kaomoji", category: "shrug", keywords: ["meh", "carefree", "shrug", "chill"] },
  { id: "shrug-helpless", character: "┐(￣∀￣)┌", name: "Grinning Shrug", slug: "grinning-shrug", type: "kaomoji", category: "shrug", keywords: ["shrug", "grin", "smug", "what can you do"] },
  { id: "shrug-sigh", character: "┐(︶▽︶)┌", name: "Pleased Shrug", slug: "pleased-shrug", type: "kaomoji", category: "shrug", keywords: ["pleased", "shrug", "satisfied", "who knows"] },
  { id: "shrug-hands-up", character: "┐(￣ヘ￣)┌", name: "Annoyed Shrug", slug: "annoyed-shrug", type: "kaomoji", category: "shrug", keywords: ["annoyed", "whatever", "unimpressed", "shrug"] },
  { id: "shrug-bear", character: `¯\\_(•ᴥ•)_/¯`, name: "Bear Shrug", slug: "bear-shrug", type: "kaomoji", category: "shrug", keywords: ["bear", "shrug", "animal", "cute"] },
  { id: "shrug-smug", character: `¯\\(°_°)/¯`, name: "Blank Shrug", slug: "blank-shrug", type: "kaomoji", category: "shrug", keywords: ["blank", "deadpan", "shrug", "idk"] },

  // ── Sad & Crying ────────────────────────────────────────────
  { id: "sad-crying-stream", character: "(ಥ﹏ಥ)", name: "Crying Streams", slug: "crying-streams", type: "kaomoji", category: "sad", keywords: ["cry", "tears", "weep", "sob", "sad"] },
  { id: "sad-waterfall", character: "(T_T)", name: "Waterfall Tears", slug: "waterfall-tears", type: "kaomoji", category: "sad", keywords: ["crying", "sad", "tears", "classic"] },
  { id: "sad-weeping", character: "(;﹏;)", name: "Quiet Weep", slug: "quiet-weep", type: "kaomoji", category: "sad", keywords: ["weep", "sad", "sniffle", "tears"] },
  { id: "sad-devastated", character: "(っ˘̩╭╮˘̩)っ", name: "Need a Hug", slug: "need-a-hug", type: "kaomoji", category: "sad", keywords: ["sad", "hug", "comfort", "crying"] },
  { id: "sad-grief", character: "(ノ_<。)", name: "Wiping Tears", slug: "wiping-tears", type: "kaomoji", category: "sad", keywords: ["wiping tears", "upset", "grief", "sad"] },
  { id: "sad-disappointed", character: "(︶︹︺)", name: "Disappointed Face", slug: "disappointed-face-kaomoji", type: "kaomoji", category: "sad", keywords: ["disappointed", "frown", "bummed"] },
  { id: "sad-despair", character: "(ノД`)・゜・。", name: "Bawling Loudly", slug: "bawling-loudly", type: "kaomoji", category: "sad", keywords: ["bawling", "loud", "agony", "crying"] },
  { id: "sad-corner", character: "orz", name: "On Hands and Knees", slug: "orz-fail", type: "kaomoji", category: "sad", keywords: ["fail", "defeat", "orz", "knees", "despair"] },
  { id: "sad-heartbroken", character: "( ´;ω;` )", name: "Heartbroken Cry", slug: "heartbroken-cry", type: "kaomoji", category: "sad", keywords: ["heartbroken", "pain", "sad", "tears"] },

  // ── Angry & Table Flip ──────────────────────────────────────
  { id: "angry-table-flip", character: "(╯°□°)╯︵ ┻━┻", name: "Table Flip", slug: "table-flip", type: "kaomoji", category: "angry", keywords: ["table flip", "rage", "mad", "flip table"] },
  { id: "angry-put-table-back", character: "┬─┬ノ( º _ ºノ)", name: "Put Table Back", slug: "put-table-back", type: "kaomoji", category: "angry", keywords: ["respect tables", "calm down", "put back"] },
  { id: "angry-double-flip", character: "┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻", name: "Double Table Flip", slug: "double-table-flip", type: "kaomoji", category: "angry", keywords: ["double table flip", "extreme rage", "furious"] },
  { id: "angry-fists", character: "(ง •̀_•́)ง", name: "Ready to Fight", slug: "ready-to-fight", type: "kaomoji", category: "angry", keywords: ["fight", "fists", "boxing", "determined"] },
  { id: "angry-glare", character: "(ಠ_ಠ)", name: "Look of Disapproval", slug: "look-of-disapproval", type: "kaomoji", category: "angry", keywords: ["disapproval", "glare", "stern", "judging"] },
  { id: "angry-rage", character: "(╬`益´)", name: "Pure Rage", slug: "pure-rage", type: "kaomoji", category: "angry", keywords: ["rage", "furious", "vein", "screaming"] },
  { id: "angry-furious", character: "(#`Д´)", name: "Furious Shout", slug: "furious-shout", type: "kaomoji", category: "angry", keywords: ["shout", "furious", "screaming", "mad"] },
  { id: "angry-grumpy", character: "(¬_¬)", name: "Side-Eye Glare", slug: "side-eye-glare", type: "kaomoji", category: "angry", keywords: ["side eye", "suspicious", "skeptical", "grumpy"] },
  { id: "angry-punch", character: "(っ•̀-•́)っ✎", name: "Punching Action", slug: "punching-action", type: "kaomoji", category: "angry", keywords: ["punch", "attack", "action"] },

  // ── Animals & Creatures ─────────────────────────────────────
  { id: "animal-bear", character: "ʕ•ᴥ•ʔ", name: "Teddy Bear", slug: "teddy-bear-kaomoji", type: "kaomoji", category: "animals", keywords: ["bear", "teddy", "cute", "animal"] },
  { id: "animal-polar-bear", character: "ʕっ•ᴥ•ʔっ", name: "Bear Hug", slug: "bear-hug", type: "kaomoji", category: "animals", keywords: ["bear", "hug", "warm", "cuddle"] },
  { id: "animal-cat", character: "(=^･ω･^=)", name: "Cat Face", slug: "cat-face-kaomoji", type: "kaomoji", category: "animals", keywords: ["cat", "kitty", "whiskers", "meow"] },
  { id: "animal-cat-paw", character: "(=^･ｪ･^=))ﾉ彡☆", name: "Cat Paw Swat", slug: "cat-paw-swat", type: "kaomoji", category: "animals", keywords: ["cat", "paw", "playful", "meow"] },
  { id: "animal-dog", character: "∪･ω･∪", name: "Puppy Dog", slug: "puppy-dog-kaomoji", type: "kaomoji", category: "animals", keywords: ["dog", "puppy", "bark", "woof", "ears"] },
  { id: "animal-bunny", character: "(\\_/)\n( •_•)\n/ >❤️", name: "Bunny With Heart", slug: "bunny-with-heart", type: "kaomoji", category: "animals", keywords: ["bunny", "rabbit", "heart", "cute"] },
  { id: "animal-bunny-simple", character: "(=‘•’=)", name: "Little Rabbit", slug: "little-rabbit", type: "kaomoji", category: "animals", keywords: ["rabbit", "bunny", "ears", "cute"] },
  { id: "animal-bird", character: "（・⊝・）", name: "Baby Chick", slug: "baby-chick-kaomoji", type: "kaomoji", category: "animals", keywords: ["bird", "chick", "beak", "tweet"] },
  { id: "animal-fish", character: "<コ:彡", name: "Squid", slug: "squid-kaomoji", type: "kaomoji", category: "animals", keywords: ["squid", "ocean", "tentacles", "fish"] },
  { id: "animal-monkey", character: "@(o･ｪ･)@", name: "Monkey", slug: "monkey-kaomoji", type: "kaomoji", category: "animals", keywords: ["monkey", "ape", "ears", "cute"] },
  { id: "animal-pig", character: "( ´(00)`)", name: "Pig Snout", slug: "pig-snout", type: "kaomoji", category: "animals", keywords: ["pig", "oink", "snout", "cute"] },
  { id: "animal-spider", character: "/╲/\\╭( ͡° ͡° ͜ʖ ͡° ͡°)╮/\\╱\\", name: "Spider Lenny", slug: "spider-lenny", type: "kaomoji", category: "animals", keywords: ["spider", "creepy", "lenny", "legs"] },

  // ── Action & Cool ───────────────────────────────────────────
  { id: "action-sunglasses", character: "(⌐■_■)", name: "Deal With It", slug: "deal-with-it", type: "kaomoji", category: "action", keywords: ["sunglasses", "cool", "boss", "deal with it"] },
  { id: "action-put-glasses-on", character: "( •_•) ( •_•)>⌐■-■ (⌐■_■)", name: "Puts on Sunglasses", slug: "puts-on-sunglasses", type: "kaomoji", category: "action", keywords: ["sunglasses", "csi", "dramatic", "cool"] },
  { id: "action-lenny", character: "( ͡° ͜ʖ ͡°)", name: "Lenny Face", slug: "lenny-face", type: "kaomoji", category: "action", keywords: ["lenny", "smirk", "mischief", "flirt"] },
  { id: "action-running", character: "ε=ε=ε=┌(;*´Д`)ﾉ", name: "Running Late", slug: "running-late", type: "kaomoji", category: "action", keywords: ["running", "hurry", "late", "rush"] },
  { id: "action-magic", character: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", name: "Casting Magic Sparkles", slug: "casting-magic-sparkles", type: "kaomoji", category: "action", keywords: ["magic", "sparkles", "wizard", "spell"] },
  { id: "action-salute", character: "(｀･ω･´)ゞ", name: "Respectful Salute", slug: "respectful-salute", type: "kaomoji", category: "action", keywords: ["salute", "yes sir", "respect", "honor"] },
  { id: "action-finger-guns", character: "(☞ﾟヮﾟ)☞", name: "Finger Guns", slug: "finger-guns", type: "kaomoji", category: "action", keywords: ["finger guns", "eyy", "cool", "you got it"] },
  { id: "action-ninja", character: "(*ﾟﾛﾟ)_/彡", name: "Ninja Strike", slug: "ninja-strike", type: "kaomoji", category: "action", keywords: ["ninja", "karate", "strike", "chop"] },
  { id: "action-wave-goodbye", character: "(・ω・)ノ", name: "Casual Wave", slug: "casual-wave", type: "kaomoji", category: "action", keywords: ["wave", "bye", "see you", "hello"] },
  { id: "action-shocked", character: "Σ(°△°|||)", name: "Gasp Shock", slug: "gasp-shock", type: "kaomoji", category: "action", keywords: ["shock", "surprise", "gasp", "scared"] },
  { id: "action-dramatic", character: "((((；゜Д゜)))", name: "Shivering Fear", slug: "shivering-fear", type: "kaomoji", category: "action", keywords: ["fear", "scared", "shivering", "shook"] },
];

export const kaomoji: CharacterItem[] = rawKaomoji.map((k) => ({
  ...k,
  type: "kaomoji",
}));
