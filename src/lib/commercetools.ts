import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ClientBuilder } from '@commercetools/sdk-client-v2'
import { createAuthForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

// CommerceTools client configuration
const projectKey = process.env.NEXT_PUBLIC_CT_PROJECT_KEY!
const clientId = process.env.NEXT_PUBLIC_CT_CLIENT_ID!
const clientSecret = process.env.NEXT_PUBLIC_CT_CLIENT_SECRET!
const authUrl = process.env.NEXT_PUBLIC_CT_AUTH_URL!
const apiUrl = process.env.NEXT_PUBLIC_CT_API_URL!
const scopes = process.env.NEXT_PUBLIC_CT_SCOPE?.split(' ') || [
  `manage_project:${projectKey}`,
]

// Auth middleware for client credentials flow
const authMiddleware = createAuthForClientCredentialsFlow({
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
})

// HTTP middleware
const httpMiddleware = createHttpMiddleware({
  host: apiUrl,
  fetch,
})

// Create CommerceTools client
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withMiddleware(authMiddleware)
  .withMiddleware(httpMiddleware)
  .build()

// API root for making requests
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
})

// Export project key for use in other modules
export { projectKey }
