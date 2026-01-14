import React from 'react';

const StatementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101822] font-display text-slate-800 dark:text-slate-200">
      {/* Header */}
      <header className="no-print bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#D92D20] text-3xl">account_balance</span>
            <span className="font-bold text-xl tracking-tight uppercase text-[#1D2939] dark:text-white">
              Finanzas <span className="text-[#D92D20]">Investment</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#D92D20] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              onClick={() => window.print()}
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Exporter en PDF
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
              onClick={() => window.print()}
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Imprimer
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-8 px-6 print:py-0 print:px-0">
        <div className="bg-white dark:bg-slate-900 shadow-xl print:shadow-none border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden print-container">
          {/* Header Section */}
          <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase mb-1">Relevé de Compte</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Période : Octobre 2023</p>
              <p className="text-sm text-slate-400 mt-4 uppercase tracking-widest font-semibold">Référence : FIN-2023-10-4492</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="material-symbols-outlined text-[#D92D20]">verified</span>
                <span className="font-bold text-lg text-[#1D2939] dark:text-white">FINANZAS</span>
              </div>
              <address className="not-italic text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                128 Rue de la Boétie<br />
                75008 Paris, France<br />
                contact@finanzas-inv.com<br />
                N° Agrément : 8849-FIN
              </address>
            </div>
          </div>

          {/* Account Info */}
          <div className="grid grid-cols-2 gap-12 p-10 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Titulaire du compte</h3>
              <div className="space-y-1">
                <p className="font-bold text-lg text-slate-900 dark:text-white">Jean-Baptiste Laurent</p>
                <p className="text-slate-600 dark:text-slate-400">14 Avenue des Champs-Élysées</p>
                <p className="text-slate-600 dark:text-slate-400">75008 Paris, France</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Informations de compte</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Compte :</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">FR76 3000 6000 0123 4567 8901 234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Type :</span>
                  <span className="font-medium text-slate-900 dark:text-white">Investissement Premium (EUR)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Date d'émission :</span>
                  <span className="font-medium text-slate-900 dark:text-white">02 Nov 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="p-10">
            <div className="grid grid-cols-4 gap-6">
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Solde Initial (01/10)</p>
                <p className="text-xl font-bold tabular-nums text-[#1D2939] dark:text-white">42 150,00 €</p>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Total Crédits (+)</p>
                <p className="text-xl font-bold text-[#1D2939] dark:text-slate-300 tabular-nums">+ 5 280,45 €</p>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-[#D92D20] uppercase mb-2">Total Débits (-)</p>
                <p className="text-xl font-bold text-[#D92D20] tabular-nums">- 2 115,20 €</p>
              </div>
              <div className="p-4 rounded-lg bg-[#D92D20] text-white shadow-lg shadow-[#D92D20]/20">
                <p className="text-xs font-bold opacity-90 uppercase mb-2">Nouveau Solde (31/10)</p>
                <p className="text-xl font-bold tabular-nums">45 315,25 €</p>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="px-10 pb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Date</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Libellé de l'opération</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Valeur</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right w-40">Montant (EUR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                    <td className="py-4 text-sm tabular-nums text-slate-600 dark:text-slate-400">03/10/2023</td>
                    <td className="py-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Virement Entrant - Salaire</p>
                    <p className="text-xs text-slate-400">Ref: TECH CORP SA - OCT 23</p>
                    </td>
                    <td className="py-4 text-sm tabular-nums text-slate-500">03/10/2023</td>
                    <td className="py-4 text-right font-medium tabular-nums text-[#1D2939] dark:text-slate-300">+ 3 850,00</td>
                </tr>
                <tr>
                    <td className="py-4 text-sm tabular-nums text-slate-600 dark:text-slate-400">05/10/2023</td>
                    <td className="py-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Achat CB Apple Store Paris</p>
                    <p className="text-xs text-slate-400">Carte **** 8842 - Équipement</p>
                    </td>
                    <td className="py-4 text-sm tabular-nums text-slate-500">06/10/2023</td>
                    <td className="py-4 text-right font-medium tabular-nums text-[#D92D20]">- 1 299,00</td>
                </tr>
                <tr>
                    <td className="py-4 text-sm tabular-nums text-slate-600 dark:text-slate-400">12/10/2023</td>
                    <td className="py-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Dividendes - Air Liquide</p>
                    <p className="text-xs text-slate-400">Coupon Portefeuille #PRM-01</p>
                    </td>
                    <td className="py-4 text-sm tabular-nums text-slate-500">12/10/2023</td>
                    <td className="py-4 text-right font-medium tabular-nums text-[#1D2939] dark:text-slate-300">+ 1 430,45</td>
                </tr>
                <tr>
                    <td className="py-4 text-sm tabular-nums text-slate-600 dark:text-slate-400">15/10/2023</td>
                    <td className="py-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Prélèvement Total Energies</p>
                    <p className="text-xs text-slate-400">Mandat SEPA: FR99221144</p>
                    </td>
                    <td className="py-4 text-sm tabular-nums text-slate-500">15/10/2023</td>
                    <td className="py-4 text-right font-medium tabular-nums text-[#D92D20]">- 215,50</td>
                </tr>
                <tr>
                    <td className="py-4 text-sm tabular-nums text-slate-600 dark:text-slate-400">22/10/2023</td>
                    <td className="py-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Frais de Gestion Trimestriels</p>
                    <p className="text-xs text-slate-400">Services Premium Investment</p>
                    </td>
                    <td className="py-4 text-sm tabular-nums text-slate-500">22/10/2023</td>
                    <td className="py-4 text-right font-medium tabular-nums text-[#D92D20]">- 450,70</td>
                </tr>
                <tr>
                    <td className="py-4 text-sm tabular-nums text-slate-600 dark:text-slate-400">28/10/2023</td>
                    <td className="py-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Abonnement Bloomberg Pro</p>
                    <p className="text-xs text-slate-400">Paiement CB en devises (USD)</p>
                    </td>
                    <td className="py-4 text-sm tabular-nums text-slate-500">30/10/2023</td>
                    <td className="py-4 text-right font-medium tabular-nums text-[#D92D20]">- 150,00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="p-10 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-8 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              <div>
                <p className="font-bold uppercase mb-1">Information Légale</p>
                <p>Le présent relevé est établi sous réserve des opérations en cours de traitement. En cas de désaccord sur les opérations figurant sur ce relevé, vous disposez d'un délai de 30 jours pour nous faire part de vos observations par courrier recommandé.</p>
              </div>
              <div>
                <p className="font-bold uppercase mb-1">Standard d'Exportation</p>
                <p>Ce document est un relevé de compte officiel généré au format d'exportation standard (ISO-20022 compliant). Les montants sont exprimés en Euros (EUR). Document authentifié par signature électronique Finanzas Investment.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest">
              <p>Finanzas Investment SAS au capital de 1 500 000 € • RCS Paris B 456 789 012</p>
              <p>Page 1 sur 1</p>
            </div>
          </div>
        </div>

        <p className="no-print text-center text-slate-400 text-sm mt-8 pb-12">
          Besoin d'aide pour lire votre relevé ? <a className="text-[#D92D20] hover:underline" href="#">Consultez notre guide</a>
        </p>
      </main>

      <button 
        className="no-print fixed bottom-6 right-6 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 transition-transform"
        onClick={() => document.documentElement.classList.toggle('dark')}
      >
        <span className="material-symbols-outlined">dark_mode</span>
      </button>
    </div>
  );
};

export default StatementPage;