"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SubHeader({ showMobileMenu = false, isMobileView = false }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeChildMenu, setActiveChildMenu] = useState(null);
  const [mobileActiveMenus, setMobileActiveMenus] = useState({
    level1: null,
    level2: null,
    level3: null,
    level4: null,
  });

  // Desktop menu handlers
  const handleMenuEnter = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleSubMenuEnter = (label) => {
    setActiveSubMenu(label);
  };

  const handleChildMenuEnter = (label) => {
    setActiveChildMenu(label);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
    setActiveSubMenu(null);
    setActiveChildMenu(null);
  };

  // Updated menu structure with child menus
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      items: [
        {
          label: "Analytics",
          items: [
            {
              label: "Overview",
              children: ["Daily", "Weekly", "Monthly"],
            },
            {
              label: "Real-time",
              children: ["Traffic", "Sales", "Users"],
            },
            {
              label: "Historical",
              children: ["Reports", "Exports", "Archives"],
            },
          ],
        },
        {
          label: "E-commerce",
          items: [
            {
              label: "Products",
              children: ["Catalog", "Inventory", "Categories"],
            },
            {
              label: "Sales",
              children: ["Orders", "Shipments", "Returns"],
            },
          ],
        },
      ],
    },
    {
      id: "apps",
      label: "Apps",
      icon: "📱",
      items: [
        {
          label: "Communication",
          items: [
            {
              label: "Email",
              children: ["Inbox", "Sent", "Drafts"],
            },
            {
              label: "Chat",
              children: ["Direct", "Groups", "Channels"],
            },
          ],
        },
        {
          label: "Project Management",
          items: [
            {
              label: "Tasks",
              children: ["My Tasks", "Team Tasks", "Calendar"],
            },
            {
              label: "Kanban",
              children: ["Boards", "Templates", "Archives"],
            },
          ],
        },
      ],
    },
  ];

  // Updated mobile menu click handler
  const handleMobileMenuClick = (level, value) => {
    setMobileActiveMenus(prev => {
      const newState = { ...prev };
      
      switch(level) {
      case "level1":
        newState.level1 = prev.level1 === value ? null : value;
        newState.level2 = null;
        newState.level3 = null;
        newState.level4 = null;
        break;
      case "level2":
        newState.level2 = prev.level2 === value ? null : value;
        newState.level3 = null;
        newState.level4 = null;
        break;
      case "level3":
        newState.level3 = prev.level3 === value ? null : value;
        newState.level4 = null;
        break;
      case "level4":
        newState.level4 = prev.level4 === value ? null : value;
        break;
      }
      return newState;
    });
  };

  // If it's mobile view, only show when showMobileMenu is true
  // If it's desktop view, always show
  // const shouldShow = isMobileView ? showMobileMenu : true;

  return (
    <div className={`w-full bg-primary text-white ${isMobileView ? "lg:hidden" : ""}`}>
      <div className="container-custom">
        {/* Desktop Navigation - Only show when not in mobile view */}
        {!isMobileView && (
          <nav className="hidden lg:block">
            <div className="flex">
              {menuItems.map((menu) => (
                <div
                  key={menu.id}
                  className="relative group"
                  onMouseEnter={() => handleMenuEnter(menu.id)}
                  onMouseLeave={handleMenuLeave}
                >
                  <button className="flex items-center gap-2 px-4 py-4 hover:bg-primary-dark">
                    <span>{menu.icon}</span>
                    <span>{menu.label}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {activeMenu === menu.id && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg text-gray-800">
                      {menu.items.map((subMenu) => (
                        <div
                          key={subMenu.label}
                          className="relative"
                          onMouseEnter={() => handleSubMenuEnter(subMenu.label)}
                        >
                          <button className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100">
                            <span>{subMenu.label}</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>

                          {activeSubMenu === subMenu.label && (
                            <div className="absolute top-0 left-full w-64 bg-white shadow-lg">
                              {subMenu.items.map((childMenu) => (
                                <div
                                  key={childMenu.label}
                                  className="relative"
                                  onMouseEnter={() => handleChildMenuEnter(childMenu.label)}
                                >
                                  <button className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100">
                                    <span>{childMenu.label}</span>
                                    <ChevronRight className="h-4 w-4" />
                                  </button>

                                  {activeChildMenu === childMenu.label && (
                                    <div className="absolute top-0 left-full w-64 bg-white shadow-lg">
                                      {childMenu.children.map((item) => (
                                        <Link
                                          key={item}
                                          href={`/${menu.id}/${subMenu.label.toLowerCase()}/${childMenu.label.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                          className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}

        {/* Mobile Navigation - Only show when in mobile view and showMobileMenu is true */}
        {isMobileView && showMobileMenu && (
          <nav className="lg:hidden">
            <div className="border-t border-primary/20">
              {menuItems.map((menu) => (
                <div key={menu.id} className="border-b border-primary/20">
                  {/* Level 1 */}
                  <button
                    className="flex items-center justify-between w-full px-4 py-3"
                    onClick={() => handleMobileMenuClick("level1", menu.id)}
                  >
                    <span className="flex items-center gap-2">
                      <span>{menu.icon}</span>
                      <span>{menu.label}</span>
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileActiveMenus.level1 === menu.id ? "rotate-180" : ""}`} />
                  </button>

                  {mobileActiveMenus.level1 === menu.id && (
                    <div className="bg-primary/10">
                      {menu.items.map((subMenu) => (
                        <div key={subMenu.label}>
                          {/* Level 2 */}
                          <button
                            className="flex items-center justify-between w-full px-6 py-2"
                            onClick={() => handleMobileMenuClick("level2", subMenu.label)}
                          >
                            <span>{subMenu.label}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileActiveMenus.level2 === subMenu.label ? "rotate-180" : ""}`} />
                          </button>

                          {mobileActiveMenus.level2 === subMenu.label && (
                            <div className="bg-primary/20">
                              {subMenu.items.map((childMenu) => (
                                <div key={childMenu.label}>
                                  {/* Level 3 */}
                                  <button
                                    className="flex items-center justify-between w-full px-8 py-2"
                                    onClick={() => handleMobileMenuClick("level3", childMenu.label)}
                                  >
                                    <span>{childMenu.label}</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileActiveMenus.level3 === childMenu.label ? "rotate-180" : ""}`} />
                                  </button>

                                  {mobileActiveMenus.level3 === childMenu.label && (
                                    <div className="bg-primary/30">
                                      {childMenu.children.map((item) => (
                                        <div key={item}>
                                          {/* Level 4 (Final Items) */}
                                          <button
                                            className="flex items-center justify-between w-full px-10 py-2"
                                            onClick={() => handleMobileMenuClick("level4", item)}
                                          >
                                            <span>{item}</span>
                                          </button>
                                          
                                          {mobileActiveMenus.level4 === item && (
                                            <Link
                                              href={`/${menu.id}/${subMenu.label.toLowerCase()}/${childMenu.label.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                              className="block px-12 py-2 bg-primary/40 hover:bg-primary/50"
                                            >
                                              Go to {item}
                                            </Link>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}




