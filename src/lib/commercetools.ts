import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/ts-client'

// CommerceTools client configuration (server-side only)
const projectKey = process.env.CT_PROJECT_KEY!
const clientId = process.env.CT_CLIENT_ID!
const clientSecret = process.env.CT_CLIENT_SECRET!
const authUrl = process.env.CT_AUTH_URL!
const apiUrl = process.env.CT_API_URL!
const scopes = process.env.CT_SCOPE?.split(' ') || [
  `manage_project:${projectKey}`,
]

// Auth middleware for client credentials flow
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  httpClient: fetch,
}

// Configure HTTP API httpMiddlewareOptions
const httpAPIHTTPMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  httpClient: fetch,
}

// Export the ClientBuilder for the HTTP API
export const ctpClientHTTPAPI = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpAPIHTTPMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build()

// API root for making requests
export const apiRoot = createApiBuilderFromCtpClient(
  ctpClientHTTPAPI
).withProjectKey({
  projectKey,
})

// Export project key for use in other modules
export { projectKey }
