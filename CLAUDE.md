# CODE.md - Project Context

## Project Overview
CommerceTools e-commerce application built with Next.js, TypeScript, and domain-driven architecture.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Styled Components
- **UI Library**: @commercetools-frontend/ui-kit
- **Backend**: CommerceTools
- **Code Quality**: ESLint + Prettier

## Current Project Structure
Standard Next.js App Router structure with localized routes, authentication pages, shop pages, and shared UI components.

## Desired Architecture: Domain-Driven Design
Each domain should contain:
```
domains/
├── [domain-name]/
│   ├── api/           # Data fetching from CommerceTools
│   ├── domain/        # Types, interfaces, business logic
│   └── ui/            # Domain-specific UI components
```

## Development Preferences

### Component Strategy
- **Shared Components**: Generic, reusable components in `app/shared/ui/`
- **Domain Components**: Feature-specific components that use shared components
- **Styling**: Extend commercetools ui-kit components with styled-components for custom styling

### File Naming
- Components: PascalCase (e.g., `ProductCard.tsx`)
- Pages: lowercase with kebab-case (e.g., `product-details/page.tsx`)
- Types: PascalCase with `.types.ts` suffix (e.g., `Product.types.ts`)
- Services: camelCase with `.service.ts` suffix (e.g., `product.service.ts`)

### Import Preferences
- Use absolute imports for shared components
- Use relative imports within the same domain
- Import order: React/Next.js → Third-party → Shared → Domain → Relative

### Code Quality
- TypeScript strict mode
- ESLint + Prettier configured
- Prefer functional components with hooks
- Use styled-components for custom styling on top of ui-kit components

## Key Patterns to Follow
1. Create generic shared components first
2. Compose domain-specific components from shared ones
3. Keep business logic in domain layer
4. Use TypeScript interfaces for all data structures
5. Follow Next.js App Router conventions