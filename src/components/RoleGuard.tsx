"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export default function RoleGuard({ children, requiredRole }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogin, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isLogin) {
      return; // Let other guards handle login redirect
    }

    const isAdmin = user?.type === 'admin' || user?.role === 'admin' || user?.email === 'admin@launderremedy.com';

    // If user is admin and trying to access user-only pages (not login/signup)
    if (isAdmin && requiredRole === 'user' && !pathname.startsWith('/admin')) {
      // Allow only auth pages for admin
      const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password');
      
      if (!isAuthPage && pathname !== '/') {
        router.replace('/admin/dashboard');
      }
    }

    // If user is regular user and trying to access admin pages
    if (!isAdmin && requiredRole === 'admin') {
      router.replace('/');
    }
  }, [isLogin, user, pathname, requiredRole, router]);

  return <>{children}</>;
}
