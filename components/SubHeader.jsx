"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SubHeader() {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      items: ["Default", "Saas", "Crypto", "Blog"],
    },
    {
      id: "ui-elements",
      label: "UI Elements",
      icon: "🎨",
      items: ["Alerts", "Buttons", "Cards", "Carousel", "Dropdowns", "Grid"],
    },
    {
      id: "apps",
      label: "Apps",
      icon: "📱",
      items: ["Calendar", "Chat", "Email", "Projects", "Tasks"],
    },
    {
      id: "components",
      label: "Components",
      icon: "🧩",
      items: ["Forms", "Tables", "Charts", "Maps"],
    },
    {
      id: "extra-pages",
      label: "Extra pages",
      icon: "📄",
      items: ["Login", "Register", "Forgot Password", "404 Error"],
    },
  ];

  return (
    <div className="w-full bg-[#556ee6] text-white">
      <div className="container-custom">
        <nav className="flex items-center h-12">
          {menuItems.map((menu) => (
            <div
              key={menu.id}
              className="relative"
              onMouseEnter={() => setActiveMenu(menu.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1 px-4 h-12 hover:bg-[#4458b8] transition-colors">
                <span>{menu.icon}</span>
                <span>{menu.label}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeMenu === menu.id && (
                <div className="absolute top-12 left-0 w-48 bg-white shadow-lg rounded-b-lg overflow-hidden z-50">
                  {menu.items.map((item) => (
                    <Link
                      key={item}
                      href={`/${menu.id}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#556ee6] transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

