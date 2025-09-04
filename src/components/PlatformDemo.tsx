"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, RotateCcw, FileText, Search, Shield, CheckCircle, Bot, Zap, Sparkles } from "lucide-react";

interface PlatformDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlatformDemo({ isOpen, onClose }: PlatformDemoProps) {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [typingText, setTypingText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const demos = useMemo(() => [
    {
      title: "AI Document Generation",
      description: "Watch how our AI creates compliant legal documents",
      icon: <FileText className="h-6 w-6" />,
      color: "from-gray-100 to-gray-200",
      steps: [
        { 
          action: "User types: 'Generate NDA for California'", 
          delay: 1500,
          result: "AI analyzes California legal requirements",
          icon: <FileText className="h-4 w-4" />,
          details: "User enters specific requirements and jurisdiction"
        },
        { 
          action: "AI generates compliant clauses", 
          delay: 2000,
          result: "Document includes CA-specific terms",
          icon: <Zap className="h-4 w-4" />,
          details: "AI creates compliant document structure"
        },
        { 
          action: "Review and customize", 
          delay: 1500,
          result: "Ready to download in multiple formats",
          icon: <CheckCircle className="h-4 w-4" />,
          details: "Complete document with customization options"
        }
      ]
    },
    {
      title: "Smart Document Lookup",
      description: "See how our search finds the perfect template",
      icon: <Search className="h-6 w-6" />,
      color: "from-gray-200 to-gray-300",
      steps: [
        { 
          action: "Search: 'Employment contract Ontario'", 
          delay: 1500,
          result: "Found 12 Ontario-compliant templates",
          icon: <Search className="h-4 w-4" />,
          details: "User searches for specific jurisdiction template"
        },
        { 
          action: "Filter by industry and type", 
          delay: 1500,
          result: "Narrowed to 3 perfect matches",
          icon: <Zap className="h-4 w-4" />,
          details: "AI filters results by relevance"
        },
        { 
          action: "Preview and select", 
          delay: 1500,
          result: "Template ready for customization",
          icon: <CheckCircle className="h-4 w-4" />,
          details: "Template selected and ready for use"
        }
      ]
    },
    {
      title: "Risk Scanner Analysis",
      description: "Watch our AI identify potential legal risks",
      icon: <Shield className="h-6 w-6" />,
      color: "from-gray-300 to-gray-400",
      steps: [
        { 
          action: "Upload existing contract", 
          delay: 1500,
          result: "AI analyzes 47 clauses",
          icon: <FileText className="h-4 w-4" />,
          details: "AI processes uploaded document"
        },
        { 
          action: "Risk assessment in progress", 
          delay: 2000,
          result: "Identified 3 medium-risk clauses",
          icon: <Shield className="h-4 w-4" />,
          details: "AI reviews legal terms and conditions"
        },
        { 
          action: "Generate recommendations", 
          delay: 1500,
          result: "Actionable suggestions provided",
          icon: <CheckCircle className="h-4 w-4" />,
          details: "AI provides remediation suggestions"
        }
      ]
    }
  ], []);

  const runDemo = useCallback((demoIndex: number) => {
    if (demoIndex >= demos.length) {
      setIsPlaying(false);
      setShowSuccess(true);
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
        }, 2500);
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
      animateTyping(step.action);

      stepIndex++;
      setTimeout(runStep, step.delay);
    };

    runStep();
  }, [demos]);

  const startDemo = useCallback(() => {
    setIsPlaying(true);
    setCurrentStep(0);
    setCurrentDemo(0);
    setShowSuccess(false);
    runDemo(0);
  }, [runDemo]);

  useEffect(() => {
    if (isOpen) {
      initializeDemo();
      // Auto-start after a short delay
      setTimeout(() => {
        startDemo();
      }, 1000);
    }
  }, [isOpen, startDemo]);

  const initializeDemo = () => {
    if (!containerRef.current || !screenRef.current) return;
    
    setCurrentStep(0);
    setCurrentDemo(0);
    setShowSuccess(false);
    setTypingText("");
    
    // Reset progress bar
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
    }
  };

  const animateTyping = (text: string) => {
    setTypingText("");
    let charIndex = 0;
    
    const typeChar = () => {
      if (charIndex < text.length) {
        setTypingText(prev => prev + text[charIndex]);
        charIndex++;
        setTimeout(typeChar, 50);
      }
    };
    
    typeChar();
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    pauseDemo();
    initializeDemo();
    setTimeout(() => {
      startDemo();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
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
              className="bg-gradient-to-r from-gray-600 to-black h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div ref={containerRef} className="grid lg:grid-cols-2 gap-8">
            {/* Demo Screen */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Live Demo</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Live</span>
                </div>
              </div>
              
              {/* Mock Browser */}
              <div className="bg-gray-900 rounded-lg p-4 shadow-2xl">
                <div className="flex items-center mb-3 space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                {/* Demo Screen */}
                <div
                  ref={screenRef}
                  className="bg-white rounded-lg p-6 min-h-[500px] relative overflow-hidden"
                >
                  {/* Header with current demo info */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${demos[currentDemo]?.color} rounded-xl flex items-center justify-center shadow-medium`}>
                        {demos[currentDemo]?.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{demos[currentDemo]?.title}</h4>
                        <p className="text-sm text-gray-600">{demos[currentDemo]?.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Step {currentStep + 1} of {demos[currentDemo]?.steps.length}</div>
                      <div className="text-sm font-medium text-gray-700">{demos[currentDemo]?.steps[currentStep]?.action}</div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="space-y-6">
                    {/* Typing Area */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-600 font-medium">AI Assistant</span>
                      </div>
                      <div className="text-sm text-gray-800 font-mono min-h-[24px]">
                        {typingText}
                        <span className="inline-block w-2 h-4 bg-gray-800 ml-1 animate-pulse"></span>
                      </div>
                    </div>
                    
                    {/* Current Step Details */}
                    {demos[currentDemo]?.steps[currentStep] && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 animate-fade-in-up">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            {demos[currentDemo]?.steps[currentStep]?.icon}
                          </div>
                          <div>
                            <h5 className="font-medium text-blue-900 mb-1">
                              {demos[currentDemo]?.steps[currentStep]?.action}
                            </h5>
                            <p className="text-sm text-blue-700">
                              {demos[currentDemo]?.steps[currentStep]?.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Progress Indicators */}
                    <div className="grid grid-cols-3 gap-4">
                      {demos[currentDemo]?.steps.map((step, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                            index <= currentStep
                              ? "border-gray-400 bg-gray-50 shadow-md"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index < currentStep
                                ? "bg-green-500 text-white"
                                : index === currentStep
                                ? "bg-blue-500 text-white animate-pulse"
                                : "bg-gray-200 text-gray-600"
                            }`}>
                              {index < currentStep ? <CheckCircle className="h-3 w-3" /> : index + 1}
                            </div>
                            <span className="text-xs font-medium text-gray-700">
                              {index === 0 ? "Input" : index === 1 ? "Process" : index === 2 ? "Generate" : "Complete"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 line-clamp-2">{step.action}</div>
                        </div>
                      ))}
                    </div>

                    {/* Success Message */}
                    {showSuccess && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200 animate-bounce-in">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-green-900">Demo Complete!</h5>
                            <p className="text-sm text-green-700">You&apos;ve seen all the key features of ParaDoc.app</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                    className={`p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer ${
                      currentDemo === index
                        ? "border-gray-400 bg-gray-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:scale-102"
                    }`}
                    onClick={() => setCurrentDemo(index)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${demo.color} rounded-xl flex items-center justify-center shadow-medium`}>
                        {demo.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{demo.title}</h4>
                        <p className="text-gray-600 text-sm">{demo.description}</p>
                      </div>
                    </div>
                    
                    {/* Demo Steps */}
                    <div className="space-y-2">
                      {demo.steps.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className={`text-xs p-2 rounded transition-all duration-300 ${
                            currentDemo === index && stepIndex <= currentStep
                              ? "bg-gray-100 border border-gray-300 shadow-sm"
                              : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              stepIndex < currentStep
                                ? "bg-green-500"
                                : stepIndex === currentStep
                                ? "bg-blue-500 animate-pulse"
                                : "bg-gray-300"
                            }`}></div>
                            <span>{step.action}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Highlights */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-gray-600" />
                  Key Features
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-gray-700" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Document Gen</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Search className="h-4 w-4 text-gray-700" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Smart Search</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-gray-700" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Risk Scanner</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-gray-700" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">AI Chat</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-xs text-gray-600">Demo Types</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-600">Total Steps</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-xs text-gray-600">Compliance</div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-8 py-3 w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Zap className="h-5 w-5 mr-2" />
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
