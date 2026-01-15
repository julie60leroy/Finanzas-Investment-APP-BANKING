import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Interfaces locales pour la page paramètres
interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'mobile';
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser, setLanguage, language, t } = useApp();
  const [activeTab, setActiveTab] = useState('region'); 

  // --- ETAT LOCAL POUR LA SÉCURITÉ ---
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'MacBook Pro (Chrome)', type: 'desktop', location: 'Paris, France', ip: '192.168.1.1', lastActive: "A l'instant", isCurrent: true },
    { id: '2', name: 'iPhone 15 Pro (App)', type: 'mobile', location: 'Lyon, France', ip: '82.12.155.xx', lastActive: 'Il y a 2h', isCurrent: false },
  ]);

  const [modalOpen, setModalOpen] = useState<'password' | 'pin' | 'phone' | null>(null);
  const [newPin, setNewPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const tabs = [
    { id: 'profile', label: t('settings.tabs.profile') },
    { id: 'security', label: t('settings.tabs.security') },
    { id: 'notifications', label: t('settings.tabs.notifications') },
    { id: 'region', label: t('settings.tabs.region') }
  ];

  const handleSubmitForm = (e: React.FormEvent, type: 'password' | 'pin' | 'phone') => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setModalOpen(null);
        let msg = "";
        if (type === 'password') msg = "Mot de passe modifié avec succès.";
        if (type === 'pin') {
            msg = "Code Secret (4 chiffres) mis à jour.";
            updateUser({ securityPin: newPin });
            setNewPin('');
        }
        if (type === 'phone') msg = "Téléphone de confiance vérifié.";
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(null), 3000);
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8 lg:p-12 relative">
      
      {successMsg && (
        <div className="fixed top-4 right-4 z-[60] bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-[slideIn_0.3s_ease-out]">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="font-bold">{successMsg}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-2">
            <button 
                onClick={() => navigate('/')} 
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors md:hidden"
            >
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{t('settings.title')}</h1>
        </div>
        <p className="text-slate-500 mb-10 pl-1 md:pl-0">{t('settings.subtitle')}</p>
        
        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-10 overflow-x-auto no-scrollbar gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-[fadeIn_0.3s_ease-out]">
          
          {/* --- TAB: LANGUES ET RÉGION --- */}
          {activeTab === 'region' && (
            <div className="space-y-12">
               <section>
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">{t('settings.region_section.lang_title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* FRANÇAIS */}
                    <div 
                        onClick={() => setLanguage('fr')}
                        className={`p-4 border-2 rounded-xl flex justify-between items-center cursor-pointer transition-all ${language === 'fr' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                    >
                        <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white"><span>🇫🇷</span> Français</div>
                        {language === 'fr' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </div>
                    
                    {/* ANGLAIS */}
                    <div 
                        onClick={() => setLanguage('en')}
                        className={`p-4 border-2 rounded-xl flex justify-between items-center cursor-pointer transition-all ${language === 'en' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                    >
                        <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white"><span>🇺🇸</span> English</div>
                        {language === 'en' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </div>
                </div>
                </section>
                <section>
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">{t('settings.region_section.currency_title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 border-2 border-primary bg-primary/5 rounded-xl cursor-pointer">
                    <p className="font-bold mb-1 text-slate-900 dark:text-white">Euro</p>
                    <p className="text-slate-500 text-xs">EUR (€)</p>
                    </div>
                    <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl opacity-70 hover:opacity-100 cursor-pointer bg-white dark:bg-slate-900">
                    <p className="font-bold mb-1 text-slate-900 dark:text-white">Dollar US</p>
                    <p className="text-slate-500 text-xs">USD ($)</p>
                    </div>
                </div>
                </section>
            </div>
          )}

          {/* --- TAB: SÉCURITÉ --- */}
          {activeTab === 'security' && (
             <div className="space-y-8">
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">Sécurité</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Gérez vos paramètres.</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">key</span>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Authentification</h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-600 dark:text-slate-400 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 size-12">
                                        <span className="material-symbols-outlined">password</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-slate-900 dark:text-white text-base font-bold">Mot de passe</p>
                                    </div>
                                </div>
                                <button onClick={() => setModalOpen('password')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">Modifier</button>
                            </div>
                        </div>
                </div>
             </div>
          )}

          {/* --- TAB: PROFIL (Link) --- */}
          {activeTab === 'profile' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                      <span className="material-symbols-outlined text-4xl">person</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Gérez votre Profil</h3>
                  <button onClick={() => navigate('/profile')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-700 transition-colors">Aller au Profil</button>
              </div>
          )}

           {/* --- TAB: NOTIFICATIONS (Link) --- */}
           {activeTab === 'notifications' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                      <span className="material-symbols-outlined text-4xl">notifications</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Centre de Notifications</h3>
                  <button onClick={() => navigate('/notifications')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-700 transition-colors">Gérer les Notifications</button>
              </div>
          )}
        </div>
      </div>
      
      {/* Modale Password */}
      {modalOpen === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg dark:text-white">Mot de passe</h3>
                    <button onClick={() => setModalOpen(null)}><span className="material-symbols-outlined text-slate-400">close</span></button>
                 </div>
                 <form onSubmit={(e) => handleSubmitForm(e, 'password')} className="space-y-4">
                    <input type="password" placeholder="Nouveau mot de passe" className="w-full rounded-xl border border-slate-200 p-3" />
                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold">Enregistrer</button>
                 </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;