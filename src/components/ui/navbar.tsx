"use client";

import { Activity } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reports", label: "Reports" },
  { href: "/upload", label: "Upload" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { mutateAsync: logout, isPending: isLoading } = useLogout();

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
          <div className="flex space-x-2">
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
        </div>
      </div>
    </nav>
  );
}
