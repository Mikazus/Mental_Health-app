"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, CalendarCheck, LogOut, Users, Activity } from "lucide-react";
import { signOut } from "next-auth/react";

const studentNav = [
  { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/screening", label: "Screening", icon: Activity },
  { href: "/student/journal", label: "Journal", icon: FileText },
  { href: "/student/appointments", label: "Appointments", icon: CalendarCheck },
];

const counselorNav = [
  { href: "/counselor/dashboard", label: "Priority Queue", icon: Activity },
  { href: "/counselor/students", label: "My Students", icon: Users },
  { href: "/counselor/schedule", label: "Schedule", icon: CalendarCheck },
];

export function DashboardLayout({ children, role = "STUDENT" }: { children: React.ReactNode, role?: "STUDENT" | "COUNSELOR" | "ADMIN" }) {
  const pathname = usePathname();
  const navItems = role === "COUNSELOR" ? counselorNav : studentNav;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-md">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Image src="/img/logo.png" alt="Kicawcare logo" width={24} height={24} className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight">Kicawcare</span>
          </Link>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-border/50">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
