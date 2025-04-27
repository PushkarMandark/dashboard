import { navigationConfig } from "@/config/navigation";

export function getNavigationInfo(pathname) {
  if (pathname === "/") return null;

  // Remove leading slash and split path
  const segments = pathname.slice(1).split("/");
  
  let currentConfig = navigationConfig;
  let title = "";
  let breadcrumbs = [{ label: "Home", url: "/" }];
  let currentPath = "";

  // Traverse the configuration tree
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    
    // Check if we have a configuration for this segment
    let segmentConfig = currentConfig[segment];
    
    // If not direct match, check if parent has children
    if (!segmentConfig && currentConfig.children) {
      segmentConfig = currentConfig.children[segment];
    }

    if (segmentConfig) {
      // Handle dynamic patterns
      if (segmentConfig.dynamic) {
        const matches = pathname.match(segmentConfig.dynamic.pattern);
        if (matches) {
          const resolved = segmentConfig.dynamic.resolve(matches);
          title = resolved.title;
          if (resolved.breadcrumbs) {
            breadcrumbs = [...breadcrumbs, ...resolved.breadcrumbs];
          }
          break;
        }
      } else {
        // Handle static patterns
        title = segmentConfig.title;
        breadcrumbs.push({
          label: segmentConfig.breadcrumb,
          url: currentPath,
        });
      }
      
      currentConfig = segmentConfig.children || {};
    } else {
      // Fallback for unmatched segments
      const label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      title = title || label;
      breadcrumbs.push({
        label,
        url: currentPath,
      });
    }
  }

  return {
    title,
    breadcrumbs: breadcrumbs.map((crumb, index) => ({
      ...crumb,
      isLast: index === breadcrumbs.length - 1,
    })),
  };
}