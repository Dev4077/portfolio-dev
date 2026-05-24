import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { isAuthenticated, removeToken } from "@/lib/auth";
import { LayoutDashboard, Code, Wrench, Briefcase, User, MessageSquare, LogOut, Terminal, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Projects", href: "/admin/projects", icon: Code, exact: false },
  { name: "Skills", href: "/admin/skills", icon: Wrench, exact: false },
  { name: "Experience", href: "/admin/experience", icon: Briefcase, exact: false },
  { name: "About Me", href: "/admin/about", icon: User, exact: false },
  { name: "Education", href: "/admin/education", icon: GraduationCap, exact: false },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare, exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation("/admin/login");
    }
  }, [location, setLocation]);

  const handleLogout = () => {
    removeToken();
    setLocation("/admin/login");
  };

  if (!isAuthenticated()) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
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
            const isActive = link.exact ? location === link.href : location.startsWith(link.href);
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-mono text-sm whitespace-nowrap md:whitespace-normal ${
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/30 shadow-[inset_2px_0_0_0_hsl(var(--primary))]" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent"
                }`}
                data-testid={`link-admin-nav-${link.name.toLowerCase()}`}
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
            onClick={handleLogout}
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Terminate Session
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden relative">
        <div className="absolute inset-0 pixel-grid opacity-30 z-0 pointer-events-none fixed"></div>
        <div className="p-4 md:p-8 relative z-10 w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
