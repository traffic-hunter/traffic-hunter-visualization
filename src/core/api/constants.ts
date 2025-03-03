export const HTTP_ERROR_MESSAGES = {
  BAD_REQUEST: 'Invalid request parameters',
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  INTERNAL_SERVER: 'Internal server error',
  NETWORK: 'Network error occurred',
  DEFAULT: 'Unknown error occurred'
} as const;