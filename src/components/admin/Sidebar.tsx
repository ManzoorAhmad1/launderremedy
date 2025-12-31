"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    CreditCard,
    BarChart3,
    Settings,
    Menu,
    X,
    LogOut,
    ChevronRight,
    User,
    FileText,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { logOutUser } from "@/lib/features/userSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "../../../public/logo-02.png";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface SidebarItem {
    id: string;
    title: string;
    href: string;
    icon: React.ReactNode;
    permission?: string; // Permission key required to view this item
}

const sidebarItems: SidebarItem[] = [
    {
        id: "dashboard",
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
        // Dashboard is always visible
    },
    {
        id: "users",
        title: "Users",
        href: "/admin/users",
        icon: <Users className="h-5 w-5" />,
        permission: "users",
    },
    {
        id: "subadmins",
        title: "Sub-Admins",
        href: "/admin/subadmins",
        icon: <Shield className="h-5 w-5" />,
        // Only admins can see sub-admins, handled separately
    },
    {
        id: "services",
        title: "Services",
        href: "/admin/services",
        icon: <Package className="h-5 w-5" />,
        permission: "services",
    },
    {
        id: "orders",
        title: "Orders",
        href: "/admin/orders",
        icon: <ShoppingCart className="h-5 w-5" />,
        permission: "orders",
    },
    {
        id: "payments",
        title: "Payments",
        href: "/admin/payments",
        icon: <CreditCard className="h-5 w-5" />,
        permission: "payments",
    },
    {
        id: "blogs",
        title: "Blogs",
        href: "/admin/blogs",
        icon: <FileText className="h-5 w-5" />,
        permission: "blogs",
    },
    {
        id: "reports",
        title: "Reports",
        href: "/admin/reports",
        icon: <BarChart3 className="h-5 w-5" />,
        permission: "reports",
    },
    {
        id: "settings",
        title: "Settings",
        href: "/admin/settings",
        icon: <Settings className="h-5 w-5" />,
        permission: "settings",
    },
];

export default function AdminSidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const { theme, setTheme } = useTheme();

    const handleLogout = () => {
        if (user?._id) {
            dispatch(logOutUser(user._id) as any);
            toast.success("Logged out successfully");
            router.push("/");
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-md hover:bg-muted transition-colors"
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-screen w-64 
          bg-background dark:bg-card border-r border-border shadow-xl lg:shadow-none
          transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
            >
                <div className="flex flex-col h-full min-h-0">
                    {/* Logo & Theme Toggle */}
                    <div className="p-4 border-b border-border flex-shrink-0">
                        <div className="flex items-center justify-between gap-2 mb-4">
                            <Link href="/admin/dashboard" className="flex-1">
                                <Image
                                    src={logo}
                                    alt="Launder Remedy"
                                    width={160}
                                    height={36}
                                    className="h-7 w-auto"
                                    priority
                                />
                            </Link>
                            <Link href="/">
                                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 flex-shrink-0" title="Go to Home">
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-full h-9 w-9 flex-shrink-0"
                                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                {theme === "dark" ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {/* User Info */}
                        <div className="flex items-center gap-2">
                            <div className="h-9 w-9 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                                    {user?.first_name?.[0] || "A"}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xs font-semibold text-foreground truncate">
                                    {user?.first_name} {user?.last_name}
                                </h3>
                                <p className="text-[10px] text-muted-foreground truncate">
                                    {user?.type === 'admin' ? 'Administrator' : 'Sub-Admin'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-3 sm:p-4">
                        <ul className="space-y-1">
                            {sidebarItems.map((item) => {
                                // Check permissions for sub-admins
                                const isAdmin = user?.type === 'admin';
                                const hasPermission = !item.permission || 
                                    isAdmin || 
                                    (user?.permissions && user.permissions.includes(item.permission));
                                
                                // Sub-admins page only for admins
                                if (item.id === 'subadmins' && !isAdmin) {
                                    return null;
                                }
                                
                                // Hide if no permission
                                if (!hasPermission) {
                                    return null;
                                }
                                
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.id}>
                                        <Link
                                            href={item.href}
                                            onClick={closeMobileMenu}
                                            className={`
                        flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2.5 rounded-lg text-sm font-medium
                        transition-all duration-200 group
                        ${isActive
                                                    ? "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                }
                      `}
                                        >
                                            <span
                                                className={`flex-shrink-0
                        ${isActive
                                                        ? "text-primary-700 dark:text-primary-300"
                                                        : "text-muted-foreground group-hover:text-foreground"
                                                    }
                      `}
                                            >
                                                {item.icon}
                                            </span>
                                            <span className="flex-1 truncate">{item.title}</span>
                                            {isActive && (
                                                <ChevronRight className="h-4 w-4 text-primary-700 dark:text-primary-300 flex-shrink-0" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-3 sm:p-4 border-t border-border flex-shrink-0">
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2.5 sm:gap-3 text-sm"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
