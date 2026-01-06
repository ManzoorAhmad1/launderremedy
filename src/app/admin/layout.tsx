"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLogin, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Check if user is logged in
    if (!isLogin) {
      router.replace("/login");
      return;
    }
    
    // Check if user is admin or subadmin
    const isAdmin = user?.type === 'admin' || user?.type === 'subadmin' || user?.role === 'admin' || user?.email === 'admin@launderremedy.com';
    
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isLogin, user, router]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Admin Header */}
        <AdminHeader />
        
        <main className="p-4 mt-16 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
