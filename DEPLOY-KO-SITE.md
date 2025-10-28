# Deploy to k-o.site

## Upload Files

1. Upload `tamara-app.zip` to your k-o.site server
2. Extract to your domain folder (e.g., public_html or subdomain folder)
3. You should have these folders after extraction:
   - .next
   - public
   - package.json
   - package-lock.json

## Setup in CloudPanel

### Option 1: Node.js App
1. Go to CloudPanel → Add Site
2. Add a Node.js app
3. Select version 18 or higher
4. Point to the extracted folder
5. Set environment variables:

### Environment Variables:
```
NODE_ENV=production
TAMARA_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...
TAMARA_MERCHANT_ID=P0722602
TAMARA_PUBLIC_KEY=3cdaf9b8-dc7e-4842-b178-757c8ae29485
PORT=3000
```

### Commands to Run:
```bash
cd /path/to/extracted/folder
npm install --production
npm run build
npm start
```

## Option 2: PM2 Manager (Recommended)

1. Install PM2:
```bash
npm install -g pm2
```

2. Start the app:
```bash
cd /path/to/extracted/folder
npm install --production
npm run build
pm2 start npm --name "tamara-app" -- start
pm2 save
pm2 startup
```

## Verify Deployment

Visit: https://your-subdomain.k-o.site

Test the invoice generator!

