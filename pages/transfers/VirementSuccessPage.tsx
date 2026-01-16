import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const VirementSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useApp();
  const state = location.state || {};
  const amount = state.amount || 0;
  const beneficiary = state.beneficiary || { name: 'Bénéficiaire', iban: '---' }; 
  const motif = state.motif || "Virement";
  
  // Infos devises
  const sourceCurrency = state.sourceCurrency || 'EUR';
  const targetCurrency = state.targetCurrency || 'USD';
  const rate = state.rate || 1;

  // On récupère aussi les autres données pour le reçu si disponibles
  const fullReceiptState = {
    amount,
    beneficiary,
    motif,
    date: state.date,
    fees: state.fees,
    transferType: state.transferType,
    sourceCurrency,
    targetCurrency,
    rate
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-2xl text-center">
          
          {/* Success Icon */}
          <div className="mb-12">
            <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-50/50 dark:ring-emerald-900/10">
              <span className="material-symbols-outlined text-5xl font-bold">check_circle</span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-10 space-y-4">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-4xl">{t('transfers.success.title')}</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400">
              {t('transfers.success.msg')}
            </p>
          </div>

          {/* Receipt Card */}
          <div className="mb-12 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-left">
            <div className="p-8">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">{t('transfers.confirm.summary')}</h3>
              <div className="space-y-4">
                {/* Beneficiary */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">{t('transfers.step1')}</span>
                  <div className="flex items-center gap-3">
                    {beneficiary.img ? (
                       <div 
                        className="size-8 overflow-hidden rounded-full bg-center bg-cover" 
                        style={{backgroundImage: `url("${beneficiary.img}")`}}
                      ></div>
                    ) : (
                      <div className="size-8 flex items-center justify-center rounded-full bg-slate-800 text-white font-bold">
                          {beneficiary.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="font-semibold text-slate-900 dark:text-white">{beneficiary.name}</span>
                  </div>
                </div>

                {/* Amount Debited */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">{t('transfers.confirm.sent')}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{amount} {sourceCurrency}</span>
                </div>

                {/* Motif */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">{t('transfers.amount.motif')}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{motif}</span>
                </div>

                {/* Exchange Rate */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">{t('transfers.confirm.rate')}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">1 {sourceCurrency} = {rate.toFixed(4)} {targetCurrency}</span>
                </div>

                {/* Reception Date */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">{t('transfers.amount.arrival')}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{t('transfers.amount.tomorrow')}</span>
                </div>

                {/* Reference */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{t('common.reference')}</span>
                  <span className="font-mono text-sm font-medium text-slate-400">#TRX-{Math.floor(Math.random() * 10000)}</span>
                </div>
              </div>
            </div>
            
            {/* Secure Footer inside card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4">
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="text-xs font-bold uppercase tracking-wider">{t('receipt.guarantee')}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button 
              onClick={() => navigate('/receipt', { state: fullReceiptState })}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-white shadow-lg transition-all hover:bg-primary-hover active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">download</span>
              <span className="font-bold">{t('transfers.success.download_receipt')}</span>
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-8 py-4 text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-bold">{t('transfers.success.back_dashboard')}</span>
            </button>
          </div>

          <p className="mt-8 text-sm text-slate-400">
            {t('transfers.success.email_sent')}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-100 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        <p>{t('receipt.footer')}</p>
      </footer>
    </div>
  );
};

export default VirementSuccessPage;