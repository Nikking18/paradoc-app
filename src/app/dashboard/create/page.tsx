"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  FileText, 
  Zap, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Copy,
  Share2,
  Settings,
  Sparkles
} from "lucide-react";

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedTime: string;
  complexity: 'simple' | 'medium' | 'complex';
  popular: boolean;
}

export default function CreateDocumentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<string>("");
  const [formData, setFormData] = useState({
    template: "",
    title: "",
    description: "",
    jurisdiction: "",
    parties: "",
    specificRequirements: "",
    additionalNotes: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) return null;

  const documentTemplates: DocumentTemplate[] = [
    {
      id: "nda",
      name: "Non-Disclosure Agreement (NDA)",
      description: "Protect confidential information with a comprehensive NDA",
      category: "Confidentiality",
      estimatedTime: "2-3 minutes",
      complexity: "simple",
      popular: true
    },
    {
      id: "contract",
      name: "Service Agreement",
      description: "Professional service contract for freelancers and businesses",
      category: "Business",
      estimatedTime: "3-5 minutes",
      complexity: "medium",
      popular: true
    },
    {
      id: "terms",
      name: "Terms of Service",
      description: "Legal terms for websites and applications",
      category: "Digital",
      estimatedTime: "4-6 minutes",
      complexity: "complex",
      popular: false
    },
    {
      id: "privacy",
      name: "Privacy Policy",
      description: "GDPR-compliant privacy policy for data protection",
      category: "Digital",
      estimatedTime: "3-4 minutes",
      complexity: "medium",
      popular: true
    },
    {
      id: "employment",
      name: "Employment Contract",
      description: "Comprehensive employment agreement",
      category: "Employment",
      estimatedTime: "5-7 minutes",
      complexity: "complex",
      popular: false
    },
    {
      id: "lease",
      name: "Lease Agreement",
      description: "Residential or commercial lease agreement",
      category: "Real Estate",
      estimatedTime: "4-5 minutes",
      complexity: "medium",
      popular: false
    }
  ];

  const jurisdictions = [
    "California", "New York", "Texas", "Florida", "Illinois", "Pennsylvania",
    "Ohio", "Georgia", "North Carolina", "Michigan", "New Jersey", "Virginia",
    "Washington", "Arizona", "Massachusetts", "Tennessee", "Indiana", "Missouri",
    "Maryland", "Wisconsin", "Colorado", "Minnesota", "South Carolina", "Alabama",
    "Louisiana", "Kentucky", "Oregon", "Oklahoma", "Connecticut", "Utah",
    "Iowa", "Nevada", "Arkansas", "Mississippi", "Kansas", "New Mexico",
    "Nebraska", "West Virginia", "Idaho", "Hawaii", "New Hampshire", "Maine",
    "Montana", "Rhode Island", "Delaware", "South Dakota", "North Dakota",
    "Alaska", "Vermont", "Wyoming", "Canada", "Other"
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = documentTemplates.find(t => t.id === templateId);
    setFormData(prev => ({
      ...prev,
      template: templateId,
      title: template?.name || ""
    }));
    setCurrentStep(2);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedDocument(result.document);
        setCurrentStep(3);
      } else {
        console.error('Failed to generate document');
      }
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'complex':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Document Type</h2>
              <p className="text-gray-600">Select the type of legal document you need to create</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                    formData.template === template.id 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.category}</p>
                        </div>
                      </div>
                      {template.popular && (
                        <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{template.estimatedTime}</span>
                      </div>
                      <Badge className={getComplexityColor(template.complexity)}>
                        {template.complexity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Details</h2>
              <p className="text-gray-600">Provide the specific information for your document</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <Label htmlFor="description">Brief Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Describe what this document is for..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="jurisdiction">Jurisdiction</Label>
                <Select value={formData.jurisdiction} onValueChange={(value) => updateFormData('jurisdiction', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    {jurisdictions.map((jurisdiction) => (
                      <SelectItem key={jurisdiction} value={jurisdiction}>
                        {jurisdiction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="parties">Parties Involved</Label>
                <Input
                  id="parties"
                  value={formData.parties}
                  onChange={(e) => updateFormData('parties', e.target.value)}
                  placeholder="e.g., John Doe and Acme Corp"
                />
              </div>

              <div>
                <Label htmlFor="specificRequirements">Specific Requirements</Label>
                <Textarea
                  id="specificRequirements"
                  value={formData.specificRequirements}
                  onChange={(e) => updateFormData('specificRequirements', e.target.value)}
                  placeholder="Any specific clauses, terms, or requirements..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                  placeholder="Any additional information or special instructions..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Generated!</h2>
              <p className="text-gray-600">Your legal document is ready for review and download</p>
            </div>

            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    {formData.title}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                    {generatedDocument}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="border-gray-300">
                <Eye className="h-4 w-4 mr-2" />
                Preview PDF
              </Button>
              <Button className="bg-gray-900 text-white hover:bg-black">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="border-gray-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Create Document</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-gray-200 shadow-lg">
          <CardContent className="p-8">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  className="border-gray-300"
                >
                  Back
                </Button>
                
                {currentStep === 2 ? (
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !formData.title || !formData.jurisdiction}
                    className="bg-gray-900 text-white hover:bg-black"
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Document
                      </div>
                    )}
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
