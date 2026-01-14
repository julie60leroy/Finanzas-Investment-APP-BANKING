import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, transactions } = useApp();
  const [copiedIban, setCopiedIban] = useState(false);

  // --- Calculs Financiers ---
  const checkingBalance = user?.accounts.checking || 0;
  const savingsBalance = user?.accounts.savings || 0;
  const cryptoBalance = 12500; // Simulé pour l'exemple "Investissement"
  const totalBalance = checkingBalance + savingsBalance + cryptoBalance;

  // Formatage des devises
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);

  // Données du graphique (Simulées)
  const chartData = [
    { name: 'Logement & Charges', value: 35, color: '#1e293b' }, // Slate-800
    { name: 'Alimentation', value: 25, color: '#334155' }, // Slate-700
    { name: 'Loisirs & Sorties', value: 25, color: '#D92D20' }, // Primary Red
    { name: 'Épargne & Invest.', value: 15, color: '#94a3b8' }, // Slate-400
  ];

  // Dernières transactions (Top 5)
  const recentTransactions = transactions.slice(0, 5);

  // Fonction utilitaire pour copier l'IBAN
  const copyIban = () => {
    navigator.clipboard.writeText("FR76 3000 6000 0123 4567 8901 234");
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  // Date du jour formatée
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-black/20 p-4 md:p-8 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 capitalize mb-1">{today}</p>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Bonjour, {user?.name.split(' ')[0]}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border border-white dark:border-slate-800"></span>
             </button>
             <button onClick={() => navigate('/settings')} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">settings</span>
             </button>
          </div>
        </div>

        {/* --- HERO CARD: PATRIMOINE --- */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1D2939] text-white shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 p-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 p-24 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative z-10 p-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <p className="text-slate-400 font-medium text-sm uppercase tracking-wider mb-2">Patrimoine Total Estimé</p>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl md:text-5xl font-black tracking-tight">{formatCurrency(totalBalance)}</span>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>
                  <span className="text-green-400 text-xs font-bold">+2.4%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
               <button onClick={() => navigate('/transactions')} className="text-sm font-medium text-white/80 hover:text-white flex items-center gap-1 group">
                  Voir l'analyse détaillée
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
               </button>
            </div>
          </div>
        </div>

        {/* --- QUICK ACTIONS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/virement-beneficiary')}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-primary/30 transition-all group"
          >
            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">swap_horiz</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Nouveau Virement</span>
          </button>
          
          <button 
            onClick={() => navigate('/cards')}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-blue-500/30 transition-all group"
          >
            <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">credit_card</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Gérer ma Carte</span>
          </button>

          <button 
            onClick={copyIban}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-emerald-500/30 transition-all group"
          >
            <div className={`size-12 rounded-full flex items-center justify-center transition-colors ${copiedIban ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'}`}>
              <span className="material-symbols-outlined">{copiedIban ? 'check' : 'content_copy'}</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{copiedIban ? 'IBAN Copié !' : 'Copier mon RIB'}</span>
          </button>

          <button 
            onClick={() => navigate('/statement')}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-orange-500/30 transition-all group"
          >
            <div className="size-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">description</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Relevés & Docs</span>
          </button>
        </div>

        {/* --- ACCOUNTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Account */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
             <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">account_balance_wallet</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Compte Courant</h3>
                      <p className="text-xs text-slate-500">FR76 •••• •••• 1234</p>
                   </div>
                </div>
                <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">more_horiz</span></button>
             </div>
             
             <div className="mt-8 z-10">
                <p className="text-3xl font-black text-slate-900 dark:text-white">{formatCurrency(checkingBalance)}</p>
                <div className="mt-4 flex gap-2">
                   <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                </div>
                <p className="mt-2 text-xs text-slate-500">Plafond de dépenses : 1 250 € / 2 500 €</p>
             </div>
             
             {/* Decorative Card Preview */}
             <div className="absolute -bottom-10 -right-10 w-48 h-32 bg-gradient-to-br from-slate-800 to-black rounded-xl rotate-12 opacity-10 dark:opacity-40"></div>
          </div>

          {/* Savings Account */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-lg">
                      <span className="material-symbols-outlined text-primary">savings</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Livret A</h3>
                      <p className="text-xs text-green-600 font-bold">3.00% Net</p>
                   </div>
                </div>
             </div>
             <div className="mt-8">
                <p className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(savingsBalance)}</p>
                <p className="text-xs text-slate-500 mt-1">+ 125,40 € d'intérêts (YTD)</p>
             </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: ANALYTICS & HISTORY --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Charts */}
          <div className="xl:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-slate-900 dark:text-white mb-6">Répartition des Dépenses</h3>
             <div className="relative h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                         formatter={(value: number) => `${value}%`}
                         contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                         itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-xs text-slate-400 font-medium uppercase">Total Sorties</span>
                   <span className="text-xl font-bold text-slate-900 dark:text-white">2 430 €</span>
                </div>
             </div>
             
             {/* Legend */}
             <div className="mt-4 space-y-3">
                {chartData.map((item, idx) => (
                   <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                         <div className="size-3 rounded-full" style={{backgroundColor: item.color}}></div>
                         <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{item.value}%</span>
                   </div>
                ))}
             </div>
          </div>

          {/* Transaction List */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 dark:text-white">Derniers Mouvements</h3>
                <Link to="/transactions" className="text-sm font-bold text-primary hover:underline">Tout voir</Link>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="text-xs uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                         <th className="py-3 font-semibold">Transaction</th>
                         <th className="py-3 font-semibold">Catégorie</th>
                         <th className="py-3 font-semibold text-right">Montant</th>
                         <th className="py-3 font-semibold text-right">Statut</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {recentTransactions.map((tx) => (
                         <tr key={tx.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate('/transactions')}>
                            <td className="py-4">
                               <div className="flex items-center gap-3">
                                  <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                     <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                                  </div>
                                  <div>
                                     <p className="font-bold text-sm text-slate-900 dark:text-white">{tx.name}</p>
                                     <p className="text-xs text-slate-500">{tx.date}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="py-4">
                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                  {tx.cat}
                               </span>
                            </td>
                            <td className={`py-4 text-right font-bold text-sm ${tx.amt > 0 ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                               {tx.amt > 0 ? '+' : ''} {formatCurrency(tx.amt)}
                            </td>
                            <td className="py-4 text-right">
                               <span className={`text-xs font-bold ${tx.status === 'Complété' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                  {tx.status}
                               </span>
                            </td>
                         </tr>
                      ))}
                      {recentTransactions.length === 0 && (
                         <tr><td colSpan={4} className="py-8 text-center text-slate-400">Aucune transaction récente</td></tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;