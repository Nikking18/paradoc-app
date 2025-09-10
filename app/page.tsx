"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Brain, 
  Shield, 
  ArrowRight, 
  Check,
  Zap,
  Lock,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Clock
} from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useAppStore, pricingData } from "@/lib/store";
import { SignupModal } from "@/components/modals/signup-modal";
import { ContactModal } from "@/components/modals/contact-modal";
import { LoginModal } from "@/components/modals/login-modal";
import { DemoWalkthrough } from "@/components/demo/demo-walkthrough";
import { useRouter } from "next/navigation";

// Enhanced Animation Components
const AnimatedSection = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TypewriterText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="border-r-2 border-current ml-1"
      />
    </span>
  );
};

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 1, 0],
    }}
    transition={{
      duration: 6,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

// Smooth scroll utility
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const router = useRouter();
  
  // Store state
  const { 
    openSignupModal, 
    openContactModal, 
    pricingPeriod, 
    setPricingPeriod,
    isTestimonialPaused,
    pauseTestimonials,
    resumeTestimonials,
    openLoginModal
  } = useAppStore();

  // Demo handlers
  const openDemo = () => setIsDemoOpen(true);
  const closeDemo = () => setIsDemoOpen(false);
  const goToUserGuide = () => router.push('/user-guide');
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const testimonials = [
    {
      quote: "ParaDoc.app has revolutionized how we handle document generation. What used to take hours now takes minutes.",
      author: "Sarah Chen",
      role: "Partner, Chen & Associates",
      rating: 5
    },
    {
      quote: "The AI assistant is incredibly accurate and has helped us catch potential issues we might have missed.",
      author: "Michael Rodriguez",
      role: "Solo Practitioner",
      rating: 5
    },
    {
      quote: "Enterprise features are exactly what our firm needed. Team collaboration has never been easier.",
      author: "Emily Thompson",
      role: "Managing Partner, Thompson Law",
      rating: 5
    }
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isTestimonialPaused) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [nextTestimonial, isTestimonialPaused]);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Enhanced Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-premium"
        role="banner"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="font-display text-xl font-bold cursor-pointer"
              role="img"
              aria-label="ParaDoc.app logo"
            >
              ParaDoc.app
            </motion.div>
            <div className="hidden md:flex space-x-8" role="menubar">
            {[
              { name: "Features", id: "features" },
              { name: "How It Works", id: "how-it-works" },
              { name: "Pricing", id: "pricing" },
              { name: "Reviews", id: "testimonials" }
            ].map((item) => (
              <motion.button
                key={item.name}
                onClick={() => smoothScrollTo(item.id)}
                className="font-body text-gray-600 hover:text-black transition-colors focus-ring"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                role="menuitem"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </motion.button>
            ))}
            </div>
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-black hover:text-white btn-premium focus-ring font-body"
              onClick={openLoginModal}
              aria-label="Sign in to your account"
            >
              Sign In
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main role="main">
        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="hero-heading">
        {/* Animated Background Elements */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute top-20 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-20" />
          <div className="absolute top-40 right-20 w-24 h-24 border border-gray-300 rounded-full opacity-30" />
          <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-gray-400 rounded-full opacity-25" />
          
          {/* Floating geometric shapes */}
          <FloatingElement delay={0}>
            <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-gray-100 rotate-45 opacity-40" />
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gray-200 rotate-12 opacity-30" />
          </FloatingElement>
        </motion.div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Empower Legal Work
              <br />
              <span className="bg-gradient-to-r from-black via-gray-700 to-gray-900 bg-clip-text text-transparent">
                <TypewriterText text="with AI" />
              </span>
            </motion.h1>
            
            <motion.p 
              className="font-body-light text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Draft, analyze, and manage legal documents instantly — tailored for US and Canada.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  onClick={() => openSignupModal('pro')}
                  className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold btn-premium shadow-premium hover:shadow-premium-hover focus-ring font-body animate-pulse-glow"
                >
                  Start Free Trial
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={goToUserGuide}
                  className="border-black text-black hover:bg-gray-50 px-8 py-4 text-lg shadow-premium hover:shadow-premium-hover focus-ring font-body"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 gradient-linear-subtle">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Powerful Features for Modern Legal Work
            </h2>
            <p className="font-body-light text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to streamline your legal document workflow
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-8 w-8" />,
                title: "AI-Powered Legal Document Generation",
                description: "Generate accurate, jurisdiction-specific legal documents in seconds.",
                delay: 0
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Smart Legal Assistant (Chatbot)",
                description: "Provide instant answers and context-aware guidance for legal queries.",
                delay: 0.1
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Document Lookup",
                description: "Search through vast databases of legal templates, statutes, and case law.",
                delay: 0.2
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Risk Assessment & Legal Summarization",
                description: "Identify risky clauses, highlight potential issues, and summarize complex legal texts.",
                delay: 0.3
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Bulk Document Generation",
                description: "Create hundreds of documents simultaneously using CSV/JSON uploads.",
                delay: 0.4
              },
              {
                icon: <Lock className="h-8 w-8" />,
                title: "Secure Storage & Collaboration",
                description: "Encrypt and store documents securely with role-based access and shared folders.",
                delay: 0.5
              }
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={feature.delay}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover-lift border-gray-200 bg-white shadow-premium hover:shadow-premium-hover h-full">
                    <CardHeader className="text-center">
                      <motion.div 
                        className="mx-auto mb-4 p-3 bg-black text-white rounded-xl w-fit"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <CardTitle className="font-heading text-xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="font-body text-gray-600 text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="font-body-light text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with legal AI in three simple steps
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Upload or Describe",
                description: "Upload existing documents or describe what you need. Our AI understands context and requirements.",
                icon: <Target className="h-8 w-8" />
              },
              {
                step: "02",
                title: "AI Processing",
                description: "Our advanced AI analyzes, generates, or modifies documents according to US and Canadian legal standards.",
                icon: <Sparkles className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Review & Download",
                description: "Review the generated documents, make adjustments, and download your professional legal files.",
                icon: <Clock className="h-8 w-8" />
              }
            ].map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 border-black bg-white hover-lift shadow-premium hover:shadow-premium-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-display text-6xl font-bold text-gray-200">{step.step}</div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="p-2 bg-gray-100 rounded-full"
                        >
                          {step.icon}
                        </motion.div>
                      </div>
                      <CardTitle className="font-heading text-2xl font-bold">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="font-body text-gray-600 text-lg">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  {/* Enhanced Arrow Animation */}
                  {index < 2 && (
                    <motion.div 
                      className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="h-8 w-8 text-gray-400" />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 gradient-linear-subtle">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="font-body-light text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose the plan that fits your legal practice
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center">
              <motion.div 
                className="flex items-center bg-gray-100 rounded-full p-1"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  onClick={() => setPricingPeriod('monthly')}
                  className={`px-6 py-2 rounded-full font-body font-medium transition-all focus-ring ${
                    pricingPeriod === 'monthly'
                      ? 'bg-black text-white shadow-premium'
                      : 'text-gray-600 hover:text-black'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  Monthly
                </motion.button>
                <motion.button
                  onClick={() => setPricingPeriod('yearly')}
                  className={`px-6 py-2 rounded-full font-body font-medium transition-all focus-ring ${
                    pricingPeriod === 'yearly'
                      ? 'bg-black text-white shadow-premium'
                      : 'text-gray-600 hover:text-black'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  Yearly
                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 15%</Badge>
                </motion.button>
              </motion.div>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pro Plan */}
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-gray-200 bg-white hover-lift shadow-premium hover:shadow-premium-hover">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="font-heading text-3xl font-bold">Pro</CardTitle>
                    <motion.div 
                      key={pricingPeriod}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-5xl font-bold mt-4"
                    >
                      ${pricingData.pro.pricing[pricingPeriod].price}
                      <span className="font-body text-xl text-gray-600">
                        /{pricingPeriod === 'monthly' ? 'month' : 'year'}
                      </span>
                    </motion.div>
                    <div className="font-body text-sm text-green-600 mt-2">
                      {pricingData.pro.pricing[pricingPeriod].discount}
                    </div>
                    <CardDescription className="font-body text-lg mt-2">Perfect for solo practitioners</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "Unlimited document generations",
                      "Unlimited chatbot interactions with memory",
                      "Export to PDF, DOCX, Google Docs",
                      "AI summarizer and risk scanner",
                      "Smart legal document lookup",
                      "6-month encrypted storage",
                      "Email support",
                      "US & Canada legal compliance"
                    ].map((feature, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Check className="h-5 w-5 text-green-600 mr-3" />
                        <span className="font-body">{feature}</span>
                      </motion.div>
                    ))}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={() => openSignupModal('pro')}
                        className="w-full mt-8 bg-black text-white hover:bg-gray-800 btn-premium shadow-premium hover:shadow-premium-hover focus-ring font-body"
                      >
                        Start Pro Trial
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>

            {/* Enterprise Plan - Enhanced */}
            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-gradient-to-r from-black via-gray-800 to-black rounded-lg opacity-20 blur-sm"
                />
                <Card className="border-2 border-black bg-white hover-lift shadow-premium-hover relative">
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white font-body animate-shimmer">
                      Most Popular
                    </Badge>
                  </motion.div>
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="font-heading text-3xl font-bold">Enterprise</CardTitle>
                    <motion.div 
                      key={pricingPeriod}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-4xl font-bold mt-4"
                    >
                      <span className="font-body text-lg text-gray-600">Contact Us</span>
                    </motion.div>
                    <div className="font-body text-sm text-green-600 mt-2">
                      {pricingData.enterprise.pricing[pricingPeriod].discount}
                    </div>
                    <CardDescription className="font-body text-lg mt-2">For law firms and teams</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "All Pro features",
                      "Bulk ZIP + CSV/JSON document upload",
                      "Custom AI model tuning",
                      "API embedding for law firm systems",
                      "Team access with shared folders",
                      "Unlimited encrypted storage",
                      "Priority support",
                      "Advanced analytics & reporting"
                    ].map((feature, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Check className="h-5 w-5 text-green-600 mr-3" />
                        <span className="font-body">{feature}</span>
                      </motion.div>
                    ))}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={() => openContactModal()}
                        className="w-full mt-8 bg-black text-white hover:bg-gray-800 btn-premium shadow-premium hover:shadow-premium-hover focus-ring font-body animate-pulse-glow"
                      >
                        Contact Sales
                      </Button>
                    </motion.div>
                    <p className="text-center text-sm text-gray-600 mt-4 font-body">
                      <button 
                        onClick={() => openContactModal()}
                        className="underline hover:text-black focus-ring font-body"
                      >
                        Contact us
                      </button> for custom pricing
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Carousel */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Trusted by Legal Professionals
            </h2>
            <p className="font-body-light text-xl text-gray-600 max-w-2xl mx-auto">
              See what lawyers and law firms say about ParaDoc.app
            </p>
          </AnimatedSection>
          
          <div 
            className="relative max-w-4xl mx-auto"
            onMouseEnter={pauseTestimonials}
            onMouseLeave={resumeTestimonials}
          >
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-gray-200 bg-white shadow-premium hover:shadow-premium-hover">
                <CardContent className="pt-8 pb-8 px-8 text-center">
                  <motion.div 
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mx-1" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="font-body-light text-xl text-gray-600 mb-8 italic leading-relaxed">
                    &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-heading text-lg font-semibold">{testimonials[currentTestimonial].author}</p>
                    <p className="font-body text-gray-500">{testimonials[currentTestimonial].role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Carousel Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus-ring"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`w-3 h-3 rounded-full transition-colors focus-ring ${
                      index === currentTestimonial ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus-ring"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <FloatingElement delay={0}>
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full" />
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rotate-45" />
          </FloatingElement>
        </div>
        
        <AnimatedSection className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Legal Practice?
          </h2>
          <p className="font-body-light text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust ParaDoc.app for their document needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                onClick={() => openSignupModal('pro')}
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold btn-premium shadow-premium hover:shadow-premium-hover focus-ring font-body"
              >
                Start Your Free Trial
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Zap className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={openDemo}
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg shadow-premium hover:shadow-premium-hover focus-ring font-body"
              >
                Schedule Demo
              </Button>
            </motion.div>
          </div>
          <motion.p 
            className="font-body text-sm text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            No credit card required • 7 days free trial with full Pro access • Cancel anytime
          </motion.p>
        </AnimatedSection>
      </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="font-display text-xl font-bold mb-4">ParaDoc.app</div>
                <p className="font-body-light text-gray-600 text-sm">
                  Empowering legal professionals with AI-driven document solutions.
                </p>
              </div>
              
              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "API", "Integrations"]
                },
                {
                  title: "Company",
                  links: ["About", "Blog", "Careers", "Contact"]
                },
                {
                  title: "Legal",
                  links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance"]
                }
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="font-heading font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <motion.a
                          href="#"
                          className="font-body text-sm text-gray-600 hover:text-black transition-colors focus-ring"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="font-body text-sm text-gray-600">
              © 2025 ParaDoc.app. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy", "Terms", "Support"].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="font-body text-gray-600 hover:text-black text-sm transition-colors focus-ring"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Modals */}
      <SignupModal />
      <ContactModal />
      <LoginModal />
      
      {/* Demo Walkthrough */}
      <DemoWalkthrough 
        isOpen={isDemoOpen}
        onClose={closeDemo}
        onLearnMore={goToUserGuide}
      />
    </div>
  );
}