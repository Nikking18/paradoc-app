"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Check, 
  AlertCircle, 
  ExternalLink,
  Calendar,
  DollarSign,
  Shield,
  Zap
} from "lucide-react";
import { useAppStore, pricingData } from "@/lib/store";

interface SubscriptionData {
  status: string;
  plan: string;
  trialEndsAt?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  stripeCustomerId?: string;
}

export function SubscriptionPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { pricingPeriod, setPricingPeriod } = useAppStore();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (plan: 'pro' | 'enterprise') => {
    setActionLoading(plan);
    try {
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          period: pricingPeriod
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        const error = await response.json();
        console.error('Error creating subscription:', error);
      }
    } catch (error) {
      console.error('Error upgrading subscription:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleManageBilling = async () => {
    setActionLoading('billing');
    try {
      const response = await fetch('/api/subscription/portal', {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        }
      }
    } catch (error) {
      console.error('Error opening billing portal:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'trial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-gray-900">Subscription</h1>
        <p className="font-body text-gray-600 mt-1">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Subscription Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-gray-200 bg-white shadow-premium">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-bold flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-semibold capitalize">
                      {subscription.plan} Plan
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusBadgeColor(subscription.status)}>
                        {subscription.status === 'active' && <Check className="h-3 w-3 mr-1" />}
                        {subscription.status === 'trial' && <Calendar className="h-3 w-3 mr-1" />}
                        {subscription.status === 'canceled' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {subscription.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-sm text-gray-600">
                      {subscription.status === 'trial' && subscription.trialEndsAt && (
                        <>Trial ends {formatDate(subscription.trialEndsAt)}</>
                      )}
                      {subscription.status === 'active' && subscription.currentPeriodEnd && (
                        <>Renews {formatDate(subscription.currentPeriodEnd)}</>
                      )}
                    </p>
                  </div>
                </div>

                {subscription.status === 'active' && (
                  <div className="flex space-x-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleManageBilling}
                        disabled={actionLoading === 'billing'}
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 font-body"
                      >
                        {actionLoading === 'billing' ? (
                          <>Loading...</>
                        ) : (
                          <>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Manage Billing
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                  No Active Subscription
                </h3>
                <p className="font-body text-gray-600 mb-4">
                  Choose a plan to unlock all features
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Plans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Available Plans
          </h2>
          
          {/* Pricing Toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <motion.button
              onClick={() => setPricingPeriod('monthly')}
              className={`px-4 py-2 rounded-full font-body font-medium transition-all ${
                pricingPeriod === 'monthly'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setPricingPeriod('yearly')}
              className={`px-4 py-2 rounded-full font-body font-medium transition-all ${
                pricingPeriod === 'yearly'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 15%</Badge>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-2 border-gray-200 bg-white hover-lift shadow-premium hover:shadow-premium-hover">
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-heading text-2xl font-bold">Pro</CardTitle>
                <motion.div 
                  key={pricingPeriod}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-4xl font-bold mt-4"
                >
                  ${pricingData.pro.pricing[pricingPeriod].price}
                  <span className="font-body text-lg text-gray-600">
                    /{pricingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </motion.div>
                <p className="font-body text-sm text-green-600 mt-2">
                  {pricingData.pro.pricing[pricingPeriod].discount}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pricingData.pro.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="font-body text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => handleUpgrade('pro')}
                    disabled={actionLoading === 'pro' || subscription?.plan === 'pro'}
                    className="w-full bg-black text-white hover:bg-gray-800 font-body"
                  >
                    {actionLoading === 'pro' ? (
                      <>Processing...</>
                    ) : subscription?.plan === 'pro' ? (
                      <>Current Plan</>
                    ) : (
                      <>Upgrade to Pro</>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-1 bg-gradient-to-r from-black via-gray-800 to-black rounded-lg opacity-20 blur-sm"
            />
            <Card className="border-2 border-black bg-white hover-lift shadow-premium-hover relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white font-body">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-heading text-2xl font-bold">Enterprise</CardTitle>
                <motion.div 
                  key={pricingPeriod}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-3xl font-bold mt-4"
                >
                  <span className="font-body text-lg text-gray-600">Contact Us</span>
                </motion.div>
                <p className="font-body text-sm text-green-600 mt-2">
                  {pricingData.enterprise.pricing[pricingPeriod].discount}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pricingData.enterprise.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="font-body text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => handleUpgrade('enterprise')}
                    disabled={actionLoading === 'enterprise' || subscription?.plan === 'enterprise'}
                    className="w-full bg-black text-white hover:bg-gray-800 font-body"
                  >
                    {actionLoading === 'enterprise' ? (
                      <>Processing...</>
                    ) : subscription?.plan === 'enterprise' ? (
                      <>Current Plan</>
                    ) : (
                      <>Contact Sales</>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Features Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-gray-200 bg-white shadow-premium">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-bold">Why Choose ParaDoc.app?</CardTitle>
            <CardDescription className="font-body text-gray-600">
              Built specifically for legal professionals in the US and Canada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Secure & Compliant</h3>
                <p className="font-body text-sm text-gray-600">
                  Enterprise-grade security with SOC 2 compliance and data encryption
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">AI-Powered</h3>
                <p className="font-body text-sm text-gray-600">
                  Advanced AI trained on legal datasets for accurate document generation
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">Cost Effective</h3>
                <p className="font-body text-sm text-gray-600">
                  Save time and reduce costs with automated document workflows
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
