"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  X, 
  Zap, 
  Shield, 
  FileText, 
  Users, 
  Clock, 
  Download,
  ArrowRight,
  Star,
  Crown
} from "lucide-react";

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pricingPlans = [
    {
      name: "Pro",
      price: isYearly ? "$510" : "$20",
      period: isYearly ? "per year" : "per month",
      originalPrice: isYearly ? "$600" : "$50",
      description: "Perfect for professionals and small businesses",
      features: [
        "Unlimited document generations",
        "Unlimited AI chatbot conversations",
        "Export to PDF, DOCX, Google Docs",
        "AI summarizer & risk scanner",
        "Smart document lookup",
        "6-month encrypted storage",
        "Priority email support",
        "Advanced templates library"
      ],
      limitations: [
        "Single user account",
        "Standard document types"
      ],
      buttonText: "Start Pro Trial",
      popular: true,
      stripePriceId: isYearly ? "price_yearly_pro" : "price_monthly_pro"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations and law firms",
      features: [
        "Everything in Pro",
        "Bulk document processing",
        "Custom AI model tuning",
        "API integration",
        "Team collaboration tools",
        "Unlimited encrypted storage",
        "Dedicated account manager",
        "Custom legal templates",
        "White-label options",
        "SLA guarantees"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      popular: false,
      stripePriceId: null
    }
  ];

  const handleSubscribe = async (plan: any) => {
    if (!session) {
      router.push('/auth/signup');
      return;
    }

    if (plan.name === "Enterprise") {
      // Handle enterprise contact
      window.open('mailto:sales@paradoc.app?subject=Enterprise Plan Inquiry', '_blank');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          isYearly
        }),
      });

      if (response.ok) {
        const { sessionId } = await response.json();
        // Redirect to Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Create professional legal documents in minutes, not hours"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Legally Compliant",
      description: "All documents are jurisdiction-specific and legally sound"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Multiple Formats",
      description: "Export to PDF, DOCX, and Google Docs seamlessly"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Trusted by 10K+",
      description: "Join thousands of professionals who trust ParaDoc.app"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ParaDoc.app</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {session ? (
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                  className="border-gray-300"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => router.push('/auth/signin')}
                  className="border-gray-300"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start with a 7-day free trial, 
            no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge className="bg-green-100 text-green-800">Save 15%</Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative border-2 shadow-lg ${
                plan.popular 
                  ? 'border-gray-900 bg-white' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gray-900 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-4">
                  {plan.name === "Enterprise" ? (
                    <Crown className="h-8 w-8 text-gray-700" />
                  ) : (
                    <Zap className="h-8 w-8 text-gray-700" />
                  )}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center mt-2">
                      <span className="text-sm text-gray-500 line-through mr-2">
                        {plan.originalPrice}
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        {isYearly ? '15% off' : '60% off first 3 months'}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <Button
                  onClick={() => handleSubscribe(plan)}
                  disabled={isLoading}
                  className={`w-full h-12 text-lg font-semibold ${
                    plan.popular
                      ? 'bg-gray-900 text-white hover:bg-black'
                      : 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {plan.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>

                <div className="mt-8 space-y-4">
                  <h4 className="font-semibold text-gray-900">What&apos;s included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <X className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose ParaDoc.app?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! We offer a 7-day free trial with full access to all Pro features. 
                No credit card required to start.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely. You can cancel your subscription at any time from your dashboard. 
                You&apos;ll continue to have access until the end of your billing period.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Are the documents legally valid?
              </h3>
              <p className="text-gray-600">
                Yes! All documents are generated using AI trained on current legal frameworks 
                and include jurisdiction-specific compliance clauses. However, we recommend 
                having a legal professional review documents for complex matters.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                What jurisdictions are supported?
              </h3>
              <p className="text-gray-600">
                We currently support all US states and Canada. Enterprise customers can 
                request custom jurisdiction support.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who trust ParaDoc.app for their legal documentation needs.
          </p>
          <Button
            onClick={() => router.push('/auth/signup')}
            className="bg-gray-900 text-white hover:bg-black px-8 py-4 text-lg font-semibold"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
