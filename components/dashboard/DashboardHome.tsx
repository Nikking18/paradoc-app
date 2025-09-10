"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  MessageSquare, 
  CreditCard, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useSession } from "@/lib/hooks/useSession";

interface DashboardStats {
  documentsCount: number;
  subscriptionStatus: string;
  subscriptionPlan: string;
  trialEndsAt?: string;
  lastActivity?: string;
}

export function DashboardHome() {
  const { user } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    documentsCount: 0,
    subscriptionStatus: 'inactive',
    subscriptionPlan: 'free',
    trialEndsAt: undefined,
    lastActivity: undefined
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user profile and subscription data
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const userData = await response.json();
          setStats({
            documentsCount: userData.documentsCount || 0,
            subscriptionStatus: userData.subscription_status || 'inactive',
            subscriptionPlan: userData.role || 'free',
            trialEndsAt: userData.trial_ends_at,
            lastActivity: userData.last_activity
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getSubscriptionBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'trial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSubscriptionIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'trial':
        return <Clock className="h-4 w-4" />;
      case 'canceled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="font-body text-gray-600">
          Here&apos;s what&apos;s happening with your legal documents and AI assistant.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="hover-lift border-gray-200 bg-white shadow-premium hover:shadow-premium-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-body text-sm font-medium text-gray-600">
                Documents Created
              </CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-2xl font-bold">{stats.documentsCount}</div>
              <p className="font-body text-xs text-gray-500">
                Total legal documents
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="hover-lift border-gray-200 bg-white shadow-premium hover:shadow-premium-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-body text-sm font-medium text-gray-600">
                Subscription Plan
              </CardTitle>
              <CreditCard className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-2xl font-bold capitalize">
                {stats.subscriptionPlan}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={`text-xs ${getSubscriptionBadgeColor(stats.subscriptionStatus)}`}>
                  {getSubscriptionIcon(stats.subscriptionStatus)}
                  <span className="ml-1 capitalize">{stats.subscriptionStatus}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="hover-lift border-gray-200 bg-white shadow-premium hover:shadow-premium-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-body text-sm font-medium text-gray-600">
                AI Interactions
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-2xl font-bold">0</div>
              <p className="font-body text-xs text-gray-500">
                This month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="hover-lift border-gray-200 bg-white shadow-premium hover:shadow-premium-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-body text-sm font-medium text-gray-600">
                Usage Trend
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-2xl font-bold text-green-600">+12%</div>
              <p className="font-body text-xs text-gray-500">
                From last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-gray-200 bg-white shadow-premium">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-bold">Quick Actions</CardTitle>
              <CardDescription className="font-body text-gray-600">
                Get started with common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full justify-start bg-black text-white hover:bg-gray-800 font-body">
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Document
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 font-body">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Button>
              </motion.div>
              {stats.subscriptionStatus === 'inactive' && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 font-body">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Upgrade Subscription
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-gray-200 bg-white shadow-premium">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-bold">Recent Activity</CardTitle>
              <CardDescription className="font-body text-gray-600">
                Your latest document activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.documentsCount === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="font-body text-gray-500 mb-4">No documents created yet</p>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-black text-white hover:bg-gray-800 font-body">
                      Create Your First Document
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-body text-sm text-gray-900">Document created</p>
                      <p className="font-body text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Trial Notice */}
      {stats.subscriptionStatus === 'trial' && stats.trialEndsAt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-blue-900">
                    Free Trial Active
                  </h3>
                  <p className="font-body text-blue-700">
                    Your trial ends on {new Date(stats.trialEndsAt).toLocaleDateString()}. 
                    Upgrade now to continue using all features.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 font-body">
                    Upgrade Now
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
