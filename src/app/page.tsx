import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, Search, Zap, Shield, MessageSquare, Download, Globe, Users, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-black mr-3" />
              <span className="text-xl font-bold text-black">ParaDoc.app</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-black transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-black transition-colors">About</a>
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Sign In
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 border-black text-black">
            🚀 Now Available in USA & Canada
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            The Canva for
            <span className="block text-gray-600">Legal Documents</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate legally compliant documents, analyze contracts, and get AI-powered legal insights. 
            Built specifically for USA & Canada jurisdiction compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
              Start Creating Documents
            </Button>
            <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-500">
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
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Legal Documents Shouldn&apos;t Be This Hard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional legal processes are expensive, complex, and slow. We&apos;re changing that.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-gray-200 bg-white">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💸</span>
                </div>
                <CardTitle className="text-lg">High Legal Costs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Lawyers charge hundreds for basic documents</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <CardTitle className="text-lg">Complex Legal Language</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Contracts full of confusing jargon</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗺️</span>
                </div>
                <CardTitle className="text-lg">Jurisdiction Confusion</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Laws vary by state and province</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <CardTitle className="text-lg">Slow Processes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Days or weeks for simple documents</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              AI-Powered Legal Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, analyze, and manage legal documents in one platform.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">AI Legal Document Generator</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Generate legally compliant documents tailored to your specific jurisdiction. 
                Simply describe what you need, and our AI creates a professional document in seconds.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  USA & Canada jurisdiction compliance
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Customizable clauses and terms
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Export to PDF, Word, or Google Docs
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Search className="h-6 w-6 text-gray-400 mr-3" />
                    <span className="text-gray-600 font-medium">Legal Document Lookup</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">Smart Legal Document Lookup</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Find compliance-ready templates by state or province. Access jurisdiction-specific 
                clauses and direct links to official government resources.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  State and province-specific templates
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Embedded compliance clauses
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Official government resource links
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">Multi-Document ZIP Converter</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Generate multiple documents at once and download them as a convenient ZIP file. 
                Perfect for businesses needing multiple legal documents.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Bulk document generation
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  ZIP file download
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Enterprise bulk upload support
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <Download className="h-6 w-6 text-gray-400 mr-3" />
                  <span className="text-gray-600 font-medium">Bulk Export</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 bg-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Contract</span>
                  </div>
                  <div className="h-16 bg-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">NDA</span>
                  </div>
                  <div className="h-16 bg-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Policy</span>
                  </div>
                  <div className="h-16 bg-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">+ More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-gray-400 mr-3" />
                    <span className="text-gray-600 font-medium">Risk Analysis</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Level</span>
                      <Badge variant="destructive">High</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full w-3/4"></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      ⚠️ Unusual liability clause detected
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">AI Legal Summarizer & Risk Scanner</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Upload existing contracts and get plain English summaries with risk analysis. 
                Our AI flags dangerous clauses and provides actionable insights.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Plain English summaries
                </li>
                                 <li className="flex items-center text-gray-600">
                   <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                   Risk scanning for dangerous clauses
                 </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Actionable legal insights
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">AI Legal Chatbot</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Ask legal questions in plain English and get instant AI-powered answers. 
                Get suggestions for relevant templates and compliance resources.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Plain English legal Q&A
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  Template suggestions
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  USA & Canada specific guidance
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-gray-400 mr-3" />
                  <span className="text-gray-600 font-medium">Legal Assistant</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-600">How do I create an NDA for my startup?</p>
                  </div>
                  <div className="bg-black text-white rounded-lg p-3">
                    <p className="text-sm">I&apos;ll help you create an NDA. First, let me ask a few questions about your jurisdiction and requirements...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Built for Legal Professionals & Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you&apos;re a freelancer, startup, or law firm, we have solutions designed for your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200 bg-white text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Freelancers & Consultants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Need contracts, NDAs, and service agreements</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Freelance contracts</li>
                  <li>• Non-disclosure agreements</li>
                  <li>• Service agreements</li>
                  <li>• Client onboarding docs</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Startups & SMBs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Require operating agreements and HR policies</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Operating agreements</li>
                  <li>• HR policies</li>
                  <li>• Investor documents</li>
                  <li>• Employment contracts</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Law Firms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Use as internal productivity tool</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Document drafting</li>
                  <li>• Client assistance</li>
                  <li>• Template library</li>
                  <li>• Risk assessment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="border-gray-200 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold text-black">$0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">2 documents per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Basic chatbot access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Summarizer with word limit</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">USA & Canada compliance</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-black bg-black text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-white text-black px-3 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-4xl font-bold">$29</div>
                <CardDescription className="text-gray-300">per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Unlimited document generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Full risk scanning</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Multi-document ZIP export</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-200">Advanced AI features</span>
                  </li>
                </ul>
                <Button className="w-full bg-white text-black hover:bg-gray-100">
                  Start Premium Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-gray-200 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-black">Custom</div>
                <CardDescription>For law firms & large teams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Bulk upload & generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">White-labeled chatbot</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Custom AI fine-tuning</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Dedicated support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Legal Document Process?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who trust ParaDoc.app for their legal document needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg">
              Start Creating Documents
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            No credit card required • Free plan available • USA & Canada compliant
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-black mr-3" />
                <span className="text-xl font-bold text-black">ParaDoc.app</span>
              </div>
              <p className="text-gray-600 mb-4">
                The Canva for Legal Documents. AI-powered, compliant, and accessible.
              </p>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">USA & Canada</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Document Generator</a></li>
                <li><a href="#" className="hover:text-black">Legal Lookup</a></li>
                <li><a href="#" className="hover:text-black">Risk Scanner</a></li>
                <li><a href="#" className="hover:text-black">AI Chatbot</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">About</a></li>
                <li><a href="#" className="hover:text-black">Blog</a></li>
                <li><a href="#" className="hover:text-black">Careers</a></li>
                <li><a href="#" className="hover:text-black">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Help Center</a></li>
                <li><a href="#" className="hover:text-black">Documentation</a></li>
                <li><a href="#" className="hover:text-black">API Reference</a></li>
                <li><a href="#" className="hover:text-black">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              © 2024 ParaDoc.app. All rights reserved. Built for USA & Canada legal compliance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
