import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

import { generateBreadcrumbSchema } from "@/utils/breadcrumbSchema";

const Breadcrumb = ({ items }) => {
  if (!items?.length) return null;

  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={item.url || index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />}

              {index === 0 ? (
                <Link
                  href={item.url}
                  className="text-gray-500 hover:text-primary flex items-center"
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              ) : item.isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.url} className="text-gray-500 hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default Breadcrumb;
