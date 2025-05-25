"use client";
import React from "react";

const GeneralSettingsPage = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">General Settings</h1>
      <p className="text-gray-600 mb-6">Configure basic application settings and preferences.</p>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Application Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Dark Mode</label>
                <p className="text-sm text-gray-500">Enable dark theme for the application</p>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Auto-save</label>
                <p className="text-sm text-gray-500">Automatically save changes as you work</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">Greenwich Mean Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default GeneralSettingsPage;
