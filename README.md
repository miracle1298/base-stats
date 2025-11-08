# base-stats
>>>>>>> 97e559146e228f02167d6a99eb792b53b2f74e92
# Castbase - Base & Farcaster Airdrop Analytics

A Farcaster Mini App for checking Base and Farcaster airdrop eligibility.

## Features

- 🎁 Check airdrop eligibility for Base and Farcaster
- 🔍 Search by Farcaster username or FID
- 🚨 Neynar spam label detection
- 🚀 Share results on Farcaster
- 📊 Real-time analytics
- ✅ Deterministic results (consistent per user)

## Tech Stack

- React + TypeScript + Vite
- Farcaster Mini Apps SDK
- Neynar API v2
- Framer Motion

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
VITE_NEYNAR_API_KEY=your_api_key_here
```

3. Run development server:
```bash
npm run dev
```

## Deployment

1. Update URLs in `/.well-known/farcaster.json` and `index.html`
2. Generate account association at https://farcaster.xyz/~/developers/mini-apps/manifest
3. Add required images (icon.png, og-image.png)
4. Deploy to your domain

## Mini App Configuration

Manifest file located at: `public/.well-known/farcaster.json`

Category: Finance  
Tags: airdrop, base, farcaster, analytics, crypto
=======
# base-stats
>>>>>>> 97e559146e228f02167d6a99eb792b53b2f74e92
