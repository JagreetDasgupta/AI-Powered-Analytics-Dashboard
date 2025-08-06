# Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Production server with HTTPS
- Domain name configured

### Build Process

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Configuration**
Create `.env.production`:
```env
REACT_APP_API_URL=https://api.admybrand.com/v1
REACT_APP_PAYMENT_PAYPAL_CLIENT_ID=your_paypal_client_id
REACT_APP_PAYMENT_PAYTM_MID=your_paytm_merchant_id
REACT_APP_ANALYTICS_ID=your_analytics_id
```

3. **Build for Production**
```bash
npm run build
```

4. **Deploy to Server**
```bash
# Copy build folder to server
scp -r build/ user@server:/var/www/admybrand/

# Or use deployment tools
npm run deploy
```

### Server Configuration

#### Nginx Configuration
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name admybrand.com www.admybrand.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name admybrand.com www.admybrand.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    root /var/www/admybrand/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

#### Apache Configuration
```apache
<VirtualHost *:443>
    ServerName admybrand.com
    DocumentRoot /var/www/admybrand/build
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    <Directory "/var/www/admybrand/build">
        Options -Indexes
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    <LocationMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </LocationMatch>
</VirtualHost>
```

## ☁️ Cloud Deployment Options

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**vercel.json**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=build
```

**netlify.toml**:
```toml
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### AWS S3 + CloudFront
```bash
# Install AWS CLI
aws configure

# Sync to S3
aws s3 sync build/ s3://admybrand-app --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔧 CI/CD Pipeline

### GitHub Actions
**.github/workflows/deploy.yml**:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Build application
      run: npm run build
      env:
        REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
        REACT_APP_PAYMENT_PAYPAL_CLIENT_ID: ${{ secrets.PAYPAL_CLIENT_ID }}
    
    - name: Deploy to S3
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Sync to S3
      run: aws s3 sync build/ s3://admybrand-app --delete
    
    - name: Invalidate CloudFront
      run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## 🔍 Monitoring & Analytics

### Performance Monitoring
```javascript
// Add to index.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Tracking
```javascript
// Add Sentry for error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

## 🔒 Security Considerations

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.admybrand.com;
">
```

### Security Headers
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## 📊 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

### Optimization Checklist
- [ ] Enable gzip compression
- [ ] Set proper cache headers
- [ ] Optimize images (WebP format)
- [ ] Implement lazy loading
- [ ] Use CDN for static assets
- [ ] Minify CSS and JavaScript
- [ ] Enable HTTP/2

## 🔄 Rollback Strategy

### Blue-Green Deployment
```bash
# Deploy to staging environment
aws s3 sync build/ s3://admybrand-staging

# Test staging environment
npm run test:e2e -- --baseUrl=https://staging.admybrand.com

# Switch production traffic
aws s3 sync s3://admybrand-staging s3://admybrand-production
```

### Database Migrations
```bash
# Backup before deployment
pg_dump admybrand_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Run migrations
npm run migrate:prod

# Rollback if needed
psql admybrand_prod < backup_20240115_143000.sql
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code review completed
- [ ] Environment variables configured
- [ ] SSL certificates valid
- [ ] Database migrations ready
- [ ] Backup created

### Deployment
- [ ] Build successful
- [ ] Assets uploaded to CDN
- [ ] DNS records updated
- [ ] SSL/TLS configured
- [ ] Monitoring enabled
- [ ] Error tracking active

### Post-Deployment
- [ ] Application accessible
- [ ] All features working
- [ ] Performance metrics normal
- [ ] No error spikes
- [ ] User acceptance testing
- [ ] Documentation updated

## 🚨 Troubleshooting

### Common Issues

**Build Failures**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Routing Issues**:
- Ensure server redirects all routes to index.html
- Check .htaccess or nginx configuration

**Environment Variables**:
- Verify all REACT_APP_ prefixed variables
- Check production environment configuration

**Performance Issues**:
- Analyze bundle size
- Check network requests
- Verify CDN configuration