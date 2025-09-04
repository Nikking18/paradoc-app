"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, MapPin, User, Building, ArrowRight, CheckCircle } from "lucide-react";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    role: "",
    jurisdiction: "",
    useCase: "",
    experience: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) return null;

  const steps = [
    {
      title: "Welcome to ParaDoc.app!",
      subtitle: "Let's set up your account",
      icon: <User className="h-6 w-6" />
    },
    {
      title: "Tell us about yourself",
      subtitle: "Help us personalize your experience",
      icon: <Building className="h-6 w-6" />
    },
    {
      title: "Your legal needs",
      subtitle: "What brings you to ParaDoc.app?",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Location & Experience",
      subtitle: "Where do you practice law?",
      icon: <MapPin className="h-6 w-6" />
    }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Save user profile data to database
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {session.user?.name?.split(' ')[0]}!</h2>
              <p className="text-gray-600">
                We&apos;re excited to help you create professional legal documents with AI.
                Let&apos;s get you set up in just a few steps.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">What you&apos;ll get:</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">7-day free trial</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Unlimited document generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">AI-powered legal advice</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Export to multiple formats</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="company">Company/Organization (Optional)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <Label htmlFor="role">Your Role</Label>
              <Select value={formData.role} onValueChange={(value) => updateFormData('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lawyer">Lawyer/Attorney</SelectItem>
                  <SelectItem value="paralegal">Paralegal</SelectItem>
                  <SelectItem value="business-owner">Business Owner</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="student">Law Student</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="useCase">What do you need ParaDoc.app for?</Label>
              <Select value={formData.useCase} onValueChange={(value) => updateFormData('useCase', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contracts">Contract Generation</SelectItem>
                  <SelectItem value="nda">NDAs & Confidentiality</SelectItem>
                  <SelectItem value="terms">Terms of Service</SelectItem>
                  <SelectItem value="privacy">Privacy Policies</SelectItem>
                  <SelectItem value="employment">Employment Documents</SelectItem>
                  <SelectItem value="business">Business Formation</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="general">General Legal Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience">Legal Experience Level</Label>
              <Select value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                  <SelectItem value="expert">Expert (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="jurisdiction">Primary Jurisdiction</Label>
              <Select value={formData.jurisdiction} onValueChange={(value) => updateFormData('jurisdiction', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="florida">Florida</SelectItem>
                  <SelectItem value="illinois">Illinois</SelectItem>
                  <SelectItem value="pennsylvania">Pennsylvania</SelectItem>
                  <SelectItem value="ohio">Ohio</SelectItem>
                  <SelectItem value="georgia">Georgia</SelectItem>
                  <SelectItem value="north-carolina">North Carolina</SelectItem>
                  <SelectItem value="michigan">Michigan</SelectItem>
                  <SelectItem value="other-us">Other US State</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">🎉 You&apos;re all set!</h3>
              <p className="text-sm text-blue-800">
                Based on your preferences, we&apos;ll customize your experience and show you the most relevant 
                document templates and legal resources.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gray-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              {steps[currentStep - 1].icon}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-gray-600">{steps[currentStep - 1].subtitle}</p>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="border-gray-300"
              >
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="bg-gray-900 text-white hover:bg-black"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Setting up...
                  </div>
                ) : currentStep === 4 ? (
                  <div className="flex items-center">
                    Complete Setup
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
