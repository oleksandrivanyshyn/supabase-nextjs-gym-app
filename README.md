# Supabase Next.js Gym App

A full-stack fitness center application built with Next.js 15 and Supabase. The project implements a management system for subscription plans, user memberships, and payment processing.

## Features

- **Next.js 15 & Server Actions**: All database interaction, payment processing, and subscription management logic is handled via server actions.
- **Supabase (PostgreSQL)**: Utilizes Supabase as a backend service for data storage and relational database management.
- **Role-Based Access Control**: Separated access for public and private routes, featuring an admin panel for managing subscription plans.
- **Client-Side State Management**: Uses Zustand for clean and lightweight management of global state for plans and users.
- **Modern UI**: The interface is built using Tailwind CSS and Shadcn UI components.

## Tech Stack

- **Frontend**: React, Next.js 15 (App Router), Tailwind CSS, Shadcn UI
- **Backend Services**: Supabase (PostgreSQL), Server Actions
- **State Manager**: Zustand

## Project Structure

- `/src/app` — Application routing (including private zones for clients and admins)
- `/src/actions` — Server actions for plans, subscriptions, and payments
- `/src/global-store` — Zustand global stores
- `/src/components/ui` — Reusable UI components
- `/src/config` — Supabase client configuration

## Getting Started

1. Clone the repository.
2. Install dependencies:
```bash
   npm install

```

3. Create a `.env` file and add your environment variables(look into .env.example for variable to have).
4. Run the development server:

```bash
   npm run dev

```
