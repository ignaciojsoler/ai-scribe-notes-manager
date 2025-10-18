# Medical Dashboard Frontend

A clean React frontend for the Medical Dashboard application, built with TypeScript, Vite, and Tailwind CSS.

## Features

- **Patient List View**: Display patients with clean card layout
- **Loading States**: Proper loading indicators and error handling
- **Type Safety**: Full TypeScript support with proper type definitions
- **Modern UI**: Clean, medical dashboard design using Tailwind CSS
- **API Integration**: Seamless connection to backend API

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Custom hooks for data fetching

## Getting Started

### Prerequisites

- Node.js 18+ 
- Backend server running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Development

The frontend is configured to proxy API requests to the backend server running on port 3000. Make sure the backend is running before starting the frontend.

## Project Structure

```
src/
├── components/
│   └── PatientList.tsx    # Main patient list component
├── hooks/
│   └── usePatients.ts     # Custom hook for fetching patients
├── types/
│   └── patient.ts         # TypeScript type definitions
└── App.tsx                # Main application component
```

## Components

### PatientList
- Displays patients in a responsive card grid
- Handles loading, error, and empty states
- Shows patient name, ID, date of birth, and email

### usePatients Hook
- Custom hook for fetching patient data from `/api/patients`
- Provides loading states and error handling
- Includes refetch functionality

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
