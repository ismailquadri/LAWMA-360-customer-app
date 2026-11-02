export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} · LAWMA 360` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · LAWMA 360` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
