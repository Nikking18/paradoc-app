"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, FileText, Zap, Download, CheckCircle, Play, Pause } from "lucide-react";

interface HowItWorksGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksGuide({ isOpen, onClose }: HowItWorksGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Enter your request + location",
      description: "Simply describe what you need and select your state or province for jurisdiction-specific compliance.",
      icon: <FileText className="h-8 w-8" />,
      color: "from-gray-100 to-gray-200"
    },
    {
      title: "AI generates compliant document",
      description: "Our AI creates a legally compliant document tailored to your jurisdiction and requirements.",
      icon: <Zap className="h-8 w-8" />,
      color: "from-gray-200 to-gray-300"
    },
    {
      title: "Review, customize, download",
      description: "Review the document, make any customizations, and download in your preferred format.",
      icon: <Download className="h-8 w-8" />,
      color: "from-gray-300 to-gray-400"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      initializeAnimation();
    }
  }, [isOpen]);

  const initializeAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setIsPlaying(false);
        return;
      }
      
      setCurrentStep(stepIndex);
      
      setTimeout(() => {
        runStep(stepIndex + 1);
      }, 2000);
    };
    
    runStep(0);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
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
                      currentStep === index ? "scale-110 ring-4 ring-gray-300" : ""
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
          </div>

          {/* Success State */}
          {currentStep === steps.length - 1 && (
            <div className="mt-8 text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">You&apos;re All Set!</h3>
              <p className="text-gray-600 mb-6">
                That&apos;s how easy it is to get compliant legal documents with ParaDoc.app
              </p>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-8 py-3"
              >
                Get Started Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
