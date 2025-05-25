export const navigationConfig = {
  dashboard: {
    title: "Products Dashboard",
    breadcrumb: "Dashboard",
  },
  users: {
    title: "Users Management",
    breadcrumb: "Users",
  },
  orders: {
    title: "Orders Management",
    breadcrumb: "Orders",
  },
  forms: {
    title: "Form Examples",
    breadcrumb: "Forms",
  },
  profile: {
    title: "User Profile",
    breadcrumb: "Profile",
    children: {
      edit: {
        title: "Edit Profile",
        breadcrumb: "Edit Profile",
      },
      settings: {
        title: "Profile Settings",
        breadcrumb: "Settings",
      },
    },
  },
  settings: {
    title: "Settings",
    breadcrumb: "Settings",
    children: {
      general: {
        title: "General Settings",
        breadcrumb: "General",
      },
      security: {
        title: "Security Settings",
        breadcrumb: "Security",
      },
      notifications: {
        title: "Notification Settings",
        breadcrumb: "Notifications",
      },
    },
  },
};
