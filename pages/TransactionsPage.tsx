import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp, Transaction } from '../context/AppContext';

const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const { transactions, formatTxDate } = useApp();

  return (
    <>
      <header className="px-4 md:px-8 py-6 border-b border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 transition-colors sticky top-0 z-20">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
                onClick={() => navigate('/')} 
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors md:hidden"
            >
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Transactions</h1>
                <p className="text-slate-500 mt-1 text-sm md:text-base">Gérez vos mouvements financiers en temps réel.</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              to="/statement"
              className="flex-1 md:flex-none justify-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">description</span> 
              <span className="hidden sm:inline">Relevé mensuel</span>
              <span className="sm:hidden">Relevé</span>
            </Link>
            <button className="flex-1 md:flex-none px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover shadow-sm transition-colors">
              Exporter
            </button>
          </div>
        </div>
      </header>
      <div className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                    <th className="px-6 py-4 whitespace-nowrap">Date</th>
                    <th className="px-6 py-4 whitespace-nowrap">Marchand</th>
                    <th className="px-6 py-4 hidden md:table-cell whitespace-nowrap">Statut</th>
                    <th className="px-6 py-4 text-right whitespace-nowrap">Montant</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {transactions.map((tx) => (
                    <tr
                    key={tx.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedTx(tx)}
                    >
                    <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">{formatTxDate(tx.date)}</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                            <span className="material-symbols-outlined text-slate-900 dark:text-white">{tx.icon}</span>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white truncate max-w-[120px] sm:max-w-none">{tx.name}</p>
                            <p className="text-xs text-slate-400">{tx.cat}</p>
                        </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                        <span
                        className={`text-xs font-medium ${
                            tx.status === 'Complété' ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                        >
                        {tx.status}
                        </span>
                    </td>
                    <td
                        className={`px-6 py-4 text-right font-bold whitespace-nowrap ${
                        tx.amt > 0 ? 'text-emerald-600' : 'text-slate-900 dark:text-white'
                        }`}
                    >
                        {tx.amt > 0 ? '+' : ''} {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(tx.amt)}
                    </td>
                    </tr>
                ))}
                {transactions.length === 0 && (
                    <tr>
                        <td colSpan={4} className="py-12 text-center text-slate-400">Aucune transaction trouvée</td>
                    </tr>
                )}
                </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm p-4 md:p-0">
          <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-[slideIn_0.2s_ease-out] rounded-2xl md:rounded-none overflow-hidden">
            <div className="p-6 flex justify-between items-start">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Détails</h3>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col items-center">
              <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 mb-4 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-slate-700 dark:text-white">{selectedTx.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 text-center">{selectedTx.name}</h2>
              <p className="text-slate-500 text-sm mb-4">{formatTxDate(selectedTx.date)}</p>
              <div className="text-4xl font-black text-slate-900 dark:text-white mb-8 text-center">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(selectedTx.amt)}
              </div>
              <div className="w-full space-y-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Compte</span>
                  <span className="font-medium text-slate-900 dark:text-white">VISA ••4242</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Catégorie</span>
                  <span className="font-medium text-slate-900 dark:text-white">{selectedTx.cat}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Statut</span>
                  <span className="font-medium text-slate-900 dark:text-white">{selectedTx.status}</span>
                </div>
                <Link
                  to="/receipt"
                  state={{
                    amount: Math.abs(selectedTx.amt),
                    beneficiary: selectedTx.beneficiaryDetails || {
                        name: selectedTx.name,
                        iban: "FR76 •••• •••• " + Math.floor(1000 + Math.random() * 9000),
                        bankName: "Banque Distante / Commerçant",
                        img: ""
                    },
                    motif: selectedTx.cat,
                    date: selectedTx.date,
                    transferType: 'standard'
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/25 mt-8"
                >
                  <span className="material-symbols-outlined">receipt</span> Voir le reçu officiel
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionsPage;