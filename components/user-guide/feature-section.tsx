"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Brain, 
  Target,
  Shield,
  Zap,
  Lock,
  CreditCard,
  CheckCircle,
  Info
} from "lucide-react";

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

const features = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "AI-Powered Legal Document Generation",
    description: "Generate accurate, jurisdiction-specific legal documents in seconds.",
    details: [
      "Choose from 500+ pre-built legal templates",
      "Customize documents for US and Canadian jurisdictions",
      "AI automatically fills in standard clauses and terms",
      "Export to PDF, DOCX, or Google Docs formats",
      "Version control and document history tracking"
    ],
    tips: [
      "Always review AI-generated content for accuracy",
      "Use the jurisdiction selector for proper compliance",
      "Save frequently used templates as favorites"
    ]
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Smart Legal Assistant (Chatbot)",
    description: "Get instant answers and context-aware guidance for legal queries.",
    details: [
      "24/7 AI-powered legal assistance",
      "Context-aware responses based on your documents",
      "Memory of previous conversations",
      "Citations to relevant statutes and case law",
      "Multi-language support for legal terminology"
    ],
    tips: [
      "Be specific in your queries for better responses",
      "Reference document names for contextual help",
      "Use follow-up questions to dive deeper"
    ]
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Document Lookup",
    description: "Search through vast databases of legal templates, statutes, and case law.",
    details: [
      "Access to 100,000+ legal precedents",
      "Real-time statute and regulation updates",
      "Advanced search with Boolean operators",
      "Filter by jurisdiction, practice area, and date",
      "Bookmark and organize search results"
    ],
    tips: [
      "Use quotation marks for exact phrase searches",
      "Combine keywords with AND/OR operators",
      "Set up alerts for new case law in your practice area"
    ]
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Risk Assessment & Legal Summarization",
    description: "Identify risky clauses, highlight potential issues, and summarize complex legal texts.",
    details: [
      "AI-powered risk scoring (1-10 scale)",
      "Automatic highlighting of problematic clauses",
      "Plain English summaries of complex documents",
      "Compliance checking against current regulations",
      "Suggested improvements and alternatives"
    ],
    tips: [
      "Review high-risk items (score 7+) carefully",
      "Use summaries for client explanations",
      "Check compliance reports before finalizing"
    ]
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Bulk Document Generation",
    description: "Create hundreds of documents simultaneously using CSV/JSON uploads.",
    details: [
      "Upload data via CSV or JSON formats",
      "Process up to 1,000 documents per batch",
      "Template mapping for consistent formatting",
      "Progress tracking and error reporting",
      "Bulk download as ZIP archives"
    ],
    tips: [
      "Validate your data format before upload",
      "Use our CSV template for best results",
      "Process large batches during off-peak hours"
    ]
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Secure Storage & Collaboration",
    description: "Encrypt and store documents securely with role-based access and shared folders.",
    details: [
      "AES-256 encryption at rest and in transit",
      "Role-based access control (view, edit, admin)",
      "Shared folders for team collaboration",
      "Document versioning and audit trails",
      "SOC 2 Type II compliant infrastructure"
    ],
    tips: [
      "Set up proper access controls from the start",
      "Use shared folders for team projects",
      "Enable audit trails for compliance"
    ]
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Subscription Management",
    description: "Flexible billing options with monthly and yearly plans with trials.",
    details: [
      "7 days free trial with full Pro access",
      "Monthly and yearly billing options",
      "Usage analytics and billing history",
      "Team member management and billing",
      "Automatic scaling for enterprise needs"
    ],
    tips: [
      "Monitor usage to optimize your plan",
      "Annual billing saves 15% on costs",
      "Set usage alerts to avoid overages"
    ]
  }
];

export function FeatureSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Detailed Feature Guide</h2>
          <p className="font-body text-gray-600">Master every aspect of ParaDoc.app</p>
        </AnimatedSection>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="overflow-hidden hover-lift">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-black text-white rounded-lg">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-heading text-2xl mb-2">{feature.title}</CardTitle>
                      <p className="font-body text-lg text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-heading font-semibold mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="font-body text-gray-700 flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold mb-4 flex items-center">
                        <Info className="h-5 w-5 text-blue-600 mr-2" />
                        Pro Tips
                      </h4>
                      <ul className="space-y-2">
                        {feature.tips.map((tip, idx) => (
                          <li key={idx} className="font-body text-gray-700 flex items-start">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
