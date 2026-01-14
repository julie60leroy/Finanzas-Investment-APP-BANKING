import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-darker text-white font-display overflow-hidden">
      <aside className="w-64 bg-slate-darker border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="size-8 bg-primary rounded flex items-center justify-center font-black">F</div>
            <h1 className="font-bold">ADMIN PANEL</h1>
          </div>
          <nav className="space-y-4">
            <Link to="/" className="flex gap-3 text-slate-400 hover:text-white">
              <span className="material-symbols-outlined">logout</span> Sortir
            </Link>
            <div className="text-xs text-slate-600 uppercase font-bold mt-10 mb-4">Trésorerie</div>
            <div className="flex gap-3 text-primary bg-primary/10 p-2 rounded">
              <span className="material-symbols-outlined">move_down</span> Injection
            </div>
          </nav>
        </div>
      </aside>
      <main className="flex-1 bg-white text-slate-900 p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black mb-10">Injection Institutionnelle</h1>
          <div className="p-8 border rounded-2xl bg-white shadow-sm space-y-8">
            <div className="relative">
              <label className="font-bold text-sm mb-2 block">Bénéficiaire cible</label>
              <input
                className="w-full border-slate-200 rounded-xl p-4 bg-slate-50 focus:ring-primary focus:border-primary"
                placeholder="ID, Nom ou Email..."
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="font-bold text-sm mb-2 block">Montant</label>
                <input
                  className="w-full border-slate-200 rounded-xl p-4 focus:ring-primary focus:border-primary"
                  placeholder="0.00"
                  type="number"
                />
              </div>
              <div>
                <label className="font-bold text-sm mb-2 block">Source</label>
                <div className="w-full border bg-slate-50 p-4 rounded-xl text-slate-400 font-bold text-sm">
                  Trésorerie Centrale (€42.5M)
                </div>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-white font-black rounded-xl hover:bg-red-700 shadow-xl transition-all">
              EXÉCUTER L'INJECTION
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;