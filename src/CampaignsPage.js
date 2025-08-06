import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignSkeleton } from './SkeletonLoader';
import { apiService } from './services/api';

export default function CampaignsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [dateRange, setDateRange] = useState('30days');
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false); // New state for the modal

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await apiService.getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  


  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-500/30 text-green-200 border-green-400/50',
      paused: 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50',
      completed: 'bg-red-500/30 text-red-200 border-red-400/50',
      draft: 'bg-blue-500/30 text-blue-200 border-blue-400/50',
      scheduled: 'bg-purple-500/30 text-purple-200 border-purple-400/50'
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div id="webcrumbs">
      <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-neutral-50' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-neutral-50'}`}>
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-40">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute rounded-full mix-blend-screen" style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`, 
                  width: `${Math.random() * 400 + 100}px`, 
                  height: `${Math.random() * 400 + 100}px`, 
                  background: theme === 'dark' ? `radial-gradient(circle, rgba(71,85,105,0.3) 0%, rgba(71,85,105,0) 70%)` : `radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(129,140,248,0) 70%)`, 
                  transform: `translate(-50%, -50%)`, 
                  animation: `float ${Math.random() * 10 + 20}s linear infinite`, 
                  animationDelay: `${Math.random() * 20}s` 
                }} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className={`flex flex-col w-64 p-4 backdrop-blur-md border-r transition-all duration-300 ease-in-out z-20 shadow-lg ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 absolute md:relative h-full bg-white/20 border-white/30`}>
            <div className="flex items-center gap-2 px-2 py-4">
              <div className={`h-8 w-8 rounded-md backdrop-blur-sm flex items-center justify-center text-white font-bold shadow-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/70'}`}>AI</div>
              <h1 className={`text-xl font-bold tracking-tight bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-slate-300 to-slate-500' : 'bg-gradient-to-r from-primary-300 to-primary-500'}`}>ADmyBRAND</h1>
            </div>
            
            <nav className="mt-8 flex flex-col gap-1">
              <button onClick={() => navigate('/')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10">
                <span className="material-symbols-outlined">dashboard</span><span>Dashboard</span>
              </button>
              <button onClick={() => navigate('/campaigns')} className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/20 backdrop-blur-sm text-white">
                <span className="material-symbols-outlined">campaign</span><span>Campaigns</span>
              </button>
              <button onClick={() => navigate('/audiences')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10">
                <span className="material-symbols-outlined">groups</span><span>Audiences</span>
              </button>
              <button onClick={() => navigate('/analytics')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10">
                <span className="material-symbols-outlined">analytics</span><span>Analytics</span>
              </button>
              <button onClick={() => navigate('/reports')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10">
                <span className="material-symbols-outlined">description</span><span>Reports</span>
              </button>
              <button onClick={() => navigate('/settings')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10">
                <span className="material-symbols-outlined">settings</span><span>Settings</span>
              </button>
            </nav>

            <div className="mt-auto">
              <div className="p-4 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium shadow-lg ${theme === 'dark' ? 'bg-slate-600' : 'bg-primary-600/70'}`}>PRO</div>
                  <div><p className="text-sm font-medium">Upgrade to Pro</p><p className="text-xs text-neutral-300">Unlock advanced features</p></div>
                </div>
                <button className={`mt-3 w-full py-1.5 rounded-md text-white text-sm font-medium transition-all ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary-500/80 hover:bg-primary-600/90'}`}>Upgrade</button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/15 border-b border-white/20 shadow-sm">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-full hover:bg-white/10 md:hidden">
                    <span className="material-symbols-outlined">menu</span>
                  </button>
                  <h2 className="text-lg font-semibold">Campaign Management</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleThemeToggle} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                  </button>
                  {/* Modified 'New Campaign' button to open the modal */}
                  <button 
                    onClick={() => setShowNewCampaignModal(true)}
                    className={`px-4 py-2 rounded-md text-white font-medium transition-all shadow-lg flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary-500/80 hover:bg-primary-600/90'}`}
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    New Campaign
                  </button>
                </div>
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-500">Your Campaigns</h1>
                  <p className="text-neutral-300 mt-2">Monitor, analyze, and manage all your marketing campaigns in one place.</p>
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 backdrop-blur-md bg-white/20 rounded-md border border-white/30 p-1 shadow-lg">
                    <button 
                      onClick={() => { setDateRange('7days'); setShowCustomDate(false); }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '7days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/20'}`}
                    >
                      7 days
                    </button>
                    <button 
                      onClick={() => { setDateRange('30days'); setShowCustomDate(false); }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '30days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/20'}`}
                    >
                      30 days
                    </button>
                    <button 
                      onClick={() => { setDateRange('90days'); setShowCustomDate(false); }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '90days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/20'}`}
                    >
                      90 days
                    </button>
                    <button 
                      onClick={() => setShowCustomDate(!showCustomDate)}
                      className={`px-3 py-1 rounded text-sm transition-colors flex items-center gap-1 ${showCustomDate ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/20'}`}
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
                                setDateRange('custom');
                                setShowCustomDate(false);
                              }
                            }}
                            className={`flex-1 px-3 py-2 text-white rounded-md text-sm transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary-500/80 hover:bg-primary-600/90'}`}
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

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="backdrop-blur-xl bg-white/20 p-4 rounded-xl border border-white/30 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Total Campaigns</p>
                      <h3 className="text-2xl font-bold mt-1">6</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>12% from last month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">campaign</span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/20 p-4 rounded-xl border border-white/30 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Active Campaigns</p>
                      <h3 className="text-2xl font-bold mt-1 text-green-400">2</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>8% from last month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">trending_up</span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/20 p-4 rounded-xl border border-white/30 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Total Budget</p>
                      <h3 className="text-2xl font-bold mt-1">$128k</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>15% from last month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-amber-500/20 text-amber-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/20 p-4 rounded-xl border border-white/30 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Total Reach</p>
                      <h3 className="text-2xl font-bold mt-1">840k</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>22% from last month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">visibility</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaigns Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <CampaignSkeleton key={i} />)
                ) : (
                  campaigns.map((campaign) => {
                  const budgetPercentage = (campaign.spent / campaign.budget) * 100;
                  return (
                    <div key={campaign.id} className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-5 flex flex-col gap-4 hover:shadow-lg hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
                          <span className={`inline-flex items-center w-fit px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/20">
                          <span className="text-xs font-medium">{campaign.platform}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-neutral-300">Budget</span>
                          <span>
                            <span className="font-medium text-white">${campaign.spent.toLocaleString()}</span>
                            <span className="text-neutral-400"> / ${campaign.budget.toLocaleString()}</span>
                          </span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${Math.min(budgetPercentage, 100)}%` }}></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                        <div>
                          <p className="text-neutral-300 text-xs mb-1">Reach</p>
                          <p className="font-semibold text-lg">{campaign.reach}</p>
                        </div>
                        <div>
                          <p className="text-neutral-300 text-xs mb-1">CTR</p>
                          <p className="font-semibold text-lg">{campaign.ctr}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedCampaign(campaign)}
                        className="mt-2 w-full py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  )
                  })
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
      
      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-neutral-50">
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedCampaign.name}</h2>
                <span className={`inline-flex items-center w-fit px-2 py-1 rounded-full text-sm font-medium border mt-2 ${getStatusBadge(selectedCampaign.status)}`}>
                  {selectedCampaign.status}
                </span>
              </div>
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Budget Overview</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Spent</span>
                      <span className="font-medium">${selectedCampaign.spent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Total Budget</span>
                      <span className="font-medium">${selectedCampaign.budget.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-3 mt-3">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full" style={{ width: `${Math.min((selectedCampaign.spent / selectedCampaign.budget) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Performance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-neutral-300 text-sm">Reach</p>
                      <p className="font-semibold text-xl">{selectedCampaign.reach}</p>
                    </div>
                    <div>
                      <p className="text-neutral-300 text-sm">CTR</p>
                      <p className="font-semibold text-xl">{selectedCampaign.ctr}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Campaign Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Platform</span>
                      <span className="font-medium">{selectedCampaign.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Start Date</span>
                      <span className="font-medium">Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">End Date</span>
                      <span className="font-medium">Feb 15, 2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Additional Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Impressions</span>
                      <span className="font-medium">{(Math.random() * 500000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Clicks</span>
                      <span className="font-medium">{(Math.random() * 15000 + 5000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Conversions</span>
                      <span className="font-medium">{(Math.random() * 500 + 100).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* New Campaign Modal - Added this section */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
              <h3 className="text-xl font-bold">Create New Campaign</h3>
              <button onClick={() => setShowNewCampaignModal(false)} className="text-neutral-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Campaign Name</label>
                <input type="text" className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50" placeholder="e.g., Summer Sale 2024" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Campaign Type</label>
                <select className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                  <option className="bg-slate-800 text-white">Lead Generation</option>
                  <option className="bg-slate-800 text-white">Brand Awareness</option>
                  <option className="bg-slate-800 text-white">E-commerce</option>
                  <option className="bg-slate-800 text-white">App Install</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Budget</label>
                <input type="number" className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50" placeholder="e.g., 5000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Target Platforms</label>
                <input type="text" className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50" placeholder="e.g., Facebook, Instagram" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowNewCampaignModal(false)} className="px-4 py-2 rounded-md font-medium text-neutral-300 bg-slate-700 hover:bg-slate-600 transition-colors">
                Cancel
              </button>
              <button onClick={() => { alert("Campaign creation initiated!"); setShowNewCampaignModal(false); }} className={`px-4 py-2 rounded-md font-medium text-white transition-all ${theme === 'dark' ? 'bg-primary-500/80 hover:bg-primary-600/90' : 'bg-primary-500/80 hover:bg-primary-600/90'}`}>
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 