# ADmyBRAND Analytics Dashboard

A modern, AI-powered analytics dashboard for marketing campaign management and performance tracking.
LIVE DEMO : https://admybrand-analytics-dashboard.onrender.com

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Real-time metrics and performance indicators
- **Campaign Management**: Create, monitor, and optimize marketing campaigns
- **Audience Analytics**: Detailed audience segmentation and demographics
- **Advanced Analytics**: Deep-dive performance metrics and insights
- **Report Generation**: Automated PDF reports with detailed infographics
- **Settings Management**: User profile, security, and system preferences

### Premium Features
- **Subscription Plans**: Free, Pro ($20/month), and Ultra ($200/month) tiers
- **Payment Integration**: PayPal, Paytm, SuperMoney, and UPI support
- **AI-Powered Insights**: Advanced analytics with machine learning
- **White-label Solution**: Custom branding for enterprise clients

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom animations
- **PDF Generation**: jsPDF for report downloads
- **Icons**: Material Symbols Outlined
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── NotificationDropdown.js
│   └── SkeletonLoader.js
├── pages/               # Main application pages
│   ├── Dashboard.js     # Main dashboard with metrics
│   ├── Analytics.js     # Advanced analytics page
│   ├── Audiences.js     # Audience management
│   ├── Campaigns.js     # Campaign management
│   ├── Reports.js       # Report generation and viewing
│   └── Settings.js      # User settings and preferences
├── services/            # API and external services
│   └── api.js          # API service layer
├── utils/              # Utility functions
│   └── exportUtils.js  # Export and data processing utilities
├── App.js              # Main application component
├── index.js            # Application entry point
└── style.css           # Global styles and animations
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-webcrumbs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional dependencies**
   ```bash
   npm install jspdf
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📊 Features Overview

### Dashboard
- Real-time revenue, user, and conversion metrics
- Interactive charts and visualizations
- Date range filtering (7, 30, 90 days, custom)
- Theme toggle (light/dark mode)

### Campaign Management
- Campaign creation and monitoring
- Budget tracking and spend analysis
- Performance metrics (CTR, conversions, impressions)
- Status management (active, paused, completed)

### Audience Analytics
- Demographic segmentation
- Platform distribution analysis
- Interest category tracking
- Growth trend visualization

### Reports
- Automated report generation
- PDF export with infographics
- Detailed performance metrics
- Historical data analysis

### Settings
- User profile management
- Password security with strength validation
- Notification preferences
- Third-party integrations

## 🎨 Design System

### Color Palette
- **Primary**: Indigo/Purple gradient backgrounds
- **Accent**: Primary blue (#4F46E5)
- **Success**: Emerald green (#10B981)
- **Warning**: Amber yellow (#F59E0B)
- **Error**: Rose red (#EF4444)

### Typography
- **Font Family**: System font stack (sans-serif)
- **Headings**: Bold weights with gradient text effects
- **Body**: Regular weight with proper contrast ratios

### Components
- **Glass morphism**: Backdrop blur effects with transparency
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_endpoint
REACT_APP_PAYMENT_KEY=your_payment_key
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended spacing and sizing
- Custom animations and transitions

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- Password strength validation
- Secure authentication flow
- Input sanitization
- XSS protection measures

## 🚀 Performance Optimizations

- Lazy loading for components
- Skeleton loaders for better UX
- Optimized bundle splitting
- Efficient re-rendering with React hooks

## 📈 Analytics Integration

The dashboard supports integration with:
- Google Analytics
- Facebook Ads
- Amazon Q AI Assistant
- Slack notifications

## 🛡️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Email: support@admybrand.com
- Documentation: [docs.admybrand.com](https://docs.admybrand.com)
- Issues: GitHub Issues page

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added PDF report generation
- **v1.2.0** - Implemented subscription plans
- **v1.3.0** - Enhanced security features
