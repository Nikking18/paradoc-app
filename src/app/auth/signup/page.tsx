"use client";

import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Zap, Users, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard');
      }
    });
  }, [router]);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/onboarding' });
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Generate unlimited legal documents",
    "AI-powered legal advice and analysis",
    "Export to PDF, DOCX, and Google Docs",
    "Secure cloud storage for all documents",
    "7-day free trial, no credit card required"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-4">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join ParaDoc.app</h1>
          <p className="text-gray-600">Start creating legal documents in minutes</p>
        </div>

        {/* Sign Up Card */}
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
            <p className="text-gray-600">Get started with your free trial</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full bg-gray-900 text-white hover:bg-black h-12 text-lg font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </div>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">What you get</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                <button
                  onClick={() => router.push('/auth/signin')}
                  className="text-gray-900 font-semibold hover:underline"
                >
                  Sign in instead
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Shield className="h-6 w-6 text-gray-700 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Bank-level Security</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Zap className="h-6 w-6 text-gray-700 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Instant Generation</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <FileText className="h-6 w-6 text-gray-700 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Legal Compliance</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <Users className="h-6 w-6 text-gray-700 mx-auto mb-2" />
            <p className="text-sm text-gray-600">10,000+ Users</p>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-gray-700 hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="text-gray-700 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
