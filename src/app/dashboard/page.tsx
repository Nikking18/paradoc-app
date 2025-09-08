"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Search, 
  Settings, 
  User, 
  LogOut, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Download,
  Eye,
  Trash2,
  TrendingUp,
  Upload,
  MessageSquare,
  BarChart3
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  role: string;
  jurisdiction: string;
  useCase: string;
  experience: string;
  subscriptionStatus: string;
  trialEndsAt?: string;
}

interface Document {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'completed' | 'processing';
  createdAt: string;
  updatedAt: string;
  jurisdiction: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
        
        // Check if onboarding is completed
        if (!profile.onboardingCompleted) {
          router.push('/onboarding');
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, [router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchUserProfile();
      fetchDocuments();
    }
  }, [status, router, fetchUserProfile]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      if (response.ok) {
        const docs = await response.json();
        setDocuments(docs);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleCreateDocument = () => {
    router.push('/dashboard/create');
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session || !userProfile) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'draft':
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isTrialActive = userProfile.subscriptionStatus === 'trial' && 
    userProfile.trialEndsAt && 
    new Date(userProfile.trialEndsAt) > new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ParaDoc.app</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isTrialActive && (
                <Badge variant="outline" className="border-blue-200 text-blue-800">
                  Trial Active
                </Badge>
              )}
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {userProfile.firstName} {userProfile.lastName}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-gray-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile.firstName}!
          </h1>
          <p className="text-gray-600">
            Ready to create your next legal document? Let&apos;s get started.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(doc => doc.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(doc => doc.status === 'processing').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(doc => {
                      const docDate = new Date(doc.createdAt);
                      const now = new Date();
                      return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Document */}
          <div className="lg:col-span-1">
            <Card className="border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate a new legal document using our AI-powered platform.
                </p>
                <Button 
                  onClick={handleCreateDocument}
                  className="w-full bg-gray-900 text-white hover:bg-black"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Start Creating
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-200 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/upload')}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/assistant')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  AI Assistant
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/lookup')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Legal Lookup
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/reports')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Documents</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
                    <p className="text-gray-600 mb-4">
                      Create your first legal document to get started.
                    </p>
                    <Button onClick={handleCreateDocument} className="bg-gray-900 text-white hover:bg-black">
                      Create Document
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.slice(0, 5).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.title}</h4>
                            <p className="text-sm text-gray-600">
                              {doc.type} • {doc.jurisdiction} • {new Date(doc.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(doc.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(doc.status)}
                              <span className="capitalize">{doc.status}</span>
                            </div>
                          </Badge>
                          
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
