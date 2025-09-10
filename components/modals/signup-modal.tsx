"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore, pricingData } from "@/lib/store";
import { Check, Mail, User, Building, MapPin } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  location: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  location?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignupModal = () => {
  const { 
    isSignupModalOpen, 
    closeSignupModal, 
    selectedPlan, 
    pricingPeriod 
  } = useAppStore();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    location: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Plan Selection, 3: Success

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company/Organization is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'signup',
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          location: formData.location
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setStep(3);
    } catch (error) {
      console.error('Signup error:', error);
      // Show error message
      setErrors({ ...errors, email: error instanceof Error ? error.message : 'An error occurred during signup' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      location: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsSubmitting(false);
    closeSignupModal();
  };

  const currentPlan = selectedPlan ? pricingData[selectedPlan] : pricingData.pro;
  const currentPrice = currentPlan.pricing[pricingPeriod];

  return (
    <Modal
      isOpen={isSignupModalOpen}
      onClose={resetModal}
      title={step === 3 ? "Welcome to ParaDoc!" : "Start Your Free Trial"}
      maxWidth="max-w-2xl"
    >
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Plan Preview */}
          {selectedPlan && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-lg font-semibold">{currentPlan.name} Plan</h3>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  7 Days Free Trial
                </Badge>
              </div>
              <p className="font-body text-gray-600 mb-2">{currentPlan.description}</p>
              <div className="font-body text-sm text-gray-500">
                {typeof currentPrice.price === 'number' 
                  ? `$${currentPrice.price}/${pricingPeriod === 'monthly' ? 'month' : 'year'} after trial`
                  : 'Custom pricing after trial'
                }
              </div>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block font-body text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  />
                </div>
                {errors.firstName && (
                  <p id="firstName-error" className="mt-1 text-sm text-red-600 font-body">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block font-body text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  />
                </div>
                {errors.lastName && (
                  <p id="lastName-error" className="mt-1 text-sm text-red-600 font-body">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-body text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@lawfirm.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 font-body">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block font-body text-sm font-medium text-gray-700 mb-1">
                Company/Organization *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                    errors.company ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Doe & Associates Law Firm"
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                />
              </div>
              {errors.company && (
                <p id="company-error" className="mt-1 text-sm text-red-600 font-body">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block font-body text-sm font-medium text-gray-700 mb-1">
                Location (US/Canada) *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="New York, NY"
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? 'location-error' : undefined}
                />
              </div>
              {errors.location && (
                <p id="location-error" className="mt-1 text-sm text-red-600 font-body">
                  {errors.location}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-body text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600 font-body">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block font-body text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
              </div>
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-sm text-red-600 font-body">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-gray-800 py-3 font-body font-semibold btn-premium shadow-premium hover:shadow-premium-hover focus-ring"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Start Free Trial'
                  )}
                </Button>
              </motion.div>
              
              <p className="mt-3 text-xs text-gray-500 text-center font-body">
                No credit card required. Cancel anytime during trial.
              </p>
            </div>
          </form>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
          >
            <Check className="h-8 w-8 text-green-600" />
          </motion.div>
          
          <h3 className="font-heading text-xl font-bold mb-2">Account Created Successfully!</h3>
          <p className="font-body text-gray-600 mb-6">
            Welcome to ParaDoc.app! Your free trial has started. Check your email for login details.
          </p>
          
          <div className="space-y-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => {
                  resetModal();
                  window.location.href = '/dashboard';
                }}
                className="w-full bg-black text-white hover:bg-gray-800 py-3 font-body font-semibold btn-premium"
              >
                Go to Dashboard
              </Button>
            </motion.div>
            
            <p className="text-sm text-gray-500 font-body">
              Your account has been created successfully!
            </p>
          </div>
        </motion.div>
      )}
    </Modal>
  );
};
