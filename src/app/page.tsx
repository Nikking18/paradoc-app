"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Zap, Shield, MessageSquare, ChevronDown, Github, Twitter, Linkedin, ArrowRight, Check, Play, Users, BarChart3, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "AI Legal Assistant",
      description: "Chat with ParaDoc to understand contracts, get instant feedback, and make updates",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Document Generation",
      description: "Generate legally compliant documents tailored to your jurisdiction",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Risk Analysis & Compliance",
      description: "Get immediate feedback on every document with AI-powered compliance checking",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const stats = [
    { number: "50+", label: "Document Templates", icon: <FileText className="h-6 w-6" /> },
    { number: "100%", label: "Compliance Rate", icon: <Shield className="h-6 w-6" /> },
    { number: "24/7", label: "AI Support", icon: <MessageSquare className="h-6 w-6" /> },
    { number: "10k+", label: "Happy Users", icon: <Users className="h-6 w-6" /> }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["2 documents per month", "Basic chatbot access", "Summarizer with word limit", "USA & Canada compliance"],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Premium",
      price: "$29",
      period: "per month",
      features: ["Unlimited document generation", "Full risk scanning", "Multi-document ZIP export", "Priority support", "Advanced AI features"],
      buttonText: "Start Premium Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: ["Bulk upload & generation", "White-labeled chatbot", "Team collaboration", "Custom AI fine-tuning", "Dedicated support"],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ParaDoc.app
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-105">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-105">Pricing</a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-105">Docs</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-105">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 transition-all duration-200">
                Log in
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-200 transform hover:scale-105">
                Sign up
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              🚀 Now Available in USA & Canada
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
              <span className="text-white">Legal documents for the</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 mt-2 animate-pulse">
                age of AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Give your team an AI-bot who generates higher quality legal documents, faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                Get started for free
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 group">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 mb-8">Trusted by leading companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['Vercel', 'Duolingo', 'Ramp', 'Asana'].map((company, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl font-bold text-gray-500 group-hover:text-gray-300 transition-colors duration-300 mb-2">
                  {company}
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                  How {company} scales with AI-powered legal docs
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ask, generate, analyze. All in one place.
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Now you can chat with ParaDoc to get context on legal documents, fix compliance issues, 
              resolve risks, and update your contracts, right in your workflow.
            </p>
          </div>
          
          {/* Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    activeFeature === index 
                      ? `${feature.bgColor} ${feature.borderColor} scale-105` 
                      : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Interactive Demo */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/30">
                  <p className="text-sm text-purple-300">
                    {activeFeature === 0 && "AI Legal Assistant: Ready to help with your legal questions"}
                    {activeFeature === 1 && "Document Generator: Creating compliant legal documents..."}
                    {activeFeature === 2 && "Risk Analysis: Scanning for compliance issues..."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Search className="h-6 w-6" />, title: "Legal Document Lookup", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/20" },
              { icon: <Download className="h-6 w-6" />, title: "Bulk Document Export", color: "from-red-500 to-red-600", bgColor: "bg-red-500/10", borderColor: "border-red-500/20" },
              { icon: <Zap className="h-6 w-6" />, title: "Instant Legal Insights", color: "from-indigo-500 to-indigo-600", bgColor: "bg-indigo-500/10", borderColor: "border-indigo-500/20" }
            ].map((feature, index) => (
              <Card key={index} className={`border-gray-800 bg-gray-900 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 group ${feature.bgColor} ${feature.borderColor}`}>
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Advanced features to streamline your legal workflow and improve productivity.
                  </p>
                  <div className="flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Platform Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Your unified legal platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Supercharge your team with AI-powered insights, compliance tracking, automations, and analytics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="h-8 w-8" />, title: "Compliance Tracking", color: "from-blue-500 to-blue-600", description: "Monitor compliance status across all documents" },
              { icon: <MessageSquare className="h-8 w-8" />, title: "AI Chat", color: "from-green-500 to-green-600", description: "Get instant legal advice and analysis" },
              { icon: <Zap className="h-8 w-8" />, title: "Automations", color: "from-purple-500 to-purple-600", description: "Automate repetitive legal tasks" },
              { icon: <BarChart3 className="h-8 w-8" />, title: "Analytics", color: "from-orange-500 to-orange-600", description: "Track performance and productivity" }
            ].map((feature, index) => (
              <Card key={index} className="border-gray-800 bg-gray-900 text-center hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2 group">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-gray-800 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50' : 'bg-gray-900'
              }`}>
                {plan.popular && (
                  <div className="text-center -mt-3">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-white">{plan.price}</div>
                  <p className="text-gray-400">{plan.period}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  } transition-all duration-200 transform hover:scale-105`}>
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Built for the world&apos;s fastest legal teams, now available for everyone
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Request a demo
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Start free trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800 bg-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  ParaDoc.app
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Legal documents for the age of AI. AI-powered, compliant, and accessible.
              </p>
              <div className="flex space-x-4">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 ParaDoc.app. All rights reserved. Built for USA & Canada legal compliance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
