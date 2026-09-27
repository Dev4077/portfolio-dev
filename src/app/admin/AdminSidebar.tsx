"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Code, Wrench, Briefcase, User, MessageSquare, LogOut, Terminal, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

const ADMIN_LINKS = [
  { name: "Dashboard", href: "/admin", exact: true, icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", exact: false, icon: Code },
  { name: "Skills", href: "/admin/skills", exact: false, icon: Wrench },
  { name: "Experience", href: "/admin/experience", exact: false, icon: Briefcase },
  { name: "About Me", href: "/admin/about", exact: false, icon: User },
  { name: "Education", href: "/admin/education", exact: false, icon: GraduationCap },
  { name: "Messages", href: "/admin/messages", exact: false, icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 glass-panel border-r border-white/5 flex flex-col h-auto md:h-screen md:sticky top-0 z-40">
      <div className="p-6 border-b border-white/5 flex items-center justify-between md:justify-start">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold font-mono text-lg tracking-tight">System<span className="text-primary">Admin</span></span>
        </div>
      </div>

      <nav className="p-4 space-y-2 flex-grow overflow-y-auto flex md:flex-col overflow-x-auto md:overflow-x-visible">
        {ADMIN_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = link.exact ? pathname === link.href : pathname?.startsWith(link.href);
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-mono text-sm whitespace-nowrap md:whitespace-normal ${
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/30 shadow-[inset_2px_0_0_0_hsl(var(--primary))]" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-mono text-sm"
          onClick={() => logoutAction()}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Terminate Session
        </Button>
      </div>
    </aside>
  );
}
