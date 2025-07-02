"use client";

import { Activity, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";
import { useState } from "react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reports", label: "Reports" },
  { href: "/upload", label: "Upload" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { mutateAsync: logout, isPending: isLoading } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    route.push("/signin");
  };
  const route = useRouter();
  return (
    <nav className="bg-white shadow-sm border-b mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Health Report</h1>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={pathname === link.href ? "default" : "ghost"}
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button
              onClick={handleLogout}
              isLoading={isLoading}
              type="submit"
              variant="destructive"
              size="sm"
            >
              Logout
            </Button>
          </div>
          {/* Mobile nav */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="p-2"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Drawer/Popover */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end md:hidden">
          <div className="w-3/4 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col gap-4 animate-slide-in-right">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-gray-900">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-2xl">×</span>
              </Button>
            </div>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={pathname === link.href ? "default" : "ghost"}
                  size="lg"
                  className="w-full justify-start"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button
              onClick={async () => {
                await handleLogout();
                setMobileMenuOpen(false);
              }}
              isLoading={isLoading}
              type="submit"
              variant="destructive"
              size="lg"
              className="w-full justify-start mt-2"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.2s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </nav>
  );
}
