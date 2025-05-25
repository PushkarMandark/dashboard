"use client";
import Link from "next/link";
import React from "react";

const SettingsPage = () => {
  const settingsCategories = [
    {
      title: "General Settings",
      description: "Basic application settings and preferences",
      href: "/settings/general",
      icon: "⚙️",
    },
    {
      title: "Security Settings",
      description: "Password, authentication, and security options",
      href: "/settings/security",
      icon: "🔒",
    },
    {
      title: "Notification Settings",
      description: "Email, push, and in-app notification preferences",
      href: "/settings/notifications",
      icon: "🔔",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600 mb-6">Manage your application settings and preferences.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="block p-6 bg-gray-50 rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
