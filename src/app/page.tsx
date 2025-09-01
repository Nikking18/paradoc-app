import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            ParaDoc.app
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-Powered Legal Document Generation & Analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Generation</CardTitle>
              <CardDescription>
                Generate legal documents with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Enter your requirements..." />
                <Button className="w-full">Generate Document</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legal Analysis</CardTitle>
              <CardDescription>
                Analyze contracts and legal documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Upload document or paste text..." />
                <Button className="w-full">Analyze</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Identify potential legal risks in documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Upload document for risk analysis..." />
                <Button className="w-full">Assess Risks</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI models for legal document generation
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Secure</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security and privacy
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Built for legal compliance and accuracy
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Fast</h3>
              <p className="text-sm text-muted-foreground">
                Instant document generation and analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
