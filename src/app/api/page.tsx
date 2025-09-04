"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Key, Zap, Shield, ArrowRight, Copy, CheckCircle, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function APIPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    generate: `curl -X POST https://api.paradoc.app/v1/documents/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "template_id": "contract_nda",
    "variables": {
      "company_name": "Acme Corp",
      "client_name": "John Doe",
      "effective_date": "2024-01-01"
    }
  }'`,
    
    analyze: `curl -X POST https://api.paradoc.app/v1/documents/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_text": "Your document content here...",
    "analysis_type": "risk_assessment"
  }'`,
    
    javascript: `const response = await fetch('https://api.paradoc.app/v1/documents/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    template_id: 'contract_nda',
    variables: {
      company_name: 'Acme Corp',
      client_name: 'John Doe',
      effective_date: '2024-01-01'
    }
  })
});

const document = await response.json();
console.log(document);`,
    
    python: `import requests

url = "https://api.paradoc.app/v1/documents/generate"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "template_id": "contract_nda",
    "variables": {
        "company_name": "Acme Corp",
        "client_name": "John Doe",
        "effective_date": "2024-01-01"
    }
}

response = requests.post(url, headers=headers, json=data)
document = response.json()
print(document)`
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
            <Code className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">API Documentation</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            ParaDoc.app
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"> API</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Integrate ParaDoc.app's AI-powered legal documentation capabilities directly into your applications. 
            Generate, analyze, and manage legal documents programmatically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-black px-8 py-4 text-lg font-semibold">
              <Key className="mr-2 h-5 w-5" />
              Get API Key
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              <ExternalLink className="mr-2 h-5 w-5" />
              API Reference
            </Button>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">API Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our RESTful API provides comprehensive access to all ParaDoc.app features, 
              enabling seamless integration with your existing systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fast & Reliable</h3>
                <p className="text-gray-600 leading-relaxed">
                  High-performance API with 99.9% uptime and sub-second response times for most operations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Secure</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enterprise-grade security with OAuth 2.0, API keys, and end-to-end encryption.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Developer Friendly</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive documentation, SDKs, and interactive examples to get you started quickly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">API Endpoints</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive API endpoints for document generation, analysis, and management.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Document Generation */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-green-100 text-green-800 mb-2">POST</Badge>
                    <CardTitle className="text-2xl font-bold text-gray-900">Document Generation</CardTitle>
                    <p className="text-gray-600 mt-2">Generate legal documents from templates</p>
                  </div>
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">/v1/documents/generate</code>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Request Example:</h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{codeExamples.generate}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-white"
                        onClick={() => copyToClipboard(codeExamples.generate, 'generate')}
                      >
                        {copiedCode === 'generate' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Response Example:</h4>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`{
  "document_id": "doc_123456789",
  "status": "completed",
  "download_url": "https://api.paradoc.app/v1/documents/doc_123456789/download",
  "created_at": "2024-01-01T12:00:00Z",
  "template_used": "contract_nda"
}`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Analysis */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-blue-100 text-blue-800 mb-2">POST</Badge>
                    <CardTitle className="text-2xl font-bold text-gray-900">Document Analysis</CardTitle>
                    <p className="text-gray-600 mt-2">Analyze documents for risks and compliance</p>
                  </div>
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">/v1/documents/analyze</code>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Request Example:</h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{codeExamples.analyze}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-white"
                        onClick={() => copyToClipboard(codeExamples.analyze, 'analyze')}
                      >
                        {copiedCode === 'analyze' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Response Example:</h4>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`{
  "analysis_id": "ana_123456789",
  "risk_score": 0.15,
  "compliance_status": "compliant",
  "issues": [],
  "recommendations": [
    "Consider adding a termination clause",
    "Review liability limitations"
  ],
  "analyzed_at": "2024-01-01T12:00:00Z"
}`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Management */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-purple-100 text-purple-800 mb-2">GET</Badge>
                    <CardTitle className="text-2xl font-bold text-gray-900">Template Management</CardTitle>
                    <p className="text-gray-600 mt-2">List and manage document templates</p>
                  </div>
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">/v1/templates</code>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Request Example:</h4>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`curl -X GET https://api.paradoc.app/v1/templates \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Response Example:</h4>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`{
  "templates": [
    {
      "id": "contract_nda",
      "name": "Non-Disclosure Agreement",
      "category": "contracts",
      "jurisdictions": ["US", "CA", "UK"],
      "variables": ["company_name", "client_name", "effective_date"]
    }
  ],
  "total": 50,
  "page": 1
}`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SDK Examples */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">SDK Examples</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started quickly with our official SDKs and code examples.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* JavaScript/Node.js */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">JavaScript / Node.js</CardTitle>
                <p className="text-gray-600">Official SDK for JavaScript and Node.js applications</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Installation:</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
                      <code>npm install paradoc-sdk</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Usage Example:</h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{codeExamples.javascript}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-white"
                        onClick={() => copyToClipboard(codeExamples.javascript, 'javascript')}
                      >
                        {copiedCode === 'javascript' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Python */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Python</CardTitle>
                <p className="text-gray-600">Official SDK for Python applications</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Installation:</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
                      <code>pip install paradoc-sdk</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Usage Example:</h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{codeExamples.python}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-white"
                        onClick={() => copyToClipboard(codeExamples.python, 'python')}
                      >
                        {copiedCode === 'python' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Authentication</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure your API access with our authentication methods.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <Key className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">API Keys</CardTitle>
                    <p className="text-gray-600">Simple and secure API key authentication</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Include your API key in the Authorization header of all requests:
                  </p>
                  <pre className="bg-gray-100 p-3 rounded-lg text-sm">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </pre>
                  <p className="text-sm text-gray-500">
                    API keys can be generated and managed in your account dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Rate Limits</CardTitle>
                    <p className="text-gray-600">Fair usage policies for all users</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Free Plan</h4>
                      <p className="text-2xl font-bold text-gray-700">100</p>
                      <p className="text-sm text-gray-600">requests/hour</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Pro Plan</h4>
                      <p className="text-2xl font-bold text-gray-700">1,000</p>
                      <p className="text-sm text-gray-600">requests/hour</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Rate limits are applied per API key and reset every hour.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Integrate?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start building with our API today. Get your API key and begin integrating ParaDoc.app into your applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <Key className="mr-2 h-5 w-5" />
              Get API Key
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
              <ExternalLink className="mr-2 h-5 w-5" />
              View Full Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}