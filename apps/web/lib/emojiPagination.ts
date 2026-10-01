export const EMOJI_CATEGORY_PAGE_SIZE = 60;

export function emojiCategoryPagePath(slug: string, page: number): string {
  return page <= 1
    ? "/emoji/" + slug
    : "/emoji/" + slug + "/page/" + page;
}