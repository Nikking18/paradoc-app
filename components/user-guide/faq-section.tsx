"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

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

const faqs = [
  {
    question: "Is my data secure with ParaDoc.app?",
    answer: "Yes, we use enterprise-grade AES-256 encryption and are SOC 2 Type II compliant. All data is encrypted at rest and in transit, with regular security audits."
  },
  {
    question: "Can I use ParaDoc.app for Canadian legal documents?",
    answer: "Absolutely! ParaDoc.app is specifically designed for both US and Canadian jurisdictions, with templates and compliance checking for both legal systems."
  },
  {
    question: "How accurate is the AI-generated content?",
    answer: "Our AI is trained on millions of legal documents and achieves 95%+ accuracy. However, we always recommend legal review before finalizing any document."
  },
  {
    question: "Can I integrate ParaDoc.app with my existing tools?",
    answer: "Yes, we offer API access for Enterprise customers and integrate with popular tools like Google Workspace, Microsoft 365, and major CRM systems."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you before you reach limits. You can upgrade your plan anytime or purchase additional usage credits as needed."
  },
  {
    question: "Do you offer training for new users?",
    answer: "Yes! We provide onboarding sessions, video tutorials, and dedicated support for Enterprise customers. Check our training resources section."
  }
];

export function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="font-body text-gray-600">Get answers to common questions</p>
        </AnimatedSection>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="font-heading text-lg flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-gray-700 ml-8">{faq.answer}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
