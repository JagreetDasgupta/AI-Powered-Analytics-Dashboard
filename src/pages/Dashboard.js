import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardSkeleton } from "../components/SkeletonLoader";
import { apiService } from "../services/api";
import NotificationDropdown from "../components/NotificationDropdown";

export default function Dashboard() {
  // Internationalization text constants
  const t = {
    upgradeTitle: 'Upgrade to Pro',
    upgradeDescription: 'Unlock advanced insights',
    upgradeButton: 'Upgrade',
    searchPlaceholder: 'Search...',
    exportPng: 'Export as PNG',
    exportCsv: 'Export as CSV',
    viewFullReport: 'View Full Report',
    newUsers: 'New Users',
    returningUsers: 'Returning Users'
  };

  // State management for various features
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('7days');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [theme, setTheme] = useState('light');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [chartMenuOpen, setChartMenuOpen] = useState({});
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [metrics, setMetrics] = useState({
    revenue: 128429,
    users: 28942,
    conversions: 3827,
    growth: 18.2
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dashboardData = await apiService.getDashboardData();
      setData(dashboardData);
      setNotifications(dashboardData.notifications.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Button click handlers
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    // Simulate data update based on date range
    const multipliers = {
      '7days': 1,
      '30days': 1.2,
      '90days': 1.5
    };
    const multiplier = multipliers[range] || 1;
    setMetrics({
      revenue: Math.round(128429 * multiplier),
      users: Math.round(28942 * multiplier),
      conversions: Math.round(3827 * multiplier),
      growth: Math.round(18.2 * multiplier * 10) / 10
    });
  };

  const handleSearch = () => {
    try {
      if (searchQuery.trim()) {
        console.log(`Searching for: ${searchQuery}`);
        setSearchQuery('');
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleNotifications = () => {
    try {
      const notificationCount = notifications.length;
      console.log(`You have ${notificationCount} notifications`);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light-theme');
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleChartMenuToggle = (chartId) => {
    setChartMenuOpen(prev => ({
      ...prev,
      [chartId]: !prev[chartId]
    }));
  };

  const handleExport = (format) => {
    try {
      console.log(`Exporting chart data as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleNavigation = (page) => {
    try {
      console.log(`Navigating to ${page}`);
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(false);
    setShowPaymentModal(true);
  };

  const handlePayment = (method) => {
    alert(`Processing payment via ${method} for ${selectedPlan.name} plan ($${selectedPlan.price}/month)`);
    setShowPaymentModal(false);
    setSelectedPlan(null);
  };

  const plans = [
    {
      name: 'Free',
      price: 0,
      features: ['5 Campaigns', 'Basic Analytics', '1,000 Monthly Views', 'Email Support', '1 User Account'],
      limits: ['Limited to 5 campaigns', 'Basic reporting only', 'No API access']
    },
    {
      name: 'Pro',
      price: 20,
      features: ['50 Campaigns', 'Advanced Analytics', '50,000 Monthly Views', 'Priority Support', '5 User Accounts', 'API Access', 'Custom Reports'],
      limits: ['Limited to 50 campaigns', 'Standard integrations']
    },
    {
      name: 'Ultra',
      price: 200,
      features: ['Unlimited Campaigns', 'AI-Powered Insights', 'Unlimited Views', '24/7 Phone Support', 'Unlimited Users', 'Full API Access', 'White-label Solution', 'Custom Integrations', 'Dedicated Account Manager'],
      limits: ['No limits']
    }
  ];

  const handleUserAction = (action) => {
    try {
      switch (action) {
        case 'profile':
          navigate('/settings?section=profile');
          break;
        case 'settings':
          navigate('/settings');
          break;
        case 'logout':
          if (window.confirm('Are you sure you want to logout?')) {
            console.log('Logging out...');
          }
          break;
        default:
          break;
      }
      setUserMenuOpen(false);
    } catch (error) {
      console.error('User action failed:', error);
      setUserMenuOpen(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div id="webcrumbs">
      <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-neutral-50' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-neutral-50'}`}>
        {/* Dynamic Background Animation */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-40">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full mix-blend-screen"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 400 + 100}px`,
                    height: `${Math.random() * 400 + 100}px`,
                    background: theme === 'dark' ? `radial-gradient(circle, rgba(71,85,105,0.3) 0%, rgba(71,85,105,0) 70%)` : `radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(129,140,248,0) 70%)`,
                    transform: `translate(-50%, -50%)`,
                    animation: `float ${Math.random() * 10 + 20}s linear infinite`,
                    animationDelay: `${Math.random() * 20}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'flex' : 'hidden'} md:flex flex-col w-64 p-4 backdrop-blur-md bg-white/20 border-r border-white/30 transition-all duration-300 ease-in-out z-10 shadow-lg`}>
            {/* Logo */}
            <div className="flex items-center gap-2 px-2 py-4">
              <div className={`h-8 w-8 rounded-md backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/70'}`}>AI</div>
              <h1 className={`text-xl font-bold tracking-tight bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-slate-300 to-slate-500' : 'bg-gradient-to-r from-primary-300 to-primary-500'}`}>
                ADmyBRAND
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="mt-8 flex flex-col gap-1">
              <button onClick={() => navigate('/')} className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/20 backdrop-blur-sm text-white group transition-all hover:bg-primary-500/30 hover:shadow-md">
                <span className="material-symbols-outlined">dashboard</span>
                <span>Dashboard</span>
              </button>
              <button onClick={() => { console.log('Campaigns clicked from dashboard'); navigate('/campaigns'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">campaign</span>
                <span>Campaigns</span>
              </button>
              <button onClick={() => navigate('/audiences')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">groups</span>
                <span>Audiences</span>
              </button>
              <button onClick={() => navigate('/analytics')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">analytics</span>
                <span>Analytics</span>
              </button>
              <button onClick={() => navigate('/reports')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">description</span>
                <span>Reports</span>
              </button>
              <button onClick={() => navigate('/settings')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">settings</span>
                <span>Settings</span>
              </button>
            </nav>

            <div className="mt-auto">
              <div className="p-4 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full backdrop-filter backdrop-blur-sm flex items-center justify-center text-xs font-medium shadow-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-primary-600/70'}`}>PRO</div>
                  <div>
                    <p className="text-sm font-medium">{t.upgradeTitle}</p>
                    <p className="text-xs text-neutral-300">{t.upgradeDescription}</p>
                  </div>
                </div>
                <button onClick={handleUpgrade} className={`mt-3 w-full py-1.5 rounded-md backdrop-blur-sm text-white text-sm font-medium transition-all hover:shadow-lg transform hover:translate-y-[-1px] ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary-500/80 hover:bg-primary-600/90'}`}>
                  {t.upgradeButton}
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/15 border-b border-white/20 shadow-sm">
              <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-3">
                  <button onClick={handleSidebarToggle} className="p-1.5 rounded-full hover:bg-white/10 md:hidden">
                    <span className="material-symbols-outlined">menu</span>
                  </button>
                  <div className="md:hidden flex items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-primary-500/70 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xs shadow-lg">AI</div>
                    <h1 className="text-lg font-bold text-white">ADmyBRAND</h1>
                  </div>
                  <div className="hidden md:flex items-center gap-3 ml-2">
                    <h2 className="text-lg font-semibold">Analytics Dashboard</h2>
                    <span className={`px-2 py-0.5 text-xs rounded-full backdrop-blur-sm ${theme === 'dark' ? 'bg-slate-500/20 text-slate-300 border border-slate-500/30' : 'bg-primary-500/20 text-primary-300 border border-primary-500/30'}`}>
                      Beta
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className={`px-3 py-1.5 rounded-md bg-white/20 border border-white/30 text-white placeholder-neutral-300 text-sm focus:outline-none focus:ring-2 ${theme === 'dark' ? 'focus:ring-slate-500/50' : 'focus:ring-primary-500/50'}`}
                    />
                    <button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-sm">search</span>
                    </button>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined">notifications</span>
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </button>
                    <NotificationDropdown 
                      isOpen={showNotifications} 
                      onClose={() => setShowNotifications(false)} 
                    />
                  </div>
                  <button onClick={handleThemeToggle} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                  </button>
                  <div className="relative">
                    <button onClick={handleUserMenuToggle} className="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/10">
                      <div className="h-8 w-8 rounded-full bg-primary-700/60 backdrop-blur-sm flex items-center justify-center text-sm font-medium shadow-lg">JD</div>
                      <span className="hidden md:inline text-sm font-medium">John Doe</span>
                      <span className="material-symbols-outlined text-sm">expand_more</span>
                    </button>
                    {userMenuOpen && (
                      <div className="absolute top-full right-0 mt-1 w-48 py-1 rounded-md backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg z-20">
                        <button onClick={() => handleUserAction('profile')} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/20 w-full text-left">
                          <span className="material-symbols-outlined text-sm">person</span>
                          <span>Profile</span>
                        </button>
                        <button onClick={() => handleUserAction('settings')} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/20 w-full text-left">
                          <span className="material-symbols-outlined text-sm">settings</span>
                          <span>Settings</span>
                        </button>
                        <hr className="my-1 border-white/20" />
                        <button onClick={() => handleUserAction('logout')} className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/20 w-full text-left">
                          <span className="material-symbols-outlined text-sm">logout</span>
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Date Range Selector */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Insights Overview</h1>
                  <p className="text-neutral-300 mt-1">Track your marketing performance at a glance</p>
                </div>
                <div className="mt-4 sm:mt-0 relative">
                  <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 rounded-md border border-white/20 p-1 shadow-lg">
                    <button 
                      onClick={() => { handleDateRangeChange('7days'); setShowCustomDate(false); }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '7days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/10'}`}
                    >
                      Last 7 days
                    </button>
                    <button 
                      onClick={() => { handleDateRangeChange('30days'); setShowCustomDate(false); }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '30days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/10'}`}
                    >
                      Last 30 days
                    </button>
                    <button 
                      onClick={() => { handleDateRangeChange('90days'); setShowCustomDate(false); }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '90days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/10'}`}
                    >
                      Last 90 days
                    </button>
                    <button 
                      onClick={() => setShowCustomDate(!showCustomDate)}
                      className={`px-3 py-1 rounded text-sm transition-colors flex items-center gap-1 ${showCustomDate || dateRange === 'custom' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/10'}`}
                    >
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      Custom
                    </button>
                  </div>
                  {showCustomDate && (
                    <div className="absolute top-full right-0 mt-2 p-4 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl shadow-lg z-50 min-w-[300px]">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Start Date</label>
                          <input 
                            type="date" 
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">End Date</label>
                          <input 
                            type="date" 
                            value={customEndDate}
                            onChange={(e) => setCustomEndDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button 
                            onClick={() => {
                              if (customStartDate && customEndDate) {
                                handleDateRangeChange('custom');
                                setShowCustomDate(false);
                              }
                            }}
                            className="flex-1 px-3 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-700 transition-colors"
                          >
                            Apply
                          </button>
                          <button 
                            onClick={() => setShowCustomDate(false)}
                            className="px-3 py-2 bg-white/20 text-white rounded-md text-sm hover:bg-white/30 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Revenue Card */}
                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-4 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Total Revenue</p>
                      <h3 className="text-2xl font-bold mt-1">${metrics.revenue.toLocaleString()}</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>12.5% from last month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">landscape</span>
                    </div>
                  </div>
                  <div className="mt-3 h-10 w-full bg-white/15 rounded-md overflow-hidden backdrop-blur-sm">
                    <div className="h-full w-[75%] bg-gradient-to-r from-emerald-500/70 to-emerald-400/70 rounded-md"></div>
                  </div>
                </div>

                {/* Users Card */}
                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-4 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Active Users</p>
                      <h3 className="text-2xl font-bold mt-1">{metrics.users.toLocaleString()}</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>8.1% from last month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">group</span>
                    </div>
                  </div>
                  <div className="mt-3 h-10 w-full bg-white/15 rounded-md overflow-hidden backdrop-blur-sm">
                    <div className="h-full w-[65%] bg-gradient-to-r from-blue-500/70 to-blue-400/70 rounded-md"></div>
                  </div>
                </div>

                {/* Conversions Card */}
                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-4 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Conversions</p>
                      <h3 className="text-2xl font-bold mt-1">{metrics.conversions.toLocaleString()}</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>4.6% from last month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">shopping_cart</span>
                    </div>
                  </div>
                  <div className="mt-3 h-10 w-full bg-white/15 rounded-md overflow-hidden backdrop-blur-sm">
                    <div className="h-full w-[45%] bg-gradient-to-r from-purple-500/70 to-purple-400/70 rounded-md"></div>
                  </div>
                </div>

                {/* Growth Card */}
                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-4 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Growth Rate</p>
                      <h3 className="text-2xl font-bold mt-1">{metrics.growth}%</h3>
                      <div className="flex items-center mt-1 text-rose-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                        <span>2.3% from last month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-amber-500/20 text-amber-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">trending_up</span>
                    </div>
                  </div>
                  <div className="mt-3 h-10 w-full bg-white/15 rounded-md overflow-hidden backdrop-blur-sm">
                    <div className="h-full w-[85%] bg-gradient-to-r from-amber-500/70 to-amber-400/70 rounded-md"></div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Revenue Line Chart */}
                <div className="lg:col-span-2 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Monthly Revenue</h3>
                    <div className="relative">
                      <button onClick={() => handleChartMenuToggle('revenue')} className="p-1 rounded hover:bg-white/10">
                        <span className="material-symbols-outlined text-neutral-400">more_horiz</span>
                      </button>
                      {chartMenuOpen.revenue && (
                        <div className="absolute right-0 mt-1 w-40 py-1 rounded-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg z-10">
                          <button onClick={() => handleExport('png')} className="block px-4 py-2 text-sm hover:bg-white/10 w-full text-left">{t.exportPng}</button>
                          <button onClick={() => handleExport('csv')} className="block px-4 py-2 text-sm hover:bg-white/10 w-full text-left">{t.exportCsv}</button>
                          <button onClick={() => handleNavigation('revenue-report')} className="block px-4 py-2 text-sm hover:bg-white/10 w-full text-left">{t.viewFullReport}</button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="h-[300px] w-full relative">
                    {/* This would be replaced with a real chart component */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-[250px] w-full relative">
                        <div className="absolute bottom-0 left-0 right-0 h-[200px] flex items-end">
                          {Array.from({ length: 12 }).map((_, i) => {
                            const height = 30 + Math.random() * 160;
                            return (
                              <div key={i} className="flex-1 mx-1 group">
                                <div 
                                  className={`rounded-t-sm transition-all duration-300 group-hover:brightness-110 backdrop-blur-sm ${theme === 'dark' ? 'bg-gradient-to-t from-slate-500/70 to-slate-400/70' : 'bg-gradient-to-t from-primary-500/70 to-primary-400/70'}`}
                                  style={{ height: `${height}px` }}
                                ></div>
                                <div className="h-1 bg-primary-500/10 mt-1"></div>
                                <p className="text-xs text-neutral-400 text-center mt-1">
                                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-neutral-400 pr-2">
                          <span>$150k</span>
                          <span>$100k</span>
                          <span>$50k</span>
                          <span>$0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Donut Chart */}
                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Campaign Breakdown</h3>
                    <div className="relative">
                      <button onClick={() => handleChartMenuToggle('campaign')} className="p-1 rounded hover:bg-white/10">
                        <span className="material-symbols-outlined text-neutral-400">more_horiz</span>
                      </button>
                      {chartMenuOpen.campaign && (
                        <div className="absolute right-0 mt-1 w-40 py-1 rounded-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg z-10">
                          <button onClick={() => handleExport('png')} className="block px-4 py-2 text-sm hover:bg-white/10 w-full text-left">{t.exportPng}</button>
                          <button onClick={() => handleExport('csv')} className="block px-4 py-2 text-sm hover:bg-white/10 w-full text-left">{t.exportCsv}</button>
                          <button onClick={() => handleNavigation('campaign-report')} className="block px-4 py-2 text-sm hover:bg-white/10 w-full text-left">{t.viewFullReport}</button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="relative h-[200px] w-[200px]">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90 opacity-90">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#64748b" strokeWidth="12" strokeDasharray="75.4 150.8" className="opacity-80" />
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#475569" strokeWidth="12" strokeDasharray="37.7 150.8" strokeDashoffset="-75.4" className="opacity-80" />
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="22.6 150.8" strokeDashoffset="-113.1" className="opacity-80" />
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="15.1 150.8" strokeDashoffset="-135.7" className="opacity-80" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold">$128.4k</p>
                          <p className="text-xs text-neutral-300">Total Revenue</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${theme === 'dark' ? 'bg-slate-500/80' : 'bg-primary-500/80'}`}></div>
                      <span className="text-sm">Social (50%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${theme === 'dark' ? 'bg-slate-400/80' : 'bg-purple-500/80'}`}></div>
                      <span className="text-sm">Search (25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500/80"></div>
                      <span className="text-sm">Email (15%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                      <span className="text-sm">Display (10%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* New vs Returning Users */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">User Type</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t.newUsers}</span>
                      <span className="text-lg font-semibold">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t.returningUsers}</span>
                      <span className="text-lg font-semibold">35%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className={`h-full w-[65%] rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-slate-500/70 to-slate-400/70' : 'bg-gradient-to-r from-blue-500/70 to-blue-400/70'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-6">
                <h3 className="text-2xl font-bold">Choose Your Plan</h3>
                <button onClick={() => setShowUpgradeModal(false)} className="text-neutral-400 hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <div key={plan.name} className={`border rounded-lg p-6 ${index === 1 ? 'border-primary-500 bg-primary-500/10' : 'border-slate-600 bg-slate-700'}`}>
                    {index === 1 && <div className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">Most Popular</div>}
                    <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-neutral-400">/month</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-green-400 text-sm">check</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-2 rounded-md font-medium transition-all ${
                        index === 1 ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-slate-600 hover:bg-slate-500 text-white'
                      }`}
                    >
                      {plan.price === 0 ? 'Current Plan' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedPlan && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-6">
                <h3 className="text-xl font-bold">Payment Method</h3>
                <button onClick={() => setShowPaymentModal(false)} className="text-neutral-400 hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-neutral-300">Selected Plan: <span className="font-semibold text-white">{selectedPlan.name}</span></p>
                <p className="text-neutral-300">Amount: <span className="font-semibold text-white">${selectedPlan.price}/month</span></p>
              </div>
              
              <div className="space-y-3">
                <button onClick={() => handlePayment('PayPal')} className="w-full flex items-center justify-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                  <span className="font-semibold">PayPal</span>
                </button>
                <button onClick={() => handlePayment('Paytm')} className="w-full flex items-center justify-center gap-3 p-3 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors">
                  <span className="font-semibold">Paytm</span>
                </button>
                <button onClick={() => handlePayment('SuperMoney')} className="w-full flex items-center justify-center gap-3 p-3 bg-green-600 hover:bg-green-700 rounded-md transition-colors">
                  <span className="font-semibold">SuperMoney</span>
                </button>
                <button onClick={() => handlePayment('UPI')} className="w-full flex items-center justify-center gap-3 p-3 bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
                  <span className="font-semibold">UPI</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 