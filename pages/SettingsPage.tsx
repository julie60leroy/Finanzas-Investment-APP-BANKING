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

interface SecurityLog {
  id: string;
  event: string;
  status: 'success' | 'warning' | 'error';
  date: string;
  details: string;
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser, pushNotification } = useApp(); // Utilisation hypothétique de pushNotification si disponible dans le contexte, sinon on gère localement
  const [activeTab, setActiveTab] = useState('Sécurité');

  // --- ETAT LOCAL POUR LA SÉCURITÉ ---
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'MacBook Pro (Chrome)', type: 'desktop', location: 'Paris, France', ip: '192.168.1.1', lastActive: "A l'instant", isCurrent: true },
    { id: '2', name: 'iPhone 15 Pro (App)', type: 'mobile', location: 'Lyon, France', ip: '82.12.155.xx', lastActive: 'Il y a 2h', isCurrent: false },
  ]);

  const [logs, setLogs] = useState<SecurityLog[]>([
    { id: '1', event: 'Connexion réussie', status: 'success', date: "Aujourd'hui, 09:41", details: 'Navigateur Chrome sur macOS, Paris' },
    { id: '2', event: 'Changement de mot de passe', status: 'system', date: '15 Oct 2023, 14:20', details: 'Action effectuée via le Téléphone de confiance' } as any, // Cast pour éviter erreur de typage stricte sur le mock existant
    { id: '3', event: 'Échec de connexion détecté', status: 'error', date: '12 Oct 2023, 03:12', details: "Tentative infructueuse depuis Londres, UK." },
  ]);

  // Modales
  const [modalOpen, setModalOpen] = useState<'password' | 'pin' | 'phone' | null>(null);
  const [formData, setFormData] = useState({ old: '', new: '', confirm: '' });
  const [newPin, setNewPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const tabs = ['Profil', 'Sécurité', 'Notifications', 'Langues et Région'];

  // --- ACTIONS ---

  const handleDeviceLogout = (id: string) => {
    setDevices(devices.filter(d => d.id !== id));
    addLog('Déconnexion appareil distant', 'success', "L'appareil a été révoqué avec succès.");
  };

  const handleLogoutAll = () => {
    setDevices(devices.filter(d => d.isCurrent));
    addLog('Déconnexion globale', 'warning', "Tous les autres appareils ont été déconnectés.");
  };

  const addLog = (event: string, status: 'success' | 'warning' | 'error', details: string) => {
    const newLog: SecurityLog = {
        id: Date.now().toString(),
        event,
        status,
        date: "A l'instant",
        details
    };
    setLogs([newLog, ...logs]);
  };

  const handleSubmitForm = (e: React.FormEvent, type: 'password' | 'pin' | 'phone') => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation API
    setTimeout(() => {
        setIsLoading(false);
        setModalOpen(null);
        setFormData({ old: '', new: '', confirm: '' });
        
        let msg = "";
        if (type === 'password') msg = "Mot de passe modifié avec succès.";
        if (type === 'pin') {
            msg = "Code Secret (4 chiffres) mis à jour.";
            updateUser({ securityPin: newPin }); // Sauvegarde dans le contexte
            setNewPin('');
        }
        if (type === 'phone') msg = "Téléphone de confiance vérifié.";
        
        addLog(type === 'password' ? 'Changement mot de passe' : (type === 'pin' ? 'Changement code PIN' : 'Mise à jour SCA'), 'success', msg);
        
        // Show temporary success banner
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(null), 3000);
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8 lg:p-12 relative">
      
      {/* Success Toast */}
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
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Paramètres</h1>
        </div>
        <p className="text-slate-500 mb-10 pl-1 md:pl-0">Gérez vos préférences et votre sécurité.</p>
        
        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-10 overflow-x-auto no-scrollbar gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-[fadeIn_0.3s_ease-out]">
          
          {/* --- TAB: LANGUES ET RÉGION (Existing) --- */}
          {activeTab === 'Langues et Région' && (
            <div className="space-y-12">
               <section>
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Langue de l'interface</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex justify-between items-center cursor-pointer">
                    <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white">
                        <span>🇫🇷</span> Français
                    </div>
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    </div>
                    <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex justify-between items-center opacity-70 hover:opacity-100 cursor-pointer bg-white dark:bg-slate-900">
                    <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white">
                        <span>🇺🇸</span> Anglais
                    </div>
                    </div>
                    <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex justify-between items-center opacity-70 hover:opacity-100 cursor-pointer bg-white dark:bg-slate-900">
                    <div className="flex gap-3 text-sm font-bold text-slate-900 dark:text-white">
                        <span>🇪🇸</span> Espagnol
                    </div>
                    </div>
                </div>
                </section>
                <section>
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Devise de référence</h2>
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
          {activeTab === 'Sécurité' && (
             <div className="space-y-8">
                {/* Header of Security Section */}
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">Sécurité et Contrôle d'Accès</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Gérez vos paramètres d'authentification et surveillez l'activité de votre compte.</p>
                    </div>
                    <button className="flex items-center gap-2 px-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary text-sm font-bold rounded-lg h-11 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-lg">help</span>
                        <span>Aide Sécurité</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Authentification */}
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
                                        <p className="text-slate-500 text-sm">Dernière modification il y a 3 mois</p>
                                    </div>
                                </div>
                                <button onClick={() => setModalOpen('password')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">Modifier</button>
                            </div>
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-600 dark:text-slate-400 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 size-12">
                                        <span className="material-symbols-outlined">dialpad</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-slate-900 dark:text-white text-base font-bold">Code secret</p>
                                        <p className="text-slate-500 text-sm">Utilisé pour valider les virements</p>
                                    </div>
                                </div>
                                <button onClick={() => setModalOpen('pin')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">Gérer</button>
                            </div>
                        </div>
                    </div>

                    {/* SCA - BIOMETRIE SUPPRIMÉE */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">security</span>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Authentification Forte (SCA)</h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {/* Section Biométrie supprimée selon demande */}
                            
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-600 dark:text-slate-400 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 size-12">
                                        <span className="material-symbols-outlined">smartphone</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-slate-900 dark:text-white text-base font-bold">Téléphone de confiance</p>
                                        <p className="text-slate-500 text-sm">iPhone de Jean (+33 6 •• •• •• 89)</p>
                                    </div>
                                </div>
                                <button onClick={() => setModalOpen('phone')} className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">Gérer</button>
                            </div>

                            {/* Ajout d'une info SCA pour combler l'espace */}
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                                <div className="flex gap-3">
                                    <span className="material-symbols-outlined text-slate-400">info</span>
                                    <p className="text-sm text-slate-500">L'authentification à deux facteurs est obligatoire pour toutes les transactions sortantes et modifications de profil.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Appareils Connectés */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">devices</span>
                                <h3 className="text-slate-900 dark:text-white text-lg font-bold">Appareils Connectés</h3>
                            </div>
                            <button onClick={handleLogoutAll} className="text-primary text-sm font-bold hover:underline">Se déconnecter partout</button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {devices.map(device => (
                                    <div 
                                        key={device.id}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                            device.isCurrent 
                                            ? 'border-primary/30 bg-primary/5' 
                                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-lg shadow-sm ${device.isCurrent ? 'bg-white dark:bg-slate-800 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                                <span className="material-symbols-outlined">{device.type === 'desktop' ? 'laptop_mac' : 'smartphone'}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-slate-900 dark:text-white font-bold text-sm">{device.name}</p>
                                                    {device.isCurrent && (
                                                        <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Actuel</span>
                                                    )}
                                                </div>
                                                <p className="text-slate-500 text-xs">{device.location} • {device.isCurrent ? device.ip : device.lastActive}</p>
                                            </div>
                                        </div>
                                        {device.isCurrent ? (
                                            <span className="text-green-500 material-symbols-outlined icon-filled">check_circle</span>
                                        ) : (
                                            <button onClick={() => handleDeviceLogout(device.id)} className="text-slate-400 hover:text-red-500 transition-colors" title="Déconnecter">
                                                <span className="material-symbols-outlined text-xl">logout</span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Journal de Sécurité */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">history_edu</span>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Journal de Sécurité</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                {logs.map((log) => (
                                    <div key={log.id} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className={`size-2.5 rounded-full mt-1.5 shadow-[0_0_8px] ${
                                                log.status === 'success' ? 'bg-green-500 shadow-green-500/40' : 
                                                log.status === 'error' ? 'bg-red-500 shadow-red-500/40' : 
                                                'bg-primary shadow-primary/40'
                                            }`}></div>
                                            <div className="w-px h-full bg-slate-100 dark:bg-slate-800 mt-2 group-last:hidden"></div>
                                        </div>
                                        <div className="flex-1 pb-4 group-last:pb-0">
                                            <div className="flex justify-between items-start">
                                                <p className={`text-sm font-bold ${
                                                    log.status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
                                                }`}>
                                                    {log.event}
                                                </p>
                                                <span className="text-slate-400 text-xs font-medium">{log.date}</span>
                                            </div>
                                            <p className="text-slate-500 text-xs mt-1">{log.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                                <button className="text-primary text-sm font-bold hover:underline">Voir tout l'historique</button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          )}

          {/* --- TAB: PROFIL (Link) --- */}
          {activeTab === 'Profil' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                      <span className="material-symbols-outlined text-4xl">person</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Gérez votre Profil</h3>
                  <p className="text-slate-500 max-w-md mb-6">Modifiez vos informations personnelles directement depuis la page dédiée.</p>
                  <button onClick={() => navigate('/profile')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-700 transition-colors">Aller au Profil</button>
              </div>
          )}

           {/* --- TAB: NOTIFICATIONS (Link) --- */}
           {activeTab === 'Notifications' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                      <span className="material-symbols-outlined text-4xl">notifications</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Centre de Notifications</h3>
                  <p className="text-slate-500 max-w-md mb-6">Configurez vos préférences d'alertes et consultez votre historique.</p>
                  <button onClick={() => navigate('/notifications')} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-700 transition-colors">Gérer les Notifications</button>
              </div>
          )}
        </div>
      </div>

      {/* --- MODALES DE SÉCURITÉ (inchangées) --- */}
      {/* ... (Modals remain the same as previous file) */}
      
      {/* 1. Password Modal */}
      {modalOpen === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Modifier le mot de passe</h3>
                    <button onClick={() => setModalOpen(null)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                </div>
                <form onSubmit={(e) => handleSubmitForm(e, 'password')} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Mot de passe actuel</label>
                        <input type="password" required className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nouveau mot de passe</label>
                        <input type="password" required className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Confirmer</label>
                        <input type="password" required className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-white" />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4 hover:bg-primary-hover transition-colors flex justify-center">
                        {isLoading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Enregistrer'}
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* 2. PIN Modal */}
      {modalOpen === 'pin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-8 shadow-2xl text-center">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
                    <span className="material-symbols-outlined text-3xl">dialpad</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Code Secret</h3>
                <p className="text-sm text-slate-500 mb-6">Définissez un code à 4 chiffres pour valider vos opérations de virement.</p>
                <form onSubmit={(e) => handleSubmitForm(e, 'pin')} className="space-y-4">
                    <input 
                        type="text" 
                        maxLength={4} 
                        placeholder="----" 
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))} // Chiffres uniquement
                        className="w-full text-center text-3xl tracking-[0.5em] font-black rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-slate-900 dark:text-white" 
                        required 
                    />
                    <button type="submit" disabled={isLoading || newPin.length !== 4} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? '...' : 'Définir le code'}
                    </button>
                    <button type="button" onClick={() => setModalOpen(null)} className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Annuler</button>
                </form>
            </div>
        </div>
      )}

      {/* 3. Phone Modal */}
      {modalOpen === 'phone' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Téléphone de Confiance</h3>
                    <button onClick={() => setModalOpen(null)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 mb-6">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">phonelink_lock</span>
                    <p className="text-xs text-blue-800 dark:text-blue-200">Ce numéro recevra les codes de validation (OTP) pour les opérations sensibles.</p>
                </div>
                <form onSubmit={(e) => handleSubmitForm(e, 'phone')} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Numéro de mobile</label>
                        <input type="tel" defaultValue="+33 6 12 34 56 78" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-white font-mono" />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors flex justify-center">
                        {isLoading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Vérifier ce numéro'}
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default SettingsPage;