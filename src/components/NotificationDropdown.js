import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function NotificationDropdown({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await apiService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiService.markNotificationRead(id);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'text-emerald-400 bg-emerald-500/20';
      case 'warning': return 'text-amber-400 bg-amber-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-neutral-400 bg-neutral-500/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg z-50">
      <div className="p-4 border-b border-white/20">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Notifications</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center">
            <div className="animate-spin h-6 w-6 border-2 border-white/20 border-t-white rounded-full mx-auto"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-neutral-400">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-white/20 hover:bg-white/10 cursor-pointer transition-colors ${
                !notification.read ? 'bg-white/10' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`h-2 w-2 rounded-full mt-2 ${getTypeColor(notification.type)}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <span className="text-xs text-neutral-400">{notification.time}</span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-1">{notification.message}</p>
                  {!notification.read && (
                    <div className="h-1 w-1 bg-blue-400 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-3 border-t border-white/20">
          <button className="text-xs text-blue-400 hover:text-blue-300 w-full text-center">
            View All Notifications
          </button>
        </div>
      )}
    </div>
  );
}