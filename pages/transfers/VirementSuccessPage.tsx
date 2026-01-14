import React from 'react';
import { useNavigate } from 'react-router-dom';

const VirementSuccessPage: React.FC = () => {
  const navigate = useNavigate();

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
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-4xl">Transfert Envoyé</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400">
              Votre virement de <span className="font-bold text-slate-900 dark:text-white">1000 EUR</span> a été envoyé avec succès.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="mb-12 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-left">
            <div className="p-8">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">Résumé de l'opération</h3>
              <div className="space-y-4">
                {/* Beneficiary */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">Bénéficiaire</span>
                  <div className="flex items-center gap-3">
                    <div 
                      className="size-8 overflow-hidden rounded-full bg-center bg-cover" 
                      style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyEK5dwziE9aWcUTJas99Q_e0VxQb6tnUMc01v3dSMnl9mv7L8zb6QJExhH-z_KNag1EqDOI8wrTHCIRb4YBtZzNf-H_RJiT6PKs8EQrGA7tA916Jj6V1_eiSuvlJKzF9wplGiaHl-gwswDLUrEYaU9lbJxiTmr-7pxfETzSSQkNC8xWOTFRqlyld9rVpeWJBAnpnTAHLv0cOdjvghr7LACVdAmeD7zG909zCCpKdcprvBb1_m_ENtld54D-iltQLQj75q26tGtBg")'}}
                    ></div>
                    <span className="font-semibold text-slate-900 dark:text-white">Jean Dupont</span>
                  </div>
                </div>

                {/* Amount Debited */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">Montant débité</span>
                  <span className="font-semibold text-slate-900 dark:text-white">1 004,52 EUR</span>
                </div>

                {/* Exchange Rate */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">Taux de change</span>
                  <span className="font-semibold text-slate-900 dark:text-white">1 EUR = 1.0842 USD</span>
                </div>

                {/* Reception Date */}
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400">Réception prévue</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Demain, 14 Octobre</span>
                </div>

                {/* Reference */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Référence</span>
                  <span className="font-mono text-sm font-medium text-slate-400">#TRX-9821-4402-23</span>
                </div>
              </div>
            </div>
            
            {/* Secure Footer inside card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4">
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="text-xs font-bold uppercase tracking-wider">Transaction sécurisée par Finanzas</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button 
              onClick={() => navigate('/receipt')} 
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-white shadow-lg transition-all hover:bg-primary-hover active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">download</span>
              <span className="font-bold">Télécharger le reçu (PNG)</span>
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-8 py-4 text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-bold">Retour au tableau de bord</span>
            </button>
          </div>

          <p className="mt-8 text-sm text-slate-400">
            Un e-mail de confirmation a été envoyé à votre adresse habituelle.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-100 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        <p>© 2024 Finanzas Investment. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default VirementSuccessPage;