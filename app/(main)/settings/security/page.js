"use client";
import React from "react";

const SecuritySettingsPage = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Security Settings</h1>
      <p className="text-gray-600 mb-6">
        Manage your account security and authentication settings.
      </p>

      <div className="space-y-8">
        {/* Password Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Update Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">SMS Authentication</h4>
                <p className="text-sm text-gray-600">Receive verification codes via SMS</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Authenticator App</h4>
                <p className="text-sm text-gray-600">
                  Use an authenticator app for verification codes
                </p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Setup
              </button>
            </div>
          </div>
        </div>

        {/* Session Management */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Session Management</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Auto-logout after inactivity
                </label>
                <p className="text-sm text-gray-500">
                  Automatically log out after 30 minutes of inactivity
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Logout All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SecuritySettingsPage;
