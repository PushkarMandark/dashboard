// Custom mappings for breadcrumb labels and URLs
export const breadcrumbMappings = {
  // Simple path to label mappings
  dashboard: "Dashboard",
  profile: "User Profile",
  settings: "Settings",
  
  // Complex mappings with dynamic segments
  "bugs/projects": {
    label: "Projects",
    // Dynamic segment handler
    dynamic: {
      pattern: /^\/bugs\/projects\/([^\/]+)\/([^\/]+)$/,
      resolve: (matches) => {
        const [, status, priority] = matches;
        return [
          { label: "Projects", url: "/bugs/projects" },
          { label: status.charAt(0).toUpperCase() + status.slice(1), url: `/bugs/projects/${status}` },
          { label: priority.charAt(0).toUpperCase() + priority.slice(1) },
        ];
      },
    },
  },
};