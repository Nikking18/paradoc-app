"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Clock, ArrowRight, Tag, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
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
            <Calendar className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Blog & News</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Insights & Updates from
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"> ParaDoc.app</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay informed about the latest developments in legal technology, AI advancements, and industry insights 
            that matter to your business.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search articles..."
              className="pl-10 pr-4 py-3 text-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Badge className="bg-gray-900 text-white mb-4">Featured Article</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Future of AI in Legal Documentation</h2>
          </div>
          
          <Card className="border-gray-200 bg-white shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop"
                  alt="AI in Legal Documentation"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Sarah Chen</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>September 3, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>5 min read</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Artificial Intelligence is revolutionizing how legal documents are created, reviewed, and managed. 
                  In this comprehensive guide, we explore the current state of AI in legal tech and what the future holds 
                  for law firms, businesses, and individuals.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">AI Technology</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">Legal Tech</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">Future Trends</Badge>
                </div>
                
                <Button className="bg-gray-900 text-white hover:bg-black">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              <Filter className="h-4 w-4 mr-2" />
              All Articles
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              AI & Technology
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Legal Updates
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Product News
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Industry Insights
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Compliance
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Recent Articles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our latest insights on legal technology, compliance, and industry trends.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop"
                  alt="GDPR Compliance Guide"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Emily Watson</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Sep 2, 2024</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Complete Guide to GDPR Compliance for Small Businesses
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Learn how to ensure your business complies with GDPR regulations and protect your customers' data 
                  with our comprehensive compliance checklist.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>4 min read</span>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Compliance</Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">GDPR</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
                  alt="Contract Automation"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Marcus Rodriguez</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Sep 1, 2024</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  How AI is Transforming Contract Management
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Discover how artificial intelligence is revolutionizing contract creation, review, and management 
                  processes for businesses of all sizes.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>6 min read</span>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">AI</Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Contracts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
                  alt="Legal Tech Trends"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>David Kim</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Aug 30, 2024</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Top Legal Technology Trends for 2024
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Stay ahead of the curve with our analysis of the most important legal technology trends 
                  shaping the industry this year.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>7 min read</span>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Trends</Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">2024</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 4 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop"
                  alt="Startup Legal Basics"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Lisa Park</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Aug 28, 2024</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Essential Legal Documents Every Startup Needs
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Get your startup off to the right start with our guide to the essential legal documents 
                  every new business should have in place.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>5 min read</span>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Startups</Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Legal Basics</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 5 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
                  alt="Data Privacy"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Alex Thompson</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Aug 25, 2024</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Data Privacy Laws: What Businesses Need to Know
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Navigate the complex landscape of data privacy regulations with our comprehensive guide 
                  to compliance requirements across different jurisdictions.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Privacy</Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Compliance</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 6 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
                  alt="Remote Work Legal"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Sarah Chen</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Aug 22, 2024</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  Legal Considerations for Remote Work Policies
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Create comprehensive remote work policies that protect your business while supporting 
                  your distributed team with proper legal frameworks.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>6 min read</span>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">Remote Work</Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">HR</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest insights on legal technology, compliance updates, and industry trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            />
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 font-semibold">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}