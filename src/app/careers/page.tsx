"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, Users, Heart, Zap, Shield, Globe, ArrowRight, CheckCircle, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
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
            <Briefcase className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Join Our Team</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Build the Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"> Legal Tech</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join our mission to make legal documentation accessible, affordable, and compliant for everyone. 
            We're looking for passionate individuals who want to make a real impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-black px-8 py-4 text-lg font-semibold">
              View Open Positions
            </Button>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
                Send Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Work at ParaDoc.app?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building something meaningful that will change how people interact with legal documentation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Meaningful Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Help democratize legal documentation and make it accessible to millions of people worldwide.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cutting-Edge Tech</h3>
              <p className="text-gray-600 leading-relaxed">
                Work with the latest AI/ML technologies and build innovative solutions that push boundaries.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Amazing Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaborate with talented individuals from diverse backgrounds and learn from the best.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Growth Opportunities</h3>
              <p className="text-gray-600 leading-relaxed">
                Fast-paced environment with plenty of opportunities to grow your skills and career.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Remote-First</h3>
              <p className="text-gray-600 leading-relaxed">
                Work from anywhere in the world with flexible hours and a healthy work-life balance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Benefits</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive health coverage, equity options, and generous PTO policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in taking care of our team so they can do their best work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Health & Wellness</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Comprehensive health, dental, and vision insurance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Mental health support and counseling services</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Gym membership and wellness stipend</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Flexible PTO and unlimited sick days</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Development</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Learning and development budget</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Conference and training opportunities</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Mentorship programs</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Career advancement opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to join our team? Check out our current openings.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Senior Full Stack Engineer */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Senior Full Stack Engineer</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <MapPin className="h-3 w-3 mr-1" />
                        Remote
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Full-time
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <Users className="h-3 w-3 mr-1" />
                        Engineering
                      </Badge>
                    </div>
                  </div>
                  <Button className="bg-gray-900 text-white hover:bg-black">
                    Apply Now
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">
                  We're looking for a Senior Full Stack Engineer to help build and scale our AI-powered legal documentation platform. 
                  You'll work on both frontend and backend systems, integrating with AI services and building user-facing features.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 5+ years of full-stack development experience</li>
                      <li>• Strong experience with React, Node.js, and TypeScript</li>
                      <li>• Experience with AI/ML integration</li>
                      <li>• Knowledge of cloud platforms (AWS, GCP, or Azure)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Competitive salary and equity</li>
                      <li>• Comprehensive health benefits</li>
                      <li>• Flexible work arrangements</li>
                      <li>• Professional development budget</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Manager */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Product Manager</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <MapPin className="h-3 w-3 mr-1" />
                        San Francisco, CA
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Full-time
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <Users className="h-3 w-3 mr-1" />
                        Product
                      </Badge>
                    </div>
                  </div>
                  <Button className="bg-gray-900 text-white hover:bg-black">
                    Apply Now
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">
                  Join our product team to help shape the future of legal technology. You'll work closely with engineering, 
                  design, and legal teams to build products that make legal documentation accessible to everyone.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 3+ years of product management experience</li>
                      <li>• Experience with B2B SaaS products</li>
                      <li>• Strong analytical and problem-solving skills</li>
                      <li>• Experience with legal tech or compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Competitive salary and equity</li>
                      <li>• Comprehensive health benefits</li>
                      <li>• Flexible work arrangements</li>
                      <li>• Professional development budget</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Research Specialist */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Legal Research Specialist</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <MapPin className="h-3 w-3 mr-1" />
                        Remote
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Full-time
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        <Users className="h-3 w-3 mr-1" />
                        Legal
                      </Badge>
                    </div>
                  </div>
                  <Button className="bg-gray-900 text-white hover:bg-black">
                    Apply Now
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">
                  Help us ensure our AI-generated documents are accurate and compliant. You'll research legal requirements, 
                  review document templates, and work with our AI team to improve accuracy.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• JD or equivalent legal education</li>
                      <li>• 2+ years of legal research experience</li>
                      <li>• Strong attention to detail</li>
                      <li>• Experience with document review</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Competitive salary and equity</li>
                      <li>• Comprehensive health benefits</li>
                      <li>• Flexible work arrangements</li>
                      <li>• Professional development budget</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our hiring process is designed to be fair, transparent, and efficient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit your application with your resume and cover letter through our careers page.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Initial Review</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team reviews your application and reaches out within 1-2 business days.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Participate in video interviews with team members and complete any relevant assessments.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Decision</h3>
              <p className="text-gray-600 leading-relaxed">
                We make our decision and extend an offer to successful candidates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and let us know how you'd like to contribute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Send Your Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
                Meet the Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}