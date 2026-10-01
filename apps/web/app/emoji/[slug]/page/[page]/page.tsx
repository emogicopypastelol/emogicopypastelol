import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { emojiCategories } from "@repo/data";
import { getEmojiByCategory } from "@/lib/data";
import {
  EMOJI_CATEGORY_PAGE_SIZE,
  emojiCategoryPagePath,
} from "@/lib/emojiPagination";
import { CategoryView } from "../../CategoryView";

export const dynamicParams = false;

export function generateStaticParams() {
  return emojiCategories.flatMap((category) => {
    const pageCount = Math.ceil(
      getEmojiByCategory(category.slug).length / EMOJI_CATEGORY_PAGE_SIZE
    );
    return Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => ({
      slug: category.slug,
      page: String(index + 2),
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}): Promise<Metadata> {
  const { slug, page } = await params;
  const category = emojiCategories.find((item) => item.slug === slug);
  const pageNumber = Number(page);
  if (!category || !Number.isInteger(pageNumber) || pageNumber < 2) return {};

  const items = getEmojiByCategory(slug);
  const totalPages = Math.ceil(items.length / EMOJI_CATEGORY_PAGE_SIZE);
  if (pageNumber > totalPages) return {};

  const title = category.name + " Emoji — Page " + pageNumber + " — Copy and Paste";
  const description =
    "Browse page " + pageNumber + " of " + totalPages + " of " +
    category.name.toLowerCase() + " emoji. " + category.description +
    " Copy each character with one click.";
  const canonical =
    "https://copypaste-unicode.com" + emojiCategoryPagePath(slug, pageNumber);

  return {
    title,
    description,
    openGraph: { title, description, type: "website", url: canonical },
    twitter: { card: "summary", title, description },
    alternates: { canonical },
  };
}

export default async function EmojiCategoryPaginationPage({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page } = await params;
  const category = emojiCategories.find((item) => item.slug === slug);
  const pageNumber = Number(page);
  if (!category || !Number.isInteger(pageNumber) || pageNumber < 2) notFound();

  const allItems = getEmojiByCategory(slug);
  const totalPages = Math.ceil(allItems.length / EMOJI_CATEGORY_PAGE_SIZE);
  if (pageNumber > totalPages) notFound();

  const startIndex = (pageNumber - 1) * EMOJI_CATEGORY_PAGE_SIZE;
  return (
    <CategoryView
      category={category}
      items={allItems.slice(startIndex, startIndex + EMOJI_CATEGORY_PAGE_SIZE)}
      totalCount={allItems.length}
      currentPage={pageNumber}
      totalPages={totalPages}
      startIndex={startIndex}
    />
  );
}