import React from 'react';

const StatementPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen p-12 flex justify-center font-display">
      <div className="w-full max-w-4xl bg-white shadow-2xl p-16 print:shadow-none print:p-0">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-black uppercase text-slate-900 mb-1">Relevé de Compte</h1>
            <p className="text-slate-400">Période : Octobre 2023</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2 font-black text-xl text-primary justify-end">
              <span className="material-symbols-outlined">account_balance</span> FINANZAS
            </div>
            <address className="not-italic text-sm text-slate-400">
              128 Rue de la Boétie
              <br />
              75008 Paris, France
            </address>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12 border-y py-10 mb-12">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Titulaire</p>
            <p className="font-black text-lg">Jean-Baptiste Laurent</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Compte</p>
            <p className="font-mono text-sm">FR76 3000 6000 0123 4567 8901 234</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-12">
          <div className="p-4 border rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Solde Initial</p>
            <p className="font-bold">42 150 €</p>
          </div>
          <div className="p-4 border rounded-xl text-emerald-600">
            <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Total Crédits</p>
            <p className="font-bold">+ 5 280 €</p>
          </div>
          <div className="p-4 border rounded-xl text-red-600">
            <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">Total Débits</p>
            <p className="font-bold">- 2 115 €</p>
          </div>
          <div className="p-4 border rounded-xl bg-primary text-white">
            <p className="text-[10px] font-bold opacity-70 mb-1 uppercase">Nouveau Solde</p>
            <p className="font-bold">45 315 €</p>
          </div>
        </div>
        <table className="w-full text-left text-sm mb-12">
          <thead className="border-b-2 text-slate-400">
            <tr className="uppercase text-[10px] font-bold">
              <th className="pb-4">Date</th>
              <th className="pb-4">Opération</th>
              <th className="pb-4 text-right">Montant (EUR)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-4">03/10</td>
              <td className="py-4 font-bold">Virement Salaire</td>
              <td className="py-4 text-right font-bold text-emerald-600">+ 3 850,00</td>
            </tr>
            <tr>
              <td className="py-4">05/10</td>
              <td className="py-4 font-bold">Apple Store Paris</td>
              <td className="py-4 text-right font-bold text-red-600">- 1 299,00</td>
            </tr>
          </tbody>
        </table>
        <div className="pt-10 border-t text-[10px] text-slate-400 flex justify-between">
          <span>Finanzas Investment SAS • RCS Paris B 456 789 012</span>
          <span>Page 1 / 1</span>
        </div>
      </div>
    </div>
  );
};

export default StatementPage;