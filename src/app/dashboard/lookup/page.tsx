"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  FileText, 
  BookOpen, 
  Scale, 
  ArrowLeft,
  Filter,
  Download,
  ExternalLink,
  Clock,
  MapPin,
  Calendar
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  type: 'case' | 'statute' | 'regulation' | 'template';
  jurisdiction: string;
  date: string;
  summary: string;
  relevance: number;
  url?: string;
  citation: string;
}

export default function LookupPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [jurisdiction, setJurisdiction] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch('/api/lookup/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          type: searchType,
          jurisdiction: jurisdiction
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'case':
        return <Scale className="h-4 w-4" />;
      case 'statute':
        return <BookOpen className="h-4 w-4" />;
      case 'regulation':
        return <FileText className="h-4 w-4" />;
      case 'template':
        return <FileText className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'case':
        return 'bg-blue-100 text-blue-800';
      case 'statute':
        return 'bg-green-100 text-green-800';
      case 'regulation':
        return 'bg-purple-100 text-purple-800';
      case 'template':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
                onClick={() => router.push('/dashboard')}
                className="border-gray-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Legal Lookup</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center space-x-1">
                <Search className="h-3 w-3" />
                <span>AI-Powered Search</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-6 w-6 mr-2" />
              Search Legal Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search Input */}
              <div className="flex space-x-4">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for cases, statutes, regulations, or legal concepts..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || isSearching}
                  className="bg-gray-900 text-white hover:bg-black"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {/* Filters */}
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Search Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="case">Case Law</SelectItem>
                      <SelectItem value="statute">Statutes</SelectItem>
                      <SelectItem value="regulation">Regulations</SelectItem>
                      <SelectItem value="template">Templates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jurisdictions</SelectItem>
                      <SelectItem value="federal">Federal (USA/Canada)</SelectItem>
                      <SelectItem value="california">California</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="texas">Texas</SelectItem>
                      <SelectItem value="ontario">Ontario</SelectItem>
                      <SelectItem value="british-columbia">British Columbia</SelectItem>
                      <SelectItem value="alberta">Alberta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Results List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Search Results</span>
                    <Badge variant="outline">
                      {results.length} results
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.map((result) => (
                      <div
                        key={result.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedResult?.id === result.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedResult(result)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getTypeColor(result.type)}>
                                <div className="flex items-center space-x-1">
                                  {getTypeIcon(result.type)}
                                  <span className="capitalize">{result.type}</span>
                                </div>
                              </Badge>
                              <Badge variant="outline" className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{result.jurisdiction}</span>
                              </Badge>
                              <Badge variant="outline" className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{result.date}</span>
                              </Badge>
                            </div>
                            
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {result.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-2">
                              {result.summary}
                            </p>
                            
                            <p className="text-xs text-gray-500">
                              {result.citation}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge variant="outline" className="text-xs">
                              {result.relevance}% match
                            </Badge>
                            {result.url && (
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Result Details */}
            <div>
              {selectedResult ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Result Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {selectedResult.title}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className={getTypeColor(selectedResult.type)}>
                            <div className="flex items-center space-x-1">
                              {getTypeIcon(selectedResult.type)}
                              <span className="capitalize">{selectedResult.type}</span>
                            </div>
                          </Badge>
                          <Badge variant="outline">
                            {selectedResult.jurisdiction}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                        <p className="text-gray-600 text-sm">
                          {selectedResult.summary}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Citation</h4>
                        <p className="text-gray-600 text-sm font-mono">
                          {selectedResult.citation}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Date</h4>
                        <p className="text-gray-600 text-sm">
                          {selectedResult.date}
                        </p>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          {selectedResult.url && (
                            <Button variant="outline" size="sm" className="flex-1">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Source
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a Result
                    </h3>
                    <p className="text-gray-600">
                      Click on any search result to view detailed information
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* No Results */}
        {results.length === 0 && !isSearching && searchQuery && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setResults([]);
                }}
                variant="outline"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Search Suggestions */}
        {results.length === 0 && !searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Scale className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Case Law</h3>
                <p className="text-gray-600 text-sm">Search court decisions and precedents</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Statutes</h3>
                <p className="text-gray-600 text-sm">Find relevant laws and regulations</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Templates</h3>
                <p className="text-gray-600 text-sm">Access legal document templates</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Legal Concepts</h3>
                <p className="text-gray-600 text-sm">Research legal terms and concepts</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
