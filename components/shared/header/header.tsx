import Logo from "@/components/shared/header/logo";
import AllModules from "@/components/shared/header/all-modules";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/shared/header/notification";
import UserProfile from "@/components/shared/header/user-profile";

export default function Header() {
  return (
    <div className="w-full min-w-full h-[100px] bg-background border-b sticky top-0 z-50 border-border shadow-sm">
      <div className="flex items-center justify-between md:justify-end h-full px-4 py-3">
        <SidebarTrigger className="md:hidden cursor-pointer text-primary" />
        <Logo />
        <div className="flex items-center gap-2">
          <Notification />
          <AllModules />
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
