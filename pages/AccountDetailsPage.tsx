import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';

const AccountDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, transactions, updateUser, formatTxDate, t, formatGlobalMoney, convertAmount } = useApp();
  
  // États locaux
  const [copied, setCopied] = useState(false);
  const [isIbanVisible, setIsIbanVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditIbanModal, setShowEditIbanModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showOverdraftModal, setShowOverdraftModal] = useState(false);
  
  // Input States
  const [newIbanInput, setNewIbanInput] = useState('');
  const [newNameInput, setNewNameInput] = useState('');
  const [newOverdraftInput, setNewOverdraftInput] = useState(0);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper pour afficher le message toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Mock Graph Data (30 jours) - Conversion dynamique
  const rawData = [
    { name: '1 Oct', solde: 2100 },
    { name: '5 Oct', solde: 3200 }, // Salaire
    { name: '10 Oct', solde: 2800 },
    { name: '15 Oct', solde: 2600 },
    { name: '20 Oct', solde: 1900 }, // Loyer/Grosses dépenses
    { name: '25 Oct', solde: 2450 }, // Actuel
  ];

  const data = rawData.map(d => ({
      ...d,
      solde: Math.round(convertAmount(d.solde))
  }));

  // Données dynamiques depuis le contexte
  const currentIban = user?.checkingIban || "FR76 3000 6000 0123 4567 8901 234";
  const accountName = user?.checkingAccountName || t('dashboard.accounts.checking');
  const overdraftLimit = user?.overdraftLimit || 500;
  
  // Affichage masqué ou clair
  const displayIban = isIbanVisible 
    ? currentIban 
    : `FR76 •••• •••• ${currentIban.slice(-4)}`;

  // Gestion Copie
  const handleCopyIban = () => {
    navigator.clipboard.writeText(currentIban);
    setCopied(true);
    showToast(t('dashboard.rib_copied'));
    setTimeout(() => setCopied(false), 2000);
  };

  // --- HANDLERS ---
  const handleOpenEditIban = () => {
      setNewIbanInput(currentIban);
      setShowEditIbanModal(true);
      setShowSettingsModal(false);
  };

  const handleSaveIban = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser({ checkingIban: newIbanInput });
      setShowEditIbanModal(false);
      showToast(t('common.success'));
  };

  const handleOpenRename = () => {
      setNewNameInput(accountName);
      setShowRenameModal(true);
      setShowSettingsModal(false);
  };

  const handleSaveName = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser({ checkingAccountName: newNameInput });
      setShowRenameModal(false);
      showToast(t('common.success'));
  };

  const handleOpenOverdraft = () => {
      setNewOverdraftInput(overdraftLimit);
      setShowOverdraftModal(true);
      setShowSettingsModal(false);
  };

  const handleSaveOverdraft = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser({ overdraftLimit: newOverdraftInput });
      setShowOverdraftModal(false);
      showToast(t('common.success'));
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
            <span className="material-symbols-outlined text-emerald-400">check_circle</span>
            {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">{accountName}</h1>
            <div className="flex items-center gap-2">
                <p className="text-xs text-slate-500 font-mono transition-all">{displayIban}</p>
                <button 
                    onClick={() => setIsIbanVisible(!isIbanVisible)} 
                    className="text-slate-400 hover:text-primary transition-colors"
                    title={isIbanVisible ? "Masquer" : "Voir"}
                >
                    <span className="material-symbols-outlined text-[14px]">{isIbanVisible ? 'visibility_off' : 'visibility'}</span>
                </button>
            </div>
          </div>
        </div>
        <button 
            onClick={() => setShowSettingsModal(true)}
            className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
        >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            {t('nav.settings')}
        </button>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Section: Balance & Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                {/* Big Balance Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">{t('account.balance_avail')}</p>
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                            {formatGlobalMoney(user?.accounts.checking || 0)}
                        </h2>
                        
                        <div className="flex flex-wrap gap-3">
                            <button 
                                onClick={() => navigate('/virement-beneficiary')}
                                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[20px]">send</span>
                                {t('nav.transfers')}
                            </button>
                            <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <button 
                                    onClick={handleCopyIban}
                                    className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-colors ${copied ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'} rounded-l-xl`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{copied ? 'check' : 'content_copy'}</span>
                                    {copied ? t('account.copied') : t('account.copy_rib')}
                                </button>
                                <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
                                <button 
                                    onClick={() => setIsIbanVisible(!isIbanVisible)}
                                    className="px-3 py-2.5 text-slate-500 hover:text-primary transition-colors"
                                    title={isIbanVisible ? "Masquer le RIB" : "Afficher le RIB"}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{isIbanVisible ? 'visibility_off' : 'visibility'}</span>
                                </button>
                                <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
                                <button 
                                    onClick={handleOpenEditIban}
                                    className="px-3 py-2.5 text-slate-500 hover:text-primary transition-colors rounded-r-xl"
                                    title={t('account.edit_rib')}
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                            </div>
                            
                            <button onClick={() => setShowSettingsModal(true)} className="flex items-center justify-center size-[46px] rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                    </div>
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                </div>

                {/* Graph */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900 dark:text-white">{t('account.graph_evolution')}</h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span>
                            +12.5%
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSolde" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec1313" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#ec1313" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 12, fill: '#94a3b8'}} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 12, fill: '#94a3b8'}} 
                                    tickFormatter={(val) => `${val}`}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    formatter={(value: number) => [formatGlobalMoney(value), 'Solde']}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="solde" 
                                    stroke="#ec1313" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorSolde)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Right Column: Stats & Card */}
            <div className="space-y-6">
                {/* Stats Summary */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                        <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-3">
                            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                        </div>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase mb-1">{t('account.income_month')}</p>
                        <p className="text-xl font-black text-emerald-800 dark:text-emerald-300">+ {formatGlobalMoney(3450)}</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-2xl border border-red-100 dark:border-red-900/20">
                        <div className="size-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mb-3">
                            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                        </div>
                        <p className="text-xs text-red-700 dark:text-red-400 font-bold uppercase mb-1">{t('account.outcome_month')}</p>
                        <p className="text-xl font-black text-red-800 dark:text-red-300">- {formatGlobalMoney(1240)}</p>
                    </div>
                </div>

                {/* Card Mini-View */}
                <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden group cursor-pointer" onClick={() => navigate('/cards')}>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-70">{t('account.linked_card')}</span>
                            <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">{t('cards.active').toUpperCase()}</span>
                        </div>
                        <p className="font-mono text-xl tracking-widest mb-4">•••• 4242</p>
                        <div className="flex justify-between items-end">
                            <div className="text-xs opacity-70">Exp 09/27</div>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWkD4_uSGmteZ4vNlNznfv7efrvJHYOKK0hQQ32ZX1mYU-7JHoE13nJyrKK2c1bomEyuHDo3qRu1BMKea6jhdsX5gd82RxtnDFDegU0LGWqXbp4cQ65aVoPyP7O7MOvP_T1_8svGYaZsZ095leEeo7FJCMDtfnq0zsWexEgnBt2L9o_ziWFbhmc0ZSx2_4EY2uR-JVkPV9s4O9J0uQgc0Hbw2eEnRcQtZ2ocKVJJ-2sKWehYRCFEbjvV0KH4rRKYvHED8466_qU5M" alt="Mastercard" className="h-6" />
                        </div>
                    </div>
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Info Block */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t('account.infos')}</h4>
                        <button onClick={handleOpenOverdraft} className="text-primary text-xs font-bold hover:underline">{t('common.edit')}</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">{t('account.overdraft')}</span>
                            <span className="font-medium text-slate-900 dark:text-white">{formatGlobalMoney(overdraftLimit)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">{t('account.rate')}</span>
                            <span className="font-medium text-slate-900 dark:text-white">7.5%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">{t('account.opened_on')}</span>
                            <span className="font-medium text-slate-900 dark:text-white">12 Jan 2020</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t('account.history')}</h3>
                <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">filter_list</span></button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.slice(0, 8).map((tx) => (
                    <div key={tx.id} className="p-5 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                        <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-primary group-hover:shadow-md transition-all">
                            <span className="material-symbols-outlined">{tx.icon}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-bold text-slate-900 dark:text-white">{tx.name}</p>
                                <p className={`font-bold ${tx.amt > 0 ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                                    {tx.amt > 0 ? '+' : ''} {formatGlobalMoney(tx.amt)}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-slate-500">{tx.cat} • {formatTxDate(tx.date)}</p>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${tx.status === 'Complété' || tx.status === t('common.success') ? 'text-emerald-500' : 'text-amber-500'}`}>{tx.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 text-center border-t border-slate-100 dark:border-slate-800">
                <button className="text-sm font-bold text-primary hover:underline">{t('common.load_more')}</button>
            </div>
        </div>

      </main>

      {/* --- MODAL: EDIT IBAN --- */}
      {showEditIbanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('account.modals.edit_rib_title')}</h3>
                    <button onClick={() => setShowEditIbanModal(false)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 mb-6 border border-blue-100 dark:border-blue-900/30">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                        {t('account.modals.edit_rib_warning')}
                    </p>
                </div>
                <form onSubmit={handleSaveIban} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('account.modals.new_iban')}</label>
                        <input 
                            type="text" 
                            required 
                            value={newIbanInput}
                            onChange={(e) => setNewIbanInput(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-mono uppercase tracking-wide" 
                        />
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setShowEditIbanModal(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700">
                            {t('common.cancel')}
                        </button>
                        <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20">
                            {t('common.save')}
                        </button>
                    </div>
                </form>
            </div>
          </div>
      )}

      {/* --- MODAL: RENAME ACCOUNT --- */}
      {showRenameModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('account.modals.rename_title')}</h3>
                    <button onClick={() => setShowRenameModal(false)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                </div>
                <form onSubmit={handleSaveName} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('account.modals.account_name')}</label>
                        <input 
                            type="text" 
                            required 
                            value={newNameInput}
                            onChange={(e) => setNewNameInput(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-bold" 
                        />
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setShowRenameModal(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700">
                            {t('common.cancel')}
                        </button>
                        <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20">
                            {t('common.validate')}
                        </button>
                    </div>
                </form>
            </div>
          </div>
      )}

      {/* --- MODAL: OVERDRAFT LIMIT --- */}
      {showOverdraftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('account.modals.overdraft_title')}</h3>
                    <button onClick={() => setShowOverdraftModal(false)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                </div>
                <form onSubmit={handleSaveOverdraft} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('account.modals.auth_amount')}</label>
                        <input 
                            type="number" 
                            min="0"
                            max="5000"
                            step="100"
                            required 
                            value={newOverdraftInput}
                            onChange={(e) => setNewOverdraftInput(Number(e.target.value))}
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white font-mono font-bold" 
                        />
                    </div>
                     <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl flex gap-3 border border-yellow-100 dark:border-yellow-900/30">
                        <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 shrink-0">warning</span>
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                            {t('account.modals.overdraft_warning')}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setShowOverdraftModal(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700">
                            {t('common.cancel')}
                        </button>
                        <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20">
                            {t('common.save')}
                        </button>
                    </div>
                </form>
            </div>
          </div>
      )}

      {/* --- MODAL: SETTINGS (MENU) --- */}
      {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('account.settings_modal.title')}</h3>
                    <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                </div>
                <div className="p-2">
                    <button onClick={handleOpenEditIban} className="w-full text-left flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group">
                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white group-hover:text-primary flex items-center justify-center text-slate-500 transition-colors">
                            <span className="material-symbols-outlined">edit_document</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{t('account.edit_rib')}</p>
                            <p className="text-xs text-slate-500">{t('account.settings_modal.edit_rib_desc')}</p>
                        </div>
                    </button>
                    <button onClick={handleOpenRename} className="w-full text-left flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group">
                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white group-hover:text-primary flex items-center justify-center text-slate-500 transition-colors">
                            <span className="material-symbols-outlined">edit</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{t('account.settings_modal.rename')}</p>
                            <p className="text-xs text-slate-500">{t('account.settings_modal.rename_desc')}</p>
                        </div>
                    </button>
                     <button onClick={() => { setShowSettingsModal(false); window.print(); }} className="w-full text-left flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group">
                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white group-hover:text-primary flex items-center justify-center text-slate-500 transition-colors">
                            <span className="material-symbols-outlined">download</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{t('account.settings_modal.download_rib')}</p>
                            <p className="text-xs text-slate-500">{t('account.settings_modal.download_desc')}</p>
                        </div>
                    </button>
                     <button onClick={handleOpenOverdraft} className="w-full text-left flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group">
                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-white group-hover:text-primary flex items-center justify-center text-slate-500 transition-colors">
                            <span className="material-symbols-outlined">equalizer</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{t('account.settings_modal.limits')}</p>
                            <p className="text-xs text-slate-500">{t('account.settings_modal.limits_desc')}</p>
                        </div>
                    </button>
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="w-full py-3 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
                        {t('account.settings_modal.close_account')}
                    </button>
                </div>
            </div>
          </div>
      )}

    </div>
  );
};

export default AccountDetailsPage;