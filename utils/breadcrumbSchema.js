export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`,
        name: item.label,
      },
    })),
  };
}
