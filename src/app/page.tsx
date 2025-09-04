"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Zap, Shield, MessageSquare, Download, ArrowRight, Check, Globe, Clock, DollarSign, ChevronDown, ChevronUp, Star, Play, BookOpen, ShieldCheck, Twitter, Github, Linkedin, Sparkles, Bot, AlertCircle, CheckCircle2, CreditCard, Lock, CheckCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import HowItWorksGuide from "@/components/HowItWorksGuide";
import PlatformDemo from "@/components/PlatformDemo";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showPlatformDemo, setShowPlatformDemo] = useState(false);
  const [isFeatureShowcasePlaying, setIsFeatureShowcasePlaying] = useState(false);
  const [currentShowcaseFeature, setCurrentShowcaseFeature] = useState(0);
  const [isHowItWorksShowcasePlaying, setIsHowItWorksShowcasePlaying] = useState(false);
  const [currentHowItWorksStep, setCurrentHowItWorksStep] = useState(0);
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showLegalDisclaimer, setShowLegalDisclaimer] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-cycle through features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 5);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-play feature showcase
  useEffect(() => {
    if (isVisible) {
      // Show content immediately, then start auto-play after delay
      setIsFeatureShowcasePlaying(true);
      setTimeout(() => {
        startFeatureShowcase();
      }, 3000);
    }
  }, [isVisible]);

  // Auto-play How It Works showcase
  useEffect(() => {
    if (isVisible) {
      // Show content immediately, then start auto-play after delay
      setIsHowItWorksShowcasePlaying(true);
      setTimeout(() => {
        startHowItWorksShowcase();
      }, 6000);
    }
  }, [isVisible]);

  // Auto-swipe testimonials
  useEffect(() => {
    if (isVisible) {
      const testimonialInterval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev === 0 ? 1 : 0));
      }, 5000);
      
      return () => clearInterval(testimonialInterval);
    }
  }, [isVisible]);



  const startFeatureShowcase = () => {
    setCurrentShowcaseFeature(0);
    
    const showcaseInterval = setInterval(() => {
      setCurrentShowcaseFeature((prev) => {
        if (prev >= features.length - 1) {
          clearInterval(showcaseInterval);
          return 0;
        }
        return prev + 1;
      });
    }, 4000);
  };

  const startHowItWorksShowcase = () => {
    setCurrentHowItWorksStep(0);
    
    const showcaseInterval = setInterval(() => {
      setCurrentHowItWorksStep((prev) => {
        if (prev >= howItWorks.length - 1) {
          clearInterval(showcaseInterval);
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
  };

  const faqs = [
    {
      question: "Are documents legally valid?",
      answer: "Yes! All documents are generated using AI trained on current USA & Canada legal frameworks and include jurisdiction-specific compliance clauses. However, we recommend having a legal professional review documents for complex matters."
    },
    {
      question: "Which regions are supported?",
      answer: "ParaDoc.app currently supports all 50 US states and all 13 Canadian provinces and territories. Each document is automatically tailored to your specific jurisdiction's legal requirements."
    },
    {
      question: "Can I try it free before paying?",
      answer: "Absolutely! We offer a free plan with 2 documents per month, basic chatbot access, and full compliance checking. No credit card required to get started."
    },
    {
      question: "How accurate is the AI legal advice?",
      answer: "Our AI is trained on millions of legal documents and continuously updated with current laws. It provides guidance based on established legal principles, but for complex legal matters, we always recommend consulting with a qualified attorney."
    },
    {
      question: "What types of documents can I generate?",
      answer: "We support 50+ document types including contracts, NDAs, employment agreements, privacy policies, terms of service, and more. All documents are automatically customized for your jurisdiction and business needs."
    },
    {
      question: "How does the AI risk scanner work?",
      answer: "Our AI risk scanner analyzes your contracts and legal documents to identify potential issues, unusual clauses, and compliance risks. It flags red flags like unlimited liability, unfair arbitration clauses, and other problematic terms that could put your business at risk."
    },
    {
      question: "Can I export documents to different formats?",
      answer: "Yes! Pro and Enterprise users can export documents to PDF, DOCX, and Google Docs formats. Free users can view and copy the generated text. All exports maintain professional formatting and are ready for immediate use."
    },
    {
      question: "How often are legal frameworks updated?",
      answer: "We continuously monitor legal changes across all supported jurisdictions and update our AI models monthly. This ensures your documents always reflect the most current laws and compliance requirements."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption and never store your document content permanently. Your data is processed securely and deleted after generation. We're SOC 2 compliant and follow strict privacy standards."
    },
    {
      question: "Can I customize generated documents?",
      answer: "Yes! All documents are fully customizable. You can edit clauses, add specific terms, modify language, and adjust formatting. The AI maintains compliance while allowing you to tailor documents to your exact needs."
    },
    {
      question: "What if I need help with a complex legal matter?",
      answer: "While ParaDoc.app handles most standard legal documents, we always recommend consulting with a qualified attorney for complex matters, litigation, or high-stakes transactions. Our tool is designed to complement, not replace, professional legal counsel."
    },
    {
      question: "Do you offer team collaboration features?",
      answer: "Enterprise users get access to team collaboration features including shared folders, multi-user editing, approval workflows, and version control. This makes it easy for legal teams to work together on documents."
    },
    {
      question: "How does the jurisdiction-specific compliance work?",
      answer: "Our AI automatically detects your location and applies the relevant legal requirements. For example, California employment contracts include specific wage and hour laws, while Ontario contracts follow Canadian privacy regulations. This ensures 100% compliance without manual research."
    },
    {
      question: "Can I use this for international business?",
      answer: "Currently, ParaDoc.app focuses on USA and Canada. For international business, we recommend consulting with local legal professionals who understand the specific legal frameworks of those countries."
    },
    {
      question: "What's included in the free trial?",
      answer: "The free trial gives you access to all Pro features for 7 days, including unlimited document generation, AI risk scanning, and multi-format exports. No credit card required, and you can cancel anytime."
    }
  ];

  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "AI Legal Document Generator",
      description: "Generate legally compliant documents tailored to your jurisdiction in minutes, not days.",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      featureList: [
        "Natural language input processing",
        "Jurisdiction-specific compliance",
        "Real-time AI generation",
        "Professional formatting",
        "Multiple document types",
        "Instant customization options"
      ],
      benefits: [
        "100% legally compliant",
        "Save 90% of time",
        "No lawyer fees",
        "Always up-to-date laws"
      ],
      demo: (
        <div className="feature-demo p-6">
          <div className="demo-screen">
            <div className="demo-header">
              <div className="demo-dot bg-red-500"></div>
              <div className="demo-dot bg-yellow-500"></div>
              <div className="demo-dot bg-green-500"></div>
            </div>
            <div className="demo-content">
              <div className="demo-line w-3/4"></div>
              <div className="demo-line w-1/2"></div>
              <div className="demo-line w-5/6"></div>
              <div className="demo-line w-2/3"></div>
            </div>
            <div className="mt-4 p-3 bg-yellow-400/20 border border-yellow-400/30 rounded">
              <p className="text-sm text-yellow-200 font-medium">
                Generating NDA for California...
              </p>
            </div>
            <div className="mt-3 p-3 bg-green-400/20 border border-green-400/30 rounded">
              <p className="text-sm text-green-200 font-medium">
                ✓ Document ready! Includes CA-specific clauses
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Smart Legal Document Lookup",
      description: "Find compliance-ready templates by state or province with embedded jurisdiction-specific clauses.",
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      featureList: [
        "Advanced search algorithms",
        "State/province filtering",
        "Template categorization",
        "Compliance verification",
        "Instant access to 1000+ templates",
        "Regular updates and additions"
      ],
      benefits: [
        "Find templates in seconds",
        "Always compliant",
        "Save research time",
        "Verified legal sources"
      ],
      demo: (
        <div className="feature-demo p-6">
          <div className="demo-screen">
            <div className="demo-header">
              <div className="demo-dot bg-red-500"></div>
              <div className="demo-dot bg-yellow-500"></div>
              <div className="demo-dot bg-green-500"></div>
            </div>
            <div className="demo-content">
              <div className="flex items-center space-x-2 mb-3">
                <Search className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Search: &ldquo;employment contract Ontario&rdquo;</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-blue-400/20 border border-blue-400/30 rounded">
                  <p className="text-sm text-blue-200">📄 Employment Agreement - Ontario</p>
                </div>
                <div className="p-2 bg-green-400/20 border border-green-400/30 rounded">
                  <p className="text-sm text-green-200">✓ Includes Ontario Employment Standards</p>
                </div>
                <div className="p-2 bg-purple-400/20 border border-purple-400/30 rounded">
                  <p className="text-sm text-purple-200">⚖️ Provincial compliance verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Multi-Document ZIP Converter",
      description: "Generate multiple documents at once and download them as a convenient ZIP file.",
      color: "from-gray-800 to-black",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      featureList: [
        "Bulk document generation",
        "One-click ZIP creation",
        "Multiple format support",
        "Batch processing",
        "Enterprise workflow support",
        "Organized file structure"
      ],
      benefits: [
        "Save hours of work",
        "Perfect for businesses",
        "Organized downloads",
        "Professional delivery"
      ],
      demo: (
        <div className="feature-demo p-6">
          <div className="demo-screen">
            <div className="demo-header">
              <div className="demo-dot bg-red-500"></div>
              <div className="demo-dot bg-yellow-500"></div>
              <div className="demo-dot bg-green-500"></div>
            </div>
            <div className="demo-content">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 bg-gray-700 rounded text-center">
                  <FileText className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300">NDA</p>
                </div>
                <div className="p-2 bg-gray-700 rounded text-center">
                  <FileText className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300">Contract</p>
                </div>
                <div className="p-2 bg-gray-700 rounded text-center">
                  <FileText className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300">Policy</p>
                </div>
                <div className="p-2 bg-gray-700 rounded text-center">
                  <FileText className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300">Terms</p>
                </div>
              </div>
              <div className="p-2 bg-green-400/20 border border-green-400/30 rounded">
                <Download className="h-4 w-4 text-green-400 inline mr-2" />
                <span className="text-sm text-green-200">Download as ZIP (4 files)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "AI Legal Summarizer & Risk Scanner",
      description: "Upload existing contracts and get plain English summaries with risk analysis.",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      featureList: [
        "AI-powered document analysis",
        "Plain English summaries",
        "Risk identification & scoring",
        "Compliance checking",
        "Clause-by-clause review",
        "Actionable recommendations"
      ],
      benefits: [
        "Understand complex contracts",
        "Identify hidden risks",
        "Save legal review costs",
        "Make informed decisions"
      ],
      demo: (
        <div className="feature-demo p-6">
          <div className="demo-screen">
            <div className="demo-header">
              <div className="demo-dot bg-red-500"></div>
              <div className="demo-dot bg-yellow-500"></div>
              <div className="demo-dot bg-green-500"></div>
            </div>
            <div className="demo-content">
              <div className="p-2 bg-blue-400/20 border border-blue-400/30 rounded mb-2">
                <p className="text-sm text-blue-200">📄 Analyzing: Service Agreement.pdf</p>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-green-400/20 border border-green-400/30 rounded">
                  <CheckCircle2 className="h-4 w-4 text-green-400 inline mr-2" />
                  <span className="text-sm text-green-200">Standard terms - Low risk</span>
                </div>
                <div className="p-2 bg-yellow-400/20 border border-yellow-400/30 rounded">
                  <AlertCircle className="h-4 w-4 text-yellow-400 inline mr-2" />
                  <span className="text-sm text-yellow-200">Unlimited liability clause - Medium risk</span>
                </div>
                <div className="p-2 bg-red-400/20 border border-red-400/30 rounded">
                  <AlertCircle className="h-4 w-4 text-red-400 inline mr-2" />
                  <span className="text-sm text-red-200">Arbitration clause - High risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "AI Legal Chatbot",
      description: "Ask legal questions in plain English and get instant AI-powered answers with compliance guidance.",
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      featureList: [
        "24/7 legal assistance",
        "Plain English responses",
        "Jurisdiction-specific advice",
        "Instant compliance guidance",
        "Document recommendations",
        "Learning from interactions"
      ],
      benefits: [
        "Get answers instantly",
        "No waiting for lawyers",
        "Always available",
        "Learn as you go"
      ],
      demo: (
        <div className="feature-demo p-6">
          <div className="demo-screen">
            <div className="demo-header">
              <div className="demo-dot bg-red-500"></div>
              <div className="demo-dot bg-yellow-500"></div>
              <div className="demo-dot bg-green-500"></div>
            </div>
            <div className="demo-content">
              <div className="p-2 bg-gray-700 rounded mb-2">
                <p className="text-sm text-gray-300">👤 &ldquo;What&apos;s the difference between an NDA and confidentiality agreement?&rdquo;</p>
              </div>
              <div className="p-2 bg-blue-400/20 border border-blue-400/30 rounded">
                <Bot className="h-4 w-4 text-blue-400 inline mr-2" />
                <p className="text-sm text-blue-200">NDAs are broader and cover all confidential info, while confidentiality agreements are more specific. Both are legally binding in your jurisdiction.</p>
              </div>
              <div className="p-2 bg-green-400/20 border border-green-400/30 rounded mt-2">
                <Sparkles className="h-4 w-4 text-green-400 inline mr-2" />
                <p className="text-sm text-green-200">💡 Tip: Use NDAs for general business relationships</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const pricingPlans = [
    {
      name: "Pro",
      price: "$20",
      period: "per month",
      yearlyPrice: "$510",
      introPrice: "$20",
      introPeriod: "first 3 months",
      regularPrice: "$50",
      features: [
        "Unlimited document generations",
        "Unlimited chatbot conversations with memory",
        "Export to PDF, DOCX, Google Docs",
        "AI summarizer & risk scanner",
        "Smart document lookup",
        "6-month encrypted storage"
      ],
      buttonText: "Start Pro Trial",
      popular: true,
      restrictions: ["7-day free trial", "First 3 months at $20", "Then $50/month", "Cancel anytime"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "Everything in Pro",
        "Bulk ZIP + CSV/JSON upload",
        "Custom AI model tuning",
        "API embedding (law firm systems)",
        "Team access + shared folders",
        "Unlimited encrypted storage"
      ],
      buttonText: "Contact Sales",
      popular: false,
      restrictions: ["Custom pricing", "Dedicated support", "SLA guarantees"]
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Enter your request + location",
      description: "Simply describe what you need and select your state or province for jurisdiction-specific compliance.",
      icon: <FileText className="h-6 w-6" />,
      color: "from-gray-100 to-gray-200",
      featureList: [
        "Natural language input (e.g., 'NDA for freelancer in California')",
        "Jurisdiction selection (State/Province)",
        "Document type specification",
        "Additional requirements input",
        "Smart suggestions based on your needs",
        "Instant compliance preview"
      ],
      benefits: [
        "No legal jargon required",
        "Intuitive interface",
        "Quick setup (30 seconds)",
        "Smart auto-completion"
      ],
      timeEstimate: "30 seconds",
      demo: (
        <div className="bg-gray-900 rounded-lg p-4 shadow-2xl">
          <div className="flex items-center mb-3 space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <div className="space-y-3">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">📝 User types: &ldquo;Generate NDA for freelancer in California&rdquo;</p>
              </div>
              <div className="p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">✓ Jurisdiction: California selected</p>
              </div>
              <div className="p-2 bg-purple-50 border border-purple-200 rounded">
                <p className="text-sm text-purple-800">⚖️ Document type: Non-Disclosure Agreement</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: "2",
      title: "AI generates compliant document",
      description: "Our AI creates a legally compliant document tailored to your jurisdiction and requirements.",
      icon: <Zap className="h-6 w-6" />,
      color: "from-gray-200 to-gray-300",
      featureList: [
        "AI analyzes jurisdiction requirements",
        "Generates compliant clauses",
        "Applies current legal standards",
        "Creates professional formatting",
        "Includes jurisdiction-specific terms",
        "Real-time compliance checking"
      ],
      benefits: [
        "100% legally compliant",
        "AI-powered generation",
        "Real-time processing",
        "Always up-to-date laws"
      ],
      timeEstimate: "2-3 minutes",
      demo: (
        <div className="bg-gray-900 rounded-lg p-4 shadow-2xl">
          <div className="flex items-center mb-3 space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <div className="space-y-3">
              <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">🤖 AI analyzing California legal requirements...</p>
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">⚖️ Generating compliant clauses...</p>
              </div>
              <div className="p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">✓ Document ready with CA-specific compliance</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: "3",
      title: "Review, customize, download",
      description: "Review the document, make any customizations, and download in your preferred format.",
      icon: <Download className="h-6 w-6" />,
      color: "from-gray-300 to-gray-400",
      featureList: [
        "Preview generated document",
        "Edit specific clauses",
        "Add custom terms",
        "Export to PDF/Word/Google Docs",
        "Instant formatting options",
        "Professional document styling"
      ],
      benefits: [
        "Easy editing interface",
        "Multiple export formats",
        "Professional output",
        "Instant customization"
      ],
      timeEstimate: "1-2 minutes",
      demo: (
        <div className="bg-gray-900 rounded-lg p-4 shadow-2xl">
          <div className="flex items-center mb-3 space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="bg-white rounded-lg p-4 min-h-[200px]">
            <div className="space-y-3">
              <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                <p className="text-sm text-gray-800">📄 Document preview with editing tools</p>
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">✏️ Customize clauses and terms</p>
              </div>
              <div className="p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">💾 Download as PDF, Word, or Google Docs</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center shadow-medium animate-fade-in-scale">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ParaDoc.app</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform animate-slide-in-left">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform animate-slide-in-left" style={{ animationDelay: '0.1s' }}>How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform animate-slide-in-left" style={{ animationDelay: '0.2s' }}>Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform animate-slide-in-left" style={{ animationDelay: '0.3s' }}>Contact</a>
            </div>
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 button-hover">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white button-hover shadow-medium">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gray-50 to-gray-100 rounded-full blur-3xl opacity-20 animate-spin-slow"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="mb-6 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 px-4 py-2 text-sm font-medium shadow-soft animate-bounce-in">
                🚀 Now Available in USA & Canada
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                AI-Powered Legal Documents for{" "}
                <span className="accent-gradient-text">
                  USA & Canada
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Generate, review, and manage legally compliant documents in minutes — designed for freelancers, startups, and law firms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Button size="lg" className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white px-8 py-4 text-lg font-semibold shadow-strong button-hover">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-all duration-300 button-hover">
                  <Play className="h-5 w-5 mr-2" />
                  See How It Works
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Free plan available
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  USA & Canada compliant
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white rounded-2xl p-8 shadow-strong border border-gray-200 hover-lift">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-800 font-medium">
                    AI Legal Assistant: Ready to generate compliant documents for your jurisdiction
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center shadow-strong animate-pulse-glow-strong">
                <ShieldCheck className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-gradient relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full blur-2xl opacity-40 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full blur-3xl opacity-20 animate-spin-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 px-4 py-2 text-sm font-medium shadow-soft animate-bounce-in">
                ⚠️ Problem Statement
              </Badge>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up leading-tight">
              Legal Documents Shouldn&apos;t Be{" "}
              <span className="accent-gradient-text relative">
                This Hard
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-600 to-black rounded-full animate-pulse-glow"></div>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Traditional legal processes are expensive, complex, and slow. We&apos;re changing that with{" "}
              <span className="font-semibold text-gray-800">AI-powered simplicity</span>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center group hover-lift animate-fade-in-up transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.1s' }}>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-medium group-hover:shadow-lg">
                  <DollarSign className="h-10 w-10 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Floating price tag */}
                <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce-in" style={{ animationDelay: '1s' }}>
                  $500+
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">Expensive Lawyers</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Hundreds of dollars for basic documents that should cost pennies</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-gray-600 to-black rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
            
            <div className="text-center group hover-lift animate-fade-in-up transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-medium group-hover:shadow-lg">
                  <BookOpen className="h-10 w-10 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Floating complexity indicator */}
                <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce-in" style={{ animationDelay: '1.2s' }}>
                  🤯
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">Legal Jargon</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Confusing language that&apos;s impossible to understand without a law degree</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-gray-600 to-black rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
            
            <div className="text-center group hover-lift animate-fade-in-up transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-medium group-hover:shadow-lg">
                  <Globe className="h-10 w-10 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Floating location indicator */}
                <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce-in" style={{ animationDelay: '1.4s' }}>
                  🌍
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">Compliance Issues</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">State and province-specific requirements that change constantly</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-gray-600 to-black rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
            
            <div className="text-center group hover-lift animate-fade-in-up transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-medium group-hover:shadow-lg">
                  <Clock className="h-10 w-10 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Floating time indicator */}
                <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce-in" style={{ animationDelay: '1.6s' }}>
                  ⏰
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">Time Wasted</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Days or weeks for simple documents that should take minutes</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-gray-600 to-black rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
          
          {/* Enhanced Solution Card */}
          <div className="relative">
            {/* Connecting lines animation */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30"></div>
            
            <div className="bg-white rounded-3xl p-10 shadow-strong border border-gray-200 text-center hover-lift animate-fade-in-up transform transition-all duration-700 hover:scale-[1.02]" style={{ animationDelay: '0.5s' }}>
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-gray-600 rounded-full animate-pulse-glow"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-gray-600 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-gray-600 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-600 rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
              
              <div className="relative z-10">
                <div className="inline-block mb-6">
                  <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 px-6 py-3 text-lg font-semibold shadow-medium animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                    ✨ The Solution
                  </Badge>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  ParaDoc.app: The{" "}
                  <span className="accent-gradient-text relative">
                    All-in-One Solution
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-gray-600 to-black rounded-full animate-pulse-glow"></div>
                  </span>
                </h3>
                
                <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  AI-powered legal document generation that understands your jurisdiction, speaks{" "}
                  <span className="font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">plain English</span>, 
                  and delivers{" "}
                  <span className="font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">compliant results</span> in{" "}
                  <span className="font-bold text-gray-800">minutes — not days</span>.
                </p>
                
                {/* Feature highlights */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors duration-300 group">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-5 w-5 text-gray-700" />
                    </div>
                    <span className="text-gray-700 font-medium">AI-Powered</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors duration-300 group">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-5 w-5 text-gray-700" />
                    </div>
                    <span className="text-gray-700 font-medium">Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors duration-300 group">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-5 w-5 text-gray-700" />
                    </div>
                    <span className="text-gray-700 font-medium">Lightning Fast</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setShowHowItWorks(true)}
                    className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-8 py-4 text-lg font-semibold button-hover shadow-strong transform hover:scale-105 transition-all duration-300"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    See How It Works
                  </Button>
                  <Button 
                    onClick={() => setShowPlatformDemo(true)}
                    variant="outline" 
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-all duration-300 button-hover hover:border-gray-600 hover:text-gray-800"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Watch Demo
                  </Button>
        </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Our MVP 5 pillars provide comprehensive legal document solutions for modern businesses.
            </p>
          </div>
          
          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border-gray-200 bg-white card-hover group ${feature.bgColor} ${feature.borderColor} transition-all duration-500 ${
                  activeFeature === index ? 'ring-2 ring-black scale-105' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(activeFeature)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-medium ${
                    activeFeature === index ? 'animate-pulse-glow-strong' : ''
                  }`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-gray-700 font-medium group-hover:text-black transition-colors">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Feature Showcase */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {isFeatureShowcasePlaying ? 'Live Feature Showcase' : 'Feature Showcase'}
                </h3>
                {isFeatureShowcasePlaying && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Auto-playing</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600">
                {isFeatureShowcasePlaying 
                  ? `Currently showcasing: ${features[currentShowcaseFeature]?.title}`
                  : 'Hover over any feature card above to see a live demonstration'
                }
              </p>
            </div>

            {/* Feature Showcase Container */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200 shadow-lg">
                {/* Current Feature Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${features[currentShowcaseFeature]?.color} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                      isFeatureShowcasePlaying ? 'scale-110 animate-pulse-glow' : ''
                    }`}>
                      <div className="text-white text-2xl">{features[currentShowcaseFeature]?.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {features[currentShowcaseFeature]?.title}
                      </h4>
                      <p className="text-gray-600 max-w-2xl">
                        {features[currentShowcaseFeature]?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature Details Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Feature List */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-gray-600" />
                      Key Features
                    </h5>
                    <div className="space-y-3">
                      {features[currentShowcaseFeature]?.featureList.map((feature, index) => (
                        <div 
                          key={index}
                          className={`flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 transition-all duration-500 ${
                            isFeatureShowcasePlaying ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0'
                          }`}
                          style={{ transitionDelay: `${index * 200}ms` }}
                        >
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-gray-600" />
                      Benefits
                    </h5>
                    <div className="space-y-3">
                      {features[currentShowcaseFeature]?.benefits.map((benefit, index) => (
                        <div 
                          key={index}
                          className={`flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 transition-all duration-500 ${
                            isFeatureShowcasePlaying ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0'
                          }`}
                          style={{ transitionDelay: `${index * 300}ms` }}
                        >
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Demo */}
                <div className="text-center">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Live Demo</h5>
                  <div className="max-w-4xl mx-auto">
                    {features[currentShowcaseFeature]?.demo}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-8">
                  <div className="flex items-center justify-center space-x-2">
                    {features.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentShowcaseFeature
                            ? 'bg-gray-800 scale-125'
                            : index < currentShowcaseFeature
                            ? 'bg-gray-400'
                            : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-600">
                      {currentShowcaseFeature + 1} of {features.length} features
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 section-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Get compliant legal documents in three simple steps
            </p>
          </div>
          
          {/* Step Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group hover-lift animate-fade-in-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-medium group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-gray-700">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Enhanced How It Works Showcase */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {isHowItWorksShowcasePlaying ? 'Live Process Showcase' : 'Process Showcase'}
                </h3>
                {isHowItWorksShowcasePlaying && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Auto-playing</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600">
                {isHowItWorksShowcasePlaying 
                  ? `Currently showcasing: Step ${howItWorks[currentHowItWorksStep]?.step} - ${howItWorks[currentHowItWorksStep]?.title}`
                  : 'See each step of our process in detail with live demonstrations'
                }
              </p>
            </div>

            {/* Process Showcase Container */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200 shadow-lg">
                {/* Current Step Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className={`w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg transition-all duration-500 ${
                      isHowItWorksShowcasePlaying ? 'scale-110 animate-pulse-glow' : ''
                    }`}>
                      {howItWorks[currentHowItWorksStep]?.step}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {howItWorks[currentHowItWorksStep]?.title}
                      </h4>
                      <p className="text-gray-600 max-w-2xl">
                        {howItWorks[currentHowItWorksStep]?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step Details Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Step Features */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-gray-600" />
                      What Happens
                    </h5>
                    <div className="space-y-3">
                      {howItWorks[currentHowItWorksStep]?.featureList.map((feature, index) => (
                        <div 
                          key={index}
                          className={`flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 transition-all duration-500 ${
                            isHowItWorksShowcasePlaying ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0'
                          }`}
                          style={{ transitionDelay: `${index * 200}ms` }}
                        >
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Benefits */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-gray-600" />
                      Benefits
                    </h5>
                    <div className="space-y-3">
                      {howItWorks[currentHowItWorksStep]?.benefits.map((benefit, index) => (
                        <div 
                          key={index}
                          className={`flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 transition-all duration-500 ${
                            isHowItWorksShowcasePlaying ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0'
                          }`}
                          style={{ transitionDelay: `${index * 300}ms` }}
                        >
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time Estimate */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      Estimated time: <strong>{howItWorks[currentHowItWorksStep]?.timeEstimate}</strong>
                    </span>
                  </div>
                </div>

                {/* Live Demo */}
                <div className="text-center">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Live Demo</h5>
                  <div className="max-w-4xl mx-auto">
                    {howItWorks[currentHowItWorksStep]?.demo}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-8">
                  <div className="flex items-center justify-center space-x-2">
                    {howItWorks.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentHowItWorksStep
                            ? 'bg-gray-800 scale-125'
                            : index < currentHowItWorksStep
                            ? 'bg-gray-800'
                            : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-600">
                      Step {currentHowItWorksStep + 1} of {howItWorks.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
            
            {/* Billing Toggle */}
            <div className="mt-8 mb-4 flex items-center justify-center">
              <div className="bg-gray-100 rounded-full p-1 flex items-center space-x-1">
                <button
                  onClick={() => setIsYearlyBilling(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    !isYearlyBilling 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearlyBilling(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isYearlyBilling 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly
                  {isYearlyBilling && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Save 15%
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-gray-200 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-black bg-gradient-to-br from-gray-50 to-gray-100 shadow-strong' : 'bg-white shadow-medium'
              } card-hover animate-fade-in-up`} style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                {plan.popular && (
                  <div className="text-center -mt-3">
                    <Badge className="bg-gradient-to-r from-black to-gray-800 text-white px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                  
                  {/* Introductory Pricing Display */}
                  {plan.name === "Pro" && !isYearlyBilling && (
                    <div className="mb-3">
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.introPrice}</span>
                        <span className="text-lg text-gray-500 line-through">{plan.regularPrice}</span>
                      </div>
                      <p className="text-sm text-gray-600">{plan.introPeriod}</p>
                      <p className="text-lg text-gray-600">Then {plan.regularPrice}/month</p>
                    </div>
                  )}
                  
                  {/* Regular Pricing Display */}
                  {plan.name === "Pro" && isYearlyBilling && (
                    <div className="mb-3">
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.yearlyPrice}</span>
                        <span className="text-lg text-gray-500 line-through">$600</span>
                      </div>
                      <p className="text-lg text-gray-600">per year</p>
                    </div>
                  )}
                  
                  {/* Enterprise Pricing Display */}
                  {plan.name === "Enterprise" && (
                    <div className="mb-3">
                      <div className="text-4xl font-bold text-gray-900">{plan.price}</div>
                      <p className="text-lg text-gray-600">{plan.period}</p>
                    </div>
                  )}
                  
                  {/* Free Trial Badge */}
                  {plan.name === "Pro" && (
                    <div className="mt-2">
                      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                        7-day free trial
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
          </li>
                    ))}
                  </ul>
                  
                  {/* Restrictions */}
                  {plan.restrictions && (
                    <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Plan Restrictions:</h4>
                      <ul className="space-y-1">
                        {plan.restrictions.map((restriction, restrictionIndex) => (
                          <li key={restrictionIndex} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            {restriction}
          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white' 
                      : 'bg-gray-900 text-white hover:bg-black'
                  } transition-all duration-200 transform hover:scale-105 button-hover`}>
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Stripe Integration Info */}
          <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Secure Payment Processing</h3>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                All payments are securely processed through Stripe with enterprise-grade security. 
                Your data is encrypted and protected with industry-standard security measures.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">PCI Compliant</h4>
                  <p className="text-sm text-gray-600">Bank-level security standards</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">256-bit Encryption</h4>
                  <p className="text-sm text-gray-600">Military-grade data protection</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">SOC 2 Certified</h4>
                  <p className="text-sm text-gray-600">Enterprise security compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Trusted by Legal Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Our focus on compliance and accuracy makes us the choice for freelancers, startups, and law firms.
            </p>
          </div>
          
          {/* Enhanced Testimonials with Auto-Swipe */}
          <div className="relative mb-16">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {/* Testimonial Set 1 */}
                <div className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Testimonial Card 1 */}
                    <div className="bg-gray-900 rounded-2xl p-8 text-center hover-lift animate-fade-in-up">
                      <div className="flex justify-center mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" 
                          alt="Alex Thompson" 
                          className="w-16 h-16 rounded-full object-cover border-4 border-gray-700"
                        />
                      </div>
                      <div className="text-4xl text-gray-400 mb-6">&ldquo;</div>
                      <p className="text-gray-200 mb-6 leading-relaxed">
                        ParaDoc.app revolutionized our legal workflow. The AI-generated contracts are incredibly accurate and save us hours of research. The jurisdiction-specific compliance is spot-on!
                      </p>
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-white">Alex Thompson</p>
                        <p className="text-sm text-gray-400">Senior Legal Counsel</p>
                      </div>
                    </div>
                    
                    {/* Testimonial Card 2 */}
                    <div className="bg-gray-900 rounded-2xl p-8 text-center hover-lift animate-fade-in-up">
                      <div className="flex justify-center mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face" 
                          alt="Sarah Chen" 
                          className="w-16 h-16 rounded-full object-cover border-4 border-gray-700"
                        />
                      </div>
                      <div className="text-4xl text-gray-400 mb-6">&ldquo;</div>
                      <p className="text-gray-200 mb-6 leading-relaxed">
                        As a startup founder, I was worried about legal compliance costs. ParaDoc.app made it affordable and efficient. We generated all our contracts in one afternoon!
                      </p>
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-white">Sarah Chen</p>
                        <p className="text-sm text-gray-400">Founder & CEO</p>
                      </div>
                    </div>
                    
                    {/* Testimonial Card 3 */}
                    <div className="bg-gray-900 rounded-2xl p-8 text-center hover-lift animate-fade-in-up">
                      <div className="flex justify-center mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" 
                          alt="Michael Rodriguez" 
                          className="w-16 h-16 rounded-full object-cover border-4 border-gray-700"
                        />
                      </div>
                      <div className="text-4xl text-gray-400 mb-6">&ldquo;</div>
                      <p className="text-gray-200 mb-6 leading-relaxed">
                        The AI risk scanner caught several issues in our existing contracts that our previous lawyer missed. This tool has become essential for our legal team.
                      </p>
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-white">Michael Rodriguez</p>
                        <p className="text-sm text-gray-400">Legal Operations Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial Set 2 */}
                <div className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-8">
                                        {/* Testimonial Card 4 */}
                    <div className="bg-gray-900 rounded-2xl p-8 text-center hover-lift animate-fade-in-up">
                      <div className="flex justify-center mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1580489944761-15f19a654b0e?w=150&h=150&fit=crop&crop=face" 
                          alt="Emily Watson" 
                          className="w-16 h-16 rounded-full object-cover border-4 border-gray-700"
                        />
                      </div>
                      <div className="text-4xl text-gray-400 mb-6">&ldquo;</div>
                      <p className="text-gray-200 mb-6 leading-relaxed">
                        ParaDoc.app&apos;s jurisdiction-specific features are incredible. We operate in multiple states and the compliance accuracy is unmatched. Highly recommend!
                      </p>
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-white">Emily Watson</p>
                        <p className="text-sm text-gray-400">Corporate Attorney</p>
                      </div>
                    </div>
                    
                    {/* Testimonial Card 5 */}
                    <div className="bg-gray-900 rounded-2xl p-8 text-center hover-lift animate-fade-in-up">
                      <div className="flex justify-center mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                          alt="David Kim" 
                          className="w-16 h-16 rounded-full object-cover border-4 border-gray-700"
                        />
                      </div>
                      <div className="text-4xl text-gray-400 mb-6">&ldquo;</div>
                      <p className="text-gray-200 mb-6 leading-relaxed">
                        The document generation speed is unbelievable. What used to take days now takes minutes. ParaDoc.app has transformed our legal department&apos;s efficiency.
                      </p>
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-white">David Kim</p>
                        <p className="text-sm text-gray-400">General Counsel</p>
                      </div>
                    </div>
                    
                    {/* Testimonial Card 6 */}
                    <div className="bg-gray-900 rounded-2xl p-8 text-center hover-lift animate-fade-in-up">
                      <div className="flex justify-center mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
                          alt="Lisa Park" 
                          className="w-16 h-16 rounded-full object-cover border-4 border-gray-700"
                        />
                      </div>
                      <div className="text-4xl text-gray-400 mb-6">&ldquo;</div>
                      <p className="text-gray-200 mb-6 leading-relaxed">
                        As a freelance consultant, ParaDoc.app has been a game-changer. Professional contracts without the lawyer fees. The AI suggestions are incredibly helpful.
                      </p>
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-white">Lisa Park</p>
                        <p className="text-sm text-gray-400">Freelance Consultant</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonial === index ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Trust Indicators & Stats - White Theme */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="text-4xl font-bold text-gray-900 mb-2">45+</div>
              <div className="text-gray-600">Happy customers</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-4xl font-bold text-gray-900 mb-2">5k+</div>
              <div className="text-gray-600">Hours spent on craft</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.8</div>
              <div className="text-gray-600">Review rate</div>
            </div>
          </div>
          
          
          

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Everything you need to know about ParaDoc.app
            </p>
          </div>
          
          <div className="space-y-4">
            {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq, index) => (
              <Card key={index} className="border-gray-200 hover-lift animate-fade-in-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
          
          {/* Show More/Less Button */}
          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Button
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 px-8 py-3"
            >
              {showAllFaqs ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Show More Questions
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 dark-section relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/4 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Main CTA Content */}
          <div className="mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 animate-fade-in-up">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">Trusted by 10,000+ Legal Professionals</span>
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
              Start creating legal documents in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 animate-pulse-glow">
                minutes
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Join thousands of professionals who trust ParaDoc.app for their legal document needs. 
              Generate, review, and manage legally compliant documents with AI-powered precision.
            </p>
            
            {/* Enhanced CTA Button */}
            <div className="flex justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-black button-hover animate-bounce-in group relative overflow-hidden">
                <span className="relative z-10">Get Started Free Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
          
          {/* Trust Indicators & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-white mb-2 animate-count-up">50+</div>
              <div className="text-gray-300 text-sm">Document Types</div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 animate-pulse-glow"></div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-white mb-2 animate-count-up">100%</div>
              <div className="text-gray-300 text-sm">Legal Compliance</div>
              <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mt-3 animate-pulse-glow"></div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-white mb-2 animate-count-up">24/7</div>
              <div className="text-gray-300 text-sm">AI Support</div>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mx-auto mt-3 animate-pulse-glow"></div>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">AI Generation</h4>
              <p className="text-gray-400 text-sm">Smart document creation</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Risk Scanner</h4>
              <p className="text-gray-400 text-sm">Identify legal issues</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Jurisdiction</h4>
              <p className="text-gray-400 text-sm">USA & Canada focused</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Lightning Fast</h4>
              <p className="text-gray-400 text-sm">Generate in minutes</p>
            </div>
          </div>
          
          {/* Final Trust Statement */}
          <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="flex items-center justify-center space-x-6 text-gray-400 text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>7-Day Free Trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer Button */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <Button
            onClick={() => setShowLegalDisclaimer(true)}
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 px-8 py-4 text-lg font-medium group"
          >
            <span className="mr-3">⚠️</span>
            Important Legal Disclaimer
            <span className="ml-3 text-gray-500 group-hover:text-gray-700 transition-colors">→</span>
          </Button>
          <p className="text-gray-600 mt-4 text-sm">
            Please read our comprehensive legal disclaimers before using our AI-powered services
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Enhanced Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-gray-200/40 to-gray-300/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-200/30 to-gray-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-gray-300/20 to-gray-200/10 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute top-2/3 right-1/3 w-48 h-48 bg-gradient-to-br from-gray-200/25 to-gray-300/15 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-1 gap-12 mb-16">
            {/* Company Info - Enhanced */}
            <div className="group">
              <div className="flex items-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-3xl flex items-center justify-center mr-6 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <FileText className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-900 group-hover:text-black transition-colors duration-300">ParaDoc.app</span>
                  <div className="text-sm text-gray-500 mt-2 group-hover:text-gray-700 transition-colors duration-300">AI-Powered Legal Solutions</div>
                </div>
              </div>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                AI-powered legal documents for the modern world. Compliant, fast, and accessible for USA & Canada.
              </p>
              
              {/* Enhanced Social Media Icons */}
              <div className="flex space-x-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a 
                  href="https://twitter.com/paradocapp" 
            target="_blank"
            rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group/social hover:bg-gray-50 border border-gray-100 hover:border-blue-200"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-6 w-6 text-gray-600 group-hover/social:text-blue-500 transition-all duration-300 group-hover/social:scale-110" />
          </a>
          <a
                  href="https://github.com/Nikking18/paradoc-app" 
            target="_blank"
            rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group/social hover:bg-gray-50 border border-gray-100 hover:border-gray-300"
                  aria-label="View our GitHub repository"
          >
                  <Github className="h-6 w-6 text-gray-600 group-hover/social:text-gray-900 transition-all duration-300 group-hover/social:scale-110" />
          </a>
        <a
                  href="https://linkedin.com/company/paradocapp" 
          target="_blank"
          rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group/social hover:bg-gray-50 border border-gray-100 hover:border-blue-300"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-gray-600 group-hover/social:text-blue-600 transition-all duration-300 group-hover/social:scale-110" />
                </a>
              </div>
            </div>
            
          </div>
          
          
          {/* Enhanced Bottom Footer */}
          <div className="border-t border-gray-200 pt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-center md:text-left group">
                <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                  © 2025 ParaDoc.app. All rights reserved. Built for USA & Canada legal compliance.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {[
                  { text: "Privacy Policy", href: "/privacy", description: "How we protect your data" },
                  { text: "Terms of Service", href: "/terms", description: "Our service terms and conditions" },
                  { text: "Cookie Policy", href: "/cookies", description: "Information about cookies usage" },
                  { text: "GDPR", href: "/gdpr", description: "Data protection and privacy rights" }
                ].map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-105 relative group py-1 px-2 rounded hover:bg-gray-100"
                    title={item.description}
                  >
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
                    {item.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Components */}
      <HowItWorksGuide 
        isOpen={showHowItWorks} 
        onClose={() => setShowHowItWorks(false)} 
      />
      
      <PlatformDemo 
        isOpen={showPlatformDemo} 
        onClose={() => setShowPlatformDemo(false)} 
      />

      {/* Legal Disclaimer Modal */}
      {showLegalDisclaimer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  <h3 className="text-xl font-bold text-gray-900">Important Legal Disclaimer</h3>
                </div>
                <Button
                  onClick={() => setShowLegalDisclaimer(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="px-6 py-6">
              <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800 font-medium">
                    <strong>⚠️ Important:</strong> This disclaimer contains critical legal information about the use of our AI-powered services. 
                    Please read carefully before using ParaDoc.app.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">AI-Generated Content Notice</h4>
                  <p>
                    ParaDoc.app utilizes artificial intelligence (AI) technology to generate legal documents, summaries, and content. 
                    All AI-generated materials are provided for informational and educational purposes only.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Not Legal Advice</h4>
                  <p>
                    The content generated by our AI system does not constitute legal advice, legal representation, or attorney-client relationship. 
                    Our AI-generated documents are not a substitute for professional legal counsel from qualified attorneys licensed in your jurisdiction.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Accuracy & Compliance</h4>
                  <p>
                    While we strive for accuracy and current legal compliance, AI-generated content may contain errors, omissions, or outdated information. 
                    Laws and regulations change frequently and vary by jurisdiction. Users are responsible for verifying the accuracy, completeness, and current legal status of all generated content.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Review Required</h4>
                  <p>
                    We strongly recommend that all AI-generated legal documents be reviewed by qualified legal professionals before use in any legal proceeding, 
                    business transaction, or other legal matter. This is especially important for complex legal issues, high-stakes transactions, or matters involving significant financial or legal consequences.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h4>
                  <p>
                    ParaDoc.app, its affiliates, employees, and AI systems are not liable for any damages, losses, or legal consequences arising from the use of 
                    AI-generated content. Users assume all risks and responsibilities associated with the use of our services.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Jurisdictional Limitations</h4>
                  <p>
                    Our services are designed for use in the United States and Canada. Users outside these jurisdictions should consult with local legal professionals 
                    regarding the applicability and compliance of any generated content with their local laws.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Terms of Use</h4>
                  <p>
                    By using ParaDoc.app, you acknowledge that you have read, understood, and agree to these disclaimers and our complete Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  By clicking &ldquo;I Accept&rdquo;, you acknowledge reading this disclaimer
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowLegalDisclaimer(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => setShowLegalDisclaimer(false)}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                  >
                    I Accept
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
