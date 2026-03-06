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
      return;
    }

    const isAdmin = user?.type === 'admin' || user?.type === 'subadmin' || user?.role === 'admin';

    // Admin on any user-side page → redirect to admin dashboard
    // (auth pages are allowed so they can logout and come back as a user)
    if (isAdmin && !pathname.startsWith('/admin')) {
      const isAuthPage =
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/reset-password');

      if (!isAuthPage) {
        router.replace('/admin/dashboard');
      }
    }

    // Regular user on admin pages → back to home
    if (!isAdmin && requiredRole === 'admin') {
      router.replace('/');
    }
  }, [isLogin, user, pathname, requiredRole, router]);

  return <>{children}</>;
}
