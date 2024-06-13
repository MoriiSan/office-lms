import React from "react";
import { RxDashboard } from "react-icons/rx";
import { PiBooksLight } from "react-icons/pi";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";

const MenuItems = [
  { label: "Dashboard", icon: <RxDashboard size={20} />, href: "/dashboard", testid: "" },
  {
    label: "My Courses",
    icon: <PiBooksLight size={20} />,
    href: "/mycourses",
    testid: "" 
  },
  {
    label: "Notifications",
    icon: <IoNotificationsOutline size={20} />,
    href: "/notifications",
    testid: "" 
  },
  {
    label: "Settings",
    icon: <IoSettingsOutline size={20} />,
    href: "/settings",
    testid: "" 
  },
];
export default MenuItems;

