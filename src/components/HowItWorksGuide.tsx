"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, FileText, Zap, Download, CheckCircle, Play, Pause, Clock, Shield, Globe, Sparkles, CheckCircle2, ArrowUpRight, Users, TrendingUp } from "lucide-react";

interface HowItWorksGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksGuide({ isOpen, onClose }: HowItWorksGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Enter your request + location",
      description: "Simply describe what you need and select your state or province for jurisdiction-specific compliance.",
      icon: <FileText className="h-8 w-8" />,
      color: "from-gray-100 to-gray-200",
      details: [
        "Natural language input (e.g., 'NDA for freelancer in California')",
        "Jurisdiction selection (State/Province)",
        "Document type specification",
        "Additional requirements input"
      ],
      benefits: ["No legal jargon", "Intuitive interface", "Quick setup"],
      timeEstimate: "30 seconds"
    },
    {
      title: "AI generates compliant document",
      description: "Our AI creates a legally compliant document tailored to your jurisdiction and requirements.",
      icon: <Zap className="h-8 w-8" />,
      color: "from-gray-200 to-gray-300",
      details: [
        "AI analyzes jurisdiction requirements",
        "Generates compliant clauses",
        "Applies legal standards",
        "Creates professional formatting"
      ],
      benefits: ["100% compliant", "AI-powered", "Real-time generation"],
      timeEstimate: "2-3 minutes"
    },
    {
      title: "Review, customize, download",
      description: "Review the document, make any customizations, and download in your preferred format.",
      icon: <Download className="h-8 w-8" />,
      color: "from-gray-300 to-gray-400",
      details: [
        "Preview generated document",
        "Edit specific clauses",
        "Add custom terms",
        "Export to PDF/Word/Google Docs"
      ],
      benefits: ["Easy editing", "Multiple formats", "Professional output"],
      timeEstimate: "1-2 minutes"
    }
  ];

  const features = [
    { icon: <Shield className="h-5 w-5" />, text: "100% Compliant", color: "text-green-600" },
    { icon: <Globe className="h-5 w-5" />, text: "USA & Canada", color: "text-blue-600" },
    { icon: <Clock className="h-5 w-5" />, text: "5 minutes total", color: "text-purple-600" },
    { icon: <Users className="h-5 w-5" />, text: "No lawyer needed", color: "text-orange-600" }
  ];

  useEffect(() => {
    if (isOpen) {
      initializeAnimation();
      // Auto-start after a short delay
      setTimeout(() => {
        startAnimation();
      }, 1000);
    }
  }, [isOpen]);

  const initializeAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setShowSuccess(false);
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setShowSuccess(false);
    
    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setIsPlaying(false);
        setShowSuccess(true);
        return;
      }
      
      setCurrentStep(stepIndex);
      
      
      
      setTimeout(() => {
        runStep(stepIndex + 1);
      }, 4000);
    };
    
    runStep(0);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">How ParaDoc.app Works</h2>
              <p className="text-gray-600 mt-1">See the magic happen in 3 simple steps</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={isPlaying ? pauseAnimation : startAnimation}
                variant="outline"
                size="sm"
                className="border-gray-300"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div ref={containerRef} className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Container */}
                <div
                  className={`flex items-start space-x-6 p-6 rounded-2xl border-2 transition-all duration-700 ${
                    currentStep === index
                      ? "border-gray-400 bg-gray-50 shadow-lg scale-105"
                      : "border-gray-200 bg-white"
                  } ${
                    index <= currentStep 
                      ? "animate-fade-in-up opacity-100" 
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-all duration-500 ${
                      currentStep === index ? "scale-110 ring-4 ring-gray-300 animate-pulse-glow" : ""
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                    
                    {/* Step Details */}
                    <div className="space-y-3 mb-4">
                      {step.details.map((detail, detailIndex) => (
                        <div 
                          key={detailIndex}
                          className={`flex items-center space-x-2 text-sm transition-all duration-500 ${
                            currentStep === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                          }`}
                          style={{ transitionDelay: `${detailIndex * 200}ms` }}
                        >
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {step.benefits.map((benefit, benefitIndex) => (
                        <span 
                          key={benefitIndex}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 transition-all duration-500 ${
                            currentStep === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                          }`}
                          style={{ transitionDelay: `${benefitIndex * 150}ms` }}
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Time Estimate */}
                    <div className={`flex items-center space-x-2 text-sm text-gray-600 transition-all duration-500 ${
                      currentStep === index ? "opacity-100" : "opacity-0"
                    }`}>
                      <Clock className="h-4 w-4" />
                      <span>Estimated time: <strong>{step.timeEstimate}</strong></span>
                    </div>
                  </div>

                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-medium transition-all duration-500 ${
                        currentStep === index ? "scale-110 animate-pulse-glow" : ""
                      }`}
                    >
                      <div className="text-gray-700">{step.icon}</div>
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="relative">
                    <div className={`absolute left-8 top-full w-0.5 bg-gradient-to-b from-gray-400 to-transparent h-8 transition-all duration-1000 ${
                      index < currentStep ? "opacity-100" : "opacity-0"
                    }`} />
                    <div className={`absolute left-6 top-full w-4 h-4 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                      index < currentStep ? "scale-100" : "scale-0"
                    }`}>
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Feature Highlights */}
            <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 transition-all duration-700 ${
              currentStep >= steps.length - 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-gray-600" />
                Key Benefits
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`text-center p-3 bg-white rounded-lg border border-gray-200 transition-all duration-500 hover:scale-105 hover:shadow-md ${
                      currentStep >= steps.length - 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success State */}
            {showSuccess && (
              <div className="mt-8 text-center animate-bounce-in">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">You&apos;re All Set!</h3>
                <p className="text-gray-600 mb-6">
                  That&apos;s how easy it is to get compliant legal documents with ParaDoc.app
                </p>
                
                {/* Final Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-xs text-gray-600">Simple Steps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5</div>
                    <div className="text-xs text-gray-600">Minutes Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-600">Compliant</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ArrowUpRight className="h-5 w-5 mr-2" />
                    Get Started Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 transition-all duration-300 hover:border-gray-600 hover:text-gray-800"
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    View Pricing
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
