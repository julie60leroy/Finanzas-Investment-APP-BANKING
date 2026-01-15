import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout, notifications, t } = useApp();

  // Calcul du nombre de notifications non lues
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { path: "/", label: t('nav.dashboard'), icon: "dashboard" },
    { path: "/transactions", label: t('nav.transactions'), icon: "receipt_long" },
    { path: "/virement-beneficiary", label: t('nav.transfers'), icon: "swap_horiz" },
    { path: "/cards", label: t('nav.cards'), icon: "credit_card" },
    { path: "/notifications", label: t('nav.notifications'), icon: "notifications" },
    { path: "/settings", label: t('nav.settings'), icon: "settings" },
    { path: "/profile", label: t('nav.profile'), icon: "person" }
  ];

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-[60] w-72 bg-slate-darker p-6 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0 md:flex
        `}
      >
        <div className="flex flex-col gap-10">
          {/* Header Sidebar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-3xl">token</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Finanzas<span className="text-primary">.</span>
              </h1>
            </div>
            <button 
              onClick={onClose} 
              className="md:hidden text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-250px)] md:max-h-none no-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  location.pathname === item.path
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span className="text-sm font-medium">{item.label}</span>
                
                {/* Badge pour les notifications */}
                {item.path === '/notifications' && unreadCount > 0 && (
                  <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white shadow-sm">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={onClose}
              className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/5 border-dashed"
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span className="text-sm font-medium">{t('nav.admin')}</span>
            </Link>
          </nav>
        </div>

        {/* User Footer */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5">
            <div
              className="size-10 rounded-full bg-cover bg-center border border-white/20"
              style={{
                backgroundImage: `url("${user?.avatar || 'https://picsum.photos/200'}")`,
              }}
            ></div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Utilisateur'}</p>
              <p className="text-xs text-slate-400">Premium Member</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); onClose(); }}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all mt-2"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">{t('nav.logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;