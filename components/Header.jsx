"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Bell, 
  Settings, 
  ChevronDown, 
  Search, 
  Maximize, 
  Grid, 
  Menu,
  X,
  User,
  LogOut,
  Settings2,
  HelpCircle,
} from "lucide-react";

export default function Header() {
  const [megaMenu, setMegaMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [notificationMenu, setNotificationMenu] = useState(false);
  
  const megaMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setMegaMenu(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target)) {
        setNotificationMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const notifications = [
    {
      id: 1,
      title: "Your order is placed",
      desc: "Order #123456 has been placed successfully",
      time: "3 min ago",
      isRead: false,
    },
    {
      id: 2,
      title: "New message received",
      desc: "You have a new message from John Doe",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: 3,
      title: "Server Limit Reached!",
      desc: "Server has reached 80% of memory usage",
      time: "2 hours ago",
      isRead: false,
    },
  ];

  return (
    <header className="px-4 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Left Section */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Skote" 
                width={120} 
                height={40}
                className="h-8 w-auto"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Mega Menu */}
              <div ref={megaMenuRef} className="relative">
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
                  onClick={() => setMegaMenu(!megaMenu)}
                >
                  Mega Menu
                  <ChevronDown className={`h-4 w-4 transition-transform ${megaMenu ? "rotate-180" : ""}`} />
                </button>

                {megaMenu && (
                  <div className="absolute top-full left-0 mt-2 w-screen max-w-screen-lg bg-white rounded-lg shadow-lg border p-6">
                    <div className="grid grid-cols-3 gap-8">
                      <div>
                        <h3 className="font-semibold mb-4">UI Components</h3>
                        <ul className="space-y-2">
                          <li><Link href="/components/buttons" className="hover:text-blue-600">Buttons</Link></li>
                          <li><Link href="/components/cards" className="hover:text-blue-600">Cards</Link></li>
                          <li><Link href="/components/forms" className="hover:text-blue-600">Forms</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Applications</h3>
                        <ul className="space-y-2">
                          <li><Link href="/apps/calendar" className="hover:text-blue-600">Calendar</Link></li>
                          <li><Link href="/apps/chat" className="hover:text-blue-600">Chat</Link></li>
                          <li><Link href="/apps/email" className="hover:text-blue-600">Email</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Extra Pages</h3>
                        <ul className="space-y-2">
                          <li><Link href="/pages/profile" className="hover:text-blue-600">Profile</Link></li>
                          <li><Link href="/pages/invoice" className="hover:text-blue-600">Invoice</Link></li>
                          <li><Link href="/pages/faq" className="hover:text-blue-600">FAQ</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Country Flag */}
            <button className="hidden lg:flex items-center gap-2">
              <Image
                src="/images/us-flag.png"
                alt="US Flag"
                width={20}
                height={15}
                className="rounded"
              />
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Grid */}
            <button className="p-2 hover:bg-gray-100 rounded-full hidden lg:block">
              <Grid className="h-5 w-5 text-gray-600" />
            </button>

            {/* Maximize */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-full hidden lg:block"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <div ref={notificationMenuRef} className="relative">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={() => setNotificationMenu(!notificationMenu)}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              </button>

              {notificationMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      <span className="text-sm text-blue-600 cursor-pointer">Mark all as read</span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                          notification.isRead ? "bg-white" : "bg-blue-50"
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.desc}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 text-center border-t">
                    <Link href="/notifications" className="text-blue-600 hover:text-blue-700">
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div ref={profileMenuRef} className="relative">
              <button 
                className="flex items-center gap-2"
                onClick={() => setProfileMenu(!profileMenu)}
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/images/avatar.jpg"
                    alt="User"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  <span className="text-sm font-medium">admin</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${profileMenu ? "rotate-180" : ""}`} />
                </div>
              </button>

              {profileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                  <div className="py-1">
                    <Link 
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link 
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings2 className="h-4 w-4" />
                      Settings
                    </Link>
                    <Link 
                      href="/help"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <HelpCircle className="h-4 w-4" />
                      Help Center
                    </Link>
                    <div className="border-t">
                      <button 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                        onClick={() => {
                          // Add your logout logic here
                          console.log("Logging out...");
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden border-t bg-white w-full px-4">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <nav className="space-y-4">
              <Link href="/dashboard" className="block py-2 hover:text-blue-600">Dashboard</Link>
              <Link href="/apps" className="block py-2 hover:text-blue-600">Apps</Link>
              <Link href="/components" className="block py-2 hover:text-blue-600">Components</Link>
              <Link href="/pages" className="block py-2 hover:text-blue-600">Pages</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}


