"use client";
import React from "react";

const NotificationSettingsPage = () => {
  const notificationTypes = [
    {
      title: "Email Notifications",
      description: "Receive notifications via email",
      settings: [
        { name: "New orders", enabled: true },
        { name: "User registrations", enabled: true },
        { name: "System updates", enabled: false },
        { name: "Weekly reports", enabled: true },
      ],
    },
    {
      title: "Push Notifications",
      description: "Receive browser push notifications",
      settings: [
        { name: "Real-time alerts", enabled: true },
        { name: "Task reminders", enabled: false },
        { name: "Chat messages", enabled: true },
        { name: "System maintenance", enabled: true },
      ],
    },
    {
      title: "In-App Notifications",
      description: "Show notifications within the application",
      settings: [
        { name: "Activity feed", enabled: true },
        { name: "Status updates", enabled: true },
        { name: "Error alerts", enabled: true },
        { name: "Success messages", enabled: true },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Notification Settings</h1>
        <p className="text-gray-600 mb-6">Configure how and when you receive notifications.</p>

        <div className="space-y-8">
          {notificationTypes.map((type, index) => (
            <div key={index} className={index > 0 ? "pt-6 border-t" : ""}>
              <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
              <p className="text-gray-600 mb-4">{type.description}</p>

              <div className="space-y-3">
                {type.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">{setting.name}</label>
                    <input
                      type="checkbox"
                      defaultChecked={setting.enabled}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Notification Frequency */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Notification Frequency</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Digest Frequency
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="immediate">Immediate</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input
                      type="time"
                      defaultValue="22:00"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  No notifications will be sent during these hours
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
