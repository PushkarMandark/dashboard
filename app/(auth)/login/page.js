"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { authService } from "@/lib/services/authService";
import { setUser } from "@/state/slices/userSlice";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy login logic - in real app, this would be an API call
      if (username === "admin" && password === "password") {
        const userData = {
          id: 1,
          username: "admin",
          email: "admin@admin.com",
          role: "Admin",
        };

        dispatch(setUser(userData));

        const dummyToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29sIiwicm9sZSI6IkFkbWluIn0";
        authService.login(userData, dummyToken);

        router.push("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-background">
      {/* Left Section - Promotional Content */}
      <div
        className="hidden md:flex md:w-1/2 min-h-screen relative overflow-hidden items-center justify-center p-8"
        style={{
          // Set the background color directly here
          backgroundColor: "#556ee640", // Your specified background color
          backgroundImage: "url('/images/loginPage-bg.png')",
          backgroundSize: "cover", // You might want 'contain' or specific sizes depending on image
          backgroundPosition: "left", // Changed to center for better general placement
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* SKOTE Logo/Text - Top Right */}
        <div className="absolute top-8 right-8">
          <span className="text-white text-2xl font-semibold tracking-wider">SKOTE</span>
        </div>

        <div className="text-white text-center z-10 max-w-md">
          <blockquote className="text-xl italic mb-6">
            &ldquo;Fantastic theme with a ton of options. If you just want the HTML to integrate
            with your project, then this is the package. You can find the files in the dist folder,
            no need to install git and all the other stuff the documentation talks about.&rdquo;
          </blockquote>
          <p className="font-bold text-lg mb-2">Abs1981</p>
          <p className="text-sm">&mdash; Skote User</p>
          <div className="flex justify-center mt-8 space-x-2">
            <span className="h-2 w-2 bg-white rounded-full opacity-50" />
            <span className="h-2 w-2 bg-white rounded-full" />
            <span className="h-2 w-2 bg-white rounded-full opacity-50" />
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
          {/* SKOTE Logo/Text - Top Right (visible on smaller screens too) */}
          <div className="p-6 text-right md:hidden">
            <span className="text-gray-800 text-2xl font-semibold tracking-wider">SKOTE</span>
          </div>

          {/* Header with illustration (removed as per new design, kept "Welcome Back") */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800">Welcome Back !</h2>
            <p className="text-sm text-blue-600">Sign in to continue to Skote.</p>
          </div>

          {/* Login Form */}
          <div className="p-6 pt-0">
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                  <Link
                    href="/forgot-password"
                    className="float-right text-sm text-primary hover:text-primary-dark"
                  >
                    Forgot password?
                  </Link>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary pr-10"
                    placeholder="Enter Password"
                    required
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="text-center mb-4">
                <span className="text-sm text-gray-500">Sign in with</span>
              </div>
              <div className="flex justify-center space-x-4">
                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-150 ease-in-out">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.554 3.921 1.465l2.814-2.814c-1.798-1.678-4.203-2.707-6.735-2.707-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426.075z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Don't have an account? */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:text-primary-dark">
                  Signup now
                </Link>
              </p>
            </div>
          </div>
          {/* Copyright */}
          <div className="px-6 py-4 bg-gray-50 text-center text-xs text-gray-500">
            © 2025 Skote. Crafted with ❤️ by Themesbrand
          </div>
        </div>
      </div>
    </div>
  );
}
