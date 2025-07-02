# Lab Report Analyzer

A modern web application for uploading, extracting, and analyzing health/lab reports using OCR and AI. Built with Next.js (frontend) and FastAPI (backend microservice).

## Demo

Watch the demo on Google Drive: [Demo Video](https://drive.google.com/drive/folders/1qUIsVZZJNkYmkpiHP-pkApjgC1tB_muu?usp=sharing)


## Features

- **User Authentication:** Secure signup, login, and JWT-based session management.
- **File Upload:** Upload PDF or image lab reports (max 5MB).
- **OCR & AI Extraction:** Extracts health parameters from uploaded reports using FastAPI microservice.
- **Dashboard:** Visualize trends, view extracted parameters, and manage your reports.
- **Responsive UI:** Clean, modern interface with React, Tailwind CSS, and shadcn/ui components.
- **Error Handling:** Friendly error messages and robust validation throughout the app.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui, React Query, Axios
- **Backend:** FastAPI (Python), OCR/AI extraction logic
- **Database:** Prisma ORM (for user and report storage)
- **Authentication:** JWT (JSON Web Tokens), secure cookies

## FastAPI Microservice

We use a custom [FastAPI microservice](https://github.com/vivekbopaliya/lab-report-analyzer-microservice) for OCR and AI-based extraction of health parameters from uploaded PDF and image lab reports. The Next.js frontend securely uploads files to this microservice, which processes the files and returns structured health data for further analysis and visualization.

## Getting Started

### Next.js Frontend

```bash
cd nextjs
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

The following environment variables are required for local development and deployment. Create a `.env` file in the `nextjs/` directory and set these values:

- `DATABASE_URL` – Your database connection string.
- `NEXT_PUBLIC_JWT_SECRET` – Secret key for signing and verifying JWT tokens. 

- `FASTAPI_URL` – URL of your FastAPI backend (e.g., `http://localhost:8000`). Used for file processing and OCR extraction.

- `OPENAI_API_KEY` - Your openai api key.
