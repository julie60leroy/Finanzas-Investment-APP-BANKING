import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark font-display">
      
      {/* Main Content Layout */}
      <div className="flex flex-1 justify-center py-8 px-4 sm:px-6 md:px-8 overflow-y-auto">
        <div className="flex flex-col max-w-[960px] w-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 min-h-[800px]">
          
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 px-8 pt-6">
            <a className="text-[#896161] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Accueil</a>
            <span className="text-[#896161] dark:text-slate-400 text-sm font-medium">/</span>
            <span className="text-[#181111] dark:text-white text-sm font-medium">Paramètres</span>
          </div>

          {/* Page Heading */}
          <div className="flex flex-wrap justify-between gap-3 px-8 pb-2 pt-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#181111] dark:text-white text-3xl font-black leading-tight tracking-tight">Paramètres de l'Application</h1>
              <p className="text-[#896161] dark:text-slate-400 text-base font-normal">Gérez vos préférences, votre sécurité et vos options régionales.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-8 mt-6">
            <div className="flex border-b border-[#e6dbdb] dark:border-slate-800 gap-8 overflow-x-auto no-scrollbar">
              {['Profil', 'Sécurité', 'Notifications'].map((tab) => (
                  <a key={tab} className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#896161] dark:text-slate-400 pb-3 pt-2 hover:text-[#181111] dark:hover:text-white transition-colors px-1 whitespace-nowrap cursor-pointer" href="#">
                    <span className="text-sm font-bold tracking-wide">{tab}</span>
                  </a>
              ))}
              {/* Active Tab */}
              <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-3 pt-2 px-1 whitespace-nowrap cursor-pointer" href="#">
                <span className="text-sm font-bold tracking-wide">Langues et Région</span>
              </a>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8 flex flex-col gap-10">
            
            {/* Language Section */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#181111] dark:text-white text-xl font-bold tracking-tight">Langue de l'interface</h2>
                <span className="text-[#896161] dark:text-slate-400 text-sm hidden sm:inline-block">Sélectionnez votre langue préférée</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Active Card (French) */}
                <div className="relative group cursor-pointer border-2 border-primary bg-primary/5 rounded-lg p-4 flex items-center justify-between transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🇫🇷</div>
                    <div className="flex flex-col">
                      <span className="text-[#181111] dark:text-white font-bold text-sm">Français</span>
                      <span className="text-primary text-xs font-medium">Par défaut</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary icon-filled">check_circle</span>
                </div>

                {/* Inactive Cards */}
                {[
                    { flag: '🇺🇸', name: 'Anglais' },
                    { flag: '🇪🇸', name: 'Espagnol' },
                    { flag: '🇩🇪', name: 'Allemand' },
                    { flag: '🇵🇹', name: 'Portugais' },
                    { flag: '🇮🇹', name: 'Italien' }
                ].map((lang) => (
                    <div key={lang.name} className="group cursor-pointer border border-[#e6dbdb] dark:border-slate-700 hover:border-[#896161]/50 dark:hover:border-slate-500 bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{lang.flag}</div>
                        <span className="text-[#181111] dark:text-white font-medium text-sm">{lang.name}</span>
                      </div>
                    </div>
                ))}
              </div>
            </section>

            <hr className="border-[#f4f0f0] dark:border-slate-800"/>

            {/* Region & Currency Section */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#181111] dark:text-white text-xl font-bold tracking-tight">Devise et Format</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Group: Currency */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#181111] dark:text-white text-sm font-semibold">Devise de référence</label>
                  <p className="text-[#896161] dark:text-slate-400 text-xs mb-2">Cette devise sera utilisée pour tous les calculs de portefeuille par défaut.</p>
                  <div className="flex gap-4 mt-1">
                    {/* Option EUR */}
                    <label className="flex-1 cursor-pointer group">
                      <input defaultChecked className="peer sr-only" name="currency" type="radio" value="eur"/>
                      <div className="h-full rounded-lg border border-[#e6dbdb] dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:ring-1 peer-checked:ring-primary transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#181111] dark:text-white font-bold">Euro</span>
                          <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 transition-opacity icon-filled">radio_button_checked</span>
                        </div>
                        <div className="text-[#896161] dark:text-slate-400 font-medium">EUR (€)</div>
                      </div>
                    </label>
                    {/* Option USD */}
                    <label className="flex-1 cursor-pointer group">
                      <input className="peer sr-only" name="currency" type="radio" value="usd"/>
                      <div className="h-full rounded-lg border border-[#e6dbdb] dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:ring-1 peer-checked:ring-primary transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#181111] dark:text-white font-bold">Dollar US</span>
                          <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 transition-opacity icon-filled">radio_button_checked</span>
                        </div>
                        <div className="text-[#896161] dark:text-slate-400 font-medium">USD ($)</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Form Group: Timezone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#181111] dark:text-white text-sm font-semibold">Fuseau horaire</label>
                  <p className="text-[#896161] dark:text-slate-400 text-xs mb-2">Définit l'heure d'affichage pour vos transactions.</p>
                  <div className="relative">
                    <select className="w-full rounded-lg border-[#e6dbdb] dark:border-slate-700 bg-[#f4f0f0] dark:bg-slate-800 text-[#181111] dark:text-white text-sm p-3 pr-10 focus:border-primary focus:ring-primary outline-none appearance-none cursor-pointer">
                      <option>(GMT+01:00) Paris, France</option>
                      <option>(GMT+00:00) Londres, Royaume-Uni</option>
                      <option>(GMT-05:00) New York, États-Unis</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#896161] dark:text-slate-400">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Footer */}
            <div className="flex justify-end pt-4">
              <button className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-all flex items-center gap-2 active:scale-95">
                <span className="material-symbols-outlined">save</span>
                Enregistrer les modifications
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;