"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Users,
  Book,
  Play,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react";
import Link from "next/link";
import { FeatureSection } from "@/components/user-guide/feature-section";
import { FAQSection } from "@/components/user-guide/faq-section";

const AnimatedSection = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function UserGuide() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-premium"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 focus-ring rounded-lg">
              <motion.div whileHover={{ scale: 1.05 }}>
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </motion.div>
              <span className="font-body text-gray-600 hover:text-black transition-colors">
                Back to Home
              </span>
            </Link>
            <div className="font-display text-xl font-bold">ParaDoc.app User Guide</div>
            <div className="w-20"></div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6"
            >
              <Book className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Complete User Guide
            </h1>
            <p className="font-body-light text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about using ParaDoc.app effectively. 
              From basic features to advanced workflows.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Quick Start Guide</h2>
            <p className="font-body text-gray-600">Get up and running in minutes</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Sign Up & Verify",
                description: "Create your account and verify your email to start your 7 days free trial.",
                icon: <Users className="h-6 w-6" />
              },
              {
                step: "2", 
                title: "Choose Your Templates",
                description: "Browse our library of 500+ legal templates or create your own.",
                icon: <FileText className="h-6 w-6" />
              },
              {
                step: "3",
                title: "Generate & Customize",
                description: "Use AI to generate documents and customize them for your specific needs.",
                icon: <Play className="h-6 w-6" />
              }
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="text-center hover-lift">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <Badge className="mb-2">Step {item.step}</Badge>
                    <CardTitle className="font-heading text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <FeatureSection />

      {/* Best Practices */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Best Practices</h2>
            <p className="font-body text-gray-600">Maximize your efficiency with these proven strategies</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <CheckCircle className="h-6 w-6 text-green-600" />,
                title: "Document Organization",
                tips: ["Use consistent naming conventions", "Create folder structures by client/case", "Tag documents with relevant keywords"]
              },
              {
                icon: <AlertCircle className="h-6 w-6 text-red-600" />,
                title: "Quality Control",
                tips: ["Always review AI-generated content", "Use the risk assessment feature", "Keep templates updated"]
              }
            ].map((practice, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="h-full hover-lift">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      {practice.icon}
                      <CardTitle className="font-heading text-lg">{practice.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {practice.tips.map((tip, idx) => (
                        <li key={idx} className="font-body text-sm text-gray-700 flex items-start">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Support Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold mb-6">Need More Help?</h2>
            <p className="font-body-light text-xl text-gray-300 mb-8">
              Our support team is here to help you succeed with ParaDoc.app
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-body font-semibold btn-premium">
                    Contact Support
                  </Button>
                </motion.div>
              </Link>
              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 font-body font-semibold">
                    Back to Home
                  </Button>
                </motion.div>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-sm text-gray-600">
            © 2025 ParaDoc.app. All rights reserved. | 
            <Link href="/" className="hover:text-black ml-1">Privacy Policy</Link> | 
            <Link href="/" className="hover:text-black ml-1">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}