import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardSkeleton } from '../components/SkeletonLoader';

export default function Audiences() {
  const [dateRange, setDateRange] = useState('30days');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1800);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const audienceSegments = [
    {
      id: 1,
      name: 'Tech Enthusiasts',
      size: '28.5k',
      growth: '+12%',
      engagement: '6.7%',
      platforms: ['LinkedIn', 'Twitter', 'Medium'],
      demographics: '25-40',
      interests: ['Technology', 'Innovation', 'Startups']
    },
    {
      id: 2,
      name: 'Business Leaders',
      size: '15.2k',
      growth: '+8%',
      engagement: '4.3%',
      platforms: ['LinkedIn', 'Twitter'],
      demographics: '35-55',
      interests: ['Leadership', 'Finance', 'Strategy']
    },
    {
      id: 3,
      name: 'Health & Wellness',
      size: '19.8k',
      growth: '+15%',
      engagement: '8.1%',
      platforms: ['Instagram', 'YouTube', 'Facebook'],
      demographics: '25-45',
      interests: ['Fitness', 'Nutrition', 'Wellness']
    }
  ];

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
              <button onClick={() => navigate('/audiences')} className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/20 backdrop-blur-sm text-white group transition-all hover:bg-primary-500/30 hover:shadow-md">
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
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-500">Audiences</h2>
                    <p className="text-sm text-neutral-300">Understand your audience segments and demographics</p>
                  </div>
                </div>
                <button onClick={handleThemeToggle} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Audience Segments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
                ) : (
                  audienceSegments.map((segment) => (
                    <div key={segment.id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold">{segment.name}</h3>
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary-500/20 text-primary-400 backdrop-blur-sm shadow-lg">
                          <span className="material-symbols-outlined">groups</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Audience Size:</span>
                          <span className="font-semibold">{segment.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Growth Rate:</span>
                          <span className="font-semibold text-emerald-400">{segment.growth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Engagement Rate:</span>
                          <span className="font-semibold">{segment.engagement}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-300">Age Demographics:</span>
                          <span className="font-semibold">{segment.demographics}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-neutral-300 mb-2">Active Platforms:</h4>
                        <div className="flex flex-wrap gap-2">
                          {segment.platforms.map((platform, index) => (
                            <span key={index} className="px-2 py-1 text-xs rounded-full bg-white/10 text-neutral-300">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-neutral-300 mb-2">Interest Categories:</h4>
                        <div className="flex flex-wrap gap-2">
                          {segment.interests.map((interest, index) => (
                            <span key={index} className="px-2 py-1 text-xs rounded-full bg-primary-500/20 text-primary-300">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Audience Overview Chart */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Audience Growth Trends</h3>
                  <button className="p-1 rounded hover:bg-white/10">
                    <span className="material-symbols-outlined text-neutral-400">more_horiz</span>
                  </button>
                </div>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const height = 40 + Math.random() * 220;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center group">
                        <div
                          className="w-full bg-gradient-to-t from-primary-500/70 to-primary-400/70 rounded-t-sm transition-all duration-500 group-hover:brightness-110 cursor-pointer"
                          style={{ height: `${height}px` }}
                        ></div>
                        <p className="text-xs text-neutral-400 mt-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex justify-between text-sm text-neutral-400">
                  <span>Monthly Audience Growth</span>
                  <span className="text-emerald-400">↗ +24% this year</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}