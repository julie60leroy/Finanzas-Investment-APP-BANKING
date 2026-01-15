import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const VirementBeneficiaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { beneficiaries, addBeneficiary } = useApp();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [newBen, setNewBen] = useState({
    name: '',
    iban: '',
    bankName: '',
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBen.name || !newBen.iban) return;
    
    // Création de l'objet bénéficiaire
    const beneficiaryData = {
      name: newBen.name,
      iban: newBen.iban,
      bankName: newBen.bankName || 'Banque Externe',
      favorite: false
    };

    addBeneficiary(beneficiaryData);
    
    setIsModalOpen(false);
    setNewBen({ name: '', iban: '', bankName: '' });

    // Navigation immédiate avec le nouveau bénéficiaire
    navigate('/virement-amount', { 
      state: { 
        beneficiary: { ...beneficiaryData, id: Date.now().toString() } 
      } 
    });
  };

  const handleSelectBeneficiary = (b: any) => {
    navigate('/virement-amount', { state: { beneficiary: b } });
  };

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.iban.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark relative">
      <div className="flex-1 px-4 py-8 lg:px-8 xl:px-40 overflow-y-auto pb-24 md:pb-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 md:mb-10 flex flex-col gap-2">
            <button 
                onClick={() => navigate('/')} 
                className="self-start flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-4"
            >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Tableau de bord
            </button>
            <h1 className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              Virement International
            </h1>
            <p className="text-slate-500 text-sm md:text-lg">
              Étape 1 : Sélectionnez le destinataire de votre transfert.
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-12 md:mb-16">
            <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto px-2">
              <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-100 dark:bg-slate-800"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
                <div className="flex size-8 md:size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white dark:ring-background-dark">
                  <span className="text-xs md:text-sm font-bold">1</span>
                </div>
                <span className="absolute top-10 md:top-14 text-[10px] md:text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">Bénéficiaire</span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
                <div className="flex size-8 md:size-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400 ring-4 ring-white dark:ring-background-dark">
                  <span className="text-xs md:text-sm font-bold">2</span>
                </div>
                <span className="absolute top-10 md:top-14 text-[10px] md:text-sm font-medium text-slate-400 whitespace-nowrap">Montant</span>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
                <div className="flex size-8 md:size-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400 ring-4 ring-white dark:ring-background-dark">
                  <span className="text-xs md:text-sm font-bold">3</span>
                </div>
                <span className="absolute top-10 md:top-14 text-[10px] md:text-sm font-medium text-slate-400 whitespace-nowrap">Sécurité</span>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col gap-8 md:gap-10">
            {/* Search & Add Button */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Rechercher un bénéficiaire</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input 
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-12 pr-4 py-4 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white dark:focus:bg-black transition-all text-slate-900 dark:text-white placeholder-slate-400" 
                    placeholder="Nom, IBAN ou email..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto whitespace-nowrap flex items-center justify-center gap-2 rounded-xl bg-primary px-6 md:px-8 py-4 text-white font-bold shadow-lg hover:bg-primary-hover transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">person_add</span>
                <span className="hidden md:inline">Ajouter un nouveau bénéficiaire</span>
                <span className="md:hidden">Nouveau</span>
              </button>
            </div>

            {/* Beneficiaries Grid */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bénéficiaires favoris</h3>
                <button className="text-sm font-semibold text-primary hover:underline">Voir tout</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBeneficiaries.map((b) => (
                  <div 
                    key={b.id} 
                    onClick={() => handleSelectBeneficiary(b)}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer group"
                  >
                    {b.img ? (
                       <div 
                        className="size-12 md:size-14 overflow-hidden rounded-full border-2 border-slate-50 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 bg-center bg-cover shrink-0"
                        style={{ backgroundImage: `url("${b.img}")` }}
                      ></div>
                    ) : (
                      <div className="size-12 md:size-14 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <span className="material-symbols-outlined text-3xl">person</span>
                      </div>
                    )}
                   
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate text-sm md:text-base">{b.name}</p>
                        {b.favorite ? (
                           <span className="material-symbols-outlined text-yellow-400 text-lg icon-filled">star</span>
                        ) : (
                           <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-lg">star</span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-tight truncate">{b.iban}</p>
                      {b.bankName && <p className="text-[10px] text-slate-400 mt-1 truncate">{b.bankName}</p>}
                    </div>
                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                  </div>
                ))}
                {filteredBeneficiaries.length === 0 && (
                    <div className="col-span-1 md:col-span-2 py-8 text-center text-slate-500">
                        Aucun bénéficiaire trouvé. Ajoutez-en un nouveau !
                    </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-4 md:mt-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-500 shadow-sm shrink-0">
                <span className="material-symbols-outlined">info</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white">Virements hors zone SEPA</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Les virements internationaux peuvent prendre jusqu'à 3 jours ouvrables. Assurez-vous que les informations du bénéficiaire sont exactes.
                </p>
              </div>
            </div>

            {/* Footer Help */}
            <div className="mt-8 md:mt-12 flex items-center justify-center gap-2 py-4 border-t border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-slate-400">headset_mic</span>
              <span className="text-sm text-slate-500">
                Besoin d'aide ? <a className="font-medium text-slate-900 dark:text-white hover:underline" href="#">Contacter le support</a>
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* --- ADD BENEFICIARY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Nouveau Bénéficiaire</h2>
              <button onClick={() => setIsModalOpen(false)} className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nom du titulaire / Raison sociale</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                    <input 
                      type="text" 
                      required
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-12 pr-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400"
                      placeholder="Ex: Jean Dupont"
                      value={newBen.name}
                      onChange={(e) => setNewBen({...newBen, name: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">IBAN / Numéro de compte</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">account_balance_wallet</span>
                    <input 
                      type="text" 
                      required
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-12 pr-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400 uppercase"
                      placeholder="FR76 ..."
                      value={newBen.iban}
                      onChange={(e) => setNewBen({...newBen, iban: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nom de la Banque (Optionnel)</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">account_balance</span>
                      <input 
                        type="text" 
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-12 pr-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400"
                        placeholder="Ex: Crédit Agricole"
                        value={newBen.bankName}
                        onChange={(e) => setNewBen({...newBen, bankName: e.target.value})}
                      />
                    </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex gap-3">
                 <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 shrink-0">info</span>
                 <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                   En ajoutant ce bénéficiaire, vous certifiez que les informations fournies sont exactes.
                 </p>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">check_circle</span>
                  Enregistrer et Continuer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirementBeneficiaryPage;