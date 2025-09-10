# ParaDoc.app API Documentation

## Overview

ParaDoc.app provides a comprehensive REST API for legal document generation, AI-powered services, user management, and subscription handling. All API endpoints are built using Next.js API Routes with Node.js runtime.

## Base URL

```
Development: http://localhost:3000/api
Production: https://paradoc.app/api
```

## Authentication

Most endpoints require authentication using NextAuth.js session tokens. Include the session cookie in your requests.

### Authentication Headers
```
Cookie: next-auth.session-token=<session-token>
```

## Rate Limiting

API endpoints have different rate limits based on user subscription:

- **Free**: Limited requests per day
- **Pro**: Higher limits for all services
- **Enterprise**: Maximum limits with priority support

Rate limit headers are included in responses:
```
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2025-01-01T00:00:00Z
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": "Additional error details (optional)"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `402` - Payment Required (subscription upgrade needed)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error
- `503` - Service Unavailable (AI services down)

## API Endpoints

### Authentication

#### NextAuth.js Endpoints
```
GET/POST /api/auth/[...nextauth]
```
Handles all authentication flows (sign in, sign out, callbacks).

### User Management

#### Get User Profile
```
GET /api/user/profile
```
Returns the authenticated user's profile information.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://example.com/avatar.jpg",
    "role": "pro",
    "subscription_status": "active",
    "trial_ends_at": "2025-01-15T00:00:00Z",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-10T00:00:00Z"
  }
}
```

#### Update User Profile
```
PUT /api/user/profile
```
Updates the authenticated user's profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "image": "https://example.com/new-avatar.jpg"
}
```

### Document Management

#### List Documents
```
GET /api/documents?page=1&limit=10&type=contract&jurisdiction=US&search=employment
```
Returns paginated list of user's documents with optional filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `type` (optional): Filter by document type
- `jurisdiction` (optional): Filter by jurisdiction (US/CA)
- `search` (optional): Search in title and content

**Response:**
```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "id": "uuid",
        "title": "Employment Contract",
        "content": "Document content...",
        "type": "contract",
        "jurisdiction": "US",
        "metadata": {},
        "created_at": "2025-01-01T00:00:00Z",
        "updated_at": "2025-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### Create Document
```
POST /api/documents
```
Creates a new document. Requires active subscription.

**Request Body:**
```json
{
  "title": "Employment Contract",
  "content": "Document content...",
  "type": "contract",
  "jurisdiction": "US",
  "metadata": {
    "client": "ABC Corp",
    "template_version": "1.2"
  }
}
```

#### Get Document
```
GET /api/documents/[id]
```
Returns a specific document by ID.

#### Update Document
```
PUT /api/documents/[id]
```
Updates a specific document.

#### Delete Document
```
DELETE /api/documents/[id]
```
Deletes a specific document.

### AI Services

#### Generate Document
```
POST /api/ai/generate-document
```
Generates a legal document using AI. Requires active subscription.

**Request Body:**
```json
{
  "prompt": "Create an employment contract for a software engineer in California",
  "type": "contract",
  "jurisdiction": "US",
  "context": {
    "position": "Software Engineer",
    "salary": "$120,000",
    "location": "California"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "AI Generated Contract",
    "content": "Generated legal document content...",
    "type": "contract",
    "jurisdiction": "US",
    "metadata": {
      "generated_by_ai": true,
      "original_prompt": "Create an employment contract...",
      "generated_at": "2025-01-01T00:00:00Z"
    }
  },
  "usage": {
    "remaining": 95,
    "resetTime": "2025-01-02T00:00:00Z"
  }
}
```

#### AI Chatbot
```
POST /api/ai/chatbot
```
Get legal advice from AI chatbot. Requires active subscription.

**Request Body:**
```json
{
  "message": "What are the key elements of a valid contract?",
  "context": [
    {
      "role": "user",
      "content": "Previous question..."
    },
    {
      "role": "assistant", 
      "content": "Previous response..."
    }
  ],
  "documentId": "uuid" // Optional: for document-specific context
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "A valid contract requires several key elements...",
    "timestamp": "2025-01-01T00:00:00Z",
    "context_used": true
  },
  "usage": {
    "remaining": 495,
    "resetTime": "2025-01-02T00:00:00Z"
  }
}
```

#### Summarize Document
```
POST /api/ai/summarize
```
Summarizes legal document content. Requires active subscription.

**Request Body:**
```json
{
  "content": "Long legal document content...",
  "type": "brief" // "brief", "detailed", or "key_points"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "This document outlines the key terms...",
    "summary_type": "brief",
    "content_length": 5000,
    "generated_at": "2025-01-01T00:00:00Z",
    "risk_assessment": {
      "riskScore": 3,
      "analysis": "Low risk document with standard clauses...",
      "recommendations": ["Review termination clause", "Add confidentiality provisions"]
    }
  }
}
```

#### Legal Lookup
```
GET /api/ai/lookup?query=employment law&jurisdiction=US&category=statutes
```
Search legal statutes, templates, and case law.

**Query Parameters:**
- `query`: Search query (required)
- `jurisdiction`: US or CA (default: US)
- `category`: statutes, templates, case_law, or all (default: all)

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "employment law",
    "jurisdiction": "US",
    "category": "statutes",
    "results": "Relevant legal information and statutes...",
    "sources": ["29 U.S.C. § 201", "29 C.F.R. § 541"],
    "timestamp": "2025-01-01T00:00:00Z"
  }
}
```

### Subscription Management

#### Get Subscription Details
```
GET /api/subscription
```
Returns user's subscription information, usage stats, and features.

**Response:**
```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "plan": "pro",
      "status": "active",
      "current_period_end": "2025-02-01T00:00:00Z",
      "stripe_details": {}
    },
    "user": {
      "role": "pro",
      "subscriptionStatus": "active",
      "hasStripeCustomer": true
    },
    "trial": {
      "isActive": false,
      "endsAt": null,
      "daysRemaining": 0
    },
    "usage": {
      "documentsGenerated": { "total": 15, "today": 2 },
      "chatbotQueries": { "total": 50, "today": 5 },
      "documentsSummarized": { "total": 8, "today": 1 },
      "legalLookups": { "total": 25, "today": 3 }
    },
    "features": {
      "unlimitedDocuments": true,
      "chatbot": true,
      "aiSummarizer": true,
      "riskScanner": true,
      "exportFormats": ["PDF", "DOCX", "Google Docs"],
      "storageMonths": 6,
      "emailSupport": true
    }
  }
}
```

#### Create Subscription
```
POST /api/subscription/create
```
Creates a Stripe checkout session for subscription.

**Request Body:**
```json
{
  "plan": "pro" // "pro" or "enterprise"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "cs_test_...",
    "url": "https://checkout.stripe.com/pay/cs_test_...",
    "plan": "pro"
  }
}
```

#### Customer Portal
```
POST /api/subscription/portal
```
Creates Stripe customer portal session for subscription management.

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://billing.stripe.com/session/..."
  }
}
```

### Webhooks

#### Stripe Webhook
```
POST /api/webhooks/stripe
```
Handles Stripe webhook events. No authentication required but signature verification is performed.

**Supported Events:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.trial_will_end`
- `checkout.session.completed`

## Data Types

### Document Types
- `contract` - Legal contracts
- `agreement` - Legal agreements
- `brief` - Legal briefs
- `template` - Document templates
- `other` - Other document types

### Jurisdictions
- `US` - United States
- `CA` - Canada

### User Roles
- `free` - Free tier user
- `pro` - Pro subscription user
- `enterprise` - Enterprise subscription user

### Subscription Status
- `active` - Active paid subscription
- `trial` - In trial period
- `inactive` - No active subscription
- `canceled` - Canceled subscription
- `past_due` - Payment failed

## Security

### Authentication
All protected endpoints require valid NextAuth.js session tokens.

### Rate Limiting
Endpoints are rate-limited based on user subscription level to prevent abuse.

### Data Validation
All input is validated using Zod schemas before processing.

### Audit Logging
All significant actions are logged for security and compliance.

### Encryption
All data is encrypted in transit (HTTPS) and at rest in Supabase.

## Testing

Use the provided environment template to set up your development environment:

1. Copy `env.template` to `.env.local`
2. Fill in your API keys and configuration
3. Run the database schema in Supabase
4. Start the development server: `npm run dev`

## Support

For API support and questions:
- Documentation: Check this file and inline code comments
- Issues: Create GitHub issues for bugs
- Enterprise: Contact support for dedicated assistance
