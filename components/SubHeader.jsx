"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { BsCollection } from "react-icons/bs";
import { BiHomeCircle, BiCog } from "react-icons/bi";

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

  // Updated menu handlers
  const handleMenuEnter = (menuId) => {
    setActiveMenu(menuId);
    // Reset other menu states
    setActiveSubMenu(null);
    setActiveChildMenu(null);
  };

  const handleSubMenuEnter = (label) => {
    setActiveSubMenu(label);
    // Reset child menu state
    setActiveChildMenu(null);
  };

  const handleChildMenuEnter = (label) => {
    setActiveChildMenu(label);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
    setActiveSubMenu(null);
    setActiveChildMenu(null);
  };

  // Updated menu structure with URLs
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BiHomeCircle/>,
      url: "/dashboard", // URL only because no children
    },
    {
      id: "Profile",
      label: "Profile",
      icon: <BsCollection/>,
      items: [
        {
          label: "Profile",
          items: [
            {
              label: "Active",
              items: [
                {
                  label: "Critical",
                  url: "/bugs/projects/active/critical",
                },
                {
                  label: "High",
                  url: "/bugs/projects/active/high",
                },
                {
                  label: "Medium",
                  url: "/bugs/projects/active/medium",
                },
              ],
            },
            {
              label: "viewProfile",
              url: "/profile",
            },
            {
              label: "EditProfile",
              url: "/profile/editProfile",
            },
          ],
        },
        {
          label: "My Assignments",
          url: "/bugs/my-assignments",
        },
        {
          label: "Reports",
          items: [
            {
              label: "Analytics",
              url: "/bugs/reports/analytics",
            },
            {
              label: "Statistics",
              url: "/bugs/reports/statistics",
            },
          ],
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <BiCog/>,
      items: [
        {
          label: "Project Settings",
          items: [
            {
              label: "Workflows",
              url: "/settings/project/workflows",
            },
            {
              label: "Labels",
              url: "/settings/project/labels",
            },
            {
              label: "Templates",
              url: "/settings/project/templates",
            },
          ],
        },
        {
          label: "User Management",
          items: [
            {
              label: "Teams",
              url: "/settings/users/teams",
            },
            {
              label: "Permissions",
              url: "/settings/users/permissions",
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

  const renderDesktopMenuItem = (menu) => {
    const hasChildren = menu.items && menu.items.length > 0;
    
    const buttonContent = (
      <>
        <span>{menu.icon}</span>
        <span>{menu.label}</span>
        {hasChildren && <ChevronDown className="h-4 w-4" />}
      </>
    );

    return (
      <div
        key={menu.id}
        className="relative group"
        onMouseEnter={() => hasChildren && handleMenuEnter(menu.id)}
        onMouseLeave={handleMenuLeave}
      >
        {menu.url ? (
          <Link 
            href={menu.url}
            className="desktop-nav-button flex items-center gap-2 px-4 py-4 hover:bg-primary-dark"
            legacyBehavior={false}
          >
            {buttonContent}
          </Link>
        ) : (
          <button 
            className="desktop-nav-button flex items-center gap-2 px-4 py-4 hover:bg-primary-dark"
            aria-expanded={activeMenu === menu.id}
          >
            {buttonContent}
          </button>
        )}

        {hasChildren && activeMenu === menu.id && (
          <div className="absolute top-full left-0 w-64 bg-white shadow-lg text-gray-800">
            {menu.items.map((subMenu) => renderDesktopSubMenuItem(subMenu, menu))}
          </div>
        )}
      </div>
    );
  };

  const renderDesktopSubMenuItem = (subMenu, parentMenu) => {
    const hasChildren = subMenu.items && subMenu.items.length > 0;

    const buttonContent = (
      <>
        <span>{subMenu.label}</span>
        {hasChildren && <ChevronRight className="h-4 w-4" />}
      </>
    );

    return (
      <div
        key={subMenu.label}
        className="relative"
        onMouseEnter={() => {
          if (hasChildren) {
            handleSubMenuEnter(subMenu.label);
          } else {
            // If no children, clear subsequent menus
            setActiveSubMenu(null);
            setActiveChildMenu(null);
          }
        }}
      >
        {subMenu.url ? (
          <Link
            href={subMenu.url}
            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
            legacyBehavior={false}
          >
            {buttonContent}
          </Link>
        ) : (
          <button 
            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
          >
            {buttonContent}
          </button>
        )}

        {hasChildren && activeSubMenu === subMenu.label && (
          <div className="absolute top-0 left-full w-64 bg-white shadow-lg">
            {subMenu.items.map((childMenu) => renderDesktopChildMenuItem(childMenu, parentMenu, subMenu))}
          </div>
        )}
      </div>
    );
  };

  const renderDesktopChildMenuItem = (childMenu) => {
    const hasChildren = childMenu.items && childMenu.items.length > 0;

    const buttonContent = (
      <>
        <span>{childMenu.label}</span>
        {hasChildren && <ChevronRight className="h-4 w-4" />}
      </>
    );

    return (
      <div
        key={childMenu.label}
        className="relative"
        onMouseEnter={() => {
          if (hasChildren) {
            handleChildMenuEnter(childMenu.label);
          } else {
            // If no children, clear subsequent menus
            setActiveChildMenu(null);
          }
        }}
      >
        {childMenu.url ? (
          <Link
            href={childMenu.url}
            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
            legacyBehavior={false}
          >
            {buttonContent}
          </Link>
        ) : (
          <button 
            className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
          >
            {buttonContent}
          </button>
        )}

        {hasChildren && activeChildMenu === childMenu.label && (
          <div className="absolute top-0 left-full w-64 bg-white shadow-lg">
            {childMenu.items.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                className="block px-4 py-2 hover:bg-gray-100"
                legacyBehavior={false}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full bg-primary text-white ${isMobileView ? "lg:hidden" : ""}`}>
      <div className="container-custom">
        {/* Desktop Navigation - Only show when not in mobile view */}
        {!isMobileView && (
          <nav className="hidden lg:block">
            <div className="flex">
              {menuItems.map(renderDesktopMenuItem)}
            </div>
          </nav>
        )}

        {/* Mobile Navigation - Only show when in mobile view and showMobileMenu is true */}
        {isMobileView && showMobileMenu && (
          <nav className="lg:hidden">
            <div className="border-t border-primary/20">
              {menuItems.map((menu) => (
                <div key={menu.id} className="border-b border-primary/20">
                  {menu.url && !menu.items?.length ? (
                    <Link
                      href={menu.url}
                      className="flex items-center justify-between w-full px-4 py-3"
                    >
                      <span className="flex items-center gap-2">
                        <span>{menu.icon}</span>
                        <span>{menu.label}</span>
                      </span>
                    </Link>
                  ) : (
                    <>
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
                    </>
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




