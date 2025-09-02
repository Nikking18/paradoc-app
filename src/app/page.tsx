"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Zap, Shield, MessageSquare, Download, ArrowRight, Check, Globe, Clock, DollarSign, ChevronDown, ChevronUp, Star, Play, BookOpen, ShieldCheck, Twitter, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    }
  ];

  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "AI Legal Document Generator",
      description: "Generate legally compliant documents tailored to your jurisdiction in minutes, not days.",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Smart Legal Document Lookup",
      description: "Find compliance-ready templates by state or province with embedded jurisdiction-specific clauses.",
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Multi-Document ZIP Converter",
      description: "Generate multiple documents at once and download them as a convenient ZIP file.",
      color: "from-gray-800 to-black",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "AI Legal Summarizer & Risk Scanner",
      description: "Upload existing contracts and get plain English summaries with risk analysis.",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "AI Legal Chatbot",
      description: "Ask legal questions in plain English and get instant AI-powered answers with compliance guidance.",
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["2 documents per month", "Basic chatbot access", "Summarizer with word limit", "USA & Canada compliance", "Email support"],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Premium",
      price: "$29",
      period: "per month",
      features: ["Unlimited document generation", "Full risk scanning", "Multi-document ZIP export", "Priority support", "Advanced AI features", "Custom templates"],
      buttonText: "Start Premium Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: ["Bulk upload & generation", "White-labeled chatbot", "Team collaboration", "Custom AI fine-tuning", "Dedicated support", "API access"],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Enter your request + location",
      description: "Simply describe what you need and select your state or province for jurisdiction-specific compliance.",
      icon: <FileText className="h-6 w-6" />
    },
    {
      step: "2",
      title: "AI generates compliant document",
      description: "Our AI creates a legally compliant document tailored to your jurisdiction and requirements.",
      icon: <Zap className="h-6 w-6" />
    },
    {
      step: "3",
      title: "Review, customize, download",
      description: "Review the document, make any customizations, and download in your preferred format.",
      icon: <Download className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center shadow-medium">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ParaDoc.app</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors hover:scale-105 transform">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
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
              <Badge className="mb-6 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 px-4 py-2 text-sm font-medium shadow-soft animate-fade-in-up">
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
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center shadow-strong animate-pulse-glow">
                <ShieldCheck className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Legal Documents Shouldn&apos;t Be This Hard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Traditional legal processes are expensive, complex, and slow. We&apos;re changing that.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center group hover-lift">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expensive Lawyers</h3>
              <p className="text-gray-600">Hundreds of dollars for basic documents</p>
            </div>
            <div className="text-center group hover-lift">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Legal Jargon</h3>
              <p className="text-gray-600">Confusing language that&apos;s hard to understand</p>
            </div>
            <div className="text-center group hover-lift">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compliance Issues</h3>
              <p className="text-gray-600">State and province-specific requirements</p>
            </div>
            <div className="text-center group hover-lift">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Time Wasted</h3>
              <p className="text-gray-600">Days or weeks for simple documents</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-strong border border-gray-200 text-center hover-lift">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ParaDoc.app: The All-in-One Solution
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              AI-powered legal document generation that understands your jurisdiction, speaks plain English, 
              and delivers compliant results in minutes — not days.
            </p>
            <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white px-8 py-3 button-hover">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our MVP 5 pillars provide comprehensive legal document solutions for modern businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`border-gray-200 bg-white card-hover group ${feature.bgColor} ${feature.borderColor}`}>
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-medium`}>
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
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 section-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get compliant legal documents in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group hover-lift">
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
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-gray-200 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-black bg-gradient-to-br from-gray-50 to-gray-100 shadow-strong' : 'bg-white shadow-medium'
              } card-hover`}>
                {plan.popular && (
                  <div className="text-center -mt-3">
                    <Badge className="bg-gradient-to-r from-black to-gray-800 text-white px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900">{plan.price}</div>
                  <p className="text-gray-600">{plan.period}</p>
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
        </div>
      </section>

      {/* Testimonials / Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by Legal Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our focus on compliance and accuracy makes us the choice for freelancers, startups, and law firms.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-strong border border-gray-200 text-center hover-lift">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;ParaDoc.app saved me hours of research and drafting. The compliance checking is incredibly accurate.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">Sarah Chen</p>
              <p className="text-sm text-gray-500">Freelance Consultant</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-strong border border-gray-200 text-center hover-lift">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;As a startup, we needed fast, compliant legal docs. ParaDoc.app delivered exactly what we needed.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">Marcus Rodriguez</p>
              <p className="text-sm text-gray-500">Founder, TechStart</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-strong border border-gray-200 text-center hover-lift">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;The jurisdiction-specific compliance is excellent. Our law firm uses it for client assistance.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">Jennifer Walsh</p>
              <p className="text-sm text-gray-500">Partner, Walsh & Associates</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">Trusted by leading companies and professionals</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Vercel</div>
              <div className="text-2xl font-bold text-gray-400">Duolingo</div>
              <div className="text-2xl font-bold text-gray-400">Ramp</div>
              <div className="text-2xl font-bold text-gray-400">Asana</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about ParaDoc.app
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-gray-200 hover-lift">
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
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 dark-section relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start creating legal documents in minutes.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who trust ParaDoc.app for their legal document needs.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-black button-hover">
            Get Started Free Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center mr-3 shadow-medium">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ParaDoc.app</span>
              </div>
              <p className="text-gray-600 mb-4">
                AI-powered legal documents for the modern world. Compliant, fast, and accessible.
              </p>
              <div className="flex space-x-4">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors hover:scale-110 transform" />
                <Github className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors hover:scale-110 transform" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors hover:scale-110 transform" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Company</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Document Generator</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Legal Lookup</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Risk Scanner</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">AI Chatbot</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600">
              © 2025 ParaDoc.app. All rights reserved. Built for USA & Canada legal compliance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
