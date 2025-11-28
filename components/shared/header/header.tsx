"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/shared/header/logo";
import AllModules from "@/components/shared/header/all-modules";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/shared/header/notification";
import UserProfile from "@/components/shared/header/user-profile";
import { cn } from "@/lib/utils";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={cn(
        "w-full h-[100px] max-h-[100px] border-b fixed top-0 right-0 z-99 border-border shadow-sm transition-all duration-300",
        isScrolled ? "bg-background/10 backdrop-blur-sm" : "bg-background"
      )}
    >
      <div className="flex items-center justify-between h-full px-2 md:px-4 py-3 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <SidebarTrigger className="cursor-pointer text-primary" />
          <Logo />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Notification />
          <AllModules />
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
