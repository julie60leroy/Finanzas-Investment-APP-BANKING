import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const StatementPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, transactions } = useApp();

  // --- Gestion des Dates ---
  const now = new Date();
  const currentMonth = now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const emissionDate = now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  const statementRef = `FIN-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  // --- Calculs Financiers Dynamiques ---
  const statementTransactions = transactions;

  // Total des entrées (+)
  const totalCredits = statementTransactions
    .filter(t => t.amt > 0)
    .reduce((acc, t) => acc + t.amt, 0);

  // Total des sorties (-)
  const totalDebits = statementTransactions
    .filter(t => t.amt < 0)
    .reduce((acc, t) => acc + t.amt, 0);

  const finalBalance = user?.accounts.checking || 0;
  const initialBalance = finalBalance - totalCredits - totalDebits;

  // Données dynamiques
  const accountName = user?.checkingAccountName || "Compte Courant";

  // Formatage Monétaire
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);

  // Helper pour formater la date du relevé (date absolue requise pour un relevé officiel)
  const formatStatementDate = (iso: string) => {
      const d = new Date(iso);
      return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + d.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101822] font-display text-slate-800 dark:text-slate-200">
      
      {/* Styles d'impression spécifiques */}
      <style>{`
        @media print {
          @page { margin: 20px; }
          body { background-color: white !important; -webkit-print-color-adjust: exact; }
          .print-container { 
            box-shadow: none !important; 
            border: none !important; 
            overflow: visible !important;
          }
          /* Empêche de couper les lignes de tableau en deux */
          tr { page-break-inside: avoid; }
          /* Répète l'en-tête du tableau sur chaque page */
          thead { display: table-header-group; }
          tfoot { display: table-footer-group; }
          /* Masque les éléments non imprimables */
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="no-print bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                title="Retour"
            >
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="hidden sm:inline font-medium">Retour</span>
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#D92D20] text-3xl">account_balance</span>
                <span className="font-bold text-xl tracking-tight uppercase text-[#1D2939] dark:text-white hidden sm:inline">
                Finanzas <span className="text-[#D92D20]">Investment</span>
                </span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#D92D20] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              onClick={() => window.print()}
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span className="hidden sm:inline">Exporter en PDF</span>
            </button>
            <button
              className="flex items-center gap-2 px-3 md:px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
              onClick={() => window.print()}
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span className="hidden sm:inline">Imprimer</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-4 md:py-8 px-4 md:px-6 print:py-0 print:px-0">
        <div className="bg-white dark:bg-slate-900 shadow-xl print:shadow-none border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden print-container">
          {/* Header Section */}
          <div className="p-6 md:p-10 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white uppercase mb-1">Relevé de Compte</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium capitalize">Période : {currentMonth}</p>
              <p className="text-sm text-slate-400 mt-2 md:mt-4 uppercase tracking-widest font-semibold">Référence : {statementRef}</p>
            </div>
            <div className="text-left md:text-right">
              <div className="flex items-center md:justify-end gap-2 mb-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-10 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Titulaire du compte</h3>
              <div className="space-y-1">
                <p className="font-bold text-lg text-slate-900 dark:text-white">{user?.name || 'Client Finanzas'}</p>
                <p className="text-slate-600 dark:text-slate-400">14 Avenue des Champs-Élysées</p>
                <p className="text-slate-600 dark:text-slate-400">75008 Paris, France</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Informations de compte</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Compte :</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">{user?.checkingIban || 'FR76 3000 6000 0123 4567 8901 234'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Intitulé :</span>
                  <span className="font-medium text-slate-900 dark:text-white">{accountName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Date d'émission :</span>
                  <span className="font-medium text-slate-900 dark:text-white">{emissionDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="p-6 md:p-10 break-inside-avoid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Solde Initial</p>
                <p className="text-xl font-bold tabular-nums text-[#1D2939] dark:text-white">{formatMoney(initialBalance)}</p>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Total Crédits (+)</p>
                <p className="text-xl font-bold text-[#1D2939] dark:text-slate-300 tabular-nums text-emerald-600">
                  + {formatMoney(totalCredits)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-[#D92D20] uppercase mb-2">Total Débits (-)</p>
                <p className="text-xl font-bold text-[#D92D20] tabular-nums">
                   {formatMoney(totalDebits)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#D92D20] text-white shadow-lg shadow-[#D92D20]/20">
                <p className="text-xs font-bold opacity-90 uppercase mb-2">Solde Actuel ({new Date().getDate().toString().padStart(2, '0')}/{ (new Date().getMonth() + 1).toString().padStart(2, '0') })</p>
                <p className="text-xl font-bold tabular-nums">{formatMoney(finalBalance)}</p>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="px-6 md:px-10 pb-12">
            
            {/* Desktop Table */}
            <table className="hidden md:table w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Date</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Libellé de l'opération</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-32">Type</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right w-40">Montant (EUR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {statementTransactions.map((tx) => (
                    <tr key={tx.id}>
                        <td className="py-4 text-sm tabular-nums text-slate-600 dark:text-slate-400 align-top">{formatStatementDate(tx.date)}</td>
                        <td className="py-4 align-top">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{tx.name}</p>
                        <p className="text-xs text-slate-400">{tx.cat} - ID: {tx.id}</p>
                        </td>
                        <td className="py-4 text-sm tabular-nums text-slate-500 align-top">{tx.amt > 0 ? 'Crédit' : 'Débit'}</td>
                        <td className={`py-4 text-right font-medium tabular-nums align-top ${tx.amt > 0 ? 'text-[#1D2939] dark:text-slate-300' : 'text-[#D92D20]'}`}>
                            {tx.amt > 0 ? '+' : ''} {formatMoney(tx.amt)}
                        </td>
                    </tr>
                ))}
                
                {statementTransactions.length === 0 && (
                    <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 italic">Aucune transaction enregistrée pour cette période.</td>
                    </tr>
                )}
              </tbody>
            </table>

            {/* Mobile List View */}
            <div className="md:hidden flex flex-col gap-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Détail des opérations</h3>
                {statementTransactions.map((tx) => (
                    <div key={tx.id} className="flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                            <span className="text-xs text-slate-500 font-medium">{formatStatementDate(tx.date)}</span>
                            <span className={`text-base font-bold tabular-nums ${tx.amt > 0 ? 'text-[#1D2939] dark:text-slate-300' : 'text-[#D92D20]'}`}>
                                {tx.amt > 0 ? '+' : ''} {formatMoney(tx.amt)}
                            </span>
                        </div>
                        <div className="flex justify-between items-end gap-4">
                             <div className="flex-1">
                                 <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1">{tx.name}</p>
                                 <p className="text-xs text-slate-400 font-medium">{tx.cat}</p>
                                 <p className="text-[10px] text-slate-300 dark:text-slate-600 font-mono mt-1">REF: {tx.id}</p>
                             </div>
                             <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                {tx.amt > 0 ? 'Crédit' : 'Débit'}
                             </span>
                        </div>
                    </div>
                ))}
                 {statementTransactions.length === 0 && (
                    <div className="py-8 text-center text-slate-400 italic bg-slate-50 dark:bg-slate-800 rounded-lg">
                        Aucune transaction enregistrée.
                    </div>
                )}
            </div>

          </div>

          {/* Footer Info */}
          <div className="p-6 md:p-10 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 page-footer">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              <div>
                <p className="font-bold uppercase mb-1">Information Légale</p>
                <p>Le présent relevé est établi sous réserve des opérations en cours de traitement. En cas de désaccord sur les opérations figurant sur ce relevé, vous disposez d'un délai de 30 jours pour nous faire part de vos observations par courrier recommandé.</p>
              </div>
              <div>
                <p className="font-bold uppercase mb-1">Standard d'Exportation</p>
                <p>Ce document est un relevé de compte officiel généré au format d'exportation standard (ISO-20022 compliant). Les montants sont exprimés en Euros (EUR). Document authentifié par signature électronique Finanzas Investment.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest text-center sm:text-left">
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
        className="no-print fixed bottom-6 right-6 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-105 transition-transform z-40"
        onClick={() => document.documentElement.classList.toggle('dark')}
      >
        <span className="material-symbols-outlined">dark_mode</span>
      </button>
    </div>
  );
};

export default StatementPage;