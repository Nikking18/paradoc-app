import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Zap, Shield, MessageSquare, ChevronDown, Github, Twitter, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-white mr-3" />
              <span className="text-xl font-bold text-white">ParaDoc.app</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#onboard" className="text-gray-300 hover:text-white transition-colors">Onboard</a>
              <a href="#discover" className="text-gray-300 hover:text-white transition-colors">Discover</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
              <a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500">
                Log in
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800">
                Sign up
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-8">
            Trusted by 10,000+ legal professionals and law firms
          </p>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Legal documents for the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mt-2">
              age of AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Give your team an AI-bot who generates higher quality legal documents, faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg font-semibold transition-all duration-300">
              Request a demo
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 px-10 py-6 text-lg font-semibold transition-all duration-300">
              Get started for free
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <section className="py-16 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 mb-2">Vercel</div>
              <p className="text-sm text-gray-500">How Vercel makes legal teams more productive by 30%</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 mb-2">Duolingo</div>
              <p className="text-sm text-gray-500">How Duolingo scales compliance with AI-powered docs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 mb-2">Ramp</div>
              <p className="text-sm text-gray-500">How Ramp ships legal documents 3x faster</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 mb-2">Asana</div>
              <p className="text-sm text-gray-500">How Asana maintains compliance across 100+ countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 1: Ask, update, commit. All in one place. */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Ask, generate, analyze. All in one place.
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Save hours on every document</h3>
                    <p className="text-gray-400">AI-powered generation that understands your jurisdiction and requirements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Turn questions into suggested changes</h3>
                    <p className="text-gray-400">Get instant legal advice and document modifications</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Detailed compliance analysis in seconds</h3>
                    <p className="text-gray-400">Risk scanning and compliance checking for every document</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">From risks to fixes</h3>
                    <p className="text-gray-400">AI generates solutions for compliance issues and legal risks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Everything you need to work faster */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Everything you need to work faster
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered tools accelerate your legal workflow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Stay compliant with AI insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">
                  AI-powered compliance checking allows you to build upon existing documents without waiting for legal review.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Start generating
                </Button>
                <div className="mt-4 bg-gray-800 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gray-700 rounded"></div>
                    <div className="w-8 h-8 bg-gray-700 rounded"></div>
                    <div className="w-8 h-8 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Don&apos;t miss deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">
                  Actionable notifications that meet you where you are. Get alerts for compliance deadlines and updates.
                </p>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Read the docs
                </Button>
                <div className="mt-4 bg-gray-800 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="bg-blue-900 rounded p-2">
                      <p className="text-sm text-blue-200">Contract review due in 2 days</p>
                    </div>
                    <div className="bg-green-900 rounded p-2">
                      <p className="text-sm text-green-200">Compliance check passed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">
                  Advanced risk scanning and compliance tracking across all your legal documents.
                </p>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Read about it
                </Button>
                <div className="mt-4 bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Risk Level: Medium</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-orange-500 rounded-full w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Unified Platform Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Your Unified Legal Platform</h3>
            <div className="grid md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium">Generation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium">Compliance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium">AI Chat</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium">Lookup</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-300 font-medium">Automation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Developer infrastructure built for your team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Legal infrastructure built for your team
              </h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Ship more confidently with the technologies you already use.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Where change happens</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Organizations that adopt ParaDoc create more compliant documents with faster review cycles and reduced legal risks.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Seamless with your workflow</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Deep integration means your team is always on the same page with real-time updates and collaborative features.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Built for modern teams</h3>
                  <p className="text-gray-400 leading-relaxed">
                    ParaDoc is designed to work with all your existing tools, scripts, and workflows for seamless integration.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center">
                <FileText className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Built for the world&apos;s fastest legal teams, now available for everyone
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg font-semibold transition-all duration-300">
              Request a demo
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 px-10 py-6 text-lg font-semibold transition-all duration-300">
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
                <FileText className="h-8 w-8 text-white mr-3" />
                <span className="text-xl font-bold text-white">ParaDoc.app</span>
              </div>
              <p className="text-gray-400 mb-4">
                Legal documents for the age of AI. AI-powered, compliant, and accessible.
              </p>
              <div className="flex space-x-4">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
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
