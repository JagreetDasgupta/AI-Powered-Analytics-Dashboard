import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsSkeleton } from '../components/SkeletonLoader';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
    // Check URL parameters for section
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section && ['profile', 'security', 'notifications', 'integrations'].includes(section)) {
      setActiveSection(section);
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    inApp: true,
    marketing: false,
    security: true
  });

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'ADmyBRAND Inc.',
    timezone: 'America/New_York',
    avatar: null
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Amazon Q', status: 'connected', icon: '🤖', description: 'AI-powered analytics assistant', lastSync: '2 hours ago' },
    { id: 2, name: 'Google Analytics', status: 'connected', icon: '📊', description: 'Web analytics platform', lastSync: '1 hour ago' },
    { id: 3, name: 'Facebook Ads', status: 'disconnected', icon: '📘', description: 'Social media advertising', lastSync: 'Never' },
    { id: 4, name: 'Slack', status: 'connected', icon: '💬', description: 'Team communication', lastSync: '5 minutes ago' }
  ]);

  const settingsSections = [
    { id: 'profile', name: 'Profile', icon: 'person' },
    { id: 'security', name: 'Security', icon: 'security' },
    { id: 'notifications', name: 'Notifications', icon: 'notifications' },
    { id: 'integrations', name: 'Integrations', icon: 'extension' }
  ];

  const validateProfile = () => {
    const newErrors = {};
    if (!profile.name.trim()) newErrors.name = 'Name is required';
    if (!profile.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = 'Email is invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!security.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!security.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      if (security.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
      else if (!/[A-Z]/.test(security.newPassword)) newErrors.newPassword = 'Password must contain at least one uppercase letter';
      else if (!/[0-9]/.test(security.newPassword)) newErrors.newPassword = 'Password must contain at least one number';
    }
    if (security.newPassword !== security.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSave = async () => {
    if (!validateProfile()) return;
    setSaveStatus('saving');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handlePasswordChange = async () => {
    if (!validatePassword()) return;
    setSaveStatus('saving');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '', twoFactorEnabled: security.twoFactorEnabled });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleIntegrationToggle = async (id) => {
    setSaveStatus('saving');
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setIntegrations(prev => prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: integration.status === 'connected' ? 'disconnected' : 'connected', lastSync: integration.status === 'disconnected' ? 'Just now' : 'Never' }
          : integration
      ));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg overflow-hidden">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        profile.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    <label className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    </label>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-300">Profile Picture</p>
                    <label className="text-primary-400 hover:text-primary-300 text-sm cursor-pointer">
                      Change Avatar
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-2 rounded-md bg-white/10 border text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 backdrop-blur-sm ${errors.name ? 'border-red-500' : 'border-white/20'}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-4 py-2 rounded-md bg-white/10 border text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 backdrop-blur-sm ${errors.email ? 'border-red-500' : 'border-white/20'}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 backdrop-blur-sm"
                      style={{
                        colorScheme: 'dark'
                      }}
                    >
                      <option value="America/New_York" className="bg-gray-800 text-white">Eastern Time (ET)</option>
                      <option value="America/Chicago" className="bg-gray-800 text-white">Central Time (CT)</option>
                      <option value="America/Denver" className="bg-gray-800 text-white">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles" className="bg-gray-800 text-white">Pacific Time (PT)</option>
                      <option value="Europe/London" className="bg-gray-800 text-white">London (GMT)</option>
                      <option value="Europe/Paris" className="bg-gray-800 text-white">Paris (CET)</option>
                      <option value="Asia/Kolkata" className="bg-gray-800 text-white">India (IST)</option>
                      <option value="Asia/Tokyo" className="bg-gray-800 text-white">Tokyo (JST)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleProfileSave}
                    disabled={saveStatus === 'saving'}
                    className={`px-6 py-2 rounded-md font-medium transition-all ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary-500/80 hover:bg-primary-600/90'} text-white disabled:opacity-50`}
                  >
                    {saveStatus === 'saving' ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={security.currentPassword}
                      onChange={(e) => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className={`w-full px-4 py-2 pr-10 rounded-md bg-white/10 border text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 backdrop-blur-sm ${errors.currentPassword ? 'border-red-500' : 'border-white/20'}`}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {errors.currentPassword && <p className="text-red-400 text-xs mt-1">{errors.currentPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={security.newPassword}
                      onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                      className={`w-full px-4 py-2 pr-10 rounded-md bg-white/10 border text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 backdrop-blur-sm ${errors.newPassword ? 'border-red-500' : 'border-white/20'}`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {showNewPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>}
                  {security.newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`material-symbols-outlined text-xs ${security.newPassword.length >= 8 ? 'text-green-400' : 'text-red-400'}`}>check_circle</span>
                        <span className={security.newPassword.length >= 8 ? 'text-green-400' : 'text-neutral-300'}>At least 8 characters</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`material-symbols-outlined text-xs ${/[A-Z]/.test(security.newPassword) ? 'text-green-400' : 'text-red-400'}`}>check_circle</span>
                        <span className={/[A-Z]/.test(security.newPassword) ? 'text-green-400' : 'text-neutral-300'}>One uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`material-symbols-outlined text-xs ${/[0-9]/.test(security.newPassword) ? 'text-green-400' : 'text-red-400'}`}>check_circle</span>
                        <span className={/[0-9]/.test(security.newPassword) ? 'text-green-400' : 'text-neutral-300'}>One number</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`w-full px-4 py-2 rounded-md bg-white/10 border text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 backdrop-blur-sm ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'}`}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                  {security.confirmPassword && security.newPassword && (
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className={`material-symbols-outlined text-xs ${security.newPassword === security.confirmPassword ? 'text-green-400' : 'text-red-400'}`}>check_circle</span>
                      <span className={security.newPassword === security.confirmPassword ? 'text-green-400' : 'text-red-400'}>
                        {security.newPassword === security.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handlePasswordChange}
                    disabled={saveStatus === 'saving'}
                    className={`px-6 py-2 rounded-md font-medium transition-all ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700' : 'bg-primary-500/80 hover:bg-primary-600/90'} text-white disabled:opacity-50`}
                  >
                    {saveStatus === 'saving' ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-md bg-white/5 border border-white/10">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-neutral-300">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.email ? 'bg-primary-500' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-md bg-white/5 border border-white/10">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-neutral-300">Receive alerts via text message</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('sms')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.sms ? 'bg-primary-500' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-md bg-white/5 border border-white/10">
                  <div>
                    <h4 className="font-medium">In-App Alerts</h4>
                    <p className="text-sm text-neutral-300">Show notifications within the app</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('inApp')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.inApp ? 'bg-primary-500' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.inApp ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Connected Services</h3>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-neutral-300">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        integration.status === 'connected' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-neutral-500/20 text-neutral-400'
                      }`}>
                        {integration.status}
                      </span>
                      <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all backdrop-blur-sm ${
                        integration.status === 'connected'
                          ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                          : 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
                      }`}>
                        {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
              <button onClick={() => navigate('/reports')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-100 transition-all hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-md hover:text-white">
                <span className="material-symbols-outlined">description</span>
                <span>Reports</span>
              </button>
              <button onClick={() => navigate('/settings')} className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-white/20 backdrop-blur-sm text-white group transition-all hover:bg-primary-500/30 hover:shadow-md">
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
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-500">Settings</h2>
                    <p className="text-sm text-neutral-300">Manage your account and preferences</p>
                  </div>
                </div>
                <button onClick={handleThemeToggle} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-hidden">
              <div className="flex h-full">
                {/* Settings Navigation */}
                <div className="w-64 p-4 border-r border-white/20 backdrop-blur-sm bg-white/5">
                  <nav className="space-y-2">
                    {settingsSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all ${
                          activeSection === section.id
                            ? 'bg-primary-500/20 text-primary-300 backdrop-blur-sm'
                            : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">{section.icon}</span>
                        <span>{section.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="max-w-2xl">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
                      {loading ? <SettingsSkeleton /> : renderContent()}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Save Status Toast */}
        {saveStatus && (
          <div className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg backdrop-blur-sm z-50 flex items-center gap-2 ${
            saveStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
            saveStatus === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}>
            <span className="material-symbols-outlined text-sm">
              {saveStatus === 'success' ? 'check_circle' : saveStatus === 'error' ? 'error' : 'sync'}
            </span>
            <span>
              {saveStatus === 'success' ? 'Changes saved successfully!' :
               saveStatus === 'error' ? 'Failed to save changes' :
               'Saving changes...'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}