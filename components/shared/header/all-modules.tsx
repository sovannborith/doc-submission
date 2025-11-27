import { LayoutGridIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { allModules } from "@/app/(home)/_data/all-modules";
import Link from "next/link";

export default function AllModules() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-[60px] h-[60px] flex items-center cursor-pointer justify-center rounded-full border border-border/50 bg-muted p-4 hover:bg-accent transition-all duration-300">
          <LayoutGridIcon className="h-5 w-5 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[95%] md:w-[450px] md:max-w-[450px] rounded-2xl border border-border/60 bg-background p-4 shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">Modules Available</p>
        </div>
        <div className="grid grid-cols-3 gap-3 ">
          {allModules.map((module) => (
            <Link
              key={module.id}
              href={module.link}
              className="group flex flex-col items-center justify-center gap-1 rounded-2xl border border-border/60 bg-muted px-3 py-3 text-center text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary/5"
            >
              <module.icon className="h-5 w-5 text-primary transition group-hover:scale-110" />
              <span className="text-wrap">{module.title}</span>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
