import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { injectFunds, user } = useApp();
  const [amount, setAmount] = useState<number>(0);
  const [motif, setMotif] = useState("Dividendes annuels");
  const [currency, setCurrency] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // State pour la sidebar mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleInjection = () => {
    if (amount <= 0) return;
    setIsLoading(true);
    setTimeout(() => {
        injectFunds(amount, currency, motif);
        setIsLoading(false);
        setShowSuccess(true);
        setAmount(0);
        
        // Cache le message de succès après 3 secondes
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
                <p className="font-bold">Injection confirmée</p>
                <p className="text-xs text-white/90">Les fonds sont disponibles sur le compte.</p>
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
          <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Général</div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">dashboard</span>
            <span className="text-sm font-medium">Tableau de bord</span>
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">group</span>
            <span className="text-sm font-medium">Utilisateurs</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">account_balance_wallet</span>
            <span className="text-sm font-medium">Comptes</span>
          </a>
          
          <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trésorerie</div>
          <a href="#" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium">
            <span className="material-symbols-outlined text-[20px] fill-1">move_down</span>
            <span className="text-sm">Injection de Capital</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">history_edu</span>
            <span className="text-sm font-medium">Audit & Logs</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">policy</span>
            <span className="text-sm font-medium">Conformité</span>
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
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors hidden sm:block">Accueil</Link>
                <span className="text-slate-500 hidden sm:block">/</span>
                <span className="text-slate-500 hover:text-primary transition-colors cursor-pointer hidden sm:block">Admin</span>
                <span className="text-slate-500 hidden sm:block">/</span>
                <span className="font-medium text-slate-800 truncate">Injection</span>
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
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-800 mb-2">Portail d'Injection</h1>
                <p className="text-sm md:text-base text-slate-500 max-w-2xl">
                  Interface sécurisée pour l'allocation de fonds institutionnels.
                </p>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 self-start md:self-auto">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="text-xs font-bold uppercase tracking-wide">Sécurisé</span>
              </div>
            </div>

            {/* Transaction Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-4 md:px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">add_card</span>
                  Nouvelle Transaction
                </h2>
                <span className="text-[10px] md:text-xs text-slate-500">Ref: 5432</span>
              </div>
              
              <div className="p-4 md:p-8 grid grid-cols-1 gap-6 md:gap-8">
                {/* Beneficiary */}
                <div className="relative z-20">
                  <label className="block text-sm font-semibold text-slate-800 mb-2">Bénéficiaire cible</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">person</span>
                    </div>
                    <input 
                      readOnly
                      className="block w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold shadow-sm text-sm md:text-lg cursor-not-allowed truncate" 
                      type="text" 
                      value={user ? `${user.name} (Compte Actuel)` : "Utilisateur non connecté"}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
                      <span className="hidden sm:inline text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase tracking-wider">Vérifié</span>
                      <span className="sm:hidden text-emerald-600 material-symbols-outlined text-sm">verified</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100 w-full"></div>

                {/* Amount & Source */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5">
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Montant à injecter</label>
                    <div className="relative">
                      <input 
                        className="block w-full pl-4 pr-16 py-3.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 font-mono text-lg md:text-xl" 
                        placeholder="0.00" 
                        type="number"
                        value={amount === 0 ? '' : amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <select 
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="h-full py-0 pl-3 pr-8 border-transparent bg-transparent text-slate-800 text-sm rounded-r-lg focus:ring-0 focus:border-transparent font-bold"
                        >
                          <option value="EUR">EUR</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <label className="block text-sm font-semibold text-slate-800 mb-2">Source des fonds</label>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-500">account_balance</span>
                      </div>
                      <input 
                        className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed font-medium text-sm truncate" 
                        readOnly 
                        type="text" 
                        value="Trésorerie Centrale - FI-MAIN (Solde: €42.5M)" 
                      />
                    </div>
                  </div>
                </div>

                {/* Justification */}
                <div>
                  <label className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                    <span>Motif de conformité <span className="text-primary">*</span></span>
                  </label>
                  <textarea 
                    className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 placeholder-slate-400 resize-none text-sm" 
                    placeholder="Ex: Dividendes annuels, Prime..." 
                    rows={2}
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                  ></textarea>
                </div>

                {/* Footer Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 w-full sm:w-auto">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Système opérationnel
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="hidden md:flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-2 rounded text-xs font-bold border border-orange-200">
                      <span className="material-symbols-outlined text-[16px]">phonelink_lock</span>
                      2FA
                    </div>
                    <button 
                      onClick={handleInjection}
                      disabled={isLoading || amount <= 0}
                      className="w-full sm:w-auto bg-primary hover:bg-red-700 text-white px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-primary/10 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                            <span className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                            Traitement...
                        </>
                      ) : (
                        <>
                            <span className="material-symbols-outlined">bolt</span>
                            Exécuter l'injection
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* History Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-base md:text-lg font-bold text-slate-800">Historique Récent</h3>
                <button className="text-sm text-primary hover:text-red-700 font-medium flex items-center gap-1">
                  Voir tout
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 md:px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">Date</th>
                        <th className="px-4 md:px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">Bénéficiaire</th>
                        <th className="px-4 md:px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">Montant</th>
                        <th className="px-4 md:px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">Motif</th>
                        <th className="px-4 md:px-6 py-4 font-semibold text-slate-800 whitespace-nowrap text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 md:px-6 py-4 text-slate-500 font-mono text-xs whitespace-nowrap">A l'instant</td>
                        <td className="px-4 md:px-6 py-4 text-slate-800 font-medium whitespace-nowrap">{user?.name || 'Client'}</td>
                        <td className="px-4 md:px-6 py-4 text-slate-800 font-mono whitespace-nowrap">En cours...</td>
                        <td className="px-4 md:px-6 py-4 text-slate-500 max-w-[150px] truncate">Dernière opération</td>
                        <td className="px-4 md:px-6 py-4 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                            En traitement
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 md:px-6 py-4 text-slate-500 font-mono text-xs whitespace-nowrap">24 Oct 14:32</td>
                        <td className="px-4 md:px-6 py-4 text-slate-800 font-medium whitespace-nowrap">Jean Dupont</td>
                        <td className="px-4 md:px-6 py-4 text-slate-800 font-mono whitespace-nowrap">€ 12,500.00</td>
                        <td className="px-4 md:px-6 py-4 text-slate-500 max-w-[150px] truncate">Régularisation T3</td>
                        <td className="px-4 md:px-6 py-4 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 border border-emerald-100">
                            Succès
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <footer className="mt-12 mb-6 text-center text-xs text-slate-500">
              <p>© 2023 Finanzas Investment Corp.</p>
            </footer>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;