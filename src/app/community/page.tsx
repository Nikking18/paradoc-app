"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Calendar, Award, BookOpen, UserGroup, Star, ArrowRight, Clock, Eye, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CommunityPage() {
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
            <Users className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Community</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Join Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"> Community</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow users, share experiences, get help, and contribute to the future of legal technology. 
            Our community is where innovation meets collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-black px-8 py-4 text-lg font-semibold">
              Join Community
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              View Guidelines
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">12,000+</h3>
              <p className="text-gray-600">Discussions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8/5</h3>
              <p className="text-gray-600">Community Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Community Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find discussions, share knowledge, and connect with others in your area of interest.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">General Discussion</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Share experiences, ask questions, and connect with the broader ParaDoc.app community.
                </p>
                <Badge className="bg-gray-100 text-gray-700">2,500+ posts</Badge>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tips & Tutorials</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn from experts and share your own tips for getting the most out of ParaDoc.app.
                </p>
                <Badge className="bg-gray-100 text-gray-700">1,800+ posts</Badge>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Feature Requests</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Suggest new features and vote on ideas to help shape the future of ParaDoc.app.
                </p>
                <Badge className="bg-gray-100 text-gray-700">950+ posts</Badge>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Success Stories</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Share how ParaDoc.app has helped your business and inspire others with your success.
                </p>
                <Badge className="bg-gray-100 text-gray-700">650+ posts</Badge>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UserGroup className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Local Groups</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect with ParaDoc.app users in your local area for meetups and networking.
                </p>
                <Badge className="bg-gray-100 text-gray-700">200+ groups</Badge>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Help & Support</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get help from community members and our support team for technical issues.
                </p>
                <Badge className="bg-gray-100 text-gray-700">3,200+ posts</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Recent Discussions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the conversation and see what the community is talking about.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Discussion 1 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="User avatar"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">Marcus Rodriguez</h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Tips & Tutorials</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      Best Practices for Document Templates
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      I've been using ParaDoc.app for 6 months now and wanted to share some best practices 
                      I've learned for creating effective document templates...
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>24 replies</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>156 views</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>18 likes</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discussion 2 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                      alt="User avatar"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">Dr. Emily Watson</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Success Stories</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      How ParaDoc.app Saved My Law Firm 40 Hours Per Week
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      As a small law firm owner, I was drowning in document creation. ParaDoc.app has 
                      revolutionized our workflow and allowed us to focus on what matters most...
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>31 replies</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>289 views</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>42 likes</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>5 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discussion 3 */}
            <Card className="border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                      alt="User avatar"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">David Kim</h3>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">Feature Requests</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      Integration with Popular CRM Systems
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Would love to see direct integration with Salesforce, HubSpot, and other popular 
                      CRM systems. This would streamline our client onboarding process significantly...
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>19 replies</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>134 views</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>27 likes</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our community events, webinars, and meetups to learn and connect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">ParaDoc.app Webinar</h3>
                    <p className="text-sm text-gray-600">Online Event</p>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Advanced Document Automation Techniques
                </h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Learn advanced techniques for automating complex legal document workflows.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>September 15, 2024</p>
                    <p>2:00 PM - 3:00 PM EST</p>
                  </div>
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-black">
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Local Meetup</h3>
                    <p className="text-sm text-gray-600">San Francisco, CA</p>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Legal Tech Networking Event
                </h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Connect with fellow legal professionals and learn about the latest in legal technology.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>September 20, 2024</p>
                    <p>6:00 PM - 8:00 PM PST</p>
                  </div>
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-black">
                    RSVP
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Conference</h3>
                    <p className="text-sm text-gray-600">New York, NY</p>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Legal Innovation Summit 2024
                </h4>
                <p className="text-gray-600 mb-4 text-sm">
                  Join us at the premier legal technology conference featuring ParaDoc.app demos and workshops.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>October 5-6, 2024</p>
                    <p>All Day Event</p>
                  </div>
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-black">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Resources */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Community Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to get the most out of our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Community Guidelines</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn about our community standards and how to be a great community member.
                </p>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-black">
                  Read Guidelines
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Community Awards</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Recognize outstanding community members and their contributions.
                </p>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-black">
                  View Awards
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UserGroup className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">User Groups</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Find or create local user groups in your area for networking and learning.
                </p>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-black">
                  Find Groups
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Contributors</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Meet our most active and helpful community members.
                </p>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-black">
                  View Contributors
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with thousands of users, share your experiences, and help shape the future of legal technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Join Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
              Browse Discussions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}