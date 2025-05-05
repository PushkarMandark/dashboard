export const navigationConfig = {
  dashboard: {
    title: "Dashboard Overview",
    breadcrumb: "Dashboard",
  },
  profile: {
    title: "User Profile",
    breadcrumb: "Profile",
    children: {
      editProfile: {
        title: "Edit Profile",
        breadcrumb: "Edit Profile",
      },
      settings: {
        title: "Profile Settings",
        breadcrumb: "Settings",
      },
    },
  },
  bugs: {
    title: "Bug Tracker",
    breadcrumb: "Bugs",
    children: {
      projects: {
        title: "Projects Overview",
        breadcrumb: "Projects",
        dynamic: {
          pattern: /^\/bugs\/projects\/([^\/]+)\/([^\/]+)$/,
          resolve: (matches) => {
            const [, status, priority] = matches;
            return {
              title: `${status.charAt(0).toUpperCase() + status.slice(1)} Projects - ${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`,
              breadcrumbs: [
                { label: "Projects", url: "/bugs/projects" },
                {
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                  url: `/bugs/projects/${status}`,
                },
                { label: priority.charAt(0).toUpperCase() + priority.slice(1) },
              ],
            };
          },
        },
      },
      "my-assignments": {
        title: "My Assignments",
        breadcrumb: "My Assignments",
      },
    },
  },
  settings: {
    title: "Settings",
    breadcrumb: "Settings",
    children: {
      users: {
        title: "User Management",
        breadcrumb: "Users",
        dynamic: {
          pattern: /^\/settings\/users\/([^\/]+)$/,
          resolve: (section) => ({
            title: `User ${section.charAt(0).toUpperCase() + section.slice(1)} Management`,
            breadcrumb: section.charAt(0).toUpperCase() + section.slice(1),
          }),
        },
      },
    },
  },
};
