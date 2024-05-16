import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import MenuItems from "./Links";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sidebar-component flex flex-col flex-wrap w-[300px] min-w-[250px] border-r-[#071e22] bg-[#F8F7F4] text-[#071e22]">
      <Link href="/profile">
        <div className="profile-component cursor-pointer flex flex-col mx-4 my-0 px-4 py-2.5 rounded-md text-[#071e22] bg-[#e7e4da] border-[#071e22]">
          <div className="flex flex-row justify-between items-center gap-3">
            <FaUserCircle size={35} className="cursor-pointer text-[#071e22]" />
            <div className="flex flex-col items-start justify-center gap-1">
              <div className="text-sm font-bold">
                Jhenna Mariejoy Dela Torre
              </div>
              <div className="flex text-[11px] justify-center items-center font-normal rounded-xl px-2.5 py-0.5 bg-[#fac105] text-[#071e22]">
                Student
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col p-4 h-[78vh] justify-between">
        <div className="flex flex-col gap text-md font-normal text-[#071e22]">
          <div className="flex justify-between my-2 text-xs font-semibold">
            <div>MENU</div>
            <div className="text-[#887d59] cursor-pointer">
              <TbLayoutSidebarLeftCollapse size={16} />
            </div>
          </div>
          {MenuItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <div
                className={`${
                  pathname === item.href
                    ? "active bg-[#071e22] text-[#F8F7F4] hover:text-[#fac105] font-medium"
                    : "hover:bg-[#e7e4da] text-[#887d59] font-medium hover:text-[#4014e4]"
                } relative cursor-pointer flex mb-2 rounded-md text-sm`}
              >
                <div className="flex flex-1 py-3 px-6 justify-start items-center">
                  <span className="relative h-5 w-5 flex justify-center items-center">
                    {item.icon}
                  </span>
                  <p className="relative ms-2">{item.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col rounded-md p-4 border-[#071e22] bg-[#e7e4da] hover:bg-[#fac105]">
          <div className="flex gap-2 items-center text-md font-bold mb-2">
            <div>Upgrade to PRO</div>
            <div>
              <BsRocketTakeoffFill />
            </div>
          </div>
          <div className="text-xs">
            Level up with practical skills. Dive into real projects,
            assessments, and certifications.
          </div>
          <button className="flex w-full justify-center rounded-md mt-4 py-2 text-sm font-semibold bg-[#071e22] text-[#F8F7F4]">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
