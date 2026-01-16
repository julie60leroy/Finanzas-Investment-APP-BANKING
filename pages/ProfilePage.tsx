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
  const { user, updateUser, t, language } = useApp();
  
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
  const [devices, setDevices] = useState<Device[]>([]);

  // Initialisation et mise à jour quand la langue change
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
    setDevices([
        { id: '1', name: 'MacBook Pro (Chrome)', type: 'desktop', location: 'Paris, France', ip: '192.168.1.1', lastActive: t('common.unknown') === 'Unknown' ? "Just now" : "A l'instant", isCurrent: true },
        { id: '2', name: 'iPhone 15 Pro (App)', type: 'mobile', location: 'Lyon, France', ip: '82.12.155.xx', lastActive: t('common.unknown') === 'Unknown' ? "2h ago" : 'Il y a 2h', isCurrent: false },
    ]);
  }, [user, language, t]);

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
            <Link to="/" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">{t('nav.dashboard')}</Link>
            <Link to="/transactions" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">{t('nav.activity')}</Link>
            <Link to="/profile" className="text-primary text-sm font-bold border-b-2 border-primary py-1">{t('nav.profile')}</Link>
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
          <div className="md:hidden mb-4 px-1 flex items-center gap-3">
             <button onClick={() => navigate(-1)} className="p-1 -ml-1"><span className="material-symbols-outlined">arrow_back</span></button>
             <h1 className="text-2xl font-black text-slate-900 dark:text-white">{t('profile.title')}</h1>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 relative">
            
            {isEditing && (
                <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow animate-pulse">
                    {t('profile.edit_mode')}
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
                      <span className="hidden sm:inline">{t('profile.kyc_validated')}</span>
                      <span className="sm:hidden">{t('admin.verified')}</span>
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
                    <span>{t('profile.protected')}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                {isEditing ? (
                    <button onClick={handleSaveProfile} className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">save</span>
                        {t('common.save')}
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">edit_square</span>
                        <span className="hidden sm:inline">{t('common.edit')}</span>
                        <span className="sm:hidden">{t('common.edit')}</span>
                    </button>
                )}
                {isEditing && (
                    <button onClick={() => setIsEditing(false)} className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        {t('common.cancel')}
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
                <span className="text-sm font-bold tracking-wide">{t('profile.tabs.identity')}</span>
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 border-b-2 pb-3 pt-2 transition-all ${activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-sm">shield</span>
                <span className="text-sm font-bold tracking-wide">{t('profile.tabs.security')}</span>
              </button>
              <button 
                onClick={() => setActiveTab('documents')}
                className={`flex items-center gap-2 border-b-2 pb-3 pt-2 transition-all ${activeTab === 'documents' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-sm">description</span>
                <span className="text-sm font-bold tracking-wide">{t('profile.docs.title')}</span>
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 border-b-2 pb-3 pt-2 transition-all ${activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <span className="material-symbols-outlined text-sm">settings</span>
                <span className="text-sm font-bold tracking-wide">{t('profile.tabs.settings')}</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm min-h-[400px]">
            
            {/* --- IDENTITY --- */}
            {activeTab === 'identity' && (
              <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
                 {/* Block 1 */}
                 <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">{t('profile.identity.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.identity.firstname')}</label>
                          {isEditing ? (
                              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={firstName} onChange={e => setFirstName(e.target.value)} />
                          ) : (
                              <p className="font-bold text-slate-900 dark:text-white">{firstName}</p>
                          )}
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.identity.lastname')}</label>
                           {isEditing ? (
                              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={lastName} onChange={e => setLastName(e.target.value)} />
                          ) : (
                              <p className="font-bold text-slate-900 dark:text-white">{lastName}</p>
                          )}
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.identity.dob')}</label>
                          <p className="font-medium text-slate-900 dark:text-white">14/05/1985</p>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.identity.nationality')}</label>
                          <p className="font-medium text-slate-900 dark:text-white">{t('profile.identity.nationality')} : {country}</p>
                       </div>
                    </div>
                 </div>

                 {/* Block 2 */}
                 <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">{t('profile.contact.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.contact.email')}</label>
                           {isEditing ? (
                              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={email} onChange={e => setEmail(e.target.value)} />
                          ) : (
                              <p className="font-bold text-slate-900 dark:text-white">{email}</p>
                          )}
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.contact.mobile')}</label>
                           {isEditing ? (
                              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={phone} onChange={e => setPhone(e.target.value)} />
                          ) : (
                              <p className="font-bold text-slate-900 dark:text-white">{phone}</p>
                          )}
                       </div>
                    </div>
                 </div>

                 {/* Block 3 */}
                 <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">{t('profile.fiscal.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.fiscal.address')}</label>
                           {isEditing ? (
                              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={address} onChange={e => setAddress(e.target.value)} />
                          ) : (
                              <p className="font-bold text-slate-900 dark:text-white">{address}</p>
                          )}
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.fiscal.zip')}</label>
                           {isEditing ? (
                              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={zipCode} onChange={e => setZipCode(e.target.value)} />
                          ) : (
                              <p className="font-bold text-slate-900 dark:text-white">{zipCode}</p>
                          )}
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.fiscal.city')}</label>
                           {isEditing ? (
                              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" value={city} onChange={e => setCity(e.target.value)} />
                          ) : (
                              <p className="font-bold text-slate-900 dark:text-white">{city}</p>
                          )}
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.fiscal.country')}</label>
                          <p className="font-medium text-slate-900 dark:text-white">{country}</p>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{t('profile.fiscal.tin')}</label>
                          <p className="font-mono text-slate-900 dark:text-white">FR 12 34567890123</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {/* --- SECURITY --- */}
            {activeTab === 'security' && (
               <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
                  {/* Auth */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">{t('profile.security.auth_title')}</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined">password</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">{t('profile.security.password')}</p>
                                    <p className="text-xs text-slate-500">{t('profile.security.modified')} 3 mois</p>
                                </div>
                            </div>
                            <button className="text-primary font-bold text-sm hover:underline">{t('common.edit')}</button>
                        </div>

                         <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined">pin</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">{t('profile.security.pin')}</p>
                                    <p className="text-xs text-slate-500">{t('profile.security.pin_desc')}</p>
                                </div>
                            </div>
                            <button onClick={() => setModalOpen('pin')} className="text-primary font-bold text-sm hover:underline">{t('common.edit')}</button>
                        </div>
                    </div>
                  </div>
                  
                  {/* Devices */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">{t('profile.security.devices_title')}</h3>
                    <div className="space-y-3">
                        {devices.map(device => (
                            <div key={device.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-3xl text-slate-400">{device.type === 'desktop' ? 'computer' : 'smartphone'}</span>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            {device.name}
                                            {device.isCurrent && <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">{t('profile.security.current')}</span>}
                                        </p>
                                        <p className="text-xs text-slate-500">{device.location} • {device.ip} • {device.lastActive}</p>
                                    </div>
                                </div>
                                {!device.isCurrent && (
                                    <button onClick={() => handleDeviceLogout(device.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined">logout</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                  </div>
               </div>
            )}

            {/* --- DOCUMENTS --- */}
            {activeTab === 'documents' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">{t('profile.docs.title')}</h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col gap-3 group hover:border-primary transition-colors cursor-pointer">
                         <div className="flex justify-between items-start">
                             <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">id_card</span>
                             <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase">{t('profile.docs.validated')}</span>
                         </div>
                         <p className="font-bold text-slate-900 dark:text-white">{t('profile.docs.id_front')}</p>
                         <p className="text-xs text-slate-500">CNI-RECTO.jpg • 2.4 MB</p>
                      </div>

                       <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col gap-3 group hover:border-primary transition-colors cursor-pointer">
                         <div className="flex justify-between items-start">
                             <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">id_card</span>
                             <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase">{t('profile.docs.validated')}</span>
                         </div>
                         <p className="font-bold text-slate-900 dark:text-white">{t('profile.docs.id_back')}</p>
                         <p className="text-xs text-slate-500">CNI-VERSO.jpg • 2.1 MB</p>
                      </div>

                       <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col gap-3 group hover:border-primary transition-colors cursor-pointer">
                         <div className="flex justify-between items-start">
                             <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">home_pin</span>
                             <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase">{t('profile.docs.validated')}</span>
                         </div>
                         <p className="font-bold text-slate-900 dark:text-white">{t('profile.docs.proof_address')}</p>
                         <p className="text-xs text-slate-500">EDF-OCT2023.pdf • 1.8 MB</p>
                      </div>

                       <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-primary hover:border-primary transition-colors cursor-pointer min-h-[140px]">
                           <span className="material-symbols-outlined text-3xl">add</span>
                           <span className="text-sm font-bold">{t('profile.docs.add_btn')}</span>
                       </div>
                   </div>
                </div>
            )}
            
            {/* --- SETTINGS --- */}
            {activeTab === 'settings' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">{t('profile.tabs.settings')}</h3>
                   
                   <button onClick={() => navigate('/settings')} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-slate-500">settings</span>
                         <span className="font-bold text-slate-900 dark:text-white">{t('nav.settings')}</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
                   </button>
                    <button onClick={() => navigate('/notifications')} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-slate-500">notifications</span>
                         <span className="font-bold text-slate-900 dark:text-white">{t('nav.notifications')}</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
                   </button>
                </div>
            )}

          </div>

          <footer className="mt-8 text-center text-xs text-slate-400 max-w-2xl mx-auto pb-8">
            {t('profile.footer')}
          </footer>
        </div>
      </main>

      {/* MODAL PIN */}
      {modalOpen === 'pin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-8 shadow-2xl">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t('profile.security.pin')}</h3>
                    <button onClick={() => setModalOpen(null)}><span className="material-symbols-outlined text-slate-400">close</span></button>
                 </div>
                 <form onSubmit={(e) => handleSubmitSecurity(e, 'pin')} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nouveau Code (4 chiffres)</label>
                        <input 
                            type="password" 
                            maxLength={4} 
                            required 
                            value={newPin} 
                            onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-center text-2xl tracking-[0.5em] font-bold text-slate-900 dark:text-white"
                        />
                    </div>
                    <button type="submit" disabled={isLoading || newPin.length !== 4} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-colors disabled:opacity-50">
                        {isLoading ? t('common.loading') : t('common.save')}
                    </button>
                 </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;