# Tamara Invoice Generator

A modern Next.js application for generating invoices with Tamara Buy Now, Pay Later integration.

## Features

- ✅ Invoice generation with customer details
- ✅ Dynamic line items with quantity and pricing
- ✅ Real-time total calculation
- ✅ Tamara payment integration
- ✅ Responsive design
- ✅ Modern UI with shadcn/ui components

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with:
```
TAMARA_API_KEY=your_api_key_here
TAMARA_MERCHANT_ID=your_merchant_id_here
NEXT_PUBLIC_BASE_URL=your_vercel_url
```

4. Run the development server:
```bash
npm run dev
```

## Deploy to Vercel

1. Push your code to GitHub
2. Import your project on [Vercel](https://vercel.com)
3. Add the environment variables in Vercel dashboard
4. Deploy!

## Environment Variables

- `TAMARA_API_KEY` - Your Tamara API key (JWT token)
- `TAMARA_MERCHANT_ID` - Your Tamara merchant ID
- `NEXT_PUBLIC_BASE_URL` - Your production URL (automatically set by Vercel)

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Tamara API** - Payment integration

