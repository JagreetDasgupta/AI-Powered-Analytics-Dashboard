import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableRowSkeleton } from '../components/SkeletonLoader';
import jsPDF from 'jspdf';

export default function Reports() {
  const [dateRange, setDateRange] = useState('30days');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const reportStats = {
    total: { value: '156', change: '+12', trend: 'up' },
    pending: { value: '8', change: '-3', trend: 'down' },
    completed: { value: '142', change: '+15', trend: 'up' },
    exported: { value: '89', change: '+7', trend: 'up' }
  };

  const reports = [
    { id: 1, name: 'Campaign Performance Q4', type: 'Analytics', created: '2024-01-15', status: 'completed', size: '2.4 MB' },
    { id: 2, name: 'Audience Insights Report', type: 'Audience', created: '2024-01-14', status: 'completed', size: '1.8 MB' },
    { id: 3, name: 'Revenue Analysis', type: 'Financial', created: '2024-01-13', status: 'pending', size: '-' },
    { id: 4, name: 'Social Media Metrics', type: 'Social', created: '2024-01-12', status: 'completed', size: '3.1 MB' },
    { id: 5, name: 'Email Campaign Results', type: 'Email', created: '2024-01-11', status: 'completed', size: '1.2 MB' },
    { id: 6, name: 'Conversion Funnel Analysis', type: 'Analytics', created: '2024-01-10', status: 'failed', size: '-' },
    { id: 7, name: 'Monthly Performance', type: 'Analytics', created: '2024-01-09', status: 'completed', size: '4.2 MB' },
    { id: 8, name: 'Customer Segmentation', type: 'Audience', created: '2024-01-08', status: 'completed', size: '2.7 MB' }
  ];

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/20 text-emerald-400';
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'failed': return 'bg-rose-500/20 text-rose-400';
      default: return 'bg-neutral-500/20 text-neutral-400';
    }
  };

  const handleViewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report);
    setShowDetailedReport(true);
  };

  const handleDownloadReport = async (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text(report.name, 20, 30);
    pdf.setFontSize(12);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 40);
    
    // Metrics boxes
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, 60, 50, 30, 'F');
    pdf.rect(80, 60, 50, 30, 'F');
    pdf.rect(140, 60, 50, 30, 'F');
    
    pdf.setFontSize(10);
    pdf.text('Total Impressions', 25, 70);
    pdf.setFontSize(16);
    pdf.text('2.4M', 35, 80);
    pdf.setFontSize(8);
    pdf.setTextColor(0, 128, 0);
    pdf.text('+12% vs last period', 25, 85);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.text('Click-through Rate', 85, 70);
    pdf.setFontSize(16);
    pdf.text('3.2%', 95, 80);
    pdf.setFontSize(8);
    pdf.setTextColor(0, 128, 0);
    pdf.text('+0.8% vs last period', 85, 85);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.text('Conversion Rate', 145, 70);
    pdf.setFontSize(16);
    pdf.text('1.8%', 155, 80);
    pdf.setFontSize(8);
    pdf.setTextColor(255, 0, 0);
    pdf.text('-0.3% vs last period', 145, 85);
    
    // Chart
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text('Performance Chart', 20, 110);
    pdf.setFillColor(79, 70, 229);
    for (let i = 0; i < 10; i++) {
      const height = 10 + Math.random() * 30;
      pdf.rect(25 + i * 15, 150 - height, 10, height, 'F');
    }
    
    // Segments
    pdf.setFontSize(12);
    pdf.text('Top Performing Segments', 20, 170);
    pdf.setFontSize(10);
    pdf.text('Tech Enthusiasts: 24.5%', 25, 180);
    pdf.text('Business Leaders: 18.2%', 25, 190);
    pdf.text('Health & Wellness: 15.8%', 25, 200);
    
    // Geographic
    pdf.text('Geographic Distribution', 20, 220);
    pdf.text('North America: 45.2%', 25, 230);
    pdf.text('Europe: 28.7%', 25, 240);
    pdf.text('Asia Pacific: 26.1%', 25, 250);
    
    pdf.save(`${report.name.replace(/\s+/g, '_')}_Report.pdf`);
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
              <button onClick={() => navigate('/analytics')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">analytics</span>
                <span>Analytics</span>
              </button>
              <button onClick={() => navigate('/reports')} className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/20 backdrop-blur-sm text-white group transition-all hover:bg-primary-500/30 hover:shadow-md">
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-full hover:bg-white/10 md:hidden">
                    <span className="material-symbols-outlined">menu</span>
                  </button>
                  <div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-500">Reports</h2>
                    <p className="text-sm text-neutral-300">Download or view detailed campaign metrics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleThemeToggle} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                  </button>
                  <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 rounded-md border border-white/20 p-1 shadow-lg">
                    <button onClick={() => setDateRange('7days')} className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '7days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/10'}`}>7 days</button>
                    <button onClick={() => setDateRange('30days')} className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '30days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/10'}`}>30 days</button>
                    <button onClick={() => setDateRange('90days')} className={`px-3 py-1 rounded text-sm transition-colors ${dateRange === '90days' ? (theme === 'dark' ? 'bg-slate-600' : 'bg-primary-500/80') + ' backdrop-blur-sm text-white shadow-md' : 'hover:bg-white/10'}`}>90 days</button>
                  </div>
                </div>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Total Reports</p>
                      <h3 className="text-2xl font-bold mt-1">{reportStats.total.value}</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>{reportStats.total.change} this month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">description</span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Pending</p>
                      <h3 className="text-2xl font-bold mt-1">{reportStats.pending.value}</h3>
                      <div className="flex items-center mt-1 text-rose-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                        <span>{reportStats.pending.change} from last week</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-amber-500/20 text-amber-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Completed</p>
                      <h3 className="text-2xl font-bold mt-1">{reportStats.completed.value}</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>{reportStats.completed.change} this month</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">check_circle</span>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 hover:shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-neutral-300 text-sm">Exported</p>
                      <h3 className="text-2xl font-bold mt-1">{reportStats.exported.value}</h3>
                      <div className="flex items-center mt-1 text-emerald-400 text-sm">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        <span>{reportStats.exported.change} this week</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400 backdrop-blur-sm shadow-lg">
                      <span className="material-symbols-outlined">download</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-md bg-white/10 border border-white/20 text-white placeholder-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 backdrop-blur-sm"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm">search</span>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-sm shadow-lg flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  <span>Filters</span>
                </button>
                <button
                  onClick={() => setShowNewReportModal(true)}
                  className={`px-4 py-2 rounded-md backdrop-blur-sm text-white font-medium transition-all shadow-lg flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary-500/80 hover:bg-primary-600/90'}`}
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>New Report</span>
                </button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="mb-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Campaign</label>
                      <select className="w-full px-3 py-2 rounded-md bg-gray-700 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                        <option className="bg-gray-800 text-white">All Campaigns</option>
                        <option className="bg-gray-800 text-white">Holiday Sale</option>
                        <option className="bg-gray-800 text-white">Product Launch</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select className="w-full px-3 py-2 rounded-md bg-gray-700 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                        <option className="bg-gray-800 text-white">All Status</option>
                        <option className="bg-gray-800 text-white">Completed</option>
                        <option className="bg-gray-800 text-white">Pending</option>
                        <option className="bg-gray-800 text-white">Failed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <select className="w-full px-3 py-2 rounded-md bg-gray-700 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                        <option className="bg-gray-800 text-white">All Types</option>
                        <option className="bg-gray-800 text-white">Analytics</option>
                        <option className="bg-gray-800 text-white">Audience</option>
                        <option className="bg-gray-800 text-white">Financial</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Reports Table */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-lg mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {loading ? (
                        Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
                      ) : (
                        filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="material-symbols-outlined text-neutral-400 mr-3">description</span>
                              <span className="text-sm font-medium">{report.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-neutral-300">{report.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{report.created}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">{report.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleViewReport(report.id)} className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm" title="View">
                                <span className="material-symbols-outlined text-sm">visibility</span>
                              </button>
                              {report.status === 'completed' && (
                                <button onClick={() => handleDownloadReport(report.id)} className="p-1.5 rounded-md bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 transition-all backdrop-blur-sm" title="Download">
                                  <span className="material-symbols-outlined text-sm">download</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Report Generation Trends Chart */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Report Generation Trends</h3>
                  <button className="p-1 rounded hover:bg-white/10">
                    <span className="material-symbols-outlined text-neutral-400">more_horiz</span>
                  </button>
                </div>
                <div className="h-[200px] flex items-end justify-between gap-2">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const height = 40 + Math.random() * 120;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center group">
                        <div
                          className="w-full bg-gradient-to-t from-slate-500/70 to-slate-400/70 rounded-t-sm transition-all duration-500 group-hover:brightness-110 cursor-pointer"
                          style={{ height: `${height}px` }}
                        ></div>
                        <p className="text-xs text-neutral-400 mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex justify-between text-sm text-neutral-400">
                  <span>Weekly Report Generation</span>
                  <span className="text-emerald-400">↗ +12% this week</span>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Detailed Report Modal */}
        {showDetailedReport && selectedReport && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-6">
                <h3 className="text-xl font-bold">{selectedReport.name}</h3>
                <button onClick={() => setShowDetailedReport(false)} className="text-neutral-400 hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              {/* Report Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Total Impressions</h4>
                  <p className="text-2xl font-bold text-white">2.4M</p>
                  <p className="text-sm text-emerald-400">+12% vs last period</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Click-through Rate</h4>
                  <p className="text-2xl font-bold text-white">3.2%</p>
                  <p className="text-sm text-emerald-400">+0.8% vs last period</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Conversion Rate</h4>
                  <p className="text-2xl font-bold text-white">1.8%</p>
                  <p className="text-sm text-rose-400">-0.3% vs last period</p>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-slate-700 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-semibold mb-4">Performance Over Time</h4>
                <div className="h-[200px] flex items-end justify-between gap-2">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const height = 20 + Math.random() * 160;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-primary-500/70 to-primary-400/70 rounded-t-sm"
                          style={{ height: `${height}px` }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Audience Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">Top Performing Segments</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-300">Tech Enthusiasts</span>
                      <span className="text-white font-medium">24.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-300">Business Leaders</span>
                      <span className="text-white font-medium">18.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-300">Health & Wellness</span>
                      <span className="text-white font-medium">15.8%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">Geographic Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-300">North America</span>
                      <span className="text-white font-medium">45.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-300">Europe</span>
                      <span className="text-white font-medium">28.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-300">Asia Pacific</span>
                      <span className="text-white font-medium">26.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Report Modal */}
        {showNewReportModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
                <h3 className="text-xl font-bold">Create New Report</h3>
                <button onClick={() => setShowNewReportModal(false)} className="text-neutral-400 hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Report Name</label>
                  <input type="text" className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50" placeholder="e.g., Q1 Performance Review" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Report Type</label>
                  <select className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                    <option className="bg-slate-800 text-white">Analytics</option>
                    <option className="bg-slate-800 text-white">Audience</option>
                    <option className="bg-slate-800 text-white">Financial</option>
                    <option className="bg-slate-800 text-white">Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Date Range</label>
                  <input type="date" className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setShowNewReportModal(false)} className="px-4 py-2 rounded-md font-medium text-neutral-300 bg-slate-700 hover:bg-slate-600 transition-colors">
                  Cancel
                </button>
                <button onClick={() => { alert("Report generation initiated!"); setShowNewReportModal(false); }} className={`px-4 py-2 rounded-md font-medium text-white transition-all bg-primary-500/80 hover:bg-primary-600/90`}>
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}