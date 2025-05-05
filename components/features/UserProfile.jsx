"use client";

import { useSelector, useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  selectUser,
  selectPreferences,
  updatePreferences,
  clearUser,
} from "@/state/slices/userSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const preferences = useSelector(selectPreferences);

  const handleThemeChange = (theme) => {
    dispatch(updatePreferences({ theme }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Profile</h2>

      <div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>

      <div>
        <h3 className="text-xl">Preferences</h3>
        <div className="flex gap-2">
          <Button
            variant={preferences.theme === "light" ? "default" : "outline"}
            onClick={() => handleThemeChange("light")}
          >
            Light Theme
          </Button>
          <Button
            variant={preferences.theme === "dark" ? "default" : "outline"}
            onClick={() => handleThemeChange("dark")}
          >
            Dark Theme
          </Button>
        </div>
      </div>

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
