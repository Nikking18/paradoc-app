"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, Calendar, FileText, Image as ImageIcon, Users, Globe, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PressPage() {
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
            <FileText className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Press Kit</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Media Resources &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"> Press Information</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Everything you need to write about ParaDoc.app. Download our press kit, access media assets, 
            and get in touch with our press team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-black px-8 py-4 text-lg font-semibold">
              <Download className="mr-2 h-5 w-5" />
              Download Press Kit
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              <Mail className="mr-2 h-5 w-5" />
              Contact Press
            </Button>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About ParaDoc.app</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  ParaDoc.app is a leading AI-powered legal documentation platform that makes legal documents 
                  accessible, affordable, and compliant for businesses and individuals worldwide.
                </p>
                <p>
                  Founded in 2024, we're on a mission to democratize legal documentation by combining cutting-edge 
                  AI technology with deep legal expertise, enabling users to create professional-quality legal 
                  documents in minutes, not days.
                </p>
                <p>
                  Our platform serves over 10,000 active users across 63 jurisdictions, generating 50+ types 
                  of legal documents with a 4.9/5 user rating.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="h-8 w-8 text-gray-700" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">10,000+</h4>
                    <p className="text-sm text-gray-600">Active Users</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Globe className="h-8 w-8 text-gray-700" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">63</h4>
                    <p className="text-sm text-gray-600">Jurisdictions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FileText className="h-8 w-8 text-gray-700" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">50+</h4>
                    <p className="text-sm text-gray-600">Document Types</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <TrendingUp className="h-8 w-8 text-gray-700" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">4.9/5</h4>
                    <p className="text-sm text-gray-600">User Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Press Releases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Press Releases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with our latest company news and announcements.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Press Release 1 */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <Badge className="bg-gray-900 text-white mb-3">Latest</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ParaDoc.app Raises $15M Series A to Accelerate AI-Powered Legal Documentation
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>September 3, 2024</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  ParaDoc.app today announced it has raised $15 million in Series A funding led by TechVentures, 
                  with participation from LegalTech Capital and AI Innovation Fund. The funding will be used to 
                  accelerate product development, expand into new markets, and grow the team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gray-900 text-white hover:bg-black">
                    Read Full Release
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Press Release 2 */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ParaDoc.app Launches Enterprise API for Law Firms and Legal Departments
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>August 28, 2024</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The new Enterprise API enables law firms and corporate legal departments to integrate 
                  ParaDoc.app's AI-powered document generation capabilities directly into their existing 
                  workflows and case management systems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gray-900 text-white hover:bg-black">
                    Read Full Release
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Press Release 3 */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ParaDoc.app Expands to 15 New Jurisdictions Across Europe and Asia
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>August 15, 2024</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The expansion brings ParaDoc.app's AI-powered legal documentation platform to businesses 
                  and individuals in 15 new countries, including Germany, France, Japan, and Singapore, 
                  with localized legal templates and compliance requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gray-900 text-white hover:bg-black">
                    Read Full Release
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Media Assets */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Media Assets</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download high-resolution logos, screenshots, and other media assets for your coverage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo Assets */}
            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">Logo Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  High-resolution logos in various formats and color schemes
                </p>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-black w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            {/* Product Screenshots */}
            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">Product Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Latest product screenshots and interface mockups
                </p>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-black w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            {/* Team Photos */}
            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">Team Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Professional headshots and team photos
                </p>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-black w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            {/* Brand Guidelines */}
            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">Brand Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Complete brand guidelines and usage instructions
                </p>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-black w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Facts & Figures */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Key Facts & Figures</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick reference for journalists and media professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Founded</h3>
              <p className="text-gray-600">2024</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Headquarters</h3>
              <p className="text-gray-600">San Francisco, CA</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Employees</h3>
              <p className="text-gray-600">25+</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Funding</h3>
              <p className="text-gray-600">$15M Series A</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">CEO</h3>
              <p className="text-gray-600">Sarah Chen</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Website</h3>
              <p className="text-gray-600">paradoc.app</p>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Press Contact
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            For media inquiries, interview requests, or additional information, please contact our press team.
          </p>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Press Team</h3>
              <p className="text-gray-600 mb-4">press@paradoc.app</p>
              <p className="text-gray-600 mb-6">+1 (555) 123-4567</p>
              <Button className="bg-gray-900 text-white hover:bg-black w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}