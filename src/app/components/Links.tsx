import React from "react";
import { RxDashboard } from "react-icons/rx";
import { PiBooksLight } from "react-icons/pi";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";

const MenuItems = [
  { label: "Dashboard", icon: <RxDashboard size={23} />, href: "/dashboard" },
  {
    label: "My Courses",
    icon: <PiBooksLight size={25} />,
    href: "/dashboard/mycourses",
  },
  {
    label: "Notifications",
    icon: <IoNotificationsOutline size={24} />,
    href: "/dashboard/notifications",
  },
  {
    label: "Settings",
    icon: <IoSettingsOutline size={24} />,
    href: "/dashboard/settings",
  },
];
export default MenuItems;
