import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { path: "/", label: "Accueil", icon: "dashboard" },
    { path: "/transactions", label: "Activité", icon: "receipt_long" },
    { path: "/virement-beneficiary", label: "Virement", icon: "swap_horiz", highlight: true },
    { path: "/cards", label: "Cartes", icon: "credit_card" },
    { path: "/profile", label: "Profil", icon: "person" }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-end pb-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          if (item.highlight) {
             return (
                <Link key={item.path} to={item.path} className="relative -top-5">
                    <div className="flex flex-col items-center gap-1">
                        <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-slate-900">
                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                        </div>
                        <span className="text-[10px] font-bold text-primary">{item.label}</span>
                    </div>
                </Link>
             );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 min-w-[60px] p-2 rounded-xl transition-colors ${
                isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <span className={`material-symbols-outlined ${isActive ? 'icon-filled' : ''} text-2xl`}>
                    {item.icon}
                </span>
                {item.path === '/profile' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;