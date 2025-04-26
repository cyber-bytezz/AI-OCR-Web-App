# AI OCR Web Application

A full-featured, AI-powered Optical Character Recognition (OCR) web application built with Next.js and React. This documentation provides a deep, A-Z analysis of the architecture, logic, and usage of the application.

---

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Key Features & Logic](#key-features--logic)
4. [Component Breakdown](#component-breakdown)
5. [API Endpoints](#api-endpoints)
6. [Data Flow](#data-flow)
7. [Utilities & Types](#utilities--types)
8. [Styling & UI](#styling--ui)
9. [Deployment](#deployment)
10. [Usage Examples](#usage-examples)
11. [FAQ](#faq)

---

## Overview
This application enables users to upload images or scans of documents (receipts, standard documents, handwritten notes, cards/IDs) and extract text using advanced AI models. It features a modern, responsive UI, privacy-focused document handling, and supports multiple document types and languages (English, Tamil).

---

## Architecture
- **Frontend:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom, reusable (Tabs, Cards, Buttons, etc.)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **OCR Backend:** Llama OCR (JS) and FastAPI (Tamil OCR)
- **File Storage:** Local (public/uploads)
- **API:** Next.js API routes for upload and OCR

### Folder Structure
- `app/` - Main app pages, API routes, layout
- `components/` - UI and logic components
- `lib/` - Utilities and document policy
- `types/` - TypeScript interfaces
- `public/` - Static assets and uploaded files

---

## Key Features & Logic
- **Document Upload:** Drag-and-drop or select files (JPEG, PNG, WebP, PDF). Files are validated and uploaded to `/public/uploads`.
- **Multi-Type Support:** User selects document type (receipt, document, handwritten, card/ID) and language (English, Tamil). Options are passed to the OCR backend.
- **AI-Powered OCR:**
  - English/general OCR uses Llama OCR via JS API.
  - Tamil OCR uses a FastAPI backend.
  - Supports table extraction, layout preservation, and preprocessing (denoise, deskew, contrast).
- **Results Display:** OCR results shown in Markdown, with options to copy or download. Tabs allow toggling between image, text, or both.
- **Privacy & Security:** Documents are validated, sensitive data is detected/redacted, and files are auto-cleaned after 24 hours.
- **Interactive Demos:** Landing page features demos for different document types.

---

## Component Breakdown
### Main Pages
- `app/page.tsx` - Entry point, renders Landing page.
- `app/ocr-tool/page.tsx` - Main OCR tool interface (upload, options, results).

### Core Components
- **FileDropzone:** Handles drag-and-drop upload, file validation.
- **FileUpload:** Combines dropzone, options form, and image preview.
- **OCRResults:** Displays OCR output, copy/download actions, tabbed view.
- **OCROptionsForm:** Lets user select document type, language, and options.
- **ImagePreview:** Shows preview of uploaded image.
- **Header, Container, Card, Button, Tabs, etc.:** Reusable UI building blocks.

### Landing Page Components
- **Hero, Features, Demo, HowItWorks, Testimonials, Footer, CTA:** Modular sections for marketing and onboarding.

---

## API Endpoints
### `/api/upload` (POST)
- Accepts FormData with a file.
- Saves file to `/public/uploads` with a unique name.
- Returns `{ filePath }` for use in OCR.

### `/api/ocr` (POST)
- Accepts `{ filePath, options }`.
- If language is Tamil, calls FastAPI backend; otherwise, uses Llama OCR.
- Returns `{ markdown }` with extracted text.

---

## Data Flow
1. **User uploads file** via FileUpload/FileDropzone.
2. **File is validated** (type, size) and previewed.
3. **Options are selected** (type, language, preprocessing, table extraction).
4. **File is uploaded** to `/api/upload`.
5. **OCR is triggered** via `/api/ocr` with file path and options.
6. **Results are displayed** in OCRResults, with copy/download actions.

---

## Utilities & Types
- **`lib/document-policy.ts`:**
  - Defines allowed types, max size, retention, sensitive data detection.
  - Functions: `validateDocument`, `cleanupExpiredDocuments`, `detectSensitiveData`.
- **`lib/utils.ts`:**
  - Utility for merging Tailwind class names (`cn`).
- **`types/ocr.ts`:**
  - `OCROptions`, `FileUploadProps` interfaces for type safety.

---

## Styling & UI
- **Tailwind CSS:** Utility-first styling for all components.
- **Framer Motion:** Animations for transitions, previews, and feedback.
- **Accessibility:** Keyboard navigation, ARIA labels, focus states.
- **Responsive Design:** Mobile-first, adapts to all screen sizes.

---

## Deployment
1. **Install dependencies:**
   ```bash
   npm install
   # or yarn install
   ```
2. **Start development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```
4. **Deploy:**
   - Recommended: [Vercel](https://vercel.com/)
   - See Next.js [deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

## Usage Examples
- **Upload a receipt:** Select "Receipt" type, upload image, get structured vendor/items/total extraction.
- **Handwritten notes:** Select "Handwritten", upload scan, get digital text.
- **Table extraction:** Enable "Extract Tables" for documents with tabular data.
- **Tamil OCR:** Select "Tamil" language for regional documents.

---

## FAQ
**Q: Are my documents stored permanently?**
A: No, files are auto-deleted after 24 hours.

**Q: Is my data secure?**
A: Yes, sensitive data is detected and redacted; files are not shared.

**Q: Can I add more OCR languages?**
A: Yes, extend the OCR backend and update options in the UI.

**Q: How do I customize the UI?**
A: Edit components in `/components` and styles in `globals.css` or Tailwind config.

---

For further details, see code comments or contact the project maintainers.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
