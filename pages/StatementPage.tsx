import React, { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useApp } from '../context/AppContext';

const ITEMS_PER_PAGE = 30;

const StatementPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, transactions, t, currentLocale, formatGlobalMoney } = useApp();
  
  const statementRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // --- Gestion des Dates ---
  const now = new Date();
  const currentMonth = now.toLocaleDateString(currentLocale, { month: 'long', year: 'numeric' });
  const emissionDate = now.toLocaleDateString(currentLocale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  const statementRefId = `FIN-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;

  // --- Pagination & Data ---
  // On filtre ou on prend tout. Ici on prend tout pour l'exemple.
  const allTransactions = transactions;
  const totalPages = Math.ceil(allTransactions.length / ITEMS_PER_PAGE) || 1;

  // Transactions de la page courante
  const currentTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, allTransactions]);

  // --- Calculs Financiers (Globaux) ---
  const totalCredits = allTransactions
    .filter(t => t.amt > 0)
    .reduce((acc, t) => acc + t.amt, 0);

  const totalDebits = allTransactions
    .filter(t => t.amt < 0)
    .reduce((acc, t) => acc + t.amt, 0);

  const finalBalance = user?.accounts.checking || 0;
  // Solde initial approximatif pour l'exemple (Solde final - mvmts)
  const initialBalance = finalBalance - totalCredits - totalDebits;

  // Données dynamiques
  const accountName = user?.checkingAccountName || t('dashboard.accounts.checking');

  const formatStatementDate = (iso: string) => {
      const d = new Date(iso);
      return d.toLocaleDateString(currentLocale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // --- EXPORT ---
  const handleDownloadPDF = async () => {
    if (!statementRef.current) return;
    setIsExporting(true);
    try {
        // On capture le conteneur A4 exact
        const dataUrl = await toPng(statementRef.current, { cacheBust: true, backgroundColor: '#ffffff', pixelRatio: 2 });
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210;
        const pdfHeight = 297;
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Releve_${statementRefId}_Page_${currentPage}.pdf`);
    } catch (err) {
        console.error('Failed to export PDF', err);
    } finally {
        setIsExporting(false);
    }
  };

  const handleDownloadPNG = async () => {
    if (!statementRef.current) return;
    setIsExporting(true);
    try {
        const dataUrl = await toPng(statementRef.current, { cacheBust: true, backgroundColor: '#ffffff', pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `Releve_${statementRefId}_Page_${currentPage}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Failed to export PNG', err);
    } finally {
        setIsExporting(false);
    }
  };

  // Navigation Pages
  const prevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center py-8 font-sans text-slate-900">
      
      {/* --- Toolbar --- */}
      <div className="w-full max-w-[210mm] mb-6 px-4 md:px-0 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="font-bold text-sm">{t('common.back')}</span>
            </button>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
            <h1 className="font-bold text-slate-700 dark:text-slate-200">{t('statement.title')}</h1>
         </div>

         <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <button onClick={prevPage} disabled={currentPage === 1} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md disabled:opacity-30 transition-colors">
                <span className="material-symbols-outlined text-lg dark:text-white">chevron_left</span>
            </button>
            <span className="text-sm font-mono font-medium px-2 dark:text-white">Page {currentPage} / {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md disabled:opacity-30 transition-colors">
                <span className="material-symbols-outlined text-lg dark:text-white">chevron_right</span>
            </button>
         </div>

         <div className="flex gap-2">
            <button onClick={handleDownloadPDF} disabled={isExporting} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all shadow-sm disabled:opacity-70">
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                PDF (Page {currentPage})
            </button>
            <button onClick={handleDownloadPNG} disabled={isExporting} className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm disabled:opacity-70">
                <span className="material-symbols-outlined text-[18px]">image</span>
                PNG
            </button>
         </div>
      </div>

      {/* --- A4 DOCUMENT CONTAINER --- */}
      {/* Dimensions: 210mm x 297mm. White background. Fixed size. Centered. */}
      <div className="overflow-auto w-full flex justify-center px-4">
        <div 
            ref={statementRef}
            className="bg-white text-slate-900 shadow-2xl relative flex flex-col"
            style={{ 
                width: '210mm', 
                height: '297mm', 
                minWidth: '210mm',
                minHeight: '297mm',
                padding: '15mm' // Marges d'impression standard
            }}
        >
            {/* 1. Header (Identique sur toutes les pages) */}
            <header className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">account_balance</span>
                        <span className="text-xl font-black tracking-tighter uppercase text-slate-900">FINANZAS INVESTMENT</span>
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium leading-tight">
                        <p>128 Rue de la Boétie, 75008 Paris</p>
                        <p>Agrément ACPR N° 18493 • RCS Paris B 890 123 456</p>
                        <p>contact@finanzas-inv.com</p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900">{t('statement.title')}</h2>
                    <p className="text-xs font-bold text-slate-500 mt-1 capitalize">{currentMonth}</p>
                    <div className="mt-2 text-[10px] font-mono bg-slate-100 px-2 py-1 rounded inline-block">
                        REF: {statementRefId}-P{currentPage}
                    </div>
                </div>
            </header>

            {/* 2. Client & Account Info (Identique sur toutes les pages) */}
            <section className="flex justify-between mb-8 text-xs">
                <div className="w-[45%]">
                    <p className="font-bold text-slate-400 uppercase tracking-wider mb-1">{t('statement.holder')}</p>
                    <div className="border-l-2 border-primary pl-3">
                        <p className="font-bold text-sm text-slate-900">{user?.name}</p>
                        <p className="text-slate-600">14 Avenue des Champs-Élysées</p>
                        <p className="text-slate-600">75008 Paris, France</p>
                    </div>
                </div>
                <div className="w-[45%] text-right">
                    <p className="font-bold text-slate-400 uppercase tracking-wider mb-1">{t('statement.account_info')}</p>
                    <div className="space-y-1">
                        <p><span className="text-slate-500">{t('statement.label_label')}:</span> <span className="font-bold">{accountName}</span></p>
                        <p><span className="text-slate-500">IBAN:</span> <span className="font-mono font-medium">{user?.checkingIban}</span></p>
                        <p><span className="text-slate-500">{t('statement.date_label')}:</span> {emissionDate}</p>
                    </div>
                </div>
            </section>

            {/* 3. Summary (Seulement sur la première page) */}
            {currentPage === 1 && (
                <section className="mb-8 bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 text-center divide-x divide-slate-200">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{t('statement.balance_start')}</p>
                            <p className="text-sm font-bold text-slate-700 mt-1">{formatGlobalMoney(initialBalance)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{t('statement.total_credit')}</p>
                            <p className="text-sm font-bold text-emerald-600 mt-1">+ {formatGlobalMoney(totalCredits)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{t('statement.total_debit')}</p>
                            <p className="text-sm font-bold text-red-600 mt-1">{formatGlobalMoney(totalDebits)}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{t('statement.balance_current')}</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">{formatGlobalMoney(finalBalance)}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Transactions Table (Flexible height) */}
            <div className="flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-slate-800 text-[10px] font-bold uppercase text-slate-600">
                            <th className="py-2 w-24">{t('statement.col_date')}</th>
                            <th className="py-2">{t('statement.col_label')}</th>
                            <th className="py-2 w-24 text-right">{t('statement.col_amount')}</th>
                        </tr>
                    </thead>
                    <tbody className="text-[11px] text-slate-700">
                        {currentTransactions.map((tx, idx) => (
                            <tr key={`${tx.id}-${idx}`} className="border-b border-slate-100 last:border-0">
                                <td className="py-2.5 align-top font-medium">{formatStatementDate(tx.date)}</td>
                                <td className="py-2.5 align-top">
                                    <p className="font-bold text-slate-900">{tx.name}</p>
                                    <p className="text-[9px] text-slate-500 mt-0.5">{tx.cat} • REF: {tx.id.split('-')[1]}</p>
                                </td>
                                <td className={`py-2.5 align-top text-right font-bold font-mono ${tx.amt > 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                                    {tx.amt > 0 ? '+' : ''} {formatGlobalMoney(tx.amt)}
                                </td>
                            </tr>
                        ))}
                        {/* Remplissage vide si moins de 30 items pour garder la structure */}
                        {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - currentTransactions.length) }).map((_, i) => (
                            <tr key={`empty-${i}`} className="border-b border-dashed border-slate-50">
                                <td className="py-2.5 text-transparent select-none">-</td>
                                <td className="py-2.5 text-transparent select-none">-</td>
                                <td className="py-2.5 text-transparent select-none">-</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 5. Footer (Bottom of Page) */}
            <footer className="mt-auto border-t border-slate-300 pt-3 flex justify-between items-end text-[9px] text-slate-400">
                <div className="max-w-[70%]">
                    <p className="font-bold text-slate-600 mb-1">{t('statement.legal_title')}</p>
                    <p className="leading-tight text-justify">{t('statement.legal_text')}</p>
                </div>
                <div className="text-right font-mono">
                    <p>Page {currentPage} / {totalPages}</p>
                    <p>Généré le {now.toLocaleDateString()} à {now.toLocaleTimeString()}</p>
                </div>
            </footer>

        </div>
      </div>
    </div>
  );
};

export default StatementPage;