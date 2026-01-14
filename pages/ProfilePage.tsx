import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('75008 Paris'); // Default / Placeholder
  const [country, setCountry] = useState('France');

  // Initialize state from context when user loads
  useEffect(() => {
    if (user) {
      const names = user.name.split(' ');
      setFirstName(names[0] || '');
      setLastName(names.slice(1).join(' ') || '');
      setEmail(user.email);
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const handleSave = () => {
    const fullName = `${firstName} ${lastName}`.trim();
    updateUser({
      name: fullName,
      email,
      phone,
      address,
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      
      {/* Top Navigation Bar - VISIBLE UNIQUEMENT SUR DESKTOP/TABLETTE (md+) */}
      {/* Sur mobile, on utilise le header global de App.tsx avec le menu burger */}
      <header className="hidden md:flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 lg:px-10 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-6 text-primary hidden md:block">
              <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Finanzas Investment</h2>
          </div>
          <label className="flex flex-col min-w-40 !h-10 max-w-64 hidden md:flex">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-slate-500 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-0 h-full placeholder:text-slate-500 px-4 rounded-r-lg pl-2 text-sm font-normal" 
                placeholder="Rechercher un actif..." 
              />
            </div>
          </label>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-6 hidden xl:flex">
            <Link to="/" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">Tableau de bord</Link>
            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors cursor-pointer">Investissements</a>
            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors cursor-pointer">Marchés</a>
            <Link to="/profile" className="text-primary text-sm font-bold border-b-2 border-primary py-1">Profil</Link>
          </nav>
          <div className="flex gap-2">
            <button 
                onClick={() => navigate('/notifications')}
                className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <button 
                onClick={() => navigate('/settings')}
                className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>
          </div>
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20 cursor-pointer hidden md:block" 
            style={{backgroundImage: `url("${user.avatar}")`}}
          ></div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex flex-1 justify-center py-4 md:py-8 px-4 md:px-10 lg:px-40">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 w-full">
          
          {/* Titre Mobile */}
          <div className="md:hidden mb-4">
             <h1 className="text-2xl font-black text-slate-900 dark:text-white">Mon Profil</h1>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex gap-4 md:gap-6 items-center w-full md:w-auto">
                <div className="relative shrink-0">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 md:h-24 md:w-24 border-4 border-slate-50 dark:border-slate-800" 
                    style={{backgroundImage: `url("${user.avatar}")`}}
                  ></div>
                  <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-md border border-slate-200 dark:border-slate-700 hover:text-primary transition-colors text-slate-500 dark:text-slate-300">
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                  </button>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <h1 className="text-slate-900 dark:text-white text-xl md:text-2xl font-bold tracking-tight truncate">{user.name}</h1>
                    <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider shrink-0">
                      <span className="material-symbols-outlined text-[12px] md:text-xs">verified</span>
                      <span className="hidden sm:inline">KYC Validé</span>
                      <span className="sm:hidden">Validé</span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1 truncate">{user.jobTitle || 'Investisseur'} • Membre depuis 2023</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 hidden sm:flex">
                    <span className="material-symbols-outlined text-sm">security</span>
                    <span>Compte protégé (2FA actif)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                {isEditing ? (
                    <button 
                        onClick={handleSave}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-sm">save</span>
                        Enregistrer
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-sm">edit_square</span>
                        <span className="hidden sm:inline">Éditer profil</span>
                        <span className="sm:hidden">Éditer</span>
                    </button>
                )}
                
                {isEditing && (
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Annuler
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex border-b border-slate-200 dark:border-slate-800 px-2 gap-6 md:gap-8 min-w-max">
              <button className="flex items-center gap-2 border-b-2 border-primary text-primary pb-3 pt-2">
                <span className="material-symbols-outlined text-sm">person</span>
                <span className="text-sm font-bold tracking-wide">Identité & Fiscalité</span>
              </button>
              <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-3 pt-2 transition-all">
                <span className="material-symbols-outlined text-sm">shield</span>
                <span className="text-sm font-bold tracking-wide">Sécurité</span>
              </button>
              <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-3 pt-2 transition-all">
                <span className="material-symbols-outlined text-sm">description</span>
                <span className="text-sm font-bold tracking-wide">Documents</span>
              </button>
              <button className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-3 pt-2 transition-all">
                <span className="material-symbols-outlined text-sm">settings</span>
                <span className="text-sm font-bold tracking-wide">Paramètres</span>
              </button>
            </div>
          </div>

          {/* Layout: Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Personal Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Identité Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-4 md:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">badge</span>
                    Identité
                  </h3>
                  {!isEditing && <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-slate-500 hover:text-primary uppercase tracking-wider transition-colors">Modifier</button>}
                </div>
                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Prénom</p>
                    {isEditing ? (
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1" />
                    ) : (
                        <p className="text-slate-900 dark:text-white text-base font-semibold">{firstName}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Nom</p>
                    {isEditing ? (
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1" />
                    ) : (
                        <p className="text-slate-900 dark:text-white text-base font-semibold">{lastName}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Date de naissance</p>
                    <p className="text-slate-900 dark:text-white text-base font-semibold">12 Mai 1985</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Nationalité</p>
                    <p className="text-slate-900 dark:text-white text-base font-semibold">Française</p>
                  </div>
                </div>
              </div>

              {/* Coordonnées Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-4 md:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">contact_mail</span>
                    Coordonnées
                  </h3>
                  {!isEditing && <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-slate-500 hover:text-primary uppercase tracking-wider transition-colors">Modifier</button>}
                </div>
                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Adresse email</p>
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1" />
                        ) : (
                            <p className="text-slate-900 dark:text-white text-base font-semibold truncate">{email}</p>
                        )}
                      {!isEditing && <span className="material-symbols-outlined text-green-500 text-sm shrink-0" title="Vérifié">check_circle</span>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Téléphone mobile</p>
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1" />
                        ) : (
                            <p className="text-slate-900 dark:text-white text-base font-semibold">{phone}</p>
                        )}
                      {!isEditing && <span className="material-symbols-outlined text-green-500 text-sm shrink-0" title="Vérifié par SMS">sms</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations Fiscales Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-4 md:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">gavel</span>
                    Fiscalité & Résidence
                  </h3>
                  {!isEditing && <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-slate-500 hover:text-primary uppercase tracking-wider transition-colors">Modifier</button>}
                </div>
                <div className="p-4 md:p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                    <div className="space-y-1">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Adresse de résidence</p>
                      {isEditing ? (
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1" />
                        ) : (
                            <p className="text-slate-900 dark:text-white text-base font-semibold">{address}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Ville & Code Postal</p>
                      {isEditing ? (
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1" />
                        ) : (
                            <p className="text-slate-900 dark:text-white text-base font-semibold">{city}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Pays</p>
                      {isEditing ? (
                            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1" />
                        ) : (
                            <p className="text-slate-900 dark:text-white text-base font-semibold">{country}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Numéro fiscal (TIN)</p>
                      <p className="text-slate-900 dark:text-white text-base font-semibold tracking-widest">FR 882 991 002</p>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg flex gap-3">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 shrink-0">info</span>
                    <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                      Vos informations fiscales sont essentielles pour le prélèvement forfaitaire unique (PFU). Assurez-vous qu'elles correspondent à votre dernière déclaration d'impôts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Documents */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-24">
                <div className="px-4 md:px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">folder_shared</span>
                    Documents Officiels
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  {/* Document Item 1 */}
                  <div className="group flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">identity_platform</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Carte d'Identité (Recto)</p>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Validé le 12/01/23</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                  </div>
                  {/* Document Item 2 */}
                  <div className="group flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">identity_platform</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Carte d'Identité (Verso)</p>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Validé le 12/01/23</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                  </div>
                  {/* Document Item 3 */}
                  <div className="group flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">home_pin</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Justificatif de domicile</p>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">Facture EDF - &lt; 3 mois</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-slate-500 hover:border-primary hover:text-primary transition-all group">
                      <span className="material-symbols-outlined group-hover:scale-110 transition-transform">cloud_upload</span>
                      <span className="text-sm font-bold">Ajouter un document</span>
                    </button>
                  </div>
                  
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg mt-4">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <p className="text-[10px] font-bold uppercase tracking-widest">Stockage Sécurisé</p>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                        Vos documents sont chiffrés (AES-256) et stockés sur des serveurs conformes au RGPD.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Security Footer */}
      <footer className="mt-8 py-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4 text-center px-4 pb-12 md:pb-8">
        <div className="flex items-center gap-4 grayscale opacity-50">
          <span className="text-xs font-bold uppercase text-slate-400">Certifié par</span>
          <div className="bg-slate-300 dark:bg-slate-700 h-6 w-20 rounded-sm"></div>
          <div className="bg-slate-300 dark:bg-slate-700 h-6 w-16 rounded-sm"></div>
        </div>
        <p className="text-slate-400 text-[11px] max-w-2xl">
            Finanzas Investment est une plateforme régulée. Toutes vos données sont traitées dans le strict respect de la réglementation européenne sur la protection des données personnelles (RGPD). En cas de question, contactez notre DPO à dpo@finanzasinvest.com.
        </p>
      </footer>
    </div>
  );
};

export default ProfilePage;