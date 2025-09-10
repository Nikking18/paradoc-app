"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "@/lib/hooks/useSession";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { DocumentsPage } from "@/components/dashboard/DocumentsPage";
import { ChatbotPage } from "@/components/dashboard/ChatbotPage";
import { SubscriptionPage } from "@/components/dashboard/SubscriptionPage";
import { useAppStore } from "@/lib/store";

function DashboardContent() {
  const { user, loading } = useSession();
  const router = useRouter();
  const { openLoginModal } = useAppStore();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (!loading && !user) {
      // User is not authenticated, redirect to login
      openLoginModal();
      router.push('/');
    }
  }, [user, loading, router, openLoginModal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="font-body text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <DashboardHome />;
      case 'documents':
        return <DocumentsPage />;
      case 'chatbot':
        return <ChatbotPage />;
      case 'subscription':
        return <SubscriptionPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default function Dashboard() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}
