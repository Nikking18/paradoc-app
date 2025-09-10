"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  X, 
  FileText, 
  Brain, 
  Target,
  Shield,
  Zap,
  Lock,
  CreditCard,
  ArrowRight,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DemoWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  onLearnMore: () => void;
}

const features = [
  {
    icon: <FileText className="h-12 w-12" />,
    title: "AI-Powered Legal Document Generation",
    description: "Generate accurate, jurisdiction-specific legal documents in seconds.",
    details: "Our AI analyzes your requirements and creates professional legal documents tailored to US and Canadian jurisdictions, saving hours of manual drafting.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Brain className="h-12 w-12" />,
    title: "Smart Legal Assistant (Chatbot)",
    description: "Provide instant answers and context-aware guidance for legal queries.",
    details: "Get 24/7 access to AI-powered legal assistance with memory of your conversations and context-aware responses based on your documents.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <Target className="h-12 w-12" />,
    title: "Document Lookup",
    description: "Search through vast databases of legal templates, statutes, and case law.",
    details: "Access over 100,000 legal precedents, real-time statute updates, and advanced search capabilities with Boolean operators.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <Shield className="h-12 w-12" />,
    title: "Risk Assessment & Legal Summarization",
    description: "Identify risky clauses, highlight potential issues, and summarize complex legal texts.",
    details: "AI-powered risk scoring identifies problematic clauses and provides plain English summaries of complex legal documents.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: <Zap className="h-12 w-12" />,
    title: "Bulk Document Generation",
    description: "Create hundreds of documents simultaneously using CSV/JSON uploads.",
    details: "Process up to 1,000 documents per batch with template mapping, progress tracking, and bulk download capabilities.",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: <Lock className="h-12 w-12" />,
    title: "Secure Storage & Collaboration",
    description: "Encrypt and store documents securely with role-based access and shared folders.",
    details: "Enterprise-grade AES-256 encryption, role-based access control, and SOC 2 Type II compliant infrastructure for maximum security.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: <CreditCard className="h-12 w-12" />,
    title: "Subscription Management",
    description: "Offer flexible billing options, including monthly and yearly plans with trials.",
    details: "Flexible billing with 7 days free trial, usage analytics, team management, and automatic scaling for enterprise needs.",
    color: "from-pink-500 to-pink-600"
  }
];

export const DemoWalkthrough = ({ isOpen, onClose, onLearnMore }: DemoWalkthroughProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-advance through steps
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((current) => {
            if (current >= features.length - 1) {
              setIsPlaying(false);
              return current;
            }
            return current + 1;
          });
          return 0;
        }
        return prev + 2; // 5 seconds per step
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentStep]);

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const nextStep = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(0);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentFeature = features[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          {/* Demo Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-premium-hover overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div>
                <h2 id="demo-title" className="font-heading text-2xl font-bold text-black">
                  ParaDoc.app Features Demo
                </h2>
                <p className="font-body text-gray-600 mt-1">
                  Interactive walkthrough of our key features
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus-ring"
                aria-label="Close demo"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm text-gray-600">
                  Step {currentStep + 1} of {features.length}
                </span>
                <span className="font-body text-sm text-gray-600">
                  {Math.round((currentStep / (features.length - 1)) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-black to-gray-700 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((currentStep + progress / 100) / features.length) * 100}%` 
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Feature Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Feature Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.2, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                    className={`mx-auto w-24 h-24 bg-gradient-to-br ${currentFeature.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-premium`}
                  >
                    {currentFeature.icon}
                  </motion.div>

                  {/* Feature Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-3xl font-bold mb-4 text-black"
                  >
                    {currentFeature.title}
                  </motion.h3>

                  {/* Feature Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-body text-lg text-gray-600 mb-6 max-w-2xl mx-auto"
                  >
                    {currentFeature.description}
                  </motion.p>

                  {/* Feature Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="max-w-2xl mx-auto border-2 border-gray-100">
                      <CardContent className="pt-6">
                        <p className="font-body text-gray-700 leading-relaxed">
                          {currentFeature.details}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              {/* Navigation */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous feature"
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlayPause}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors focus-ring"
                  aria-label={isPlaying ? "Pause demo" : "Play demo"}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  disabled={currentStep === features.length - 1}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next feature"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center space-x-2">
                {features.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      setCurrentStep(index);
                      setProgress(0);
                    }}
                    className={`w-3 h-3 rounded-full transition-colors focus-ring ${
                      index === currentStep 
                        ? 'bg-black' 
                        : index < currentStep 
                        ? 'bg-gray-400' 
                        : 'bg-gray-200'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    onClick={onLearnMore}
                    className="border-black text-black hover:bg-gray-50 font-body focus-ring"
                  >
                    Learn More
                  </Button>
                </motion.div>
                
                {currentStep === features.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={onClose}
                      className="bg-black text-white hover:bg-gray-800 font-body btn-premium focus-ring"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
