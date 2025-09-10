import { create } from 'zustand';

export type PricingPlan = 'pro' | 'enterprise';
export type PricingPeriod = 'monthly' | 'yearly';

interface AppState {
  // Modal states
  isSignupModalOpen: boolean;
  isContactModalOpen: boolean;
  isMobileMenuOpen: boolean;
  isLoginModalOpen: boolean;
  
  // Pricing states
  selectedPlan: PricingPlan | null;
  pricingPeriod: PricingPeriod;
  
  // Testimonial states
  isTestimonialPaused: boolean;
  
  // Actions
  openSignupModal: (plan?: PricingPlan) => void;
  closeSignupModal: () => void;
  openContactModal: () => void;
  closeContactModal: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  
  setPricingPeriod: (period: PricingPeriod) => void;
  setSelectedPlan: (plan: PricingPlan | null) => void;
  
  pauseTestimonials: () => void;
  resumeTestimonials: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial states
  isSignupModalOpen: false,
  isContactModalOpen: false,
  isMobileMenuOpen: false,
  isLoginModalOpen: false,
  selectedPlan: null,
  pricingPeriod: 'monthly',
  isTestimonialPaused: false,
  
  // Modal actions
  openSignupModal: (plan) => set({ 
    isSignupModalOpen: true, 
    selectedPlan: plan || get().selectedPlan,
    isContactModalOpen: false,
    isMobileMenuOpen: false
  }),
  
  closeSignupModal: () => set({ isSignupModalOpen: false }),
  
  openContactModal: () => set({ 
    isContactModalOpen: true, 
    isSignupModalOpen: false,
    isMobileMenuOpen: false
  }),
  
  closeContactModal: () => set({ isContactModalOpen: false }),
  
  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen,
    isSignupModalOpen: false,
    isContactModalOpen: false
  })),
  
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  openLoginModal: () => set({ 
    isLoginModalOpen: true, 
    isSignupModalOpen: false,
    isContactModalOpen: false,
    isMobileMenuOpen: false
  }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  
  // Pricing actions
  setPricingPeriod: (period) => set({ pricingPeriod: period }),
  
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  
  // Testimonial actions
  pauseTestimonials: () => set({ isTestimonialPaused: true }),
  
  resumeTestimonials: () => set({ isTestimonialPaused: false }),
}));

// Pricing data
export const pricingData = {
  pro: {
    name: 'Pro',
    description: 'Perfect for solo practitioners',
    features: [
      'Unlimited document generations',
      'Unlimited chatbot interactions with memory',
      'Export to PDF, DOCX, Google Docs',
      'AI summarizer and risk scanner',
      'Smart legal document lookup',
      '6-month encrypted storage',
      'Email support',
      'US & Canada legal compliance'
    ],
    pricing: {
      monthly: { price: 50, originalPrice: 50, discount: 'First 3 months at $20/month' },
      yearly: { price: 510, originalPrice: 600, discount: 'Save $90 annually' }
    }
  },
  enterprise: {
    name: 'Enterprise',
    description: 'For law firms and teams',
    features: [
      'All Pro features',
      'Bulk ZIP + CSV/JSON document upload',
      'Custom AI model tuning',
      'API embedding for law firm systems',
      'Team access with shared folders',
      'Unlimited encrypted storage',
      'Priority support',
      'Advanced analytics & reporting'
    ],
    pricing: {
      monthly: { price: 'Contact Us', originalPrice: null, discount: 'Custom pricing available' },
      yearly: { price: 'Contact Us', originalPrice: null, discount: 'Volume discounts available' }
    }
  }
};
