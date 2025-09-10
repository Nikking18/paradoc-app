"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { Check, Mail, User, Building, Phone, MessageSquare } from "lucide-react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  inquiryType: 'enterprise' | 'demo' | 'support' | 'other';
}

interface ContactFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
}

export const ContactModal = () => {
  const { isContactModalOpen, closeContactModal } = useAppStore();
  
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    inquiryType: 'enterprise'
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    
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
      newErrors.company = 'Company is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing (only for fields that can have errors)
    if (field !== 'inquiryType' && errors[field as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof ContactFormErrors]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      inquiryType: 'enterprise'
    });
    setErrors({});
    setIsSubmitting(false);
    setIsSuccess(false);
    closeContactModal();
  };

  const inquiryTypes = [
    { value: 'enterprise', label: 'Enterprise Solutions' },
    { value: 'demo', label: 'Request Demo' },
    { value: 'support', label: 'Technical Support' },
    { value: 'other', label: 'Other Inquiry' }
  ];

  return (
    <Modal
      isOpen={isContactModalOpen}
      onClose={resetModal}
      title={isSuccess ? "Message Sent!" : "Contact Our Team"}
      maxWidth="max-w-2xl"
    >
      {!isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-body text-gray-600 mb-6">
            Get in touch with our team for enterprise solutions, demos, or any questions about ParaDoc.app.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Inquiry Type */}
            <div>
              <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                Inquiry Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {inquiryTypes.map((type) => (
                  <motion.button
                    key={type.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('inquiryType', type.value as ContactFormData['inquiryType'])}
                    className={`p-3 text-sm font-body border rounded-lg transition-colors focus-ring ${
                      formData.inquiryType === type.value
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="contact-firstName" className="block font-body text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="contact-firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'contact-firstName-error' : undefined}
                  />
                </div>
                {errors.firstName && (
                  <p id="contact-firstName-error" className="mt-1 text-sm text-red-600 font-body">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="contact-lastName" className="block font-body text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="contact-lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'contact-lastName-error' : undefined}
                  />
                </div>
                {errors.lastName && (
                  <p id="contact-lastName-error" className="mt-1 text-sm text-red-600 font-body">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block font-body text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@lawfirm.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="contact-email-error" className="mt-1 text-sm text-red-600 font-body">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company */}
              <div>
                <label htmlFor="contact-company" className="block font-body text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="contact-company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Law Firm Name"
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? 'contact-company-error' : undefined}
                  />
                </div>
                {errors.company && (
                  <p id="contact-company-error" className="mt-1 text-sm text-red-600 font-body">
                    {errors.company}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="contact-phone" className="block font-body text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    id="contact-phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block font-body text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your needs, team size, or any specific questions..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
              </div>
              {errors.message && (
                <p id="contact-message-error" className="mt-1 text-sm text-red-600 font-body">
                  {errors.message}
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
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </motion.div>
              
              <p className="mt-3 text-xs text-gray-500 text-center font-body">
                We&apos;ll respond within 24 hours during business days.
              </p>
            </div>
          </form>
        </motion.div>
      ) : (
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
          
          <h3 className="font-heading text-xl font-bold mb-2">Message Sent Successfully!</h3>
          <p className="font-body text-gray-600 mb-6">
            Thank you for your interest in ParaDoc.app. Our team will review your message and get back to you within 24 hours.
          </p>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={resetModal}
              className="bg-black text-white hover:bg-gray-800 py-3 px-6 font-body font-semibold btn-premium"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </Modal>
  );
};
