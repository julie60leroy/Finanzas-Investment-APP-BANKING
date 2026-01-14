import React from 'react';

const CardsPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
      {/* Page Heading */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Gestion des Cartes</h2>
            <p className="text-slate-500 text-base font-normal">Contrôlez vos moyens de paiement en temps réel.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all text-slate-700 dark:text-white">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              <span>Nouvelle carte virtuelle</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-8 pb-12">
        {/* Left: Cards Carousel/Grid */}
        <div className="flex-1 space-y-8">
          {/* Cards Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Card 1: Premium Physical */}
            <div className="flex flex-col gap-6">
              <div className="relative w-full aspect-[1.586/1] rounded-2xl p-8 text-white shadow-2xl overflow-hidden flex flex-col justify-between group" style={{ background: 'linear-gradient(135deg, #ec1313 0%, #a50d0d 100%)' }}>
                <div className="absolute top-0 right-0 p-8">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Active
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-6 text-white opacity-80">
                      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="font-black text-xs tracking-wider opacity-80">FINANZAS INVESTMENT</span>
                  </div>
                  <div className="mt-4">
                    <div className="w-12 h-9 bg-yellow-400/80 rounded flex items-center justify-center overflow-hidden border border-black/10">
                      <div className="grid grid-cols-3 gap-0.5 opacity-30">
                        <div className="w-4 h-9 border-r border-black/20"></div>
                        <div className="w-4 h-9 border-r border-black/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-2xl font-mono tracking-[0.2em] drop-shadow-md">•••• •••• •••• 4582</p>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest opacity-60">Titulaire</span>
                      <span className="text-sm font-bold tracking-wide">JEAN DUPONT</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-widest opacity-60">Expire</span>
                      <span className="text-sm font-bold tracking-wide">09/27</span>
                    </div>
                    <div className="h-8">
                       <img alt="Logo Mastercard" className="h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWkD4_uSGmteZ4vNlNznfv7efrvJHYOKK0hQQ32ZX1mYU-7JHoE13nJyrKK2c1bomEyuHDo3qRu1BMKea6jhdsX5gd82RxtnDFDegU0LGWqXbp4cQ65aVoPyP7O7MOvP_T1_8svGYaZsZ095leEeo7FJCMDtfnq0zsWexEgnBt2L9o_ziWFbhmc0ZSx2_4EY2uR-JVkPV9s4O9J0uQgc0Hbw2eEnRcQtZ2ocKVJJ-2sKWehYRCFEbjvV0KH4rRKYvHED8466_qU5M" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95">
                  <span className="material-symbols-outlined text-lg">lock</span>
                  <span>Bloquer</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  <span>PIN</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-lg">settings</span>
                  <span>Paramètres</span>
                </button>
              </div>
            </div>

            {/* Card 2: Virtual Digital */}
            <div className="flex flex-col gap-6">
              <div className="relative w-full aspect-[1.586/1] rounded-2xl p-8 text-white shadow-2xl overflow-hidden flex flex-col justify-between group" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="absolute top-0 right-0 p-8">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    <span className="material-symbols-outlined text-[12px]">bolt</span>
                    Virtuelle
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-6 text-primary">
                      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="font-black text-xs tracking-wider opacity-80">FINANZAS INVESTMENT</span>
                  </div>
                  <div className="mt-4">
                    <div className="w-12 h-9 bg-gray-400/30 rounded flex items-center justify-center overflow-hidden border border-white/10">
                      <span className="material-symbols-outlined text-white/40">contactless</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-2xl font-mono tracking-[0.2em] drop-shadow-md">•••• •••• •••• 9103</p>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest opacity-60">Usage</span>
                      <span className="text-sm font-bold tracking-wide">ACHATS EN LIGNE</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-widest opacity-60">Expire</span>
                      <span className="text-sm font-bold tracking-wide">12/25</span>
                    </div>
                    <div className="h-6">
                      <img alt="Logo Visa" className="h-full object-contain invert brightness-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCNAOdwxzdzdeVypRYUZcfpLVTy4WW9Lu6Utme8ShcGmZiHbGKQILsBFFIs2do15BcE-1mfLMRyLoKhY7hvbLmVgkDW-TF6sQcvFsjaykqne33N4hzjwNnS9x2D68_sIxB0tEKM3tSWNBjPbgQL1NzjDQQ2Rf-YgFRLPf57DXlOXv4tv3mnZ_Q3F_CCfnGorl035moqtzL0fB9K8XgSHrdkTGGqa5k86mPwSXSMd9Qmy0zAtKrSA8nE1hXXO8rXy2wA6SZFcqIouQ" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95">
                  <span className="material-symbols-outlined text-lg">lock</span>
                  <span>Bloquer</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  <span>Infos</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-lg">settings</span>
                  <span>Limites</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card Stats/Limits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Plafond Paiement</span>
                <span className="text-primary material-symbols-outlined">payments</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">2 450,00 €</p>
              <p className="text-xs text-slate-500 mt-1">Sur 5 000,00 € mensuel</p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4">
                <div className="bg-primary h-full rounded-full w-1/2"></div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Retraits DAB</span>
                <span className="text-blue-500 material-symbols-outlined">atm</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">400,00 €</p>
              <p className="text-xs text-slate-500 mt-1">Sur 1 000,00 € hebdomadaire</p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4">
                <div className="bg-blue-500 h-full rounded-full w-[40%]"></div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Score de Sécurité</span>
                <span className="text-green-500 material-symbols-outlined">security</span>
              </div>
              <p className="text-2xl font-black text-green-500 dark:text-green-400">Optimal</p>
              <p className="text-xs text-slate-500 mt-1">Toutes les options activées</p>
              <div className="flex gap-1 mt-4">
                <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
                <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
                <div className="flex-1 h-1.5 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Recent Activity & CTA */}
        <aside className="w-full lg:w-80 space-y-6">
          {/* Recent Transactions */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white">Dépenses récentes</h3>
              <button className="text-primary text-xs font-bold hover:underline">Voir tout</button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600">shopping_bag</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Apple Store Paris</p>
                  <p className="text-xs text-slate-500 truncate">Hier, 14:32 • **4582</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900 dark:text-white">-1 299,00 €</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600">restaurant</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Le Grand Colbert</p>
                  <p className="text-xs text-slate-500 truncate">12 Mai • **4582</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900 dark:text-white">-84,50 €</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600">cloud</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Amazon AWS Cloud</p>
                  <p className="text-xs text-slate-500 truncate">10 Mai • **9103</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900 dark:text-white">-45,12 €</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600">commute</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Uber Trip</p>
                  <p className="text-xs text-slate-500 truncate">08 Mai • **9103</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <p className="text-sm font-black text-slate-900 dark:text-white">-22,00 €</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA: Order New Card */}
          <div className="relative overflow-hidden bg-slate-800 dark:bg-slate-900 rounded-xl p-6 text-white group cursor-pointer hover:shadow-xl transition-all">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined !text-[120px]">credit_card</span>
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="size-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined">add_card</span>
              </div>
              <div>
                <h4 className="text-lg font-bold">Nouvelle carte ?</h4>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">Commandez une carte physique premium ou créez une carte virtuelle instantanément.</p>
              </div>
              <button className="mt-2 w-full bg-white text-slate-900 py-2.5 rounded-lg text-sm font-black hover:bg-gray-100 transition-colors">
                Commander maintenant
              </button>
            </div>
          </div>

          {/* Security Tips Card */}
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-5 flex gap-4">
            <span className="material-symbols-outlined text-primary">gpp_maybe</span>
            <div className="flex flex-col gap-1">
              <h5 className="text-xs font-bold text-primary uppercase tracking-wider">Conseil Sécurité</h5>
              <p className="text-xs text-slate-700 dark:text-gray-300">Ne partagez jamais votre code PIN par SMS ou téléphone. Finanzas Investment ne vous le demandera jamais.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CardsPage;