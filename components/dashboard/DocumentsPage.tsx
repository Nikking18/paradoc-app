"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2,
  Calendar,
  Tag
} from "lucide-react";
import { Document } from "@/lib/supabase";

export function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'contract':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'agreement':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'brief':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'template':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Documents</h1>
          <p className="font-body text-gray-600 mt-1">
            Manage your legal documents and templates
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-black text-white hover:bg-gray-800 font-body"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Document
          </Button>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <Card className="border-gray-200 bg-white shadow-premium">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors"
              >
                <option value="all">All Types</option>
                <option value="contract">Contracts</option>
                <option value="agreement">Agreements</option>
                <option value="brief">Briefs</option>
                <option value="template">Templates</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <Card className="border-gray-200 bg-white shadow-premium">
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">
              {documents.length === 0 ? 'No documents yet' : 'No documents found'}
            </h3>
            <p className="font-body text-gray-600 mb-6">
              {documents.length === 0 
                ? 'Create your first legal document to get started.'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
            {documents.length === 0 && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-black text-white hover:bg-gray-800 font-body"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Document
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredDocuments.map((document, index) => (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover-lift border-gray-200 bg-white shadow-premium hover:shadow-premium-hover h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="font-heading text-lg font-semibold text-gray-900 line-clamp-2">
                          {document.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={`text-xs ${getTypeBadgeColor(document.type)}`}>
                            <Tag className="h-3 w-3 mr-1" />
                            {document.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                            {document.jurisdiction}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="font-body text-gray-600 line-clamp-3 mb-4">
                      {document.content.substring(0, 150)}...
                    </CardDescription>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(document.created_at)}
                    </div>

                    <div className="flex items-center space-x-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-body"
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 font-body"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50 font-body"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create Document Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateDocumentModal 
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
              fetchDocuments();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Create Document Modal Component
function CreateDocumentModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'contract' as 'contract' | 'agreement' | 'brief' | 'template' | 'other',
    jurisdiction: 'US' as 'US' | 'CA'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        console.error('Error creating document:', error);
      }
    } catch (error) {
      console.error('Error creating document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-heading text-xl font-bold">Create New Document</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-body text-sm font-medium text-gray-700 mb-1">
              Document Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors"
              placeholder="Enter document title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm font-medium text-gray-700 mb-1">
                Document Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'contract' | 'agreement' | 'brief' | 'template' | 'other' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors"
              >
                <option value="contract">Contract</option>
                <option value="agreement">Agreement</option>
                <option value="brief">Brief</option>
                <option value="template">Template</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-gray-700 mb-1">
                Jurisdiction *
              </label>
              <select
                value={formData.jurisdiction}
                onChange={(e) => setFormData(prev => ({ ...prev, jurisdiction: e.target.value as 'US' | 'CA' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-gray-700 mb-1">
              Document Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-body focus:ring-2 focus:ring-black focus:border-black transition-colors"
              placeholder="Enter document content or description..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 font-body"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-black text-white hover:bg-gray-800 font-body"
            >
              {loading ? 'Creating...' : 'Create Document'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
