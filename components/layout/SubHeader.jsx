"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BiHomeCircle, BiCog, BiEdit } from "react-icons/bi";
import { BsCollection } from "react-icons/bs";

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

  // Updated menu structure with 3 levels of navigation
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BiHomeCircle />,
      url: "/dashboard",
    },
    {
      id: "data-management",
      label: "Data Management",
      icon: <BsCollection />,
      items: [
        {
          label: "Products",
          url: "/products",
          items: [
            {
              label: "All Products",
              url: "/products/all",
            },
            {
              label: "Categories",
              url: "/products/categories",
            },
            {
              label: "Inventory",
              url: "/products/inventory",
            },
          ],
        },
        {
          label: "Users",
          items: [
            {
              label: "All Users",
              url: "/users/all",
            },
            {
              label: "Roles",
              url: "/users/roles",
            },
            {
              label: "Permissions",
              url: "/users/permissions",
            },
          ],
        },
        {
          label: "Orders",
          url: "/orders",
          items: [
            {
              label: "Recent Orders",
              url: "/orders/recent",
            },
            {
              label: "Returns",
              url: "/orders/returns",
            },
          ],
        },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BiEdit />,
      items: [
        {
          label: "Sales",
          items: [
            {
              label: "Daily Sales",
              url: "/reports/sales/daily",
            },
            {
              label: "Monthly Sales",
              url: "/reports/sales/monthly",
            },
            {
              label: "Yearly Sales",
              url: "/reports/sales/yearly",
            },
          ],
        },
        {
          label: "Inventory",
          items: [
            {
              label: "Stock Levels",
              url: "/reports/inventory/stock",
            },
            {
              label: "Low Stock",
              url: "/reports/inventory/low-stock",
            },
          ],
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <BiCog />,
      items: [
        {
          label: "General",
          items: [
            {
              label: "Site Settings",
              url: "/settings/general/site",
            },
            {
              label: "Theme",
              url: "/settings/general/theme",
            },
          ],
        },
        {
          label: "Security",
          items: [
            {
              label: "Password Policy",
              url: "/settings/security/password",
            },
            {
              label: "Two-Factor Auth",
              url: "/settings/security/2fa",
            },
          ],
        },
        {
          label: "Notifications",
          items: [
            {
              label: "Email Notifications",
              url: "/settings/notifications/email",
            },
            {
              label: "Push Notifications",
              url: "/settings/notifications/push",
            },
          ],
        },
      ],
    },
  ];

  // Updated mobile menu click handler
  const handleMobileMenuClick = (level, value) => {
    setMobileActiveMenus((prev) => {
      const newState = { ...prev };

      switch (level) {
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
    if (!menu) return null;
    const hasChildren = menu.items && Array.isArray(menu.items) && menu.items.length > 0;

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
    if (!subMenu) return null;

    const hasChildren = subMenu.items && Array.isArray(subMenu.items) && subMenu.items.length > 0;

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
          >
            {buttonContent}
          </Link>
        ) : (
          <button className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100">
            {buttonContent}
          </button>
        )}

        {hasChildren && activeSubMenu === subMenu.label && (
          <div className="absolute top-0 left-full w-64 bg-white shadow-lg">
            {subMenu.items.map((childMenu) =>
              renderDesktopChildMenuItem(childMenu, parentMenu, subMenu),
            )}
          </div>
        )}
      </div>
    );
  };

  const renderDesktopChildMenuItem = (childMenu) => {
    if (!childMenu) return null;
    const hasChildren =
      childMenu.items && Array.isArray(childMenu.items) && childMenu.items.length > 0;

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
          >
            {buttonContent}
          </Link>
        ) : (
          <button className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100">
            {buttonContent}
          </button>
        )}

        {hasChildren && activeChildMenu === childMenu.label && (
          <div className="absolute top-0 left-full w-64 bg-white shadow-lg">
            {childMenu.items.map((item) => (
              <Link key={item.label} href={item.url} className="block px-4 py-2 hover:bg-gray-100">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMenuItems = () => {
    try {
      if (!Array.isArray(menuItems)) {
        console.error("menuItems is not an array");
        return null;
      }
      return menuItems.map((menu) => renderDesktopMenuItem(menu));
    } catch (error) {
      console.error("Error rendering menu items:", error);
      return null;
    }
  };

  // Safe render function for mobile menu items
  const renderMobileMenuItems = () => {
    try {
      if (!Array.isArray(menuItems) || menuItems.length === 0) {
        return <div className="px-4 py-3 text-sm text-gray-300">No menu items available</div>;
      }

      return menuItems.map((menu) => {
        if (!menu) return null;

        const hasItems = Array.isArray(menu.items) && menu.items.length > 0;
        const isActive = mobileActiveMenus.level1 === menu.id;

        return (
          <div
            key={menu.id || Math.random().toString(36).substr(2, 9)}
            className="border-b border-primary/20"
          >
            {menu.url && !hasItems ? (
              <Link href={menu.url} className="flex items-center justify-between w-full px-4 py-3">
                <span className="flex items-center gap-2">
                  {menu.icon && <span>{menu.icon}</span>}
                  <span>{menu.label || "Unnamed Item"}</span>
                </span>
              </Link>
            ) : (
              <>
                <button
                  className="flex items-center justify-between w-full px-4 py-3"
                  onClick={() => handleMobileMenuClick("level1", menu.id)}
                >
                  <span className="flex items-center gap-2">
                    {menu.icon && <span>{menu.icon}</span>}
                    <span>{menu.label || "Unnamed Item"}</span>
                  </span>
                  {hasItems && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isActive ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {isActive && hasItems && (
                  <div className="bg-primary/10">{renderMobileSubMenuItems(menu.items, 2)}</div>
                )}
              </>
            )}
          </div>
        );
      });
    } catch (error) {
      console.error("Error rendering mobile menu:", error);
      return (
        <div className="px-4 py-3 text-sm text-red-300">
          Error loading menu. Please try again later.
        </div>
      );
    }
  };

  // Recursive function to render submenu items
  const renderMobileSubMenuItems = (items, level) => {
    if (!Array.isArray(items) || items.length === 0) return null;

    return items.map((item, index) => {
      if (!item) return null;

      const hasChildren = Array.isArray(item.items) && item.items.length > 0;
      const isActive = mobileActiveMenus[`level${level}`] === item.label;
      const nextLevel = level + 1;
      const paddingLeft = 4 + (level - 1) * 2; // Increase padding for each level

      return (
        <div key={`${item.label || "item"}-${index}`}>
          <button
            className={`flex items-center justify-between w-full px-${paddingLeft} py-2`}
            onClick={() => handleMobileMenuClick(`level${level}`, item.label)}
          >
            <span>{item.label || "Unnamed Item"}</span>
            {hasChildren && (
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isActive ? "rotate-180" : ""}`}
              />
            )}
          </button>

          {isActive && hasChildren && (
            <div className={`bg-primary/${10 * level}`}>
              {renderMobileSubMenuItems(item.items, nextLevel)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={`w-full bg-primary text-white ${isMobileView ? "lg:hidden" : ""}`}>
      <div className="container-custom">
        {/* Desktop Navigation - Only show when not in mobile view */}
        {!isMobileView && (
          <nav className="hidden lg:block">
            <div className="flex">{renderMenuItems()}</div>
          </nav>
        )}

        {/* Mobile Navigation - Only show when in mobile view and showMobileMenu is true */}
        {isMobileView && showMobileMenu && (
          <nav className="lg:hidden">
            <div className="border-t border-primary/20">{renderMobileMenuItems()}</div>
          </nav>
        )}
      </div>
    </div>
  );
}
