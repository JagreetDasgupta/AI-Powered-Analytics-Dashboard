# ADmyBRAND Analytics Dashboard

A modern, AI-powered analytics dashboard for marketing campaign management, audience insights, and report generation. Built with React, React Router, Tailwind CSS, and jsPDF. Deployed and continuously delivered via Render.

## 🔗 Live Demo

- App: [admybrand-analytics-dashboard.onrender.com](https://admybrand-analytics-dashboard.onrender.com)

## ✨ Highlights

- **Real-time Overview**: Revenue, users, conversions, growth KPIs
- **Campaigns**: Status, budget, CTR, conversions with trend comparisons
- **Audiences**: Segmentation, demographics, growth and engagement
- **Analytics**: Traffic, bounce rate, session duration, daily/Monthly charts
- **Reports**: PDF generation with charts and KPIs via `jsPDF`
- **Settings**: Profile, passwords with strength checks, notifications, integrations
- **Responsive UI**: Smooth animations, glass-morphism, light/dark theme

## 🧭 Navigation Map

- `/` → Dashboard
- `/campaigns` → Campaigns
- `/audiences` → Audiences
- `/analytics` → Analytics
- `/reports` → Reports (with PDF export)
- `/settings` → Settings (Profile, Security, Notifications, Integrations)

## 🛠 Tech Stack

- **React**: ^19.x with functional components and hooks
- **Router**: `react-router-dom` ^7.x (SPA routing)
- **Styling**: Tailwind CSS 3.x + custom `style.css`
- **PDF**: `jspdf` for exporting reports
- **Tooling**: Create React App (`react-scripts` 5)
- **Testing**: `@testing-library/*`, `jest-dom`

## 📁 Project Structure

```text
src/
├── components/
│   ├── NotificationDropdown.js
│   └── SkeletonLoader.js
├── pages/
│   ├── Dashboard.js
│   ├── Analytics.js
│   ├── Audiences.js
│   ├── Campaigns.js
│   ├── Reports.js
│   └── Settings.js
├── services/
│   └── api.js
├── utils/
│   └── exportUtils.js
├── App.js
├── index.js
└── style.css
```

## 🔌 Key Modules

- `src/pages/Dashboard.js`: KPIs, charts, upgrade and payment modals, notifications
- `src/pages/Campaigns.js`: Campaign cards, performance comparisons
- `src/pages/Audiences.js`: Segment cards, growth trends chart
- `src/pages/Analytics.js`: Traffic metrics and daily bars
- `src/pages/Reports.js`: Report table, filters, detail modal, `jsPDF` export
- `src/pages/Settings.js`: Profile, Security (validation + strength), Notifications, Integrations
- `src/components/SkeletonLoader.js`: Loading skeletons for cards/rows
- `src/components/NotificationDropdown.js`: In-app notifications menu
- `src/services/api.js`: Mocked API service for dashboard data

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 8

### Installation

```bash
git clone <your-repo-url>
cd my-webcrumbs-app
npm install
```

### Local Development

```bash
npm start
```

- Starts on `http://localhost:3000`

### Production Build

```bash
npm run build
```

- Outputs to `build/` with minification and code-splitting

## ⚙️ Configuration

Create a `.env` in the project root if integrating APIs:

```env
REACT_APP_API_URL=https://api.example.com
REACT_APP_PAYMENT_KEY=replace_me
```

## 🧪 Testing

```bash
npm test
```

- Uses React Testing Library + Jest DOM

## 🧱 Styling & Theming

- Tailwind configured via `tailwind.config.js` and `postcss.config.js`
- Global utilities and custom effects live in `src/style.css`
- Theme toggle switches light/dark (class-based)

## 📦 Scripts (package.json)

- `start`: Run dev server
- `build`: Production build
- `test`: Run tests
- `eject`: CRA eject (irreversible)

## 🧩 Features Deep Dive

- **Dashboard**
  - Date-range quick filters (7/30/90 days, custom)
  - Metrics cards with trend indicators
  - Revenue and campaign composition charts
  - Notification center and search
- **Campaigns**
  - Cards with status chips: active/paused/completed
  - KPI grid: impressions, clicks, conversions, CTR
  - Visual comparison chart
- **Audiences**
  - Segments: size, growth, engagement, demographics, platforms
  - Monthly growth chart
- **Analytics**
  - Page views, unique visitors, bounce rate, avg session
  - 30-day traffic bars
- **Reports**
  - Filterable/searchable table with status chips
  - Detail modal and weekly generation chart
  - One-click PDF export using `jsPDF`
- **Settings**
  - Profile with avatar upload and timezone
  - Security with password strength checks and 2FA toggle placeholder
  - Notification preferences toggles
  - Integrations list with connect/disconnect UI

## 🧭 Routing Overview

```jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Audiences from "./pages/Audiences";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/audiences" element={<Audiences />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
```

## 🧰 Deployment

- Render configuration via `render.yaml`
- Build command: `npm run build`
- Publish directory: `build/`

### Environment on Render

- Node 18+ runtime recommended
- Configure env vars under service settings if needed

## 🐞 Troubleshooting

- Port already in use: close other dev servers or change `PORT`
- Blank screen after deploy: ensure correct publish directory (`build/`) and enable SPA fallback on host
- PDF download issues: Verify browser popup/download permissions and `jsPDF` version
- Tailwind not applying: check `content` globs in `tailwind.config.js`

## 🔐 Security Notes

- Client-side validations for password complexity
- Avoid committing secrets; use `.env` + Render environment variables
- Sanitize user inputs when integrating real APIs

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/<name>`
3. Commit: `git commit -m "feat: add <thing>"`
4. Push: `git push origin feat/<name>`
5. Open a Pull Request

## 📄 License

MIT © ADmyBRAND
