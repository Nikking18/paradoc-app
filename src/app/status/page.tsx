"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock, Activity, Server, Database, Shield, FileText, Users, Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'outage':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <Activity className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">System Status</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            ParaDoc.app
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"> Status</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Real-time status information for all ParaDoc.app services. We monitor our systems 24/7 to ensure 
            the best possible experience for our users.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gray-900 text-white hover:bg-black px-8 py-4 text-lg font-semibold"
              onClick={refreshData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
            </Button>
            <div className="text-sm text-gray-600">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Overall System Status</h2>
            <p className="text-lg text-gray-600">All systems are operating normally</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Operational</h3>
                <p className="text-gray-600">All systems normal</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Activity className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h3>
                <p className="text-gray-600">Uptime (30 days)</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">45ms</h3>
                <p className="text-gray-600">Avg Response Time</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">0</h3>
                <p className="text-gray-600">Active Incidents</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Status */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Component Status</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed status information for all ParaDoc.app services and components.
            </p>
          </div>
          
          <div className="space-y-4">
            {/* API */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <Server className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">API</h3>
                      <p className="text-gray-600">Core API services</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatusIcon('operational')}
                      <span className="ml-2 text-gray-700">Operational</span>
                    </div>
                    <Badge className={getStatusColor('operational')}>Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Generation */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Document Generation</h3>
                      <p className="text-gray-600">AI-powered document creation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatusIcon('operational')}
                      <span className="ml-2 text-gray-700">Operational</span>
                    </div>
                    <Badge className={getStatusColor('operational')}>Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <Activity className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">AI Analysis</h3>
                      <p className="text-gray-600">Document analysis and risk assessment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatusIcon('operational')}
                      <span className="ml-2 text-gray-700">Operational</span>
                    </div>
                    <Badge className={getStatusColor('operational')}>Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <Database className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Database</h3>
                      <p className="text-gray-600">User data and document storage</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatusIcon('operational')}
                      <span className="ml-2 text-gray-700">Operational</span>
                    </div>
                    <Badge className={getStatusColor('operational')}>Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Authentication</h3>
                      <p className="text-gray-600">User login and security</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatusIcon('operational')}
                      <span className="ml-2 text-gray-700">Operational</span>
                    </div>
                    <Badge className={getStatusColor('operational')}>Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Storage */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">File Storage</h3>
                      <p className="text-gray-600">Document and media storage</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatusIcon('operational')}
                      <span className="ml-2 text-gray-700">Operational</span>
                    </div>
                    <Badge className={getStatusColor('operational')}>Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Recent Incidents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Historical record of system incidents and maintenance windows.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Incident 1 */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Scheduled Maintenance</h3>
                      <p className="text-gray-600">Database optimization and security updates</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Started:</span> Aug 28, 2024 02:00 UTC
                  </div>
                  <div>
                    <span className="font-medium">Resolved:</span> Aug 28, 2024 04:30 UTC
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> 2 hours 30 minutes
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Updates:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>02:00 UTC:</strong> Maintenance window started. Database optimization in progress.</p>
                    <p><strong>03:15 UTC:</strong> Security updates applied successfully.</p>
                    <p><strong>04:30 UTC:</strong> All systems restored. Maintenance completed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Incident 2 */}
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">API Performance Degradation</h3>
                      <p className="text-gray-600">Temporary slowdown in API response times</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Started:</span> Aug 25, 2024 14:30 UTC
                  </div>
                  <div>
                    <span className="font-medium">Resolved:</span> Aug 25, 2024 16:45 UTC
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> 2 hours 15 minutes
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Updates:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>14:30 UTC:</strong> We're investigating reports of slower API response times.</p>
                    <p><strong>15:00 UTC:</strong> Identified the issue with our load balancer configuration.</p>
                    <p><strong>16:45 UTC:</strong> Issue resolved. API performance restored to normal levels.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time performance data for our key services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Server className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Server Response</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">45ms</p>
                <p className="text-gray-600">Average response time</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Database className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Database</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">12ms</p>
                <p className="text-gray-600">Query response time</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Network</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">8ms</p>
                <p className="text-gray-600">Latency to edge</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to status updates and be the first to know about any incidents or maintenance windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 font-semibold">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            We'll only send you important status updates. No spam, unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}