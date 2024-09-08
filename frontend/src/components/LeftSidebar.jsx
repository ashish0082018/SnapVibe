import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sidebar items array
const sidebarItems = [
  { icon: <Home />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <TrendingUp />, text: "Explore" },
  { icon: <MessageCircle />, text: "Messages" },
  { icon: <Heart />, text: "Notifications" },
  { icon: <PlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className="w-6 h-6 rounded-full overflow-hidden">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icon: <LogOut />, text: "Logout" },
];

function LeftSidebar() {
  const navigate = useNavigate();

  // Logout handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Sidebar item click handler
  const sidebarHandler = (textType) => {
    if (textType === "Logout") logoutHandler();
  };

  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col gap-1 h-screen bg-white border-r border-gray-300 w-16 md:w-64 lg:w-72 xl:w-80">
      <h1 className="text-center my-8 pt-2 font-bold text-xl">LOGO</h1>

      {sidebarItems.map((item, index) => (
        <div
          onClick={() => sidebarHandler(item.text)}
          key={index}
          className="flex items-center gap-4 px-4 md:px-1 lg:px-8 py-4 font-semibold relative hover:bg-gray-100 cursor-pointer rounded-lg"
        >
          {item.icon}
          <span className="hidden md:inline ">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default LeftSidebar;
