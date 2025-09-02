import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Zap, Shield, MessageSquare, Download, ArrowRight } from "lucide-react";

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
              <a href="#docs" className="text-gray-600 hover:text-black transition-colors">Docs</a>
              <a href="#contact" className="text-gray-600 hover:text-black transition-colors">Contact</a>
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
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-8 border-black text-black bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium">
            🚀 Now Available in USA & Canada
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-8 leading-tight tracking-tight">
            Legal documents for the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 mt-2">
              age of AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            ParaDoc.app helps legal professionals and businesses create compliant documents, analyze contracts, 
            and get AI-powered insights in one unified platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-black/25 transition-all duration-300 transform hover:scale-105">
              Get started for free
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-black text-black hover:bg-black hover:text-white px-10 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Request a demo
            </Button>
          </div>
          
          <p className="text-lg text-gray-500 mb-8">
            Trusted by 10,000+ legal professionals at top firms and companies
          </p>
          
          {/* Customer Logos */}
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Shopify</div>
            <div className="text-2xl font-bold text-gray-400">Tecton</div>
            <div className="text-2xl font-bold text-gray-400">Ramp</div>
            <div className="text-2xl font-bold text-gray-400">Asana</div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              Ask, generate, analyze. All in one place.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Now you can chat with ParaDoc to get context on legal documents, fix compliance issues, 
              resolve risks, and update your contracts, right in your workflow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">AI Legal Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Chat with ParaDoc to understand your contracts, get instant feedback, and make updates, 
                  right where you&apos;re working.
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  Start chatting
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Smart Document Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate legally compliant documents tailored to your jurisdiction with AI-powered 
                  templates and customizable clauses.
                </p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Risk Analysis & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get immediate, actionable feedback on every document with ParaDoc&apos;s compliance-aware AI 
                  and risk scanning.
                </p>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Legal Document Lookup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Find compliance-ready templates by state or province with embedded jurisdiction-specific 
                  clauses and official resources.
                </p>
                <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Bulk Document Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate multiple documents at once and download them as a convenient ZIP file. 
                  Perfect for businesses needing multiple legal documents.
                </p>
                <div className="flex items-center text-red-600 font-medium group-hover:text-red-700 transition-colors">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Instant Legal Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Turn legal questions into suggested changes and get detailed explanations for every 
                  modification with one click.
                </p>
                <div className="flex items-center text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              Everything you need to work faster
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              One end-to-end tool to simplify and accelerate your legal document workflow
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-black mb-6">
                Stay compliant with AI-powered insights
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                AI-powered compliance checking allows you to build upon existing documents without waiting 
                for legal review. ParaDoc&apos;s AI and VS Code extension enable users to effortlessly create 
                compliant documents, among many other powerful legal features.
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                  Start generating
                </Button>
                <div className="text-sm text-gray-500">
                  Read more about our AI
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
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

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
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
              <h3 className="text-3xl font-bold text-black mb-6">
                A review experience built for legal teams
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                One unified inbox and review workflow for your team&apos;s legal documents. Get instant 
                feedback, track changes, and maintain version control all in one place.
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                  Learn more
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-black mb-6">
                Don&apos;t miss compliance deadlines
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Actionable notifications that meet you where you are. Get alerts for compliance 
                deadlines, document updates, and legal requirements across all your platforms.
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                  Read the docs
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-gray-400 mr-3" />
                  <span className="text-gray-600 font-medium">Notifications</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="text-sm text-blue-800">Contract review due in 2 days</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="text-sm text-green-800">Compliance check passed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Platform Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              Your unified legal platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Supercharge your team with AI-powered insights, compliance tracking, automations, and analytics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-gray-200 bg-white text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Compliance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Monitor compliance status across all documents and jurisdictions</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">AI Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get instant legal advice and document analysis</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Automations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Automate repetitive legal tasks and workflows</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Track document performance and team productivity</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Integration */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              Legal infrastructure built for your team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ParaDoc works seamlessly with the technologies you already use
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">Where change happens</h3>
              <p className="text-gray-600 leading-relaxed">
                Organizations that adopt ParaDoc create more compliant documents with faster review cycles 
                and reduced legal risks.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">Synced with your workflow</h3>
              <p className="text-gray-600 leading-relaxed">
                Deep integration means your team is always on the same page with real-time updates 
                and collaborative features.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">Built for modern teams</h3>
              <p className="text-gray-600 leading-relaxed">
                ParaDoc is designed to work with all your existing tools, scripts, and workflows 
                for seamless integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Built for the world&apos;s fastest legal teams, now available for everyone
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
              Request a demo
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Start free trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-black mr-3" />
                <span className="text-xl font-bold text-black">ParaDoc.app</span>
              </div>
              <p className="text-gray-600 mb-4">
                Legal documents for the age of AI. AI-powered, compliant, and accessible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Features</a></li>
                <li><a href="#" className="hover:text-black">Pricing</a></li>
                <li><a href="#" className="hover:text-black">Docs</a></li>
                <li><a href="#" className="hover:text-black">Customers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Blog</a></li>
                <li><a href="#" className="hover:text-black">Careers</a></li>
                <li><a href="#" className="hover:text-black">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">Community</a></li>
                <li><a href="#" className="hover:text-black">Privacy policy</a></li>
                <li><a href="#" className="hover:text-black">Terms of service</a></li>
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
