"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, RotateCcw, FileText, Search, Shield, CheckCircle, Bot } from "lucide-react";

interface PlatformDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlatformDemo({ isOpen, onClose }: PlatformDemoProps) {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const demos = [
    {
      title: "AI Document Generation",
      description: "Watch how our AI creates compliant legal documents",
      steps: [
        { action: "User types: 'Generate NDA for California'", delay: 1000 },
        { action: "AI analyzes jurisdiction requirements", delay: 2000 },
        { action: "Generating document with CA-specific clauses...", delay: 3000 },
        { action: "✓ Document ready! Includes compliance features", delay: 4000 }
      ]
    },
    {
      title: "Smart Legal Lookup",
      description: "See how our search finds jurisdiction-specific templates",
      steps: [
        { action: "Search: 'employment contract Ontario'", delay: 1000 },
        { action: "Finding relevant templates...", delay: 2000 },
        { action: "✓ Employment Agreement - Ontario", delay: 3000 },
        { action: "✓ Includes Ontario Employment Standards", delay: 4000 }
      ]
    },
    {
      title: "Risk Analysis & Scanning",
      description: "Watch our AI identify potential legal risks",
      steps: [
        { action: "Analyzing: Service Agreement.pdf", delay: 1000 },
        { action: "Scanning for compliance issues...", delay: 2000 },
        { action: "✓ Standard terms - Low risk", delay: 3000 },
        { action: "⚠️ Unlimited liability clause - Medium risk", delay: 4000 }
      ]
    }
  ];

  useEffect(() => {
    if (isOpen) {
      initializeDemo();
    }
  }, [isOpen]);

  const initializeDemo = () => {
    if (!containerRef.current || !screenRef.current) return;
    
    setCurrentStep(0);
    setCurrentDemo(0);
    
    // Reset screen
    if (typingRef.current) {
      typingRef.current.innerHTML = "";
    }
    
    // Reset progress bar
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
    }
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setCurrentDemo(0);
    runDemo(0);
  };

  const runDemo = (demoIndex: number) => {
    if (demoIndex >= demos.length) {
      setIsPlaying(false);
      return;
    }

    setCurrentDemo(demoIndex);
    const demo = demos[demoIndex];
    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex >= demo.steps.length) {
        // Move to next demo
        setTimeout(() => {
          runDemo(demoIndex + 1);
        }, 2000);
        return;
      }

      const step = demo.steps[stepIndex];
      setCurrentStep(stepIndex);
      
      // Update progress
      const progress = ((demoIndex * demo.steps.length + stepIndex) / (demos.length * demo.steps.length)) * 100;
      
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }

      // Animate typing effect
      if (typingRef.current) {
        typingRef.current.innerHTML = "";
        const text = step.action;
        let charIndex = 0;
        
        const typeChar = () => {
          if (charIndex < text.length) {
            typingRef.current!.innerHTML += text[charIndex];
            charIndex++;
            setTimeout(typeChar, 50);
          }
        };
        
        typeChar();
      }

      stepIndex++;
      setTimeout(runStep, step.delay);
    };

    runStep();
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    pauseDemo();
    initializeDemo();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ParaDoc.app Platform Demo</h2>
              <p className="text-gray-600 mt-1">Experience the power of AI-powered legal document generation</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={isPlaying ? pauseDemo : startDemo}
                variant="outline"
                size="sm"
                className="border-gray-300"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                size="sm"
                className="border-gray-300"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
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
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              ref={progressRef}
              className="bg-gradient-to-r from-gray-600 to-black h-2 rounded-full transition-all duration-500"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div ref={containerRef} className="grid lg:grid-cols-2 gap-8">
            {/* Demo Screen */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Live Demo</h3>
              
              {/* Mock Browser */}
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center mb-3 space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                {/* Demo Screen */}
                <div
                  ref={screenRef}
                  className="bg-white rounded-lg p-4 min-h-[400px] relative overflow-hidden"
                >
                  {/* Typing Area */}
                  <div
                    ref={typingRef}
                    className="text-sm text-gray-800 font-mono min-h-[20px]"
                  ></div>
                  
                  {/* Default Content */}
                  <div className="mt-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>

                  {/* Animated Elements */}
                  {currentStep >= 0 && (
                    <div className="absolute top-4 left-4 right-4 p-3 bg-gray-100 rounded-lg border border-gray-300 animate-fade-in-up">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700">User input</span>
                      </div>
                    </div>
                  )}
                  
                  {currentStep >= 1 && (
                    <div className="absolute top-16 left-4 right-4 p-3 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700">Processing...</span>
                      </div>
                    </div>
                  )}
                  
                  {currentStep >= 2 && (
                    <div className="absolute top-28 left-4 right-4 p-3 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Success!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Demo Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Current Demo</h3>
              
              {/* Demo Selection */}
              <div className="space-y-4">
                {demos.map((demo, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      currentDemo === index
                        ? "border-gray-400 bg-gray-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() => setCurrentDemo(index)}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{demo.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{demo.description}</p>
                    
                    {/* Demo Steps */}
                    <div className="space-y-2">
                      {demo.steps.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className={`text-xs p-2 rounded transition-all duration-300 ${
                            currentDemo === index && stepIndex <= currentStep
                              ? "bg-gray-100 border border-gray-300"
                              : "bg-gray-50"
                          }`}
                        >
                          {step.action}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Highlights */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Document Gen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Smart Search</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Risk Scanner</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">AI Chat</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-8 py-3 w-full"
                >
                  Try ParaDoc.app Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
