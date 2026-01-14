import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, transactions } = useApp();

  // Calculate totals
  const totalBalance = (user?.accounts.checking || 0) + (user?.accounts.savings || 0);
  const formattedBalance = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalBalance);
  const checkingFormatted = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(user?.accounts.checking || 0);
  const savingsFormatted = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(user?.accounts.savings || 0);

  const data = [
    { name: 'Logement', value: 35, color: '#D92D20' },
    { name: 'Alimentation', value: 25, color: '#3b82f6' },
    { name: 'Loisirs', value: 25, color: '#10b981' },
    { name: 'Autres', value: 15, color: '#f59e0b' },
  ];

  // Get recent transactions (first 5)
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Bonjour, {user?.name.split(' ')[0]}</h2>
            <p className="text-slate-500 text-lg">Voici votre situation financière aujourd'hui.</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-6 min-w-[300px] shadow-sm relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
            <div className="flex flex-col gap-1 relative z-10">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Solde Total Estimé</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{formattedBalance}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200 md:ml-auto relative z-10">
              <span className="material-symbols-outlined text-green-600 text-lg font-bold">trending_up</span>
              <span className="text-green-600 text-sm font-semibold">+2.4% ce mois-ci</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div onClick={() => navigate('/transactions')} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 rounded-lg bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              </div>
              <span className="material-symbols-outlined text-slate-400">more_horiz</span>
            </div>
            <h4 className="text-slate-500 text-sm font-medium">Compte Courant</h4>
            <p className="text-2xl font-bold text-slate-900">{checkingFormatted}</p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span>**** 4829</span>
              <span className="text-green-600 font-bold">+ 450€</span>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 rounded-lg bg-primary p-2 flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined">savings</span>
              </div>
              <span className="material-symbols-outlined text-slate-400">more_horiz</span>
            </div>
            <h4 className="text-slate-500 text-sm font-medium">Compte Épargne</h4>
            <p className="text-2xl font-bold text-slate-900">{savingsFormatted}</p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span>Finanzas Gold</span>
              <span className="text-green-600 font-bold">+3.5% APY</span>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 rounded-lg bg-[#F7931A]/10 p-2 flex items-center justify-center text-[#F7931A]">
                <span className="font-bold text-2xl">₿</span>
              </div>
              <span className="material-symbols-outlined text-slate-400">more_horiz</span>
            </div>
            <h4 className="text-slate-500 text-sm font-medium">Portefeuille Crypto</h4>
            <p className="text-2xl font-bold text-slate-900">1.2 BTC</p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span>Wallet Defi</span>
              <span className="text-red-600 font-bold">- 1.2%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Analyse des Dépenses</h3>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip 
                         formatter={(value: number) => `${value}%`}
                         contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                         itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 m-auto size-32 pointer-events-none flex items-center justify-center flex-col">
                    <span className="text-xs text-slate-500">Total Sortant</span>
                    <span className="text-2xl font-bold text-slate-900">4.2k €</span>
                </div>
              </div>
              <div className="w-full space-y-4 px-4">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-primary"></span>Logement
                  </span>
                  <span className="font-bold">35%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-blue-500"></span>Alimentation
                  </span>
                  <span className="font-bold">25%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-emerald-500"></span>Loisirs
                  </span>
                  <span className="font-bold">25%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">Dernières Activités</h3>
              <Link to="/transactions" className="text-sm font-bold text-primary hover:underline">
                Tout voir
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="pb-4 font-semibold uppercase text-[11px]">Transaction</th>
                    <th className="pb-4 font-semibold uppercase text-[11px]">Catégorie</th>
                    <th className="pb-4 font-semibold uppercase text-[11px] text-right">Montant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="py-5 font-bold text-slate-900">{tx.name}</td>
                      <td className="py-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700`}>
                          {tx.cat}
                        </span>
                      </td>
                      <td className={`py-5 text-right font-bold ${tx.amt > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                        {tx.amt > 0 ? '+' : ''} {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(tx.amt)}
                      </td>
                    </tr>
                  ))}
                  {recentTransactions.length === 0 && (
                      <tr>
                          <td colSpan={3} className="py-8 text-center text-slate-400">Aucune transaction récente</td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => navigate('/virement-beneficiary')}
              className="mt-8 w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition-all"
            >
              Effectuer un virement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;