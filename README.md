# FE_Test – Toll Collection Management (TCM)

A web-based dashboard prototype for **Toll Collection Management (TCM)**, designed to monitor toll collection operations, transaction activities, revenue performance, and toll gate status.

This project is developed as part of a frontend technical assessment.

## Overview

TCM is a dashboard application that provides an overview of toll collection operations through data visualization, summary indicators, and transaction monitoring.

The application focuses on presenting operational information in a clear, structured, and user-friendly interface.

## Features

- **Dashboard Overview** – Displays key operational metrics, including total transactions, total revenue, and active toll gates.
- **Transaction Analytics** – Visualizes transaction trends over selected periods.
- **Revenue Analytics** – Displays revenue performance through interactive charts.
- **Recent Transactions** – Presents transaction records with search and status information.
- **Toll Gate Monitoring** – Displays toll gate information and operational status.
- **Dashboard Filters** – Supports filtering dashboard data by period and toll road.
- **Internationalization** – Supports Indonesian and English languages.
- **Theme Switching** – Supports light, dark, and system themes.
- **Responsive Layout** – Provides a dashboard interface for desktop and mobile screens.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework |
| React 19 | UI library |
| TypeScript | Static type checking |
| Tailwind CSS 4 | Styling |
| shadcn/ui | UI components |
| TanStack Query | Data fetching and caching |
| Highcharts | Data visualization |
| next-intl | Internationalization |
| next-themes | Theme management |
| Lucide React | Icons |
| date-fns | Date formatting |

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/fahrulfahmi/FE_Test.git
```

Navigate to the project directory:

```bash
cd FE_Test
```

Install dependencies:

```bash
npm install
```

### Run Development Server

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

The application supports the following locales:

- Indonesian: `/id`
- English: `/en`

### Build for Production

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── MobileSidebar.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   └── LanguageSwitcher.tsx
│   └── providers/
│       └── AppProviders.tsx
│
├── features/
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── mocks/
│       ├── types/
│       ├── constants/
│       └── pages/
│
├── i18n/
│   ├── routing.ts
│   └── request.ts
│
└── proxy.ts

messages/
├── id.json
└── en.json
```

## Data Source

This project currently uses **mock data** to demonstrate dashboard functionality and data visualization.

No backend API integration or persistent database is required for the current prototype.

The mock data is organized separately from UI components to support future API integration.

## Notes

- This repository contains the frontend implementation.
- Dashboard data is simulated using mock data.
- Some navigation items are prepared for future module development.
- Backend integration is outside the current project scope.

---

Developed as part of a Frontend Technical Assessment.

**FE_Test – Toll Collection Management (TCM)**