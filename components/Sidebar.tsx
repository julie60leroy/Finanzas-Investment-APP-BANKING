import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Tableau de bord", icon: "dashboard" },
    { path: "/transactions", label: "Transactions", icon: "receipt_long" },
    { path: "/virement-beneficiary", label: "Virements", icon: "swap_horiz" },
    { path: "/cards", label: "Cartes", icon: "credit_card" },
    { path: "/settings", label: "Paramètres", icon: "settings" },
    { path: "/profile", label: "Mon Profil", icon: "person" }
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 h-full bg-slate-darker p-6 justify-between shrink-0 no-print">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-3xl">token</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Finanzas<span className="text-primary">.</span>
          </h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                location.pathname === item.path
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
          <Link
            to="/admin"
            className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/5 border-dashed"
          >
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="text-sm font-medium">Administration</span>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5">
          <div
            className="size-10 rounded-full bg-cover bg-center border border-white/20"
            style={{
              backgroundImage: 'url("https://picsum.photos/200")',
            }}
          ></div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Marc Dubois</p>
            <p className="text-xs text-slate-400">Premium Member</p>
          </div>
        </div>
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all mt-2"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-medium">Déconnexion</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;