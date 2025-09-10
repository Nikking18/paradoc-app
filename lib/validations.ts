import { z } from 'zod';

// User validation schemas
export const userProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  image: z.string().url().optional(),
});

export const userUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  image: z.string().url().optional(),
});

// Document validation schemas
export const documentCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['contract', 'agreement', 'brief', 'template', 'other']).default('other'),
  jurisdiction: z.enum(['US', 'CA']).default('US'),
  metadata: z.record(z.unknown()).optional(),
});

export const documentUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  type: z.enum(['contract', 'agreement', 'brief', 'template', 'other']).optional(),
  jurisdiction: z.enum(['US', 'CA']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// AI service validation schemas
export const aiGenerateDocumentSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters').max(2000),
  type: z.enum(['contract', 'agreement', 'brief', 'template', 'other']).default('other'),
  jurisdiction: z.enum(['US', 'CA']).default('US'),
  context: z.record(z.unknown()).optional(),
});

export const aiChatbotSchema = z.object({
  message: z.string().min(1, 'Message is required').max(1000),
  context: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
  documentId: z.string().uuid().optional(),
});

export const aiSummarizeSchema = z.object({
  content: z.string().min(50, 'Content must be at least 50 characters').max(50000),
  type: z.enum(['brief', 'detailed', 'key_points']).default('brief'),
});

export const aiLookupSchema = z.object({
  query: z.string().min(3, 'Query must be at least 3 characters').max(200),
  jurisdiction: z.enum(['US', 'CA']).default('US'),
  category: z.enum(['statutes', 'templates', 'case_law', 'all']).default('all'),
});

// Subscription validation schemas
export const subscriptionCreateSchema = z.object({
  plan: z.enum(['pro', 'enterprise']),
  paymentMethodId: z.string().optional(),
});

// Webhook validation schemas
export const stripeWebhookSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.unknown(),
  }),
});

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.string().optional().default('1').transform(Number).pipe(z.number().min(1)),
  limit: z.string().optional().default('10').transform(Number).pipe(z.number().min(1).max(100)),
});

export const documentFilterSchema = z.object({
  type: z.enum(['contract', 'agreement', 'brief', 'template', 'other']).optional(),
  jurisdiction: z.enum(['US', 'CA']).optional(),
  search: z.string().max(200).optional(),
});

// Rate limiting schemas
export const rateLimitSchema = z.object({
  identifier: z.string(),
  limit: z.number().positive(),
  window: z.number().positive(),
});

// Error response schema
export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  details: z.unknown().optional(),
});

// Success response schema
export const successResponseSchema = z.object({
  success: z.boolean().default(true),
  data: z.unknown().optional(),
  message: z.string().optional(),
});

// Audit log schema
export const auditLogSchema = z.object({
  action: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  metadata: z.record(z.unknown()).optional(),
});

// Helper function to validate request body
export function validateRequestBody<T>(schema: z.ZodSchema<T>, body: unknown): T {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new Error(`Validation error: ${result.error.message}`);
  }
  return result.data;
}

// Helper function to validate query parameters
export function validateQueryParams<T>(schema: z.ZodSchema<T>, params: unknown): T {
  const result = schema.safeParse(params);
  if (!result.success) {
    throw new Error(`Query parameter validation error: ${result.error.message}`);
  }
  return result.data;
}
