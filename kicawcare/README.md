# Kicawcare 🧠

An AI-assisted mental health counseling platform for university students.

## 🌟 Features
- **Smart Queue System**: Severity-based priority queue connecting students to available counselors faster.
- **AI Stress Engine**: Intelligent screening (PHQ-9 & GAD-7) with sentiment analysis using Google AI Studio `gemini-2.5-flash`.
- **Counselor Dashboard**: View priority queues, AI summaries of student journals, and manage video session notes.
- **Safe & Confidential**: Built with Next.js 15, NextAuth v5, and Prisma with strict RBAC (Role-Based Access Control).

## 🚀 Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS v4, Framer Motion, shadcn/ui.
- **Backend**: Next.js Server Actions & API Routes, NextAuth.js v5.
- **Database**: PostgreSQL via Prisma ORM.
- **Realtime**: Pusher.
- **AI Integration**: Google Gen AI SDK.

## 💻 Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (if running locally without Docker)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up the database via Docker:
   ```bash
   docker-compose up -d
   ```
3. Copy `.env` file variables and fill in your keys (including `GEMINI_API_KEY`). For `FIREBASE_ADMIN_PRIVATE_KEY`, paste the key with `\n` for line breaks. Service account credentials are in Firebase Console → Project Settings → Service accounts → Generate new private key. Do not commit the JSON file or any service account keys to git.
4. Run Prisma migrations:
   ```bash
   npx prisma db push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Accessing the Platform
Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📄 API Documentation
REST API documentation can be found in `public/openapi.yaml`.

## 🏗 Architecture
The application utilizes a Monolithic Next.js 15 architecture. Mutations are handled via Server Actions, while webhooks and external integrations use traditional Route Handlers. Data is persistently stored in PostgreSQL, with real-time updates pushed via Pusher to client components.
