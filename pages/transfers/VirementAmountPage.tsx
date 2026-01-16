import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp, CURRENCIES } from '../../context/AppContext';

const VirementAmountPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, t, language, currency: globalCurrency } = useApp();
  
  // Récupération du bénéficiaire passé depuis la page précédente
  const beneficiary = location.state?.beneficiary;

  // Si pas de bénéficiaire (accès direct à l'url), redirection
  useEffect(() => {
    if (!beneficiary) {
      navigate('/virement-beneficiary');
    }
  }, [beneficiary, navigate]);

  // --- ETAT DES DEVISES ---
  // Par défaut, on envoie depuis la devise globale de l'app, vers l'USD (ou EUR si déjà USD)
  const [sourceCurrency, setSourceCurrency] = useState(globalCurrency || 'EUR');
  const [targetCurrency, setTargetCurrency] = useState(globalCurrency === 'USD' ? 'EUR' : 'USD');

  const [amount, setAmount] = useState(1000);
  const [transferType, setTransferType] = useState<'standard' | 'instant'>('instant');
  
  // Calcul dynamique des taux
  const sourceConfig = CURRENCIES.find(c => c.code === sourceCurrency) || CURRENCIES[0];
  const targetConfig = CURRENCIES.find(c => c.code === targetCurrency) || CURRENCIES[1];
  
  // Taux croisé : (1 EUR -> Target) / (1 EUR -> Source)
  const exchangeRate = targetConfig.rate / sourceConfig.rate;

  // Initialisation et mise à jour du motif selon la langue
  const motifs = [
    t('transactions.table.category') + ": " + t('dashboard.chart.food'),
    t('transactions.table.category') + ": " + t('dashboard.chart.leisure'),
    t('transactions.table.category') + ": " + t('dashboard.chart.housing'),
    t('dashboard.send_money'),
    "Remboursement",
    "Cadeau"
  ];
  
  const [motif, setMotif] = useState(motifs[0]);

  // Update motif list when language changes
  useEffect(() => {
      setMotif(motifs[0]);
  }, [language]);

  const [error, setError] = useState<string | null>(null);
  
  // Frais fixes (simplification : on garde la valeur nominale, ex: 4.52 unités de la devise source)
  const fees = transferType === 'instant' ? 4.52 : 0.50; 
  
  // Montant converti
  const netAmount = amount - fees;
  const convertedAmount = netAmount > 0 ? netAmount * exchangeRate : 0;

  const validate = (val: number) => {
    if (!user) return "Erreur de chargement utilisateur";
    if (val <= 0) return "Le montant doit être supérieur à 0";
    if (val <= fees) return `Le montant doit couvrir les frais de ${fees.toFixed(2)} ${sourceCurrency}`;
    // Vérification basique du solde (en supposant que user.accounts.checking est dans la devise de base EUR, conversion nécessaire pour être précis, mais on simplifie pour l'UX ici)
    return null;
  };

  useEffect(() => {
    setError(validate(amount));
  }, [amount, transferType, user, sourceCurrency]);

  const handleNext = () => {
    const validationError = validate(amount);
    if (validationError) {
        setError(validationError);
        return;
    }
    
    navigate('/virement-confirm', { 
      state: { 
        amount: amount, 
        converted: convertedAmount.toFixed(2),
        transferType: transferType,
        fees: fees,
        beneficiary: beneficiary,
        motif: motif,
        sourceCurrency, // On passe la devise choisie
        targetCurrency, // On passe la devise cible
        rate: exchangeRate // On passe le taux calculé
      } 
    });
  };

  if (!beneficiary) return null;

  return (
    <div className="flex-1 px-4 py-8 lg:px-8 xl:px-40 overflow-y-auto bg-background-light dark:bg-background-dark pb-24 md:pb-8">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8 md:mb-10 flex flex-col gap-2">
          <button 
              onClick={() => navigate('/virement-beneficiary')} 
              className="self-start flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-4"
          >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              {t('common.back')}
          </button>
          <h1 className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-4xl">{t('transfers.title')}</h1>
          <p className="text-slate-500 text-sm md:text-lg">{t('transfers.step2_desc')}</p>
        </div>

        {/* Stepper */}
        <div className="mb-12 md:mb-16">
          <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto px-2">
            <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-100 dark:bg-slate-800"></div>
            <div className="absolute left-0 top-1/2 h-0.5 w-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-200 to-primary"></div>

            {/* Step 1: Completed */}
            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
              <div className="flex size-8 md:size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm ring-4 ring-white dark:ring-background-dark">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </div>
              <span className="absolute top-10 md:top-14 text-[10px] md:text-sm font-medium text-slate-500 whitespace-nowrap">{t('transfers.step1')}</span>
            </div>

            {/* Step 2: Active */}
            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
              <div className="flex size-8 md:size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white dark:ring-background-dark">
                <span className="text-xs md:text-sm font-bold">2</span>
              </div>
              <span className="absolute top-10 md:top-14 text-[10px] md:text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">{t('transfers.step2')}</span>
            </div>

            {/* Step 3: Pending */}
            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
              <div className="flex size-8 md:size-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400 ring-4 ring-white dark:ring-background-dark">
                <span className="text-xs md:text-sm font-bold">3</span>
              </div>
              <span className="absolute top-10 md:top-14 text-[10px] md:text-sm font-medium text-slate-400 whitespace-nowrap">{t('transfers.step3')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
          {/* Left Column: Conversion Form */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div className={`rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border ${error ? 'border-red-300 dark:border-red-900/50' : 'border-slate-100 dark:border-slate-800'} transition-colors`}>
              
              {/* Source Amount & Currency */}
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-slate-500">
                    {t('transfers.amount.source')}
                </label>
                <div className={`flex items-center rounded-xl bg-slate-50 dark:bg-slate-800 border ${error ? 'border-red-300 focus-within:border-[#D92D20] focus-within:ring-[#D92D20]' : 'border-slate-200 dark:border-slate-700 focus-within:border-primary focus-within:ring-primary'} transition-all p-1 focus-within:ring-1`}>
                  <input 
                    className="w-full bg-transparent border-none px-4 py-4 text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-300 focus:ring-0" 
                    placeholder="0.00" 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  
                  {/* Source Currency Selector */}
                  <div className="relative flex items-center gap-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-2 mr-1 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600 shadow-sm transition-colors min-w-[110px]">
                    <span className="text-xl">{sourceConfig.flag}</span>
                    <select 
                        value={sourceCurrency}
                        onChange={(e) => setSourceCurrency(e.target.value)}
                        className="appearance-none bg-transparent border-none text-slate-900 dark:text-white font-bold text-sm focus:ring-0 pr-6 w-full cursor-pointer"
                    >
                        {CURRENCIES.map(c => (
                            <option key={c.code} value={c.code} className="text-black">{c.code}</option>
                        ))}
                    </select>
                    <span className="material-symbols-outlined text-slate-400 absolute right-2 pointer-events-none">expand_more</span>
                  </div>
                </div>
                {error && (
                    <div className="flex items-center gap-2 mt-2 text-[#D92D20] text-sm font-medium animate-pulse">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        {error}
                    </div>
                )}
              </div>

              {/* Motif Selection */}
              <div className="relative mt-4">
                  <label className="mb-2 block text-sm font-medium text-slate-500">{t('transfers.amount.motif')}</label>
                  <div className="relative">
                      <select 
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3.5 pr-10 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white appearance-none cursor-pointer truncate"
                      >
                          {motifs.map((m) => (
                              <option key={m} value={m}>{m}</option>
                          ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                          <span className="material-symbols-outlined">expand_more</span>
                      </div>
                  </div>
              </div>

              {/* Conversion Details (Vertical Line) */}
              <div className="relative pl-8 my-4 py-2">
                <div className="absolute left-[1.6rem] top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
                <div className="flex flex-col gap-4">
                  {/* Fee */}
                  <div className="flex items-center justify-between group">
                    <div className="absolute left-[1.35rem] size-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{fees.toFixed(2)} {sourceCurrency}</span>
                      <span className="text-sm text-slate-400">{t('transfers.amount.fees')}</span>
                    </div>
                  </div>
                  {/* Converted Amount */}
                  <div className="flex items-center justify-between">
                    <div className="absolute left-[1.35rem] size-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">drag_handle</span>
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {netAmount > 0 ? netAmount.toFixed(2) : '0.00'} {sourceCurrency}
                      </span>
                      <span className="text-sm text-slate-400">{t('transfers.amount.net')}</span>
                    </div>
                  </div>
                  {/* Rate */}
                  <div className="flex items-center justify-between">
                    <div className="absolute left-[1.35rem] size-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{exchangeRate.toFixed(4)}</span>
                      <span className="text-xs text-slate-500">{t('transfers.amount.rate')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination Amount & Currency */}
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-slate-500">{t('transfers.amount.dest')}</label>
                <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all p-1">
                  <input 
                    className="w-full bg-transparent border-none px-4 py-4 text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-300 focus:ring-0" 
                    readOnly 
                    type="number" 
                    value={convertedAmount > 0 ? convertedAmount.toFixed(2) : 0}
                  />
                  
                  {/* Target Currency Selector */}
                  <div className="relative flex items-center gap-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-2 mr-1 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600 shadow-sm transition-colors min-w-[110px]">
                    <span className="text-xl">{targetConfig.flag}</span>
                    <select 
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        className="appearance-none bg-transparent border-none text-slate-900 dark:text-white font-bold text-sm focus:ring-0 pr-6 w-full cursor-pointer"
                    >
                        {CURRENCIES.map(c => (
                            <option key={c.code} value={c.code} className="text-black">{c.code}</option>
                        ))}
                    </select>
                    <span className="material-symbols-outlined text-slate-400 absolute right-2 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Type Selection */}
            <div>
               <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 px-1">{t('transfers.amount.type')}</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setTransferType('instant')}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-all group ${transferType === 'instant' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}
                  >
                     <div className="flex justify-between items-start mb-2">
                        <div className={`size-10 rounded-full flex items-center justify-center ${transferType === 'instant' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                           <span className="material-symbols-outlined">bolt</span>
                        </div>
                        {transferType === 'instant' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                     </div>
                     <p className={`font-bold ${transferType === 'instant' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{t('transfers.amount.instant')}</p>
                     <p className="text-xs text-slate-500 mt-1 mb-3">Arrivée en quelques secondes.</p>
                     <p className="text-xs font-bold text-slate-900 dark:text-white">{t('transfers.amount.fees')} : 4.52 {sourceCurrency}</p>
                  </button>

                  <button 
                    onClick={() => setTransferType('standard')}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-all group ${transferType === 'standard' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}
                  >
                     <div className="flex justify-between items-start mb-2">
                        <div className={`size-10 rounded-full flex items-center justify-center ${transferType === 'standard' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                           <span className="material-symbols-outlined">schedule</span>
                        </div>
                        {transferType === 'standard' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                     </div>
                     <p className={`font-bold ${transferType === 'standard' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{t('transfers.amount.standard')}</p>
                     <p className="text-xs text-slate-500 mt-1 mb-3">Arrivée sous 24-48h.</p>
                     <p className="text-xs font-bold text-slate-900 dark:text-white">{t('transfers.amount.fees')} : 0.50 {sourceCurrency}</p>
                  </button>
               </div>
            </div>

            {/* Arrival & Submit */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800 p-3 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">calendar_today</span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">{t('transfers.amount.arrival')}</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                         {transferType === 'instant' ? t('transfers.amount.today') : t('transfers.amount.tomorrow')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main CTA */}
                <button 
                  onClick={handleNext}
                  disabled={!!error}
                  className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-4 text-white shadow-lg transition-all active:scale-[0.98] ${error ? 'bg-slate-400 cursor-not-allowed opacity-70' : 'bg-primary hover:bg-primary-hover'}`}
                >
                  <span className="text-lg font-bold">{t('transfers.amount.validate')}</span>
                  {!error && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>}
                  {error && <span className="material-symbols-outlined">block</span>}
                </button>
              </div>
          </div>

          {/* Right Column: Beneficiary & Security (Order 1 on mobile) */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-1 lg:order-2">
            
            {/* Beneficiary Card */}
            <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('transfers.step1')}</h3>
                <button 
                  onClick={() => navigate('/virement-beneficiary')}
                  className="text-xs font-semibold text-primary hover:text-red-700"
                >
                  {t('common.edit')}
                </button>
              </div>
              <div className="flex items-start gap-4">
                {beneficiary.img ? (
                    <div className="size-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-slate-100 dark:border-slate-700 bg-slate-100 bg-center bg-cover" style={{backgroundImage: `url("${beneficiary.img}")`}}></div>
                ) : (
                    <div className="size-14 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <span className="material-symbols-outlined text-3xl">person</span>
                    </div>
                )}
                
                <div className="flex flex-col gap-1 overflow-hidden">
                  <p className="text-lg font-bold text-slate-900 dark:text-white truncate">{beneficiary.name}</p>
                  <p className="text-sm text-slate-500 truncate">{beneficiary.bankName || 'Banque Externe'}</p>
                  <div className="mt-1 flex items-center gap-1.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-1 self-start">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">lock</span>
                    <p className="font-mono text-xs text-slate-600 dark:text-slate-300 font-medium truncate max-w-[150px]">{beneficiary.iban}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Check Card (Hidden on very small screens to save space if needed) */}
            <div className="hidden sm:block rounded-2xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-700/50 p-6">
              <div className="flex gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                  <span className="material-symbols-outlined">shield_lock</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-yellow-800 dark:text-yellow-400">{t('transfers.amount.security_check')}</h3>
                  <p className="text-sm leading-relaxed text-yellow-700 dark:text-yellow-200/80">
                    {t('transfers.amount.security_desc')}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VirementAmountPage;