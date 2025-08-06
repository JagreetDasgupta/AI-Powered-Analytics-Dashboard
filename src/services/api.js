// API Service for dummy data
const generateDummyData = () => ({
  campaigns: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: ['Holiday Sale', 'Product Launch', 'Brand Awareness', 'Retargeting', 'Summer Campaign', 'Back to School'][i],
    status: ['active', 'paused', 'completed'][Math.floor(Math.random() * 3)],
    platform: ['FB', 'IG', 'TW', 'LI'][Math.floor(Math.random() * 4)],
    budget: Math.floor(Math.random() * 50000) + 10000,
    spent: Math.floor(Math.random() * 40000) + 5000,
    reach: `${Math.floor(Math.random() * 500) + 100}k`,
    ctr: `${(Math.random() * 5 + 1).toFixed(1)}%`
  })),
  
  audiences: Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: ['Tech Enthusiasts', 'Fashion Forward', 'Business Leaders', 'Health & Wellness'][i],
    size: `${Math.floor(Math.random() * 50) + 20}.${Math.floor(Math.random() * 9)}k`,
    growth: `+${(Math.random() * 20 + 5).toFixed(1)}%`,
    engagement: `${(Math.random() * 10 + 5).toFixed(1)}%`,
    avgAge: ['28-35', '22-30', '35-50', '25-40'][i],
    topInterests: [
      ['Technology', 'Gaming', 'Innovation'],
      ['Fashion', 'Lifestyle', 'Beauty'],
      ['Business', 'Leadership', 'Finance'],
      ['Fitness', 'Nutrition', 'Wellness']
    ][i],
    platforms: [
      ['LinkedIn', 'Twitter', 'Reddit'],
      ['Instagram', 'TikTok', 'Pinterest'],
      ['LinkedIn', 'Twitter', 'Medium'],
      ['Instagram', 'YouTube', 'Facebook']
    ][i],
    color: ['from-blue-500 to-cyan-500', 'from-pink-500 to-rose-500', 'from-emerald-500 to-teal-500', 'from-orange-500 to-amber-500'][i]
  })),
  
  notifications: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: [
      'Campaign Performance Alert',
      'New Audience Segment Created',
      'Budget Threshold Reached',
      'Weekly Report Available',
      'Conversion Rate Improved',
      'Ad Approval Required',
      'Monthly Analytics Ready',
      'Audience Growth Milestone'
    ][i],
    message: [
      'Holiday Sale campaign CTR increased by 15%',
      'Tech Enthusiasts segment now has 45.2k members',
      'Product Launch campaign reached 80% budget',
      'Your weekly performance report is ready',
      'Retargeting campaign conversion up 12%',
      'Summer Campaign ads pending approval',
      'January analytics report generated',
      'Health & Wellness audience grew 25%'
    ][i],
    time: `${Math.floor(Math.random() * 24)}h ago`,
    type: ['success', 'info', 'warning', 'info', 'success', 'warning', 'info', 'success'][i],
    read: Math.random() > 0.5
  })),
  
  analytics: {
    revenue: { value: '$284.5k', change: '+12.5%', trend: 'up' },
    users: { value: '45.2k', change: '+8.1%', trend: 'up' },
    conversions: { value: '3.8k', change: '+15.3%', trend: 'up' },
    growth: { value: '23.4%', change: '-2.1%', trend: 'down' }
  },
  
  topCampaigns: Array.from({ length: 4 }, (_, i) => ({
    name: ['Holiday Sale', 'Product Launch', 'Brand Awareness', 'Retargeting'][i],
    revenue: `$${Math.floor(Math.random() * 30) + 20}.${Math.floor(Math.random() * 9)}k`,
    conversion: `${(Math.random() * 10 + 5).toFixed(1)}%`,
    status: ['active', 'active', 'paused', 'active'][i]
  }))
});

export const apiService = {
  async getDashboardData() {
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateDummyData();
  },
  
  async getCampaigns() {
    await new Promise(resolve => setTimeout(resolve, 600));
    return generateDummyData().campaigns;
  },
  
  async getAudiences() {
    await new Promise(resolve => setTimeout(resolve, 700));
    return generateDummyData().audiences;
  },
  
  async getAnalytics() {
    await new Promise(resolve => setTimeout(resolve, 900));
    const data = generateDummyData();
    return {
      stats: data.analytics,
      topCampaigns: data.topCampaigns
    };
  },
  
  async getNotifications() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return generateDummyData().notifications;
  },
  
  async markNotificationRead(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  }
};