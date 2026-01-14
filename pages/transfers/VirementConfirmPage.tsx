import React from 'react';
import { useNavigate } from 'react-router-dom';

const VirementConfirmPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 px-4 py-8 lg:px-8 xl:px-40 overflow-y-auto bg-background-light dark:bg-background-dark relative">
      <div className="mx-auto max-w-6xl">
        {/* Background Content (Dimmed & Non-interactive) */}
        <div className="opacity-40 select-none pointer-events-none" aria-hidden="true">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-4xl">Virement : Sécurité et Confirmation</h1>
            <p className="text-slate-500 text-lg">Vérifiez les détails avant de confirmer l'opération.</p>
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
                <span className="absolute top-14 text-sm font-medium text-slate-500 whitespace-nowrap">Bénéficiaire</span>
              </div>

              {/* Line 1-2 Filled */}
               <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-slate-200 via-primary to-primary"></div>

              {/* Step 2: Done */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm ring-4 ring-white dark:ring-background-dark">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <span className="absolute top-14 text-sm font-medium text-slate-500 whitespace-nowrap">Montant et Devises</span>
              </div>

              {/* Step 3: Active */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white dark:ring-background-dark">
                  <span className="text-sm font-bold">3</span>
                </div>
                <span className="absolute top-14 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">Sécurité</span>
              </div>
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Column: Summary */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Récapitulatif du virement</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Montant envoyé</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">1 000,00 EUR</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Taux de change</span>
                    <span className="font-medium text-slate-900 dark:text-white">1 EUR = 1.0842 USD</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Frais de service</span>
                    <span className="font-medium text-slate-900 dark:text-white">4,52 EUR</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-500 font-semibold">Le bénéficiaire reçoit</span>
                    <span className="text-2xl font-black text-primary">1 079,30 USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Beneficiary Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="size-12 overflow-hidden rounded-full border border-slate-100 dark:border-slate-700 bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyEK5dwziE9aWcUTJas99Q_e0VxQb6tnUMc01v3dSMnl9mv7L8zb6QJExhH-z_KNag1EqDOI8wrTHCIRb4YBtZzNf-H_RJiT6PKs8EQrGA7tA916Jj6V1_eiSuvlJKzF9wplGiaHl-gwswDLUrEYaU9lbJxiTmr-7pxfETzSSQkNC8xWOTFRqlyld9rVpeWJBAnpnTAHLv0cOdjvghr7LACVdAmeD7zG909zCCpKdcprvBb1_m_ENtld54D-iltQLQj75q26tGtBg")'}}></div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Jean Dupont</p>
                    <p className="text-sm text-slate-500">Compte Personnel • USA</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">calendar_today</span>
                  <div>
                    <p className="text-xs text-slate-500">Arrivée estimée</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Demain, le 14 Octobre</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer Placeholder for background */}
          <div className="mt-auto py-8 flex justify-center">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 px-6 py-3 border border-dashed border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-slate-400">headset_mic</span>
              <span className="text-sm text-slate-500">Besoin d'aide ? <a className="font-medium text-slate-900 dark:text-white hover:underline" href="#">Contacter le support</a></span>
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="p-8 text-center">
              <div className="mx-auto size-16 bg-red-50 dark:bg-red-900/20 text-primary rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Authentification Forte</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Pour valider votre virement de <span className="font-bold text-slate-900 dark:text-white">1 000,00 EUR</span>, une confirmation est requise.
              </p>
              
              <div className="space-y-4">
                {/* Option 1: App Mobile */}
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-primary bg-red-50/30 dark:bg-red-900/10 text-left transition-all hover:bg-red-50 dark:hover:bg-red-900/20 group">
                  <div className="size-10 flex items-center justify-center rounded-xl bg-primary text-white">
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white">Application mobile</p>
                    <p className="text-xs text-slate-500">Valider via une notification push</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">chevron_right</span>
                </button>

                {/* Option 2: SMS Code (Expanded) */}
                <div className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined">sms</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 dark:text-white">Saisir le code SMS</p>
                      <p className="text-xs text-slate-500">Envoyé au +33 6 •• •• •• 21</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-between mb-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input 
                        key={i}
                        className="size-10 sm:size-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center text-xl font-bold focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
                        maxLength={1}
                        placeholder="-"
                        type="text"
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate('/virement-success')}
                    className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-md active:scale-[0.98]"
                  >
                    Confirmer le virement
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/virement-amount')}
                className="mt-8 text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline"
              >
                Annuler la transaction
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm text-slate-400">lock</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Paiement 100% Sécurisé</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VirementConfirmPage;