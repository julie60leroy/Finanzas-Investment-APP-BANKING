import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useApp } from '../context/AppContext';

const ReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, t, currentLocale } = useApp();
  const state = location.state || {};
  
  // Ref pour capturer le reçu (Format A4)
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [scale, setScale] = useState(1);
  
  // Data Recovery
  const amount = state.amount || 0;
  const beneficiary = state.beneficiary || {
    name: t('common.unknown'),
    iban: "----",
    bankName: t('common.unknown'),
    img: ""
  };

  const motif = state.motif || "Virement";
  
  const sourceCurrency = state.sourceCurrency || 'EUR';
  const targetCurrency = state.targetCurrency || 'USD';
  const rate = state.rate || 1.0842;

  const dateObj = state.date ? new Date(state.date) : new Date();
  const dateStr = dateObj.toLocaleDateString(currentLocale, { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const referenceId = `FI-${Math.floor(dateObj.getTime() / 1000)}-TRX`;
  
  const fees = state.fees || 0;
  const netAmount = amount - fees;
  const convertedAmount = netAmount > 0 ? (netAmount * rate).toFixed(2) : "0.00";
  
  const formattedAmount = new Intl.NumberFormat(currentLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  const formattedConverted = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(convertedAmount));
  
  const transferTypeLabel = state.transferType === 'instant' ? t('transfers.amount.instant') : t('transfers.amount.standard');

  const sourceIban = user?.checkingIban ? `****${user.checkingIban.slice(-4)}` : '****4291';
  const accountName = user?.checkingAccountName || t('dashboard.accounts.checking');

  // Gestion du redimensionnement pour mobile
  useEffect(() => {
    const handleResize = () => {
        const A4_WIDTH_PX = 794; // ~210mm à 96dpi
        const padding = 32; // Marge de sécurité
        const screenWidth = window.innerWidth;
        
        if (screenWidth < A4_WIDTH_PX + padding) {
            const newScale = (screenWidth - padding) / A4_WIDTH_PX;
            setScale(newScale);
        } else {
            setScale(1);
        }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logique du bouton retour intelligente
  const handleBack = () => {
      if (window.history.length > 1) {
          navigate(-1);
      } else {
          navigate('/transactions');
      }
  };

  // --- EXPORT FUNCTIONS ---
  
  const handleDownload = async (format: 'pdf' | 'png') => {
    if (!receiptRef.current) return;
    setIsExporting(true);
    try {
        // Capture en haute résolution (on ignore le scale CSS actuel pour l'export)
        const dataUrl = await toPng(receiptRef.current, { cacheBust: true, backgroundColor: '#ffffff', pixelRatio: 3 });
        
        if (format === 'png') {
            const link = document.createElement('a');
            link.download = `Receipt-${referenceId}.png`;
            link.href = dataUrl;
            link.click();
        } else {
            const pdf = new jsPDF('p', 'mm', 'a4');
            // Dimensions A4
            pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
            pdf.save(`Receipt-${referenceId}.pdf`);
        }
    } catch (err) {
        console.error(`Failed to export ${format}`, err);
    } finally {
        setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 flex flex-col items-center py-4 md:py-8 overflow-x-hidden">
       
       {/* Toolbar - Fixe et responsive */}
       <div className="w-full max-w-4xl px-4 mb-4 md:mb-6 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
          <button 
                onClick={handleBack} 
                className="self-start md:self-auto flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors bg-white dark:bg-slate-800 md:bg-transparent px-3 py-2 md:px-0 rounded-lg shadow-sm md:shadow-none"
             >
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="font-bold text-sm">{t('common.back')}</span>
          </button>
          
          <div className="flex gap-2 w-full md:w-auto justify-end">
             <button 
                onClick={() => handleDownload('pdf')}
                disabled={isExporting}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-all disabled:opacity-70"
             >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                PDF
             </button>

             <button 
                onClick={() => handleDownload('png')}
                disabled={isExporting}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-all disabled:opacity-70"
             >
                <span className="material-symbols-outlined text-[18px]">image</span>
                PNG
             </button>
          </div>
       </div>

       {/* A4 DOCUMENT CONTAINER - SCALED FOR MOBILE */}
       <div 
         className="relative flex justify-center origin-top transition-transform duration-200 ease-out"
         style={{ 
             transform: `scale(${scale})`,
             marginBottom: `-${(1 - scale) * 297}mm` // Compenser l'espace vide en bas dû au scale
         }}
       >
          <div 
            ref={receiptRef} 
            className="bg-white text-slate-900 shadow-2xl relative flex flex-col items-center"
            style={{ 
                width: '210mm', 
                height: '297mm', 
                minWidth: '210mm',
                minHeight: '297mm',
                padding: '0',
                margin: '0 auto' 
            }}
          >
             {/* Header & Logo */}
             <div className="w-full p-12 pb-8 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-3">
                   <div className="size-8 bg-primary text-white flex items-center justify-center rounded-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H10V10H4V4Z" fill="white"/>
                        <path d="M14 4H20V10H14V4Z" fill="white"/>
                        <path d="M4 14H10V20H4V14Z" fill="white"/>
                      </svg>
                   </div>
                   <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">FINANZAS INVESTMENT</h1>
                </div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-10">PREMIUM WEALTH MANAGEMENT</p>

                {/* Success Circle */}
                <div className="size-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                   <div className="size-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                      <span className="material-symbols-outlined text-3xl font-bold">check</span>
                   </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{t('receipt.success_title')}</h2>
                <p className="text-slate-500 font-medium font-mono text-sm">{t('common.reference')}: #{referenceId}</p>
             </div>

             {/* Amount Section */}
             <div className="w-full border-t border-b border-dashed border-slate-200 bg-slate-50/30 p-12 flex flex-col items-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('receipt.amount_title')}</p>
                <div className="flex items-baseline gap-2 text-primary">
                   <span className="text-6xl font-black tracking-tight">{formattedAmount}</span>
                   <span className="text-3xl font-bold">{sourceCurrency}</span>
                </div>
                <div className="mt-4 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wider shadow-sm">
                  {t('transfers.amount.motif')} : {motif}
                </div>
             </div>

             {/* Details Grid */}
             <div className="w-full p-12 pt-10 flex-1">
                <div className="grid grid-cols-2 gap-y-12 gap-x-12">
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('receipt.date_label')}</p>
                      <p className="font-bold text-slate-900 text-lg capitalize">{dateStr}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('receipt.type_label')}</p>
                      <p className="font-bold text-slate-900 text-lg">{transferTypeLabel}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('receipt.source_label')}</p>
                      <p className="font-bold text-slate-900 text-lg">{accountName} ({sourceIban})</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('receipt.beneficiary_label')}</p>
                      <div className="flex items-center gap-3">
                         {beneficiary.img ? (
                            <div className="size-10 rounded-full bg-slate-100 bg-cover bg-center shrink-0" style={{backgroundImage: `url("${beneficiary.img}")`}}></div>
                         ) : (
                            <div className="size-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-lg shrink-0">
                                {beneficiary.name.charAt(0).toUpperCase()}
                            </div>
                         )}
                         <div className="overflow-hidden">
                            <p className="font-bold text-slate-900 text-lg truncate">{beneficiary.name}</p>
                            <p className="text-xs text-slate-500 font-medium truncate font-mono">{beneficiary.iban}</p>
                            <p className="text-xs text-slate-400 truncate">{beneficiary.bankName}</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mt-12 bg-red-50 rounded-xl p-6 flex flex-row items-center justify-between border border-red-100 gap-6">
                   <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-red-100">
                         <span className="material-symbols-outlined">currency_exchange</span>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-primary uppercase mb-1">{t('receipt.rate_label')}</p>
                         <p className="font-bold text-slate-900 text-lg">1 {sourceCurrency} = {rate.toFixed(4)} {targetCurrency}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-bold text-primary uppercase mb-1">{t('receipt.converted_label')}</p>
                      <p className="font-bold text-slate-900 text-lg">{formattedConverted} {targetCurrency}</p>
                   </div>
                </div>
             </div>
             
             {/* Footer Area */}
             <div className="w-full p-12 pt-0 mt-auto">
                <div className="pt-8 border-t border-slate-100 flex flex-row justify-between items-end gap-6">
                   <div>
                      <div className="flex items-center gap-2 text-emerald-600 mb-2">
                         <span className="material-symbols-outlined text-lg icon-filled">verified_user</span>
                         <span className="text-xs font-bold uppercase tracking-widest">{t('receipt.guarantee')}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 max-w-sm leading-relaxed">
                         {t('receipt.legal_desc')} Digital ID: {referenceId.slice(-10)}.
                      </p>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="size-20 bg-white border border-slate-200 p-1.5 shadow-sm">
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FI-TRX-${amount}-${beneficiary.id}-${referenceId}`} alt="QR Code" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{t('receipt.check_label')}</span>
                   </div>
                </div>
             </div>
             
             {/* Bottom Red Border */}
             <div className="h-3 w-full bg-primary shrink-0"></div>
          </div>
       </div>

       <footer className="py-8 text-center text-slate-400 text-xs no-print mt-auto">
          {t('receipt.footer')}
       </footer>
    </div>
  );
};

export default ReceiptPage;