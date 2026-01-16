import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { injectFunds, user, t, formatTxDate, language, currency: globalCurrency } = useApp();
  
  // Utilisation d'un effet pour mettre à jour le motif par défaut lors du changement de langue
  const [motif, setMotif] = useState("");
  useEffect(() => {
      setMotif(t('admin.motif_placeholder'));
  }, [language, t]);

  const [amount, setAmount] = useState<number>(0);
  const [injectionCurrency, setInjectionCurrency] = useState(globalCurrency);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync avec la devise globale par défaut
  useEffect(() => {
      setInjectionCurrency(globalCurrency);
  }, [globalCurrency]);

  const handleInjection = () => {
    if (amount <= 0) return;
    setIsLoading(true);
    setTimeout(() => {
        injectFunds(amount, injectionCurrency, motif);
        setIsLoading(false);
        setShowSuccess(true);
        setAmount(0);
        setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-slate-800 font-display antialiased selection:bg-primary selection:text-white relative">
      
      {/* Toast Succès */}
      {showSuccess && (
        <div className="absolute top-20 md:top-10 left-1/2 -translate-x-1/2 z-[60] bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-[slideIn_0.3s_ease-out] w-[90%] md:w-auto">
            <div className="bg-white/20 p-2 rounded-full shrink-0">
                <span className="material-symbols-outlined text-white">check</span>
            </div>
            <div>
                <p className="font-bold">{t('admin.toast_success')}</p>
                <p className="text-xs text-white/90">{t('admin.toast_desc')}</p>
            </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-slate-darker border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 md:flex shrink-0
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-red-800 flex items-center justify-center text-white font-bold text-lg">
                F
            </div>
            <div className="flex flex-col">
                <h1 className="text-sm font-bold leading-none tracking-tight text-white">FINANZAS</h1>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">Admin Panel</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('admin.nav_general')}</div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">dashboard</span>
            <span className="text-sm font-medium">{t('nav.dashboard')}</span>
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">group</span>
            <span className="text-sm font-medium">{t('admin.users')}</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">account_balance_wallet</span>
            <span className="text-sm font-medium">{t('admin.accounts')}</span>
          </a>
          
          <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('admin.nav_treasury')}</div>
          <a href="#" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium">
            <span className="material-symbols-outlined text-[20px] fill-1">move_down</span>
            <span className="text-sm">{t('admin.injection_portal')}</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">history_edu</span>
            <span className="text-sm font-medium">{t('admin.audit')}</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">policy</span>
            <span className="text-sm font-medium">{t('admin.compliance')}</span>
          </a>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-700 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-600 to-slate-400"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-white">Admin Système</p>
              <p className="text-xs text-slate-400">admin@finanzas.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800"
            >
                <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex items-center gap-2 text-sm overflow-hidden whitespace-nowrap">
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors hidden sm:block">{t('nav.home')}</Link>
                <span className="text-slate-500 hidden sm:block">/</span>
                <span className="text-slate-500 hover:text-primary transition-colors cursor-pointer hidden sm:block">{t('admin.admin')}</span>
                <span className="text-slate-500 hidden sm:block">/</span>
                <span className="font-medium text-slate-800 truncate">{t('admin.injection_portal')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => navigate('/notifications')}
              className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
            <span className="text-[10px] md:text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded border border-primary/20 whitespace-nowrap">ENV: PROD</span>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 pb-safe">
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 pb-20 md:pb-0">
            
            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-800 mb-2">{t('admin.injection_portal')}</h1>
                <p className="text-sm md:text-base text-slate-500 max-w-2xl">
                  {t('admin.secure_interface')}
                </p>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wide">{t('admin.system_operational')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Injection Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                   <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">add_card</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">{t('admin.new_tx')}</h2>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">REF: INJ-{new Date().getFullYear()}-{Math.floor(Math.random()*1000)}</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      {/* Target User Info */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                               <span className="material-symbols-outlined">person</span>
                            </div>
                            <div>
                               <p className="text-xs font-bold text-slate-400 uppercase">{t('admin.target_beneficiary')}</p>
                               <p className="font-bold text-slate-800">{user?.name}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-1 text-emerald-600 bg-white px-2 py-1 rounded border border-slate-100 shadow-sm">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            <span className="text-xs font-bold uppercase">{t('admin.verified')}</span>
                         </div>
                      </div>

                      {/* Amount Input */}
                      <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">{t('admin.amount_inject')}</label>
                         <div className="relative">
                            <input 
                               type="number" 
                               value={amount || ''} 
                               onChange={(e) => setAmount(parseFloat(e.target.value))}
                               className="w-full text-3xl font-black text-slate-800 border-b-2 border-slate-200 focus:border-primary bg-transparent py-2 pl-2 pr-12 focus:outline-none placeholder-slate-200 transition-colors"
                               placeholder="0.00"
                            />
                            <div className="absolute right-0 bottom-3 flex items-center gap-2">
                               <select 
                                  value={injectionCurrency} 
                                  onChange={(e) => setInjectionCurrency(e.target.value)}
                                  className="bg-slate-100 border-none rounded-lg text-sm font-bold text-slate-700 py-1 px-2 cursor-pointer focus:ring-0"
                               >
                                  <option value="EUR">EUR</option>
                                  <option value="USD">USD</option>
                                  <option value={globalCurrency}>{globalCurrency}</option>
                               </select>
                            </div>
                         </div>
                      </div>

                      {/* Source & Motif */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('admin.source_funds')}</label>
                            <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-medium flex items-center gap-2">
                               <span className="material-symbols-outlined text-slate-400">account_balance</span>
                               {t('admin.central_treasury')}
                            </div>
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('admin.motif_compliance')}</label>
                            <input 
                               type="text" 
                               value={motif} 
                               onChange={(e) => setMotif(e.target.value)}
                               className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-medium focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                               placeholder={t('admin.motif_placeholder')}
                            />
                         </div>
                      </div>
                      
                      {/* Action Button */}
                      <button 
                        onClick={handleInjection}
                        disabled={isLoading || amount <= 0}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isLoading || amount <= 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover active:scale-[0.98] shadow-primary/25'}`}
                      >
                         {isLoading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                {t('common.loading')}
                            </>
                         ) : (
                            <>
                                <span className="material-symbols-outlined">bolt</span>
                                {t('admin.execute')}
                            </>
                         )}
                      </button>
                   </div>
                </div>
              </div>

              {/* Sidebar Info / History */}
              <div className="space-y-6">
                 <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400">history</span>
                        {t('admin.history')}
                    </h3>
                    <div className="space-y-4">
                       {/* Mock History Items (Translated) */}
                       <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm opacity-60">
                          <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                             <span className="material-symbols-outlined text-sm">check</span>
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="text-sm font-bold text-slate-800 truncate">{t('admin.amount_inject')}</p>
                             <p className="text-xs text-slate-500">{formatTxDate(new Date(Date.now() - 86400000).toISOString())}</p>
                          </div>
                          <p className="font-bold text-emerald-600 text-sm">+50k €</p>
                       </div>
                       
                       {showSuccess && (
                           <div className="flex items-center gap-3 p-3 bg-white border border-emerald-100 rounded-xl shadow-sm animate-[fadeIn_0.5s_ease-out]">
                              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                 <span className="material-symbols-outlined text-sm">check</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm font-bold text-slate-800 truncate">{motif}</p>
                                 <p className="text-xs text-emerald-600 font-bold">{t('admin.status_success')}</p>
                              </div>
                              <p className="font-bold text-emerald-600 text-sm">+{amount} {injectionCurrency}</p>
                           </div>
                       )}
                    </div>
                 </div>

                 <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-blue-900">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-500">info</span>
                        <div>
                            <p className="font-bold text-sm mb-1">Mode Administrateur</p>
                            <p className="text-xs leading-relaxed opacity-80">
                                Toutes les opérations effectuées sur ce portail sont enregistrées et auditables. Assurez-vous d'avoir les autorisations nécessaires avant de procéder à une injection de fonds.
                            </p>
                        </div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;