"use client";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { documentFunctions } from "@/app/document-submission/_data/functions";
import SidebarLogo from "@/components/shared/sidebar-logo";
import { usePathname } from "next/navigation";

export default function DocumentSubmissionSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    // Only close sidebar on mobile, keep it open on desktop (md screens)
    if (isMobile) {
      setOpenMobile(false);
    }
    // On desktop (md screens), don't close the sidebar
  };
  return (
    <Sidebar collapsible="icon" className="bg-background">
      <SidebarHeader className="flex h-[100px] items-center justify-between gap-4">
        <div className="flex w-full h-full items-center justify-between  gap-1">
          <SidebarLogo />
          <SidebarTrigger className="rounded-lg cursor-pointer text-primary" />
        </div>
      </SidebarHeader>
      <SidebarSeparator className="-ml-px -mt-px" />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Workflows</SidebarGroupLabel> */}
          <SidebarMenu>
            {documentFunctions.map((fn) => (
              <SidebarMenuItem key={fn.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={fn.description}
                  className="rounded-xl hover:rounded-sm focus:rounded-sm focus-visible:rounded-sm"
                  isActive={pathname === fn.href}
                >
                  <Link
                    href={fn.href}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:rounded-sm focus:rounded-sm focus-visible:rounded-sm"
                    onClick={handleLinkClick}
                  >
                    <fn.icon className="h-4 w-4 text-primary" />
                    <span>{fn.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarSeparator />
      <SidebarFooter className="flex flex-col gap-1 px-5 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Support
        </p>
        <SidebarMenuButton asChild size="default" variant="outline">
          <Link href="/document-submission/help" className="w-full">
            Request Assistance
          </Link>
        </SidebarMenuButton>
      </SidebarFooter> */}
    </Sidebar>
  );
}
