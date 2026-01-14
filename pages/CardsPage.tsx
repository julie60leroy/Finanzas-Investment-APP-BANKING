import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, Card } from '../context/AppContext';

const CardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { cards, addCard, toggleCardStatus, updateCardLimits, transactions } = useApp();
  
  // State for UI interactions
  const [selectedCardId, setSelectedCardId] = useState<string | null>(cards.length > 0 ? cards[0].id : null);
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState<Card | null>(null);
  const [showLimitModal, setShowLimitModal] = useState<Card | null>(null);

  // Derived state
  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const handleAddCardSubmit = (type: 'physical' | 'virtual') => {
    const design = type === 'physical' ? 'premium-red' : 'midnight-black';
    addCard(type, design);
    setShowAddModal(false);
  };

  const getCardGradient = (design: string) => {
    if (design === 'premium-red') return 'linear-gradient(135deg, #ec1313 0%, #a50d0d 100%)';
    return 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
  };

  const formatCardNumber = (number: string, revealed: boolean) => {
    if (revealed) {
      return number.match(/.{1,4}/g)?.join(' ') || number;
    }
    return `•••• •••• •••• ${number.slice(-4)}`;
  };

  const toggleDetails = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (revealedCardId === id) {
      setRevealedCardId(null);
    } else {
      setRevealedCardId(id);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
      {/* Page Heading */}
      <div className="px-4 md:px-8 pt-6 md:pt-8 pb-4">
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex items-center gap-3">
            <button 
                onClick={() => navigate('/')} 
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors md:hidden"
            >
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex flex-col gap-1">
                <h2 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-black tracking-tight">Gestion des Cartes</h2>
                <p className="text-slate-500 text-sm md:text-base font-normal">Contrôlez vos moyens de paiement.</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all text-slate-700 dark:text-white"
            >
              <span className="material-symbols-outlined text-primary">add_circle</span>
              <span>Nouvelle carte</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 pb-12">
        {/* Left: Cards Carousel/Grid */}
        <div className="flex-1 space-y-8">
          
          {/* Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {cards.map((card) => {
              const isRevealed = revealedCardId === card.id;
              
              return (
                <div 
                  key={card.id} 
                  onClick={() => setSelectedCardId(card.id)}
                  className={`flex flex-col gap-6 transition-all duration-300 ${selectedCardId === card.id ? 'ring-2 ring-primary ring-offset-4 dark:ring-offset-slate-900 rounded-2xl' : 'opacity-80 hover:opacity-100'}`}
                >
                  <div 
                    className="relative w-full aspect-[1.586/1] rounded-2xl p-6 md:p-8 text-white shadow-2xl overflow-hidden flex flex-col justify-between group cursor-pointer" 
                    style={{ background: getCardGradient(card.design) }}
                  >
                    {/* Top Row: Logo & Status & Reveal Button */}
                    <div className="flex justify-between items-start">
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <div className={`size-6 ${card.design === 'premium-red' ? 'text-white/80' : 'text-primary'}`}>
                              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                              </svg>
                            </div>
                            <span className="font-black text-[10px] tracking-wider opacity-80 hidden sm:inline">FINANZAS INVESTMENT</span>
                          </div>
                          <div className={`mt-2 w-fit flex items-center gap-2 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${card.status === 'blocked' ? 'bg-red-500/20 text-red-100' : 'bg-white/10'}`}>
                              {card.status === 'active' ? (
                                <>
                                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                  Active
                                </>
                              ) : (
                                <>
                                  <span className="material-symbols-outlined text-[12px]">lock</span>
                                  Bloquée
                                </>
                              )}
                          </div>
                       </div>
                       
                       <button 
                          onClick={(e) => toggleDetails(e, card.id)}
                          className="flex items-center justify-center size-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-all"
                          title={isRevealed ? "Masquer les détails" : "Voir les détails"}
                       >
                          <span className="material-symbols-outlined">{isRevealed ? 'visibility_off' : 'visibility'}</span>
                       </button>
                    </div>

                    <div className="mt-2">
                      {card.type === 'physical' ? (
                        <div className="w-12 h-9 bg-yellow-400/80 rounded flex items-center justify-center overflow-hidden border border-black/10">
                          <div className="grid grid-cols-3 gap-0.5 opacity-30">
                            <div className="w-4 h-9 border-r border-black/20"></div>
                            <div className="w-4 h-9 border-r border-black/20"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-9 bg-gray-400/30 rounded flex items-center justify-center overflow-hidden border border-white/10">
                          <span className="material-symbols-outlined text-white/40">contactless</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <p className={`text-lg sm:text-xl xl:text-2xl font-mono tracking-[0.1em] drop-shadow-md transition-all ${isRevealed ? 'tracking-normal' : ''}`}>
                         {formatCardNumber(card.number, isRevealed)}
                      </p>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest opacity-60">Titulaire</span>
                          <span className="text-xs sm:text-sm font-bold tracking-wide truncate max-w-[120px] sm:max-w-none">{card.holder}</span>
                        </div>
                        
                        <div className="flex gap-4 sm:gap-6">
                           <div className="flex flex-col items-center">
                              <span className="text-[10px] uppercase tracking-widest opacity-60">Expire</span>
                              <span className="text-xs sm:text-sm font-bold tracking-wide">{card.expiry}</span>
                           </div>
                           <div className="flex flex-col items-center">
                              <span className="text-[10px] uppercase tracking-widest opacity-60">CVC</span>
                              <span className="text-xs sm:text-sm font-bold tracking-wide font-mono">{isRevealed ? card.cvc : '•••'}</span>
                           </div>
                        </div>

                        <div className="h-6 sm:h-8">
                           {card.network === 'mastercard' ? (
                              <img alt="Logo Mastercard" className="h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWkD4_uSGmteZ4vNlNznfv7efrvJHYOKK0hQQ32ZX1mYU-7JHoE13nJyrKK2c1bomEyuHDo3qRu1BMKea6jhdsX5gd82RxtnDFDegU0LGWqXbp4cQ65aVoPyP7O7MOvP_T1_8svGYaZsZ095leEeo7FJCMDtfnq0zsWexEgnBt2L9o_ziWFbhmc0ZSx2_4EY2uR-JVkPV9s4O9J0uQgc0Hbw2eEnRcQtZ2ocKVJJ-2sKWehYRCFEbjvV0KH4rRKYvHED8466_qU5M" />
                           ) : (
                              <img alt="Logo Visa" className="h-full object-contain invert brightness-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCNAOdwxzdzdeVypRYUZcfpLVTy4WW9Lu6Utme8ShcGmZiHbGKQILsBFFIs2do15BcE-1mfLMRyLoKhY7hvbLmVgkDW-TF6sQcvFsjaykqne33N4hzjwNnS9x2D68_sIxB0tEKM3tSWNBjPbgQL1NzjDQQ2Rf-YgFRLPf57DXlOXv4tv3mnZ_Q3F_CCfnGorl035moqtzL0fB9K8XgSHrdkTGGqa5k86mPwSXSMd9Qmy0zAtKrSA8nE1hXXO8rXy2wA6SZFcqIouQ" />
                           )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => toggleCardStatus(card.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 ${card.status === 'active' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                    >
                      <span className="material-symbols-outlined text-lg">{card.status === 'active' ? 'lock' : 'lock_open'}</span>
                      <span>{card.status === 'active' ? 'Bloquer' : 'Débloquer'}</span>
                    </button>
                    <button 
                      onClick={() => setShowPinModal(card)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-lg">visibility</span>
                      <span>PIN</span>
                    </button>
                    <button 
                      onClick={() => setShowLimitModal(card)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-lg">tune</span>
                      <span>Limites</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Card Stats/Limits Section */}
          {selectedCard && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Plafond Paiement</span>
                  <span className="text-primary material-symbols-outlined">payments</span>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {selectedCard.limits.payment.current.toLocaleString()} €
                </p>
                <p className="text-xs text-slate-500 mt-1">Sur {selectedCard.limits.payment.max.toLocaleString()} € mensuel</p>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((selectedCard.limits.payment.current / selectedCard.limits.payment.max) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Retraits DAB</span>
                  <span className="text-blue-500 material-symbols-outlined">atm</span>
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {selectedCard.limits.withdrawal.current.toLocaleString()} €
                </p>
                <p className="text-xs text-slate-500 mt-1">Sur {selectedCard.limits.withdrawal.max.toLocaleString()} € hebdo</p>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: selectedCard.limits.withdrawal.max > 0 ? `${Math.min((selectedCard.limits.withdrawal.current / selectedCard.limits.withdrawal.max) * 100, 100)}%` : '0%' }}
                  ></div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Statut Carte</span>
                  <span className={`material-symbols-outlined ${selectedCard.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                    {selectedCard.status === 'active' ? 'security' : 'lock'}
                  </span>
                </div>
                <p className={`text-2xl font-black ${selectedCard.status === 'active' ? 'text-green-500 dark:text-green-400' : 'text-red-500'}`}>
                  {selectedCard.status === 'active' ? 'Opérationnelle' : 'Bloquée'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                   {selectedCard.type === 'physical' ? 'Carte Physique' : 'Carte Virtuelle'}
                </p>
                <div className="flex gap-1 mt-4">
                  <div className={`flex-1 h-1.5 rounded-full ${selectedCard.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div className={`flex-1 h-1.5 rounded-full ${selectedCard.status === 'active' ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                  <div className={`flex-1 h-1.5 rounded-full ${selectedCard.status === 'active' ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Recent Activity & CTA */}
        <aside className="w-full lg:w-80 space-y-6">
          {/* Recent Transactions */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white">Dépenses récentes</h3>
              <button className="text-primary text-xs font-bold hover:underline">Voir tout</button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
               {transactions.slice(0, 4).map(tx => (
                  <div key={tx.id} className="p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-600">{tx.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{tx.name}</p>
                      <p className="text-xs text-slate-500 truncate">{tx.date}</p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="text-sm font-black text-slate-900 dark:text-white">
                        {tx.amt > 0 ? '+' : ''}{tx.amt} {tx.currency}
                      </p>
                    </div>
                  </div>
               ))}
            </div>
          </div>

          {/* CTA: Order New Card */}
          <div onClick={() => setShowAddModal(true)} className="relative overflow-hidden bg-slate-800 dark:bg-slate-900 rounded-xl p-6 text-white group cursor-pointer hover:shadow-xl transition-all">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined !text-[120px]">credit_card</span>
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="size-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined">add_card</span>
              </div>
              <div>
                <h4 className="text-lg font-bold">Nouvelle carte ?</h4>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">Commandez une carte physique premium ou créez une carte virtuelle instantanément.</p>
              </div>
              <button className="mt-2 w-full bg-white text-slate-900 py-2.5 rounded-lg text-sm font-black hover:bg-gray-100 transition-colors">
                Commander maintenant
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* --- MODAL: ADD CARD --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Commander une carte</h3>
                 <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
              </div>
              <div className="p-6 space-y-4">
                 <button onClick={() => handleAddCardSubmit('physical')} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary bg-slate-50 dark:bg-slate-800 transition-all group text-left">
                    <div className="size-12 rounded-full bg-red-100 text-primary flex items-center justify-center">
                       <span className="material-symbols-outlined">credit_card</span>
                    </div>
                    <div>
                       <p className="font-bold text-slate-900 dark:text-white">Carte Métal Physique</p>
                       <p className="text-xs text-slate-500">Premium, sans contact, internationale.</p>
                    </div>
                 </button>
                 <button onClick={() => handleAddCardSubmit('virtual')} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary bg-slate-50 dark:bg-slate-800 transition-all group text-left">
                    <div className="size-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                       <span className="material-symbols-outlined">devices</span>
                    </div>
                    <div>
                       <p className="font-bold text-slate-900 dark:text-white">Carte Virtuelle</p>
                       <p className="text-xs text-slate-500">Instantanée, pour vos achats en ligne.</p>
                    </div>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* --- MODAL: PIN CODE --- */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
              <div className="p-8 flex flex-col items-center text-center">
                 <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-3xl text-slate-500">lock_open</span>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Code PIN</h3>
                 <p className="text-sm text-slate-500 mb-6">Voici le code PIN pour votre carte terminant par <span className="font-mono font-bold text-slate-900 dark:text-white">{showPinModal.number.slice(-4)}</span>.</p>
                 
                 <div className="bg-slate-100 dark:bg-slate-800 px-8 py-4 rounded-xl mb-6">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-[0.5em]">{showPinModal.pin}</span>
                 </div>
                 
                 <button onClick={() => setShowPinModal(null)} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors">
                    Fermer
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* --- MODAL: LIMITS SETTINGS --- */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Plafonds de la carte</h3>
                 <button onClick={() => setShowLimitModal(null)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
              </div>
              <div className="p-6 space-y-8">
                 {/* Payment Slider */}
                 <div>
                    <div className="flex justify-between mb-2">
                       <label className="font-bold text-slate-700 dark:text-slate-300">Paiements (30j)</label>
                       <span className="font-bold text-primary">{showLimitModal.limits.payment.max} €</span>
                    </div>
                    <input 
                       type="range" 
                       min="500" 
                       max="10000" 
                       step="100"
                       value={showLimitModal.limits.payment.max}
                       onChange={(e) => updateCardLimits(showLimitModal.id, {
                          ...showLimitModal.limits,
                          payment: { ...showLimitModal.limits.payment, max: parseInt(e.target.value) }
                       })}
                       className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <p className="text-xs text-slate-500 mt-2">Dépensé ce mois-ci : {showLimitModal.limits.payment.current} €</p>
                 </div>

                 {/* Withdrawal Slider */}
                 <div>
                    <div className="flex justify-between mb-2">
                       <label className="font-bold text-slate-700 dark:text-slate-300">Retraits (7j)</label>
                       <span className="font-bold text-blue-500">{showLimitModal.limits.withdrawal.max} €</span>
                    </div>
                    <input 
                       type="range" 
                       min="0" 
                       max="3000" 
                       step="50"
                       value={showLimitModal.limits.withdrawal.max}
                       onChange={(e) => updateCardLimits(showLimitModal.id, {
                          ...showLimitModal.limits,
                          withdrawal: { ...showLimitModal.limits.withdrawal, max: parseInt(e.target.value) }
                       })}
                       className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <p className="text-xs text-slate-500 mt-2">Retiré cette semaine : {showLimitModal.limits.withdrawal.current} €</p>
                 </div>

                 <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/30 flex gap-3">
                    <span className="material-symbols-outlined text-yellow-600">info</span>
                    <p className="text-xs text-yellow-800 dark:text-yellow-200">Les modifications de plafond sont effectives immédiatement mais peuvent être sujettes à une révision de sécurité.</p>
                 </div>

                 <button onClick={() => setShowLimitModal(null)} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
                    Enregistrer
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default CardsPage;