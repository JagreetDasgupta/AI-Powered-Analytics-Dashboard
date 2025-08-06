import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardSkeleton } from '../components/SkeletonLoader';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30days');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const analyticsData = {
    pageViews: { value: '2.4M', change: '+12%', trend: 'up' },
    uniqueVisitors: { value: '847K', change: '+8%', trend: 'up' },
    bounceRate: { value: '32%', change: '-5%', trend: 'down' },
    avgSession: { value: '4m 32s', change: '+15%', trend: 'up' }
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
              <button onClick={() => navigate('/campaigns')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">campaign</span>
                <span>Campaigns</span>
              </button>
              <button onClick={() => navigate('/audiences')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">groups</span>
                <span>Audiences</span>
              </button>
              <button onClick={() => navigate('/analytics')} className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/20 backdrop-blur-sm text-white group transition-all hover:bg-primary-500/30 hover:shadow-md">
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
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-500">Analytics</h2>
                    <p className="text-sm text-neutral-300">Deep dive into your performance metrics</p>
                  </div>
                </div>
                <button onClick={handleThemeToggle} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
                ) : (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-neutral-300 text-sm">Page Views</p>
                          <h3 className="text-2xl font-bold mt-1">{analyticsData.pageViews.value}</h3>
                          <div className="flex items-center mt-1 text-emerald-400 text-sm">
                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                            <span>{analyticsData.pageViews.change} this month</span>
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 backdrop-blur-sm shadow-lg">
                          <span className="material-symbols-outlined">visibility</span>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-neutral-300 text-sm">Unique Visitors</p>
                          <h3 className="text-2xl font-bold mt-1">{analyticsData.uniqueVisitors.value}</h3>
                          <div className="flex items-center mt-1 text-emerald-400 text-sm">
                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                            <span>{analyticsData.uniqueVisitors.change} this month</span>
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 backdrop-blur-sm shadow-lg">
                          <span className="material-symbols-outlined">person</span>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-neutral-300 text-sm">Bounce Rate</p>
                          <h3 className="text-2xl font-bold mt-1">{analyticsData.bounceRate.value}</h3>
                          <div className="flex items-center mt-1 text-emerald-400 text-sm">
                            <span className="material-symbols-outlined text-sm">arrow_downward</span>
                            <span>{analyticsData.bounceRate.change} this month</span>
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-amber-500/20 text-amber-400 backdrop-blur-sm shadow-lg">
                          <span className="material-symbols-outlined">trending_down</span>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-neutral-300 text-sm">Avg Session</p>
                          <h3 className="text-2xl font-bold mt-1">{analyticsData.avgSession.value}</h3>
                          <div className="flex items-center mt-1 text-emerald-400 text-sm">
                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                            <span>{analyticsData.avgSession.change} this month</span>
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400 backdrop-blur-sm shadow-lg">
                          <span className="material-symbols-outlined">schedule</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Analytics Chart */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Traffic Analytics</h3>
                  <button className="p-1 rounded hover:bg-white/10">
                    <span className="material-symbols-outlined text-neutral-400">more_horiz</span>
                  </button>
                </div>
                <div className="h-[400px] flex items-end justify-between gap-2">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const height = 40 + Math.random() * 320;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center group">
                        <div
                          className="w-full bg-gradient-to-t from-slate-500/70 to-slate-400/70 rounded-t-sm transition-all duration-500 group-hover:brightness-110 cursor-pointer"
                          style={{ height: `${height}px` }}
                        ></div>
                        <p className="text-xs text-neutral-400 mt-2">
                          {i + 1}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex justify-between text-sm text-neutral-400">
                  <span>Daily Traffic Overview</span>
                  <span className="text-emerald-400">↗ +18% this month</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}