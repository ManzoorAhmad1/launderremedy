"use client";

import React from "react";
import Link from "next/link";
import { Sun, Moon, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { logOutUser } from "@/lib/features/userSlice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../../public/logo-02.png";
import toast from "react-hot-toast";

export default function AdminHeader() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
        toast.success("Logged out successfully");
    };

    if (!mounted) {
        return (
            <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
                <div className="h-16 px-3 sm:px-4 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 flex-shrink-0">
                        <Image
                            src={logo}
                            alt="Launder Remedy"
                            width={180}
                            height={40}
                            className="h-6 sm:h-7 md:h-8 w-auto"
                            priority
                        />
                    </Link>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-9 w-9 sm:h-10 sm:w-10"></div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
            <div className="h-16 px-3 sm:px-4 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
                {/* Logo - Left Side */}
                <Link href="/admin/dashboard" className="flex items-center gap-2 flex-shrink-0">
                    <Image
                        src={logo}
                        alt="Launder Remedy"
                        width={180}
                        height={40}
                        className="h-6 sm:h-7 md:h-8 w-auto"
                        priority
                    />
                </Link>
                {/* Right Side - Theme Toggle & Logout */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {theme === "dark" ? (
                            <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                            <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                    </Button>
                 
                    {/* User Info */}
                    {user && (
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-xs md:text-sm">
                                {user.first_name?.[0] || user.email?.[0]?.toUpperCase() || "A"}
                            </div>
                            <div className="text-sm hidden md:block">
                                <p className="font-medium text-foreground leading-none">
                                    {user.first_name || "Admin"}
                                </p>
                                <p className="text-xs text-muted-foreground">Administrator</p>
                            </div>
                        </div>
                    )}

                    {/* Logout Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                        <LogOut className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
