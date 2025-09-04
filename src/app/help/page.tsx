"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, Video, ArrowRight, CheckCircle, Star } from "lucide-react";
import { useState } from "react";

export default function HelpPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full border border-gray-200 mb-6">
            <HelpCircle className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Help Center</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How can we
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"> help you?</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions, learn how to use ParaDoc.app effectively, and get the support you need.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help articles, guides, and FAQs..."
              className="pl-12 pr-4 py-4 text-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Articles</h2>
            <p className="text-lg text-gray-600">Most frequently accessed help articles</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Getting Started Guide</h3>
                    <p className="text-sm text-gray-600">Learn the basics</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Complete guide to setting up your account and creating your first legal document.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Document Templates</h3>
                    <p className="text-sm text-gray-600">Available templates</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Explore our library of 50+ legal document templates for various business needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Billing & Subscriptions</h3>
                    <p className="text-sm text-gray-600">Payment questions</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Everything you need to know about billing, subscriptions, and payment methods.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Chatbot Guide</h3>
                    <p className="text-sm text-gray-600">Using our AI assistant</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Learn how to effectively use our AI chatbot for legal questions and document assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Export Options</h3>
                    <p className="text-sm text-gray-600">Download formats</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  How to export your documents in PDF, DOCX, and other formats.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Account Security</h3>
                    <p className="text-sm text-gray-600">Privacy & security</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Keep your account secure with two-factor authentication and other security features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Help Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse help articles organized by topic to find exactly what you need.
            </p>
          </div>
          
          <div className="space-y-4">
            {/* Getting Started */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory('getting-started')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Getting Started</CardTitle>
                  {expandedCategory === 'getting-started' ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
              </CardHeader>
              {expandedCategory === 'getting-started' && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">How to create your first account</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Setting up your profile</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Understanding the dashboard</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Choosing the right plan</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Document Creation */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory('document-creation')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Document Creation</CardTitle>
                  {expandedCategory === 'document-creation' ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
              </CardHeader>
              {expandedCategory === 'document-creation' && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">How to create a new document</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Using document templates</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Customizing document fields</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">AI-powered suggestions</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Compliance */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory('compliance')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Compliance & Legal</CardTitle>
                  {expandedCategory === 'compliance' ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
              </CardHeader>
              {expandedCategory === 'compliance' && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Understanding legal disclaimers</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Jurisdiction-specific requirements</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">When to consult a lawyer</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Document review process</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Account & Billing */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory('account-billing')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Account & Billing</CardTitle>
                  {expandedCategory === 'account-billing' ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
              </CardHeader>
              {expandedCategory === 'account-billing' && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Managing your subscription</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Upgrading or downgrading plans</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Payment methods and billing</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Canceling your account</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Troubleshooting */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory('troubleshooting')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Troubleshooting</CardTitle>
                  {expandedCategory === 'troubleshooting' ? 
                    <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  }
                </div>
              </CardHeader>
              {expandedCategory === 'troubleshooting' && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Common error messages</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Browser compatibility issues</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Document generation problems</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <span className="text-gray-700">Performance optimization</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Live Chat</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get instant help from our support team via live chat.
                </p>
                <Button className="bg-gray-900 text-white hover:bg-black w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Support</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Send us an email and we'll respond within 24 hours.
                </p>
                <Button className="bg-gray-900 text-white hover:bg-black w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Phone Support</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Call us for urgent issues and complex problems.
                </p>
                <Button className="bg-gray-900 text-white hover:bg-black w-full">
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Video className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Video Tutorials</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Watch step-by-step video guides for common tasks.
                </p>
                <Button className="bg-gray-900 text-white hover:bg-black w-full">
                  Watch Videos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions or issues you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Contact Support
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
              View Status Page
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}