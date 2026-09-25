import type { Category } from "@repo/types";

// ============================================================
// Category definitions for all character types
// ============================================================

export const emojiCategories: Category[] = [
  {
    slug: "smileys-emotion",
    name: "Smileys & Emotion",
    type: "emoji",
    icon: "smile",
    description: "Smiley faces, emotions, and feelings emoji",
  },
  {
    slug: "people-body",
    name: "People & Body",
    type: "emoji",
    icon: "user",
    description: "People, hand gestures, and body parts emoji",
  },
  {
    slug: "animals-nature",
    name: "Animals & Nature",
    type: "emoji",
    icon: "cat",
    description: "Animals, plants, and nature emoji",
  },
  {
    slug: "food-drink",
    name: "Food & Drink",
    type: "emoji",
    icon: "apple",
    description: "Food, drinks, and cooking emoji",
  },
  {
    slug: "travel-places",
    name: "Travel & Places",
    type: "emoji",
    icon: "plane",
    description: "Travel, places, and transportation emoji",
  },
  {
    slug: "activities",
    name: "Activities",
    type: "emoji",
    icon: "trophy",
    description: "Sports, games, and activities emoji",
  },
  {
    slug: "objects",
    name: "Objects",
    type: "emoji",
    icon: "lightbulb",
    description: "Objects, tools, and things emoji",
  },
  {
    slug: "symbols",
    name: "Symbols",
    type: "emoji",
    icon: "hash",
    description: "Symbols, signs, and marks emoji",
  },
  {
    slug: "flags",
    name: "Flags",
    type: "emoji",
    icon: "flag",
    description: "Country and regional flags emoji",
  },
];

export const symbolCategories: Category[] = [
  {
    slug: "hearts",
    name: "Heart Symbols",
    type: "symbol",
    icon: "heart",
    description:
      "Copy and paste heart symbols including colored hearts, outlined hearts, and decorative heart characters",
  },
  {
    slug: "stars",
    name: "Star Symbols",
    type: "symbol",
    icon: "star",
    description:
      "Copy and paste star symbols including solid stars, outlined stars, and decorative star characters",
  },
  {
    slug: "arrows",
    name: "Arrow Symbols",
    type: "symbol",
    icon: "arrow-right",
    description:
      "Copy and paste arrow symbols including directional arrows, double arrows, and decorative arrow characters",
  },
  {
    slug: "math",
    name: "Math Symbols",
    type: "symbol",
    icon: "calculator",
    description:
      "Copy and paste mathematical symbols including operators, relations, and special math characters",
  },
  {
    slug: "currency",
    name: "Currency Symbols",
    type: "symbol",
    icon: "dollar-sign",
    description:
      "Copy and paste currency symbols from around the world",
  },
  {
    slug: "shapes",
    name: "Shape Symbols",
    type: "symbol",
    icon: "square",
    description:
      "Copy and paste geometric shapes including circles, squares, triangles, and diamonds",
  },
  {
    slug: "lines",
    name: "Line & Border Symbols",
    type: "symbol",
    icon: "minus",
    description:
      "Copy and paste line symbols, box-drawing characters, and border characters",
  },
  {
    slug: "music",
    name: "Music Symbols",
    type: "symbol",
    icon: "music",
    description:
      "Copy and paste music symbols including notes, clefs, and musical notation",
  },
  {
    slug: "weather",
    name: "Weather Symbols",
    type: "symbol",
    icon: "cloud",
    description:
      "Copy and paste weather symbols including sun, moon, cloud, and atmospheric characters",
  },
  {
    slug: "technical",
    name: "Technical Symbols",
    type: "symbol",
    icon: "settings",
    description:
      "Copy and paste technical symbols including checkmarks, bullets, and special characters",
  },
  {
    slug: "greek",
    name: "Greek Letters",
    type: "symbol",
    icon: "omega",
    description:
      "Copy and paste Greek alphabet letters including uppercase and lowercase characters",
  },
  {
    slug: "latin",
    name: "Latin Extended",
    type: "symbol",
    icon: "a-large-small",
    description:
      "Copy and paste accented Latin characters and extended Latin letters",
  },
  {
    slug: "miscellaneous",
    name: "Miscellaneous Symbols",
    type: "symbol",
    icon: "sparkles",
    description:
      "Copy and paste miscellaneous symbols and special characters",
  },
];

export const kaomojiCategories: Category[] = [
  {
    slug: "happy",
    name: "Happy & Smiling",
    type: "kaomoji",
    icon: "smile",
    description: "Copy and paste happy Japanese kaomoji emoticons and joyful text faces",
  },
  {
    slug: "love",
    name: "Love & Hugs",
    type: "kaomoji",
    icon: "heart",
    description: "Copy and paste love kaomojis, heart eyes, kissing faces, and romantic emoticons",
  },
  {
    slug: "cute",
    name: "Cute & Kawaii",
    type: "kaomoji",
    icon: "sparkles",
    description: "Copy and paste cute kawaii Japanese text faces, sweet expressions, and waving emoticons",
  },
  {
    slug: "shrug",
    name: "Shrug & Meh",
    type: "kaomoji",
    icon: "help-circle",
    description: "Copy and paste shrug kaomojis like ¯\\_(ツ)_/¯ and carefree text expressions",
  },
  {
    slug: "sad",
    name: "Sad & Crying",
    type: "kaomoji",
    icon: "frown",
    description: "Copy and paste sad kaomojis, crying tears, weeping faces, and heartbroken text emoticons",
  },
  {
    slug: "angry",
    name: "Angry & Table Flip",
    type: "kaomoji",
    icon: "flame",
    description: "Copy and paste angry kaomojis, table flip (╯°□°)╯︵ ┻━┻, and furious text emoticons",
  },
  {
    slug: "animals",
    name: "Animals & Bears",
    type: "kaomoji",
    icon: "paw-print",
    description: "Copy and paste animal kaomojis including bears, cats, puppies, and rabbits",
  },
  {
    slug: "action",
    name: "Action & Cool",
    type: "kaomoji",
    icon: "glasses",
    description: "Copy and paste cool sunglasses kaomojis (⌐■_■), lenny faces, and action emoticons",
  },
];

export const allCategories: Category[] = [
  ...emojiCategories,
  ...symbolCategories,
  ...kaomojiCategories,
];


