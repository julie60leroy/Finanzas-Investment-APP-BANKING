import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, transactions, notifications, beneficiaries, formatTxDate, t, currentLocale, formatGlobalMoney } = useApp();
  const [copiedIban, setCopiedIban] = useState(false);

  // --- Calculs Financiers ---
  const checkingBalance = user?.accounts.checking || 0;
  const savingsBalance = user?.accounts.savings || 0;
  const cryptoBalance = 12500;
  const totalBalance = checkingBalance + savingsBalance + cryptoBalance;

  const currentIban = user?.checkingIban || "FR76 3000 6000 0123 4567 8901 234";
  const maskedIban = `FR76 •••• •••• ${currentIban.slice(-4)}`;
  const accountName = user?.checkingAccountName || t('dashboard.accounts.checking');

  const chartData = [
    { name: t('dashboard.chart.housing'), value: 35, color: '#1e293b' },
    { name: t('dashboard.chart.food'), value: 25, color: '#334155' },
    { name: t('dashboard.chart.leisure'), value: 25, color: '#D92D20' },
    { name: t('dashboard.chart.savings'), value: 15, color: '#94a3b8' },
  ];

  const recentTransactions = transactions.slice(0, 5);
  const unreadCount = notifications.filter(n => !n.read).length;

  const copyIban = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(currentIban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const today = new Date().toLocaleDateString(currentLocale, { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-black/20 p-4 md:p-8 lg:p-10 font-sans pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 capitalize mb-1">{today}</p>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('dashboard.welcome')}, {user?.name.split(' ')[0]}
            </h1>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
             <button 
                onClick={() => navigate('/notifications')}
                className="relative p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
             >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
             </button>
             <button onClick={() => navigate('/settings')} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">settings</span>
             </button>
          </div>
        </div>

        {/* --- HERO CARD --- */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1D2939] text-white shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 p-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 p-24 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <p className="text-slate-400 font-medium text-xs md:text-sm uppercase tracking-wider mb-2">{t('dashboard.wealth_estimated')}</p>
              <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
                <span className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">{formatGlobalMoney(totalBalance)}</span>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>
                  <span className="text-green-400 text-xs font-bold">+2.4%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end w-full md:w-auto">
               <button onClick={() => navigate('/transactions')} className="text-sm font-medium text-white/80 hover:text-white flex items-center gap-1 group">
                  {t('dashboard.analysis')}
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
               </button>
            </div>
          </div>
        </div>

        {/* --- SECTION VIREMENTS RAPIDES --- */}
        <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">contacts</span>
                {t('dashboard.quick_transfer_title')}
            </h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {/* Bouton Ajouter */}
                <div 
                    onClick={() => navigate('/virement-beneficiary')}
                    className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]"
                >
                    <div className="size-14 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary transition-all bg-white dark:bg-slate-900">
                        <span className="material-symbols-outlined text-2xl">add</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-primary">{t('dashboard.add_beneficiary')}</span>
                </div>

                {/* Liste des Bénéficiaires */}
                {beneficiaries.map((b) => (
                    <div 
                        key={b.id}
                        onClick={() => navigate('/virement-amount', { state: { beneficiary: b } })}
                        className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]"
                    >
                        <div className="relative">
                            <div 
                                className="size-14 rounded-full bg-cover bg-center border-2 border-white dark:border-slate-800 shadow-sm group-hover:scale-105 transition-transform"
                                style={{ backgroundImage: `url("${b.img}")` }}
                            ></div>
                            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                                {t('dashboard.send_money')}
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate w-20 text-center">{b.name.split(' ')[0]}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* --- QUICK ACTIONS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/virement-beneficiary')}
            className="flex flex-col items-center justify-center gap-3 p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-primary/30 transition-all group active:scale-95"
          >
            <div className="size-10 md:size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">swap_horiz</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm text-center">{t('dashboard.quick_transfer_action')}</span>
          </button>
          
          <button 
            onClick={() => navigate('/cards')}
            className="flex flex-col items-center justify-center gap-3 p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-blue-500/30 transition-all group active:scale-95"
          >
            <div className="size-10 md:size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">credit_card</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm text-center">{t('dashboard.quick_card')}</span>
          </button>

          <button 
            onClick={(e) => copyIban(e)}
            className="flex flex-col items-center justify-center gap-3 p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-emerald-500/30 transition-all group active:scale-95"
          >
            <div className={`size-10 md:size-12 rounded-full flex items-center justify-center transition-colors ${copiedIban ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'}`}>
              <span className="material-symbols-outlined">{copiedIban ? 'check' : 'content_copy'}</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm text-center">{copiedIban ? t('dashboard.rib_copied') : t('dashboard.quick_rib')}</span>
          </button>

          <button 
            onClick={() => navigate('/statement')}
            className="flex flex-col items-center justify-center gap-3 p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-lg hover:border-orange-500/30 transition-all group active:scale-95"
          >
            <div className="size-10 md:size-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">description</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm text-center">{t('dashboard.quick_docs')}</span>
          </button>
        </div>

        {/* --- ACCOUNTS GRID --- */}
        {/* Adaptation pour tablette : md:grid-cols-2 et lg:grid-cols-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            onClick={() => navigate('/account-checking')}
            className="md:col-span-2 xl:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all hover:shadow-md"
          >
             <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 group-hover:text-white">account_balance_wallet</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm md:text-base">
                        {accountName}
                        <span className="material-symbols-outlined text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                      </h3>
                      <p className="text-xs text-slate-500">{maskedIban}</p>
                   </div>
                </div>
                <div className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">more_horiz</span></div>
             </div>
             
             <div className="mt-8 z-10">
                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{formatGlobalMoney(checkingBalance)}</p>
                <div className="mt-4 flex gap-2">
                   <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
                   <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                </div>
                <p className="mt-2 text-xs text-slate-500">{t('dashboard.accounts.limit')} : {formatGlobalMoney(1250)} / {formatGlobalMoney(2500)}</p>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-lg">
                      <span className="material-symbols-outlined text-primary">savings</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{t('dashboard.accounts.savings')}</h3>
                      <p className="text-xs text-green-600 font-bold">3.00% Net</p>
                   </div>
                </div>
             </div>
             <div className="mt-8">
                <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">{formatGlobalMoney(savingsBalance)}</p>
                <p className="text-xs text-slate-500 mt-1">+ {formatGlobalMoney(125.40)} {t('dashboard.accounts.interest')}</p>
             </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-slate-900 dark:text-white mb-6">{t('dashboard.expenses_breakdown')}</h3>
             <div className="relative h-56 md:h-64">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-xs text-slate-400 font-medium uppercase">{t('dashboard.total_out')}</span>
                   <span className="text-xl font-bold text-slate-900 dark:text-white">{formatGlobalMoney(2430)}</span>
                </div>
             </div>
             
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

          <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 dark:text-white">{t('dashboard.recent_moves')}</h3>
                <Link to="/transactions" className="text-sm font-bold text-primary hover:underline">{t('dashboard.see_all')}</Link>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="text-xs uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                         <th className="py-3 font-semibold whitespace-nowrap pr-4">{t('transactions.table.merchant')}</th>
                         <th className="py-3 font-semibold whitespace-nowrap px-4 hidden sm:table-cell">{t('transactions.table.category')}</th>
                         <th className="py-3 font-semibold text-right whitespace-nowrap">{t('common.amount')}</th>
                         <th className="py-3 font-semibold text-right hidden sm:table-cell">{t('common.status')}</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {recentTransactions.map((tx) => (
                         <tr key={tx.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate('/transactions')}>
                            <td className="py-4 pr-4">
                               <div className="flex items-center gap-3">
                                  <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                                     <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                                  </div>
                                  <div className="min-w-0">
                                     <p className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-[120px] sm:max-w-none">{tx.name}</p>
                                     <p className="text-xs text-slate-500 truncate">{formatTxDate(tx.date)}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="py-4 px-4 hidden sm:table-cell">
                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 whitespace-nowrap">
                                  {tx.cat}
                               </span>
                            </td>
                            <td className={`py-4 text-right font-bold text-sm ${tx.amt > 0 ? 'text-emerald-600' : 'text-slate-900 dark:text-white'} whitespace-nowrap`}>
                               {tx.amt > 0 ? '+' : ''} {formatGlobalMoney(tx.amt)}
                            </td>
                            <td className="py-4 text-right hidden sm:table-cell">
                               <span className={`text-xs font-bold ${tx.status === t('common.success') || tx.status === 'Complété' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                  {tx.status}
                               </span>
                            </td>
                         </tr>
                      ))}
                      {recentTransactions.length === 0 && (
                         <tr><td colSpan={4} className="py-8 text-center text-slate-400">{t('dashboard.no_tx')}</td></tr>
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