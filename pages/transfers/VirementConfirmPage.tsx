import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const VirementConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { performTransfer, user, t } = useApp();
  
  // Get data passed from previous screen
  const state = location.state || {};
  const amount = state.amount || 0;
  const convertedAmount = state.converted || "0.00";
  const transferType = state.transferType || 'instant';
  const fees = state.fees || (transferType === 'instant' ? 4.52 : 0.50);
  const beneficiary = state.beneficiary;
  const motif = state.motif || "Virement";
  
  // Données de devises dynamiques
  const sourceCurrency = state.sourceCurrency || 'EUR';
  const targetCurrency = state.targetCurrency || 'USD';
  const rate = state.rate || 1.0842;

  // Local State for PIN Validation
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // Redirection si pas de bénéficiaire
  if (!beneficiary) {
    navigate('/virement-beneficiary');
    return null;
  }

  const handleConfirm = () => {
    // Validation du code PIN à 4 chiffres
    if (user && pin === user.securityPin) {
        performTransfer(amount, beneficiary.name, motif, beneficiary);
        // On passe TOUTES les infos nécessaires pour le reçu
        navigate('/virement-success', { 
            state: { 
                amount, 
                converted: convertedAmount,
                beneficiary, 
                motif, 
                date: new Date().toISOString(),
                fees,
                transferType,
                sourceCurrency,
                targetCurrency,
                rate
            } 
        });
    } else {
        setError(true);
        setPin(''); // Reset pin on error
    }
  };

  return (
    <div className="flex-1 px-4 py-8 lg:px-8 xl:px-40 overflow-y-auto bg-background-light dark:bg-background-dark relative">
      <div className="mx-auto max-w-6xl">
        {/* Background Content (Dimmed & Non-interactive) */}
        <div className="opacity-40 select-none pointer-events-none" aria-hidden="true">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-2">
            <button 
                onClick={() => navigate('/virement-amount', { state: { beneficiary } })} 
                className="self-start flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-4 pointer-events-auto cursor-pointer"
            >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                {t('common.back')}
            </button>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-4xl">{t('transfers.title')}</h1>
            <p className="text-slate-500 text-lg">{t('transfers.step3_desc')}</p>
          </div>

          {/* Stepper */}
          <div className="mb-12">
            <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto">
              <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-100 dark:bg-slate-800"></div>
              
              {/* Step 1: Done */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm ring-4 ring-white dark:ring-background-dark">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <span className="absolute top-14 text-sm font-medium text-slate-500 whitespace-nowrap">{t('transfers.step1')}</span>
              </div>

              {/* Line 1-2 Filled */}
               <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-slate-200 via-primary to-primary"></div>

              {/* Step 2: Done */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm ring-4 ring-white dark:ring-background-dark">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <span className="absolute top-14 text-sm font-medium text-slate-500 whitespace-nowrap">{t('transfers.step2')}</span>
              </div>

              {/* Step 3: Active */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white dark:ring-background-dark">
                  <span className="text-sm font-bold">3</span>
                </div>
                <span className="absolute top-14 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">{t('transfers.step3')}</span>
              </div>
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Column: Summary */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t('transfers.confirm.summary')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">{t('transfers.amount.motif')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{motif}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">{t('transfers.amount.type')}</span>
                    <span className="font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
                        {transferType === 'instant' ? <span className="material-symbols-outlined text-primary text-lg">bolt</span> : <span className="material-symbols-outlined text-slate-500 text-lg">schedule</span>}
                        {transferType === 'instant' ? t('transfers.amount.instant') : t('transfers.amount.standard')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">{t('transfers.confirm.sent')}</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{amount} {sourceCurrency}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">{t('transfers.confirm.rate')}</span>
                    <span className="font-medium text-slate-900 dark:text-white">1 {sourceCurrency} = {rate.toFixed(4)} {targetCurrency}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">{t('transfers.confirm.fees')}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{fees.toFixed(2)} {sourceCurrency}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-500 font-semibold">{t('transfers.confirm.received')}</span>
                    <span className="text-2xl font-black text-primary">{convertedAmount} {targetCurrency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Beneficiary Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  {beneficiary.img ? (
                    <div className="size-12 overflow-hidden rounded-full border border-slate-100 dark:border-slate-700 bg-center bg-cover" style={{backgroundImage: `url("${beneficiary.img}")`}}></div>
                  ) : (
                    <div className="size-12 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-800 text-white font-bold text-xl">
                        {beneficiary.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{beneficiary.name}</p>
                    <p className="text-sm text-slate-500">{beneficiary.bankName}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">calendar_today</span>
                  <div>
                    <p className="text-xs text-slate-500">{t('transfers.amount.arrival')}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {transferType === 'instant' ? t('transfers.amount.today') : t('transfers.amount.tomorrow')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer Placeholder for background */}
          <div className="mt-auto py-8 flex justify-center">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 px-6 py-3 border border-dashed border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-slate-400">headset_mic</span>
              <span className="text-sm text-slate-500">{t('transfers.help')} <a className="font-medium text-slate-900 dark:text-white hover:underline" href="#">{t('transfers.contact')}</a></span>
            </div>
          </div>
        </div>

        {/* Modal Overlay - PIN VALIDATION (4 Chiffres) */}
        <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-[fadeIn_0.2s_ease-out]">
            <div className="p-8 text-center">
              <div className="mx-auto size-16 bg-red-50 dark:bg-red-900/20 text-primary rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">dialpad</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('transfers.confirm.pin_title')}</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                {t('transfers.confirm.pin_desc')}
              </p>
              
              <div className="space-y-6">
                <div className="relative">
                    <input 
                      type="password"
                      maxLength={4}
                      placeholder="----"
                      value={pin}
                      onChange={(e) => {
                          setError(false);
                          setPin(e.target.value.replace(/\D/g, ''));
                      }}
                      className={`w-full text-center text-4xl tracking-[0.5em] font-black rounded-xl border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    />
                    {error && (
                        <p className="absolute -bottom-6 left-0 right-0 text-center text-xs font-bold text-red-500 animate-pulse">{t('transfers.confirm.pin_error')}</p>
                    )}
                </div>

                <button 
                  onClick={handleConfirm}
                  disabled={pin.length !== 4}
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('transfers.confirm.btn_confirm')}
                </button>
              </div>
              
              <button 
                onClick={() => navigate('/virement-amount', { state: { beneficiary } })}
                className="mt-8 text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline"
              >
                {t('common.cancel')}
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm text-slate-400">lock</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t('transfers.confirm.secure_validation')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VirementConfirmPage;