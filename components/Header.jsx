"use client";
import { useState, useRef, useEffect, memo, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Bell, 
  ChevronDown, 
  Search, 
  Maximize, 
  Menu,
  X,
  User,
  LogOut,
  Settings2,
  HelpCircle,
} from "lucide-react";
import SubHeader from "./SubHeader";
import ErrorBoundary from "@/components/ErrorBoundary";

// Memoize the Header component
const Header = () => {
  const [menuStates, setMenuStates] = useState({
    megaMenu: false,
    mobileMenu: false,
    profileMenu: false,
    notificationMenu: false,
  });

  const megaMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setMenuStates(prev => ({
          ...prev,
          megaMenu: false,
        }));
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setMenuStates(prev => ({
          ...prev,
          profileMenu: false,
        }));
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target)) {
        setMenuStates(prev => ({
          ...prev,
          notificationMenu: false,
        }));
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

  // Memoize notification count
  const unreadNotificationCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length,
  [notifications],
  );

  // Memoize handlers
  const toggleNotificationMenu = useCallback(() => {
    setMenuStates(prev => ({
      ...prev,
      notificationMenu: !prev.notificationMenu,
    }));
  }, []);

  // Add function to handle mobile menu state
  const handleMobileMenuToggle = () => {
    setMenuStates(prev => ({
      ...prev,
      mobileMenu: !prev.mobileMenu,
    }));
    // Prevent body scroll when menu is open
    document.body.style.overflow = !menuStates.mobileMenu ? "hidden" : "auto";
  };

  // Cleanup effect for body scroll
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ErrorBoundary fallback="There was a problem loading the navigation menu. Please try refreshing the page.">
      <header ref={headerRef} className="w-full bg-white border-b shadow-sm relative">
        <div className="container-custom flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              aria-expanded={menuStates.mobileMenu}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={handleMobileMenuToggle}
            >
              {menuStates.mobileMenu ? <X /> : <Menu />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center py-4">
              <Image 
                src="/images/logo.png" 
                alt="Skote" 
                width={100} 
                height={30}
                className=""
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block relative ml-8 py-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-[#f3f3f9] rounded-full min-w-72 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Desktop Mega Menu */}
            <div ref={megaMenuRef} className="hidden lg:block relative ml-8">
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 py-4"
                onClick={() => setMenuStates(prev => ({
                  ...prev,
                  megaMenu: !prev.megaMenu,
                }))}
              >
                Mega Menu
                <ChevronDown className={`h-4 w-4 transition-transform ${menuStates.megaMenu ? "rotate-180" : ""}`} />
              </button>

              {menuStates.megaMenu && (
                <div 
                  style={{ position: "fixed", top: `${headerHeight}px` }}
                  className="left-1/2 transform -translate-x-1/2 w-[800px] bg-white rounded-lg shadow-lg border p-6 z-[60]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4 text-gray-900">UI Components</h3>
                      <ul className="space-y-2">
                        <li><Link href="/components/buttons" className="text-gray-600 hover:text-primary block">Buttons</Link></li>
                        <li><Link href="/components/cards" className="text-gray-600 hover:text-primary block">Cards</Link></li>
                        <li><Link href="/components/forms" className="text-gray-600 hover:text-primary block">Forms</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4 text-gray-900">Applications</h3>
                      <ul className="space-y-2">
                        <li><Link href="/apps/calendar" className="text-gray-600 hover:text-primary block">Calendar</Link></li>
                        <li><Link href="/apps/chat" className="text-gray-600 hover:text-primary block">Chat</Link></li>
                        <li><Link href="/apps/email" className="text-gray-600 hover:text-primary block">Email</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4 text-gray-900">Extra Pages</h3>
                      <ul className="space-y-2">
                        <li><Link href="/pages/profile" className="text-gray-600 hover:text-primary block">Profile</Link></li>
                        <li><Link href="/pages/invoice" className="text-gray-600 hover:text-primary block">Invoice</Link></li>
                        <li><Link href="/pages/faq" className="text-gray-600 hover:text-primary block">FAQ</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 lg:gap-4">
            {/* Mobile Search Button */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Desktop Only Items */}
            <div className="hidden lg:flex items-center gap-4">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Notifications */}
            <div ref={notificationMenuRef} className="relative">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={toggleNotificationMenu}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              </button>

              {menuStates.notificationMenu && (
                <div className="absolute right-0 mt-2 w-[280px] lg:w-[320px] bg-white rounded-lg shadow-lg border">
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
                className="flex items-center gap-2 p-1 lg:p-0"
                onClick={() => setMenuStates(prev => ({
                  ...prev,
                  profileMenu: !prev.profileMenu,
                }))}
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
                  <ChevronDown className={`h-4 w-4 transition-transform ${menuStates.profileMenu ? "rotate-180" : ""}`} />
                </div>
              </button>

              {menuStates.profileMenu && (
                <div 
                  role="menu"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setMenuStates(prev => ({ ...prev, profileMenu: false }));
                  }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1"
                >
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
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuStates.mobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl overflow-y-auto">
              {/* Mobile Menu Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center" onClick={handleMobileMenuToggle}>
                    <Image 
                      src="/images/logo.png" 
                      alt="Skote" 
                      width={100} 
                      height={30}
                    />
                  </Link>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    onClick={handleMobileMenuToggle}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {/* Mobile Search */}
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* SubHeader for mobile menu */}
              <SubHeader showMobileMenu={true} isMobileView={true} />
            </div>
          </div>
        )}
      </header>
    </ErrorBoundary>
  );
};

export default memo(Header);
