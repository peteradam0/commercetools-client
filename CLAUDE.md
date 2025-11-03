# CODE.md - Project Context

# Developer Context

- this is not an enterprise-level project.
- provide simple and direct solutions

## Project Overview

- this is a Proof of Concept for CommerceTools a headless e-commerce solution
- start with the most obvious solution that works
- application built with Next.js, TypeScript, and domain-driven architecture

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 100%, strictin mode enforced `tsconfig.json`
- **Styling**: Styled Components
- **UI Library**: @commercetools-frontend/ui-kit
- **Backend**: CommerceTools
- **Code Quality**: ESLint + Prettier

## Current Project Structure

Standard Next.js App Router structure with localized routes, authentication pages, shop pages, and
shared UI components.

## Desired Architecture: Domain-Driven Design

Each domain should contain:

```
├── [domain-name]/
│   ├── api/           # Data fetching from CommerceTools
│   ├── domain/        # Types, interfaces, business logic
│   └── ui/            # Domain-specific UI components
```

## What not to do

- don't optimize prematurely
- currently testing is not a priority
- don't introduce complicated desgin patterns unless it is really neccessary
- don't optimize prematurally

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

1. Before generating any code always come up with suggestions that the developer has to agree with
2. Create generic shared components first
3. Compose domain-specific components from shared ones
4. Keep business logic in domain layer
5. Use TypeScript interfaces for all data structures
6. Follow Next.js App Router conventions

Every time when you are done reading this file print out 🥶🥶🥶
