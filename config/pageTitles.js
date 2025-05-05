export const pageTitleMappings = {
  // Simple path to title mappings
  dashboard: "Dashboard Overview",
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
        return `${status.charAt(0).toUpperCase() + status.slice(1)} Projects - ${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`;
      },
    },
  },
  "profile/editProfile": "Edit Profile",
  "settings/users": {
    label: "User Management",
    dynamic: {
      pattern: /^\/settings\/users\/([^\/]+)$/,
      resolve: (matches) => {
        const [, section] = matches;
        return `User ${section.charAt(0).toUpperCase() + section.slice(1)} Management`;
      },
    },
  },
  "settings/project": {
    label: "Project Settings",
    dynamic: {
      pattern: /^\/settings\/project\/([^\/]+)$/,
      resolve: (matches) => {
        const [, section] = matches;
        return `Project ${section.charAt(0).toUpperCase() + section.slice(1)} Settings`;
      },
    },
  },
};
