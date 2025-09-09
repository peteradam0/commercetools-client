# Commercetools POC Client

A Next.js proof-of-concept application demonstrating integration with Commercetools Commerce
Platform.

## Features

- Product catalog browsing
- Shopping cart functionality
- Basic admin operations
- Commercetools SDK integration

## Prerequisites

- Node.js 18+
- npm or yarn
- Commercetools project with API credentials

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd commercetools-poc
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
CT_PROJECT_KEY=your-project-key
CT_CLIENT_ID=your-client-id
CT_CLIENT_SECRET=your-client-secret
CT_AUTH_URL=https://auth.europe-west1.gcp.commercetools.com
CT_API_URL=https://api.europe-west1.gcp.commercetools.com
```

> **Note:** Replace the URLs with your Commercetools region endpoints if different.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Project Structure

```
├── pages/          # Next.js pages
├── components/     # Reusable React components
├── lib/           # Commercetools client and utilities
├── types/         # TypeScript type definitions
└── styles/        # CSS styles
```

## Commercetools Setup

1. Create a Commercetools project at [commercetools.com](https://commercetools.com)
2. Generate API client credentials with appropriate scopes:
   - `manage_products`
   - `manage_orders`
   - `view_products`
   - `manage_shopping_lists`
3. Add sample products to test the application

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Commerce:** Commercetools Platform SDK
- **Linting:** ESLint with TypeScript rules

## License

MIT License - This is a proof of concept application.
