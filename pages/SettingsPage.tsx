import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-black mb-2">Paramètres</h1>
      <p className="text-slate-500 mb-10">Gérez vos préférences et votre sécurité.</p>
      <div className="flex border-b mb-10 overflow-x-auto no-scrollbar gap-8">
        {['Profil', 'Sécurité', 'Notifications', 'Langues et Région'].map((tab, idx) => (
          <button
            key={tab}
            className={`pb-3 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${
              idx === 3 ? 'border-primary text-primary' : 'border-transparent text-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-bold mb-6">Langue de l'interface</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex justify-between items-center">
              <div className="flex gap-3 text-sm font-bold">
                <span>🇫🇷</span> Français
              </div>
              <span className="material-symbols-outlined text-primary">check_circle</span>
            </div>
            <div className="p-4 border rounded-xl flex justify-between items-center">
              <div className="flex gap-3 text-sm font-bold">
                <span>🇺🇸</span> Anglais
              </div>
            </div>
            <div className="p-4 border rounded-xl flex justify-between items-center">
              <div className="flex gap-3 text-sm font-bold">
                <span>🇪🇸</span> Espagnol
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-6">Devise de référence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border-2 border-primary bg-primary/5 rounded-xl">
              <p className="font-bold mb-1">Euro</p>
              <p className="text-slate-500 text-xs">EUR (€)</p>
            </div>
            <div className="p-6 border rounded-xl">
              <p className="font-bold mb-1">Dollar US</p>
              <p className="text-slate-500 text-xs">USD ($)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;