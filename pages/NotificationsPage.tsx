import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markAllNotificationsAsRead, t } = useApp(); // Ajout de 't'
  const [activeTab, setActiveTab] = useState<'Toutes' | 'Alertes' | 'Transactions'>('Toutes');

  // Logic to format date nicely
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "A l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  // Filter logic
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'Toutes') return true;
    if (activeTab === 'Alertes') return notif.type === 'security' || notif.type === 'system';
    if (activeTab === 'Transactions') return notif.type === 'transaction';
    return true;
  });

  // Group by date logic (Simplified for this view: Today, Earlier)
  const today = new Date().setHours(0,0,0,0);
  const todaysNotifs = filteredNotifications.filter(n => new Date(n.date).getTime() >= today);
  const olderNotifs = filteredNotifications.filter(n => new Date(n.date).getTime() < today);

  // Helper for icon styling
  const getIconStyle = (type: string) => {
    switch(type) {
      case 'security': return 'bg-red-100 text-primary dark:bg-red-900/30 dark:text-red-400';
      case 'transaction': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
      case 'system': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getIconName = (type: string) => {
    switch(type) {
      case 'security': return 'security';
      case 'transaction': return 'receipt_long';
      case 'system': return 'info';
      default: return 'notifications';
    }
  };

  return (
    <div className="flex-1 flex flex-col xl:flex-row gap-8 px-4 py-8 lg:px-8 bg-background-light dark:bg-background-dark overflow-y-auto">
      {/* Center: Notifications List */}
      <section className="flex-1 flex flex-col min-w-0">
        <div className="flex flex-wrap justify-between items-center gap-3 pb-6">
          <div className="flex items-center gap-3">
            <button 
                onClick={() => navigate('/')} 
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors md:hidden"
            >
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-black leading-tight tracking-tight">{t('notifications.title')}</h1>
          </div>
          <button 
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">done_all</span>
            <span>{t('notifications.mark_all')}</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="pb-6">
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
            <button 
                onClick={() => setActiveTab('Toutes')}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-2 transition-colors ${activeTab === 'Toutes' ? 'border-b-primary text-primary' : 'border-b-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              <p className="text-sm font-bold leading-normal tracking-wide">{t('notifications.tabs.all')}</p>
            </button>
            <button 
                onClick={() => setActiveTab('Alertes')}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-2 transition-colors ${activeTab === 'Alertes' ? 'border-b-primary text-primary' : 'border-b-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              <p className="text-sm font-bold leading-normal tracking-wide">{t('notifications.tabs.alerts')}</p>
            </button>
            <button 
                onClick={() => setActiveTab('Transactions')}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-2 transition-colors ${activeTab === 'Transactions' ? 'border-b-primary text-primary' : 'border-b-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              <p className="text-sm font-bold leading-normal tracking-wide">{t('notifications.tabs.transactions')}</p>
            </button>
          </div>
        </div>

        {/* Chronological Content */}
        <div className="flex flex-col gap-6">
          {/* Group: Today */}
          {todaysNotifs.length > 0 && (
            <div>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight pb-4">{t('notifications.sections.today')}</h3>
                <div className="flex flex-col gap-3">
                {todaysNotifs.map(notif => (
                    <div key={notif.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer shadow-sm ${notif.read ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-90' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 ring-1 ring-primary/5'}`}>
                        <div className={`size-10 flex items-center justify-center rounded-full shrink-0 ${getIconStyle(notif.type)}`}>
                            <span className="material-symbols-outlined">{getIconName(notif.type)}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <p className={`text-base leading-snug ${notif.read ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-900 dark:text-white font-bold'}`}>{notif.title}</p>
                                <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-2">{formatDate(notif.date)}</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{notif.message}</p>
                        </div>
                        {!notif.read && <div className="size-2 bg-primary rounded-full self-center"></div>}
                    </div>
                ))}
                </div>
            </div>
          )}

          {/* Group: Older */}
          {olderNotifs.length > 0 && (
            <div>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight pb-4">{t('notifications.sections.earlier')}</h3>
                <div className="flex flex-col gap-3">
                {olderNotifs.map(notif => (
                    <div key={notif.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer bg-white dark:bg-slate-900 opacity-90 hover:opacity-100">
                        <div className={`size-10 flex items-center justify-center rounded-full shrink-0 ${getIconStyle(notif.type)}`}>
                            <span className="material-symbols-outlined">{getIconName(notif.type)}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                            <p className="text-slate-900 dark:text-white font-bold text-base leading-snug">{notif.title}</p>
                            <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-2">{formatDate(notif.date)}</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{notif.message}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
          )}

          {filteredNotifications.length === 0 && (
             <div className="py-12 text-center">
                <div className="mx-auto size-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <span className="material-symbols-outlined text-3xl">notifications_off</span>
                </div>
                <p className="text-slate-500 font-medium">{t('notifications.empty')}</p>
             </div>
          )}
        </div>
      </section>

      {/* Right Sidebar Settings - Hidden on mobile, visible on XL */}
      <aside className="w-80 shrink-0 hidden xl:block">
        <div className="sticky top-8 bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">settings_suggest</span>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold">{t('notifications.settings_title')}</h2>
          </div>

          {/* Channel Settings */}
          <div className="mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('notifications.channels')}</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-500">notifications_active</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Push App</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-500">mail</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">E-mail</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-500">sms</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">SMS / WhatsApp</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Category Settings */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('notifications.categories')}</p>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                <div className="relative flex items-center">
                    <input type="checkbox" defaultChecked className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Virements & Flux</span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                <div className="relative flex items-center">
                    <input type="checkbox" defaultChecked className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Sécurité du Compte</span>
              </label>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button className="w-full py-2.5 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              {t('notifications.save_settings')}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NotificationsPage;