import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Transaction {
  date: string;
  name: string;
  icon: string;
  cat: string;
  status: string;
  amt: string;
  plus?: boolean;
}

const TransactionsPage: React.FC = () => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const transactions: Transaction[] = [
    { date: "Aujourd'hui, 14:30", name: "Apple Store", icon: "laptop_mac", cat: "Électronique", status: "Complété", amt: "- 1 299,00 €" },
    { date: "Hier, 19:15", name: "Uber Eats", icon: "restaurant", cat: "Restauration", status: "En attente", amt: "- 45,50 €" },
    { date: "22 Oct 2023", name: "Virement Salaire", icon: "payments", cat: "Revenu", status: "Complété", amt: "+ 3 500,00 €", plus: true }
  ];

  return (
    <>
      <header className="px-8 py-6 border-b border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Transactions</h1>
            <p className="text-slate-500 mt-1">Gérez vos mouvements financiers en temps réel.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/statement"
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">description</span> Relevé mensuel
            </Link>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover shadow-sm">
              Exporter CSV
            </button>
          </div>
        </div>
      </header>
      <div className="p-8 max-w-6xl mx-auto w-full flex-1">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Marchand</th>
                <th className="px-6 py-4 hidden md:table-cell">Statut</th>
                <th className="px-6 py-4 text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map((tx, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => setSelectedTx(tx)}
                >
                  <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                        <span className="material-symbols-outlined text-slate-900">{tx.icon}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{tx.name}</p>
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
                    className={`px-6 py-4 text-right font-bold ${
                      tx.plus ? 'text-emerald-600' : 'text-slate-900'
                    }`}
                  >
                    {tx.amt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col">
            <div className="p-6 flex justify-between items-start">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Détails</h3>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col items-center">
              <div className="size-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 mb-4 shadow-sm">
                <span className="material-symbols-outlined text-4xl">{selectedTx.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedTx.name}</h2>
              <p className="text-slate-500 text-sm mb-4">{selectedTx.date}</p>
              <div className="text-4xl font-black text-slate-900 mb-8">{selectedTx.amt}</div>
              <div className="w-full space-y-6 border-t pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Compte</span>
                  <span className="font-medium">VISA ••4242</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Catégorie</span>
                  <span className="font-medium">{selectedTx.cat}</span>
                </div>
                <Link
                  to="/receipt"
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