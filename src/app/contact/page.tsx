"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
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
            <Mail className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Contact Us</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Get in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"> Touch</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions about ParaDoc.app? Need help with your account? Want to discuss a partnership? 
            We're here to help and would love to hear from you.
          </p>
        </div>
      </section>

      {/* How to Reach Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How to Reach Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the method that works best for you. We're here to help!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Support</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Send us an email and we'll respond within 24 hours.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">General Inquiries</p>
                  <p className="font-medium text-gray-900">hello@paradoc.app</p>
                  <p className="text-sm text-gray-500">Support</p>
                  <p className="font-medium text-gray-900">support@paradoc.app</p>
                </div>
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
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">US & Canada</p>
                  <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">International</p>
                  <p className="font-medium text-gray-900">+1 (555) 123-4568</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Live Chat</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get instant help from our support team via live chat.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="font-medium text-gray-900">24/7</p>
                  <p className="text-sm text-gray-500">Response Time</p>
                  <p className="font-medium text-gray-900">Under 5 minutes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <Card className="border-gray-200 bg-white shadow-lg">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                      <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                        <SelectValue placeholder="Select an inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Subscription</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="media">Media Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-gray-900 text-white hover:bg-black px-8 py-4 text-lg font-semibold"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Offices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at one of our office locations around the world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">San Francisco, CA</h3>
                    <p className="text-gray-600">Headquarters</p>
                  </div>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>123 Tech Street, Suite 100</p>
                  <p>San Francisco, CA 94105</p>
                  <p>United States</p>
                  <div className="flex items-center mt-4">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">London, UK</h3>
                    <p className="text-gray-600">European Office</p>
                  </div>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>45 Innovation Lane</p>
                  <p>London EC1A 4HD</p>
                  <p>United Kingdom</p>
                  <div className="flex items-center mt-4">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+44 20 7123 4567</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about ParaDoc.app
            </p>
          </div>
          
          <div className="space-y-6">
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How quickly do you respond to inquiries?</h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours. For urgent technical issues, 
                  our live chat support is available 24/7 with an average response time of under 5 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you offer phone support?</h3>
                <p className="text-gray-600">
                  Yes, we offer phone support for urgent issues and complex problems. Our phone lines are 
                  open Monday through Friday, 9 AM to 6 PM PST. For non-urgent matters, email and live chat 
                  are often faster options.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I schedule a demo or consultation?</h3>
                <p className="text-gray-600">
                  Absolutely! We offer personalized demos and consultations for businesses and organizations. 
                  Please mention this in your inquiry type when contacting us, and we'll schedule a convenient time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you have partnerships or affiliate programs?</h3>
                <p className="text-gray-600">
                  Yes, we're always interested in exploring partnership opportunities with law firms, 
                  legal service providers, and technology companies. Please select "Partnership Opportunity" 
                  in the inquiry type when contacting us.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't wait to transform your legal documentation process. Start creating professional documents today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}