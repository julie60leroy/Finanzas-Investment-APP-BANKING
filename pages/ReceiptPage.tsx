import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();
  const state = location.state || {};
  
  // Data Recovery - STRICTLY uses state passed from VirementSuccessPage
  // If no state, we display placeholders, but for the flow requested, data will be present.
  const amount = state.amount || 0;
  
  // Construction de l'objet bénéficiaire à partir de l'état
  const beneficiary = state.beneficiary || {
    name: "Bénéficiaire Inconnu",
    iban: "----",
    bankName: "Banque Inconnue",
    img: ""
  };

  const motif = state.motif || "Virement";
  
  // Gestion de la date
  const dateObj = state.date ? new Date(state.date) : new Date();
  const dateStr = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const referenceId = `FI-${Math.floor(dateObj.getTime() / 1000)}-TRX`;
  
  // Calculations & Formatting
  const rate = 1.0842;
  const convertedAmount = (amount * rate).toFixed(2);
  const formattedAmount = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  const formattedConverted = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount * rate);
  const transferTypeLabel = state.transferType === 'instant' ? 'SEPA Instantané' : 'SEPA Standard';

  // IBAN Source Dynamique
  const sourceIban = user?.checkingIban ? `****${user.checkingIban.slice(-4)}` : '****4291';
  const accountName = user?.checkingAccountName || "Compte Courant";

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900 flex flex-col">
       {/* Top Navigation */}
       <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 no-print">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
                title="Retour"
             >
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="hidden sm:inline font-medium">Retour</span>
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
               <div className="size-8 bg-primary text-white flex items-center justify-center rounded-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H10V10H4V4Z" fill="white"/>
                    <path d="M14 4H20V10H14V4Z" fill="white"/>
                    <path d="M4 14H10V20H4V14Z" fill="white"/>
                  </svg>
               </div>
               <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">FINANZAS INVESTMENT</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Tableau de bord</button>
                <button className="text-slate-900 font-bold">Reçus & Documents</button>
             </nav>
             <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <button 
                  onClick={() => navigate('/notifications')}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative"
                >
                   <span className="material-symbols-outlined">notifications</span>
                   <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border border-white"></span>
                </button>
                <div 
                  className="size-10 rounded-full bg-orange-200 bg-cover bg-center border border-slate-200 cursor-pointer"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUzVA3oC57Zg0LXPq5kOVGL13T_3kDd_-_J0bTmwcPmigj9FSNaJ3647cseMjNdrkBWu9uOw7iJZBx1RfpuJEQR9AZpeteOojgVUR_NcGqY3Y5eRWGvpCDBHKE5818_VxhlHZxug_cR8YuRr8hsKxi-_XqQJ_sDjCKPJlyT8DiwP-ZiHYL71d8g83rTAhxvdBc4aHxKuJVLuE0VbEW-L9KGi8ubuitEbAYe3dDkGwc98iFDqlKoXDXTyeRS9AOZqlHTurq6ttS_Yk")'}}
                  onClick={() => navigate('/profile')}
                ></div> 
             </div>
          </div>
       </header>

       <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-12 flex flex-col lg:flex-row gap-12 justify-center items-start">
          {/* Left Sidebar - Actions */}
          <div className="w-full lg:w-72 flex flex-col gap-6 no-print shrink-0">
             <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 px-1">ACTIONS</h3>
             
             <button className="flex items-center gap-3 bg-primary hover:bg-red-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]" onClick={() => window.print()}>
                <span className="material-symbols-outlined">download</span>
                Télécharger PNG
             </button>
             
             <button className="flex items-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 px-6 py-4 rounded-xl font-bold shadow-sm transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">share</span>
                Partager le reçu
             </button>
             
             <button className="flex items-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 px-6 py-4 rounded-xl font-bold shadow-sm transition-all active:scale-[0.98]" onClick={() => window.print()}>
                <span className="material-symbols-outlined">print</span>
                Imprimer
             </button>

             <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-6">
                <h4 className="text-xs font-bold text-primary uppercase mb-2">NOTE DE SÉCURITÉ</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                   Ce reçu est un document officiel généré par Finanzas Investment. 
                   Utilisez le code QR pour vérifier l'authenticité de cette transaction sur nos serveurs.
                </p>
             </div>
          </div>

          {/* Center - Receipt */}
          <div className="flex-1 max-w-[720px] bg-white rounded-sm shadow-2xl overflow-hidden relative print:shadow-none print:max-w-none print:w-full print:border print:border-slate-200">
             <div className="p-12 pb-8 flex flex-col items-center">
                {/* Logo */}
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

                <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Virement Effectué</h2>
                <p className="text-slate-500 font-medium font-mono text-sm">Référence: #{referenceId}</p>
             </div>

             <div className="border-t border-b border-dashed border-slate-200 bg-slate-50/30 p-12 flex flex-col items-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">MONTANT DU VIREMENT</p>
                <div className="flex items-baseline gap-2 text-primary">
                   <span className="text-6xl font-black tracking-tight">{formattedAmount}</span>
                   <span className="text-3xl font-bold">EUR</span>
                </div>
                <div className="mt-4 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wider shadow-sm">
                  Motif : {motif}
                </div>
             </div>

             <div className="p-12 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">DATE ET HEURE</p>
                      <p className="font-bold text-slate-900 text-lg capitalize">{dateStr}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">TYPE DE TRANSFERT</p>
                      <p className="font-bold text-slate-900 text-lg">{transferTypeLabel}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">COMPTE SOURCE</p>
                      <p className="font-bold text-slate-900 text-lg">{accountName} ({sourceIban})</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">BÉNÉFICIAIRE</p>
                      <div className="flex items-center gap-3">
                         {beneficiary.img ? (
                            <div className="size-10 rounded-full bg-slate-100 bg-cover bg-center" style={{backgroundImage: `url("${beneficiary.img}")`}}></div>
                         ) : (
                            <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">person</span>
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

                <div className="mt-10 bg-red-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between border border-red-100 gap-6">
                   <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-red-100">
                         <span className="material-symbols-outlined">currency_exchange</span>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-primary uppercase mb-1">TAUX DE CHANGE RÉEL</p>
                         <p className="font-bold text-slate-900 text-lg">1 EUR = {rate} USD</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-bold text-primary uppercase mb-1">MONTANT CONVERTI</p>
                      <p className="font-bold text-slate-900 text-lg">{formattedConverted} USD</p>
                   </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-end gap-6">
                   <div>
                      <div className="flex items-center gap-2 text-emerald-600 mb-2">
                         <span className="material-symbols-outlined text-lg icon-filled">verified_user</span>
                         <span className="text-xs font-bold uppercase tracking-widest">GARANTI PAR FINANZAS SECURITY</span>
                      </div>
                      <p className="text-[10px] text-slate-400 max-w-sm leading-relaxed">
                         Ce document électronique tient lieu de preuve de transaction. Toute falsification est passible de poursuites. Digital ID: {referenceId.slice(-10)}.
                      </p>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <div className="size-20 bg-white border border-slate-200 p-1.5 shadow-sm">
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FI-TRX-${amount}-${beneficiary.id}-${referenceId}`} alt="QR Code" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">VÉRIFIER REÇU</span>
                   </div>
                </div>
             </div>
             
             {/* Bottom Red Border */}
             <div className="h-3 w-full bg-primary"></div>
          </div>
       </main>

       <footer className="py-8 text-center text-slate-400 text-sm no-print">
          &copy; 2023 Finanzas Investment S.A. Registered in the EU. Licensed as a Payment Institution.
       </footer>
    </div>
  );
};

export default ReceiptPage;