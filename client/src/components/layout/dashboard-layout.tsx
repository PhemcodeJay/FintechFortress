import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Bell, 
  Search, 
  Menu,
  LogOut,
  User,
  Settings,
  ChevronDown
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Wallet, label: "Banking", href: "/dashboard/banking" },
    { icon: CreditCard, label: "Cards", href: "/dashboard/cards" },
    { icon: TrendingUp, label: "Investments", href: "/dashboard/investments" },
    { icon: Shield, label: "Insurance", href: "/dashboard/insurance" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-display font-bold tracking-tight">Neobank</span>
      </div>

      <div className="flex-1 px-4 py-6 space-y-1">
        <div className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider px-2 mb-4">Main Menu</div>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div 
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group cursor-pointer
                ${location === item.href 
                  ? "bg-sidebar-primary/10 text-sidebar-primary font-medium" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"}
              `}
            >
              <item.icon className={`w-5 h-5 ${location === item.href ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground"}`} />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Metal Plan</span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Active</span>
          </div>
          <div className="w-full bg-background/50 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-primary w-3/4 h-full rounded-full" />
          </div>
          <p className="text-xs text-muted-foreground">Upgrade to unlock AI trading signals.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 fixed inset-y-0 z-50">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md border-border/50">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4 lg:hidden">
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="-ml-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 border-r border-sidebar-border">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              <span className="font-display font-bold text-lg">Neobank</span>
            </div>

            <div className="flex-1 hidden lg:flex items-center max-w-md ml-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search transactions, stocks, or help..." 
                  className="w-full bg-muted/50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="pl-2 pr-1 gap-2 h-10 hover:bg-accent/10 rounded-full">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start text-sm">
                      <span className="font-medium leading-none">{user?.name || "User"}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
