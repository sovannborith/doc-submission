import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import imgProfile from "@/public/profile/borith.webp";
import { allModules } from "@/app/(home)/_data/all-modules";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full border border-border/50 cursor-pointer">
          <Avatar className="size-full">
            <AvatarImage
              src={imgProfile.src}
              alt="User"
              className="object-cover"
            />
            <AvatarFallback>YS</AvatarFallback>
          </Avatar>
        </div>
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
