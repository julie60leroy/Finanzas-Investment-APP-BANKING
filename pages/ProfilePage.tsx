import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Interfaces pour la section Sécurité
interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'mobile';
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useApp();
  
  // --- STATE GESTION DES ONGLETS ---
  const [activeTab, setActiveTab] = useState<'identity' | 'security' | 'documents' | 'settings'>('identity');

  // --- STATE EDIT PROFIL ---
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  // Pour l'upload de photo
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SÉCURITÉ ---
  const [modalOpen, setModalOpen] = useState<'password' | 'pin' | 'phone' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'MacBook Pro (Chrome)', type: 'desktop', location: 'Paris, France', ip: '192.168.1.1', lastActive: "A l'instant", isCurrent: true },
    { id: '2', name: 'iPhone 15 Pro (App)', type: 'mobile', location: 'Lyon, France', ip: '82.12.155.xx', lastActive: 'Il y a 2h', isCurrent: false },
  ]);

  // Initialisation
  useEffect(() => {
    if (user) {
      const names = user.name.split(' ');
      setFirstName(names[0] || '');
      setLastName(names.slice(1).join(' ') || '');
      setEmail(user.email);
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || 'Paris');
      setZipCode(user.zipCode || '75008');
      setCountry(user.country || 'France');
      setJobTitle(user.jobTitle || 'Investisseur');
    }
  }, [user]);

  // --- HANDLERS ---
  const handleSaveProfile = () => {
    const fullName = `${firstName} ${lastName}`.trim();
    updateUser({
      name: fullName,
      email,
      phone,
      address,
      city,
      zipCode,
      country,
      jobTitle
    });
    setIsEditing(false);
  };

  const handleDeviceLogout = (id: string) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const handleSubmitSecurity = (e: React.FormEvent, type: 'password' | 'pin' | 'phone') => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setModalOpen(null);
        if (type === 'pin') {
            updateUser({ securityPin: newPin });
            setNewPin('');
        }
    }, 1000);
  };

  // Gestion de l'upload de photo
  const handlePhotoClick = () => {
    if (isEditing) {
        fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
           updateUser({ avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      
      {/* Top Navigation Bar - VISIBLE UNIQUEMENT SUR DESKTOP (md+) */}
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
            <Link to="/transactions" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">Investissements</Link>
            <Link to="/profile" className="text-primary text-sm font-bold border-b-2 border-primary py-1">Profil</Link>
          </nav>
          <div className="flex gap-2">
            <button onClick={() => navigate('/notifications')} className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <button onClick={() => navigate('/settings')} className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>
          </div>
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20 cursor-pointer hidden md:block" 
            style={{backgroundImage: `url("${user.avatar}")`}}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center py-4 md:py-8 px-4 md:px-10 lg:px-40">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 w-full">
          
          {/* Titre Mobile */}
          <div className="md:hidden mb-4 px-1">
             <h1 className="text-2xl font-black text-slate-900 dark:text-white">Mon Profil</h1>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 relative">
            
            {isEditing && (
                <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow animate-pulse">
                    MODE ÉDITION
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex gap-4 md:gap-6 items-center w-full md:w-auto">
                <div className="relative shrink-0 group">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 md:h-24 md:w-24 border-4 border-slate-50 dark:border-slate-800 transition-opacity" 
                    style={{backgroundImage: `url("${user.avatar}")`, opacity: isEditing ? 0.8 : 1}}
                  ></div>
                  
                  {/* Hidden Input File */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {/* Bouton Camera : Actif seulement en mode édition */}
                  <button 
                    onClick={handlePhotoClick}
                    className={`absolute bottom-0 right-0 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-md border border-slate-200 dark:border-slate-700 transition-colors ${isEditing ? 'text-primary hover:bg-slate-100 cursor-pointer scale-110' : 'text-slate-500 dark:text-slate-300 cursor-default'}`}
                  >
                    <span className="material-symbols-outlined text-sm">{isEditing ? 'add_a_photo' : 'photo_camera'}</span>
                  </button>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <h1 className="text-slate-900 dark:text-white text-xl md:text-2xl font-bold tracking-tight truncate">{user.name}</h1>
                    <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider shrink-0">
                      <span className="material-symbols-outlined text-[12px] md:text-xs">verified</span>
                      <span className="hidden sm:inline">KYC Validé</span>
                      <span className="sm:hidden">Validé</span>
                    </div>
                  </div>
                  {isEditing ? (
                      <input 
                        type="text" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                        className="mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs md:text-sm text-slate-900 dark:text-white w-full max-w-[200px]"
                        placeholder="Poste / Titre"
                      />
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1 truncate">{user.jobTitle} • Membre depuis 2023</p>
                  )}
                  
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 hidden sm:flex">
                    <span className="material-symbols-outlined text-sm">security</span>
                    <span>Compte protégé (2FA actif)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                {isEditing ? (
                    <button onClick={handleSaveProfile} className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">save</span>
                        Enregistrer
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">edit_square</span>
                        <span className="hidden sm:inline">Éditer profil</span>
                        <span className="sm:hidden">Éditer</span>
                    </button>
                )}
                {isEditing && (
                    <button onClick={() => setIsEditing(false)} className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Annuler
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex border-b border-slate-200 dark:border-slate-800 px-2 gap-6 md:gap-8 min-w-max">
              <button 
                onClick={() => setActiveTab('identity')}
                className={`flex items-center gap-2 border-b-2 pb-3 pt-2 transition-all ${activeTab === 'identity' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-sm">person</span>
                <span className="text-sm font-bold tracking-wide">Identité & Fiscalité</span>
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 border-b-2 pb-3 pt-2 transition-all ${activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-sm">shield</span>
                <span className="text-sm font-bold tracking-wide">Sécurité</span>
              </button>
              <button 
                onClick={() => setActiveTab('documents')}
                className={`flex items-center gap-2 border-b-2 pb-3 pt-2 transition-all ${activeTab === 'documents' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-sm">description</span>
                <span className="text-sm font-bold tracking-wide">Documents</span>
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 border-b-2 pb-3 pt-2 transition-all ${activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-sm">settings</span>
                <span className="text-sm font-bold tracking-wide">Paramètres</span>
              </button>
            </div>
          </div>

          {/* --- CONTENU DES ONGLETS --- */}

          {/* TAB 1: IDENTITÉ & FISCALITÉ */}
          {activeTab === 'identity' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-[fadeIn_0.2s_ease-out]">
                {/* Identité Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-4 md:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <h3 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">badge</span>
                            Identité
                        </h3>
                    </div>
                    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                        <div className="space-y-1">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Prénom</p>
                            {isEditing ? <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1 focus:ring-1 focus:ring-primary" /> : <p className="text-slate-900 dark:text-white text-base font-semibold">{firstName}</p>}
                        </div>
                        <div className="space-y-1">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Nom</p>
                            {isEditing ? <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1 focus:ring-1 focus:ring-primary" /> : <p className="text-slate-900 dark:text-white text-base font-semibold">{lastName}</p>}
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
                    </div>
                    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                        <div className="space-y-1">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Email</p>
                            {isEditing ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1 focus:ring-1 focus:ring-primary" /> : <p className="text-slate-900 dark:text-white text-base font-semibold truncate">{email}</p>}
                        </div>
                        <div className="space-y-1">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Mobile</p>
                            {isEditing ? <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1 focus:ring-1 focus:ring-primary" /> : <p className="text-slate-900 dark:text-white text-base font-semibold">{phone}</p>}
                        </div>
                    </div>
                </div>

                {/* Informations Fiscales Card */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-4 md:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                        <h3 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">gavel</span>
                            Fiscalité & Résidence
                        </h3>
                    </div>
                    <div className="p-4 md:p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                            <div className="space-y-1">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Adresse</p>
                                {isEditing ? <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1 focus:ring-1 focus:ring-primary" /> : <p className="text-slate-900 dark:text-white text-base font-semibold">{address}</p>}
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Code Postal</p>
                                {isEditing ? <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1 focus:ring-1 focus:ring-primary" /> : <p className="text-slate-900 dark:text-white text-base font-semibold">{zipCode}</p>}
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Ville</p>
                                {isEditing ? <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1 focus:ring-1 focus:ring-primary" /> : <p className="text-slate-900 dark:text-white text-base font-semibold">{city}</p>}
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Pays</p>
                                {isEditing ? <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded text-slate-900 dark:text-white font-semibold text-sm px-2 py-1 focus:ring-1 focus:ring-primary" /> : <p className="text-slate-900 dark:text-white text-base font-semibold">{country}</p>}
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Numéro Fiscal (TIN)</p>
                                <p className="text-slate-900 dark:text-white text-base font-semibold tracking-widest">FR 882 991 002</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {/* TAB 2: SÉCURITÉ */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                {/* Authentification */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">lock</span>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Authentification</h3>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        <div className="flex items-center justify-between p-4 md:p-6">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="text-slate-600 dark:text-slate-400 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 size-12">
                                    <span className="material-symbols-outlined">password</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-slate-900 dark:text-white text-base font-bold truncate">Mot de passe</p>
                                    <p className="text-slate-500 text-sm truncate">Modifié il y a 3 mois</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen('password')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all whitespace-nowrap ml-2">Modifier</button>
                        </div>
                        <div className="flex items-center justify-between p-4 md:p-6">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="text-slate-600 dark:text-slate-400 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 size-12">
                                    <span className="material-symbols-outlined">dialpad</span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-slate-900 dark:text-white text-base font-bold truncate">Code secret</p>
                                    <p className="text-slate-500 text-sm truncate">Pour virements</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen('pin')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all whitespace-nowrap ml-2">Gérer</button>
                        </div>
                    </div>
                </div>

                {/* Appareils Connectés */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">devices</span>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Appareils</h3>
                        </div>
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {devices.map(device => (
                                <div key={device.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                                            <span className="material-symbols-outlined">{device.type === 'desktop' ? 'laptop_mac' : 'smartphone'}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-slate-900 dark:text-white font-bold text-sm truncate">{device.name}</p>
                                                {device.isCurrent && <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0">Actuel</span>}
                                            </div>
                                            <p className="text-slate-500 text-xs truncate">{device.location}</p>
                                        </div>
                                    </div>
                                    {!device.isCurrent && (
                                        <button onClick={() => handleDeviceLogout(device.id)} className="text-slate-400 hover:text-red-500 transition-colors ml-2 shrink-0">
                                            <span className="material-symbols-outlined text-xl">logout</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-4 md:px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                        <h3 className="text-slate-900 dark:text-white font-bold text-base flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">folder_shared</span>
                            Mes Documents
                        </h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {/* Doc Items */}
                        <div className="flex flex-col gap-3">
                            {[
                                { title: "Carte d'Identité (Recto)", status: "Validé", icon: "identity_platform", color: "text-blue-600 bg-blue-100" },
                                { title: "Carte d'Identité (Verso)", status: "Validé", icon: "identity_platform", color: "text-blue-600 bg-blue-100" },
                                { title: "Justificatif de domicile", status: "Facture EDF", icon: "home_pin", color: "text-purple-600 bg-purple-100" }
                            ].map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className={`size-12 ${doc.color} dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0`}>
                                            <span className="material-symbols-outlined text-xl">{doc.icon}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{doc.title}</p>
                                            <p className="text-xs text-slate-500 uppercase font-semibold truncate">{doc.status}</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 shrink-0 ml-2">visibility</span>
                                </div>
                            ))}
                        </div>
                        
                        <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-slate-500 hover:border-primary hover:text-primary transition-all group mt-4">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">cloud_upload</span>
                            <span className="text-sm font-bold">Ajouter un document</span>
                        </button>
                    </div>
                </div>
            </div>
          )}

          {/* TAB 4: PARAMÈTRES */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Préférences Régionales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">Langue</p>
                            <div className="flex flex-col gap-3">
                                <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex justify-between items-center cursor-pointer">
                                    <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white"><span>🇫🇷</span> Français</div>
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                </div>
                                <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                    <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white"><span>🇺🇸</span> Anglais</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">Devise</p>
                            <div className="flex flex-col gap-3">
                                <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex justify-between items-center cursor-pointer">
                                    <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white">Euro (€)</div>
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                </div>
                                <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                                    <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white">Dollar ($)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}

        </div>
      </main>

      {/* --- MODALES SÉCURITÉ --- */}
      {/* PIN Modal */}
      {modalOpen === 'pin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-8 shadow-2xl text-center">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
                    <span className="material-symbols-outlined text-3xl">dialpad</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Code Secret</h3>
                <p className="text-sm text-slate-500 mb-6">Définissez un code à 4 chiffres.</p>
                <form onSubmit={(e) => handleSubmitSecurity(e, 'pin')} className="space-y-4">
                    <input 
                        type="text" 
                        maxLength={4} 
                        placeholder="----" 
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center text-3xl tracking-[0.5em] font-black rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white" 
                        required 
                    />
                    <button type="submit" disabled={isLoading || newPin.length !== 4} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50">
                        {isLoading ? '...' : 'Définir'}
                    </button>
                    <button type="button" onClick={() => setModalOpen(null)} className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Annuler</button>
                </form>
            </div>
        </div>
      )}

      {/* Password Modal (Visuel) */}
      {modalOpen === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Modifier le mot de passe</h3>
                    <button onClick={() => setModalOpen(null)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                </div>
                <form onSubmit={(e) => handleSubmitSecurity(e, 'password')} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nouveau mot de passe</label>
                        <input type="password" required className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-white" />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4 hover:bg-primary-hover transition-colors">
                        {isLoading ? '...' : 'Enregistrer'}
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* Security Footer */}
      <footer className="mt-8 py-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4 text-center px-4 pb-12 md:pb-8">
        <div className="flex items-center gap-4 grayscale opacity-50">
          <span className="text-xs font-bold uppercase text-slate-400">Certifié par</span>
          <div className="bg-slate-300 dark:bg-slate-700 h-6 w-20 rounded-sm"></div>
          <div className="bg-slate-300 dark:bg-slate-700 h-6 w-16 rounded-sm"></div>
        </div>
        <p className="text-slate-400 text-[11px] max-w-2xl">
            Finanzas Investment est une plateforme régulée. Toutes vos données sont traitées dans le strict respect de la réglementation européenne sur la protection des données personnelles (RGPD).
        </p>
      </footer>
    </div>
  );
};

export default ProfilePage;