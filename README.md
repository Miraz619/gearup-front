# GearUp Frontend

GearUp is a modern, role-based equipment rental marketplace frontend built with Next.js and TypeScript. The application allows customers to browse and rent outdoor and sports equipment, enables providers to manage their inventory and orders, and gives administrators oversight of platform operations.

## Overview

This frontend connects to a backend API to power:

- Public browsing of gear catalog with filtering and pagination
- Detailed gear views and category-based discovery
- User authentication and role-based dashboards
- Provider tools for creating, updating, and managing gear
- Customer rental requests, payments, and review submission
- Admin management of users, categories, and platform data

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui component system
- React Hook Form + Zod
- TanStack Query
- Recharts
- Sonner for notifications

## Project Structure

```text
app/                 # App Router pages, layouts, and route groups
components/          # Shared and feature-based UI components
service/             # API service functions for backend communication
types/               # TypeScript models for auth, gear, rentals, payments, reviews
lib/                 # Utility helpers
public/              # Static assets
```

## Features

### For Customers

- Browse gear by category and filters
- View full gear details
- Create rental requests
- Complete payments through Stripe Checkout
- Track rentals and submit reviews

### For Providers

- Manage equipment listings
- Create and update gear entries
- View provider orders and earnings
- Monitor rental activity and fulfillment status

### For Admins

- Manage users and account status
- Manage categories
- Review platform-level dashboard analytics

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create an environment file:

```bash
cp .env.local.example .env.local
```

4. Configure your backend URL:

```env
BACKEND_API_URL=http://localhost:5000
```

### Development

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
pnpm dev      # Start the Next.js development server
pnpm build    # Create a production build
pnpm start    # Start the production server
pnpm lint     # Run ESLint checks
```

## Environment Variables

The application expects the following environment variable:

- BACKEND_API_URL: Base URL for the backend API used by the frontend services and server actions

## Contributing

Contributions are welcome. If you would like to improve the project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

This project is currently unlicensed. Add an appropriate license if you plan to distribute or share it publicly.
