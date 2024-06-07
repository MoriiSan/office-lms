"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { BsRocketTakeoffFill } from "react-icons/bs";
import MenuItems from "./MenuItems";
import { useSession } from "next-auth/react";
import { useSidebar } from "../context/SidebarContext";

{
  /* I need to put the Sidebar component inside a div in order for its sticky position to work */
}

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`sidebar-component sticky top-[88px] group flex flex-col justify-start ${
        isCollapsed ? "min-w-[80px] " : "min-w-[260px]"
      } bg-[#F8F7F4] text-[#071e22] transition-all duration-100`}
    >
      <Link href="/profile" className="mx-4 pb-4 border-b border-[#e7e4da]">
        <div
          className={`profile-component border-box min-h-[40px] flex items-center p-2 rounded text-[#071e22] bg-[#]`}
        >
          <div className="icon-component flex justify-center items-center p-1 px-1.5 bg-[#071e22] text-white font-bold rounded">
            JD
          </div>
          {!isCollapsed && (
            <>
              <div
                className={`user-details overflow-hidden ml-2 transition-all  ${
                  isCollapsed ? "w-0" : "w-full"
                } `}
              >
                <div className="font-semibold text-xs">
                  {session?.user?.name}
                </div>
                <div className="text-xs">{session?.user?.email}</div>
              </div>
            </>
          )}
        </div>
      </Link>
      <div className="flex flex-col justify-between mx-4 py-4 h-[76vh]">
        <div className="flex flex-col gap-1 text-md font-normal text-[#071e22]">
          {/* menu label */}
          <div
            className={`flex ${
              isCollapsed ? "justify-center" : "justify-between"
            } items-center text-xs text-gray-500 font-semibold`}
          >
            <div>{isCollapsed ? "" : "Menu"}</div>
            <button
              className="text-[#887d5957]  hover:text-[#887d59] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={toggleSidebar}
            >
              {isCollapsed ? (
                <GoSidebarCollapse size={16} />
              ) : (
                <GoSidebarExpand size={16} />
              )}
            </button>
          </div>

          {/* menu items */}
          {MenuItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <ul
                className={`${
                  pathname === item.href
                    ? "active bg-[#071e22] text-[#F8F7F4] hover:text-[#fac105] font-medium"
                    : "hover:bg-[#071e2218] text-gray-700 font-medium hover:text-[#4014e4]"
                } relative h-[40px] flex cursor-pointer rounded text-sm transition-colors`}
              >
                <div
                  className={`flex flex-grow flex-row py-2.5 px-3.5 ${
                    isCollapsed ? "" : "justify-start"
                  }  items-center`}
                >
                  <span className="relative h-5 w-5 flex justify-center items-center">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <p className="relative ms-2">{item.label}</p>
                  )}
                </div>
              </ul>
            </Link>
          ))}
        </div>
        {/* premium component */}
        <div className="flex flex-col rounded-md p-4 border-[#071e22] bg-[#e7e4da] hover:bg-[#fac105]">
          {isCollapsed ? (
            <>
              <span>
                <BsRocketTakeoffFill />
              </span>
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center text-md font-bold mb-2">
                <div>Upgrade to PRO</div>
                <span>
                  <BsRocketTakeoffFill />
                </span>
              </div>

              <div className="flex text-xs w-[254px]">
                Level up with practical skills. Dive into real projects,
                assessments, and certifications.
              </div>

              <button className="flex justify-center rounded-md mt-4 py-2 text-sm font-semibold bg-[#071e22] text-[#F8F7F4]">
                Upgrade
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
