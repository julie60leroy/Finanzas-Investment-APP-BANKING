import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, CURRENCIES } from '../context/AppContext';

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
  const { user, updateUser, setLanguage, language, t, setCurrency, currency } = useApp();
  const [activeTab, setActiveTab] = useState('region'); 

  // --- ETAT LOCAL POUR LA SÉCURITÉ ---
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
      // Met à jour les devices avec les traductions quand la langue change
      setDevices([
        { id: '1', name: 'MacBook Pro (Chrome)', type: 'desktop', location: 'Paris, France', ip: '192.168.1.1', lastActive: t('common.unknown') === 'Unknown' ? "Just now" : "A l'instant", isCurrent: true },
        { id: '2', name: 'iPhone 15 Pro (App)', type: 'mobile', location: 'Lyon, France', ip: '82.12.155.xx', lastActive: t('common.unknown') === 'Unknown' ? "2h ago" : 'Il y a 2h', isCurrent: false },
      ]);
  }, [language, t]);

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
        if (type === 'password') msg = t('common.success');
        if (type === 'pin') {
            msg = t('common.success');
            updateUser({ securityPin: newPin });
            setNewPin('');
        }
        if (type === 'phone') msg = t('common.success');
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(null), 3000);
    }, 1000);
  };

  const handleCurrencySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrency(e.target.value);
      setSuccessMsg(t('common.success'));
      setTimeout(() => setSuccessMsg(null), 3000);
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                    {/* ESPAGNOL */}
                    <div 
                        onClick={() => setLanguage('es')}
                        className={`p-4 border-2 rounded-xl flex justify-between items-center cursor-pointer transition-all ${language === 'es' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                    >
                        <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white"><span>🇪🇸</span> Español</div>
                        {language === 'es' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </div>

                    {/* ALLEMAND */}
                    <div 
                        onClick={() => setLanguage('de')}
                        className={`p-4 border-2 rounded-xl flex justify-between items-center cursor-pointer transition-all ${language === 'de' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                    >
                        <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white"><span>🇩🇪</span> Deutsch</div>
                        {language === 'de' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </div>

                    {/* PORTUGAIS */}
                    <div 
                        onClick={() => setLanguage('pt')}
                        className={`p-4 border-2 rounded-xl flex justify-between items-center cursor-pointer transition-all ${language === 'pt' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                    >
                        <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white"><span>🇵🇹</span> Português</div>
                        {language === 'pt' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </div>

                    {/* ITALIEN */}
                    <div 
                        onClick={() => setLanguage('it')}
                        className={`p-4 border-2 rounded-xl flex justify-between items-center cursor-pointer transition-all ${language === 'it' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                    >
                        <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white"><span>🇮🇹</span> Italiano</div>
                        {language === 'it' && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </div>
                </div>
                </section>
                <section>
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">{t('settings.region_section.currency_title')}</h2>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-500">payments</span>
                    </div>
                    <select
                        value={currency}
                        onChange={handleCurrencySelect}
                        className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-bold text-slate-900 dark:text-white focus:ring-primary focus:border-primary appearance-none cursor-pointer hover:border-primary/50 transition-colors"
                    >
                        {CURRENCIES.map((cur) => (
                            <option key={cur.code} value={cur.code}>
                                {cur.flag} &nbsp; {cur.code} - {cur.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-500">expand_more</span>
                    </div>
                </div>
                <p className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Les montants seront automatiquement convertis au taux du marché actuel.
                </p>
                </section>
            </div>
          )}

          {/* ... (Autres onglets inchangés) ... */}
          {/* --- TAB: SÉCURITÉ --- */}
          {activeTab === 'security' && (
             <div className="space-y-8">
                {/* ... content ... */}
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">{t('settings.tabs.security')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">{t('settings.subtitle')}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">key</span>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">{t('profile.security.auth_title')}</h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-600 dark:text-slate-400 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 size-12">
                                        <span className="material-symbols-outlined">password</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-slate-900 dark:text-white text-base font-bold">{t('profile.security.password')}</p>
                                    </div>
                                </div>
                                <button onClick={() => setModalOpen('password')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">{t('common.edit')}</button>
                            </div>
                        </div>
                </div>
             </div>
          )}

          {/* ... (Liens Tabs Profile/Notifications inchangés) ... */}
          {activeTab === 'profile' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                      <span className="material-symbols-outlined text-4xl">person</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('profile.title')}</h3>
                  <button onClick={() => navigate('/profile')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-700 transition-colors">{t('common.see_all')}</button>
              </div>
          )}

           {activeTab === 'notifications' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                      <span className="material-symbols-outlined text-4xl">notifications</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('notifications.title')}</h3>
                  <button onClick={() => navigate('/notifications')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-700 transition-colors">{t('common.edit')}</button>
              </div>
          )}
        </div>
      </div>
      
      {/* Modale Password */}
      {modalOpen === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg dark:text-white">{t('profile.security.password')}</h3>
                    <button onClick={() => setModalOpen(null)}><span className="material-symbols-outlined text-slate-400">close</span></button>
                 </div>
                 <form onSubmit={(e) => handleSubmitForm(e, 'password')} className="space-y-4">
                    <input type="password" placeholder="******" className="w-full rounded-xl border border-slate-200 p-3" />
                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold">{t('common.save')}</button>
                 </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;