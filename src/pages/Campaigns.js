import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardSkeleton } from '../components/SkeletonLoader';

export default function Campaigns() {
  const [dateRange, setDateRange] = useState('30days');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1600);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const campaigns = [
    {
      id: 1,
      name: 'Holiday Sale 2024',
      status: 'active',
      budget: '$15,000',
      spent: '$8,420',
      impressions: '2.4M',
      clicks: '45.2K',
      conversions: '1,240',
      ctr: '1.88%',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    {
      id: 2,
      name: 'Product Launch Campaign',
      status: 'paused',
      budget: '$25,000',
      spent: '$12,850',
      impressions: '1.8M',
      clicks: '32.1K',
      conversions: '890',
      ctr: '1.78%',
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 3,
      name: 'Brand Awareness Drive',
      status: 'completed',
      budget: '$10,000',
      spent: '$9,980',
      impressions: '3.2M',
      clicks: '58.4K',
      conversions: '1,580',
      ctr: '1.82%',
      startDate: '2023-12-01',
      endDate: '2023-12-31'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400';
      case 'paused': return 'bg-amber-500/20 text-amber-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-neutral-500/20 text-neutral-400';
    }
  };

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
                    background: `radial-gradient(circle, rgba(71,85,105,0.3) 0%, rgba(71,85,105,0) 70%)`,
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
          <aside className="flex flex-col w-64 p-4 backdrop-blur-md bg-white/10 border-r border-white/20 transition-all duration-300 ease-in-out z-10 shadow-lg">
            <div className="flex items-center gap-2 px-2 py-4">
              <div className={`h-8 w-8 rounded-md backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/70'}`}>AI</div>
              <h1 className={`text-xl font-bold tracking-tight bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-slate-300 to-slate-500' : 'bg-gradient-to-r from-primary-300 to-primary-500'}`}>ADmyBRAND</h1>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              <button onClick={() => navigate('/')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">dashboard</span>
                <span>Dashboard</span>
              </button>
              <button onClick={() => navigate('/campaigns')} className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/20 backdrop-blur-sm text-white group transition-all hover:bg-primary-500/30 hover:shadow-md">
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
              <div className="p-4 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full backdrop-filter backdrop-blur-sm flex items-center justify-center text-xs font-medium shadow-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-primary-600/70'}`}>PRO</div>
                  <div>
                    <p className="text-sm font-medium">Upgrade to Pro</p>
                    <p className="text-xs text-neutral-300">Unlock advanced insights</p>
                  </div>
                </div>
                <button className={`mt-3 w-full py-1.5 rounded-md backdrop-blur-sm text-white text-sm font-medium transition-all hover:shadow-lg transform hover:translate-y-[-1px] ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary-500/80 hover:bg-primary-600/90'}`}>
                  Upgrade
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-sm">
              <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-full hover:bg-white/10 md:hidden">
                    <span className="material-symbols-outlined">menu</span>
                  </button>
                  <div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-500">Campaigns</h2>
                    <p className="text-sm text-neutral-300">Manage and monitor your marketing campaigns</p>
                  </div>
                </div>
                <button onClick={handleThemeToggle} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Campaign Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
                ) : (
                  campaigns.map((campaign) => (
                    <div key={campaign.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{campaign.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Budget:</span>
                          <span className="font-semibold">{campaign.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Spent:</span>
                          <span className="font-semibold">{campaign.spent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Impressions:</span>
                          <span className="font-semibold">{campaign.impressions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Clicks:</span>
                          <span className="font-semibold">{campaign.clicks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Conversions:</span>
                          <span className="font-semibold">{campaign.conversions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-300">CTR:</span>
                          <span className="font-semibold text-emerald-400">{campaign.ctr}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between text-sm text-neutral-400">
                          <span>{campaign.startDate}</span>
                          <span>{campaign.endDate}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Campaign Performance Chart */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Campaign Performance Overview</h3>
                  <button className="p-1 rounded hover:bg-white/10">
                    <span className="material-symbols-outlined text-neutral-400">more_horiz</span>
                  </button>
                </div>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {campaigns.map((campaign, i) => {
                    const height = 100 + (i * 50);
                    return (
                      <div key={campaign.id} className="flex-1 flex flex-col items-center group">
                        <div
                          className="w-full bg-gradient-to-t from-primary-500/70 to-primary-400/70 rounded-t-sm transition-all duration-500 group-hover:brightness-110 cursor-pointer"
                          style={{ height: `${height}px` }}
                        ></div>
                        <p className="text-xs text-neutral-400 mt-2 text-center">
                          {campaign.name.split(' ')[0]}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex justify-between text-sm text-neutral-400">
                  <span>Campaign Comparison</span>
                  <span className="text-emerald-400">↗ Overall performance trending up</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}