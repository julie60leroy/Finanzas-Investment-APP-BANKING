import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-full font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
       <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-3 shadow-sm">
           <div className="max-w-7xl mx-auto flex items-center justify-between">
               <Link to="/" className="flex items-center gap-3 md:hidden">
                   <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                       <span className="material-symbols-outlined">account_balance</span>
                   </div>
                   <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Finanzas Investment</h2>
               </Link>
               
               <nav className="hidden md:flex items-center gap-8">
                   <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors">Tableau de bord</Link>
                   <span className="text-primary text-sm font-bold border-b-2 border-primary pb-0.5">Mon Profil</span>
               </nav>

               <div className="flex items-center gap-4 ml-auto">
                   <div 
                     className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-gray-200 dark:border-slate-700" 
                     style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVlfU9LT1bKOu6YiRJpGLlYM55G-ROq-Imcg0n3XaiPz4Iy8P0pdTm5EyTVq2q_KvY4VmF8wY8R_AmHux0K5GK8c-otO4U9RIjF6TrgtAREMs_IOy6l3zZTlPjAdvDPs4fEHnhG8BryjrP3x0xqqLOYgPVENwGW31j510yl19aLhKoSBSGfp5aZuZxHpxmk7w-Gooz3SRg_KEuZzIcqZrlO9xvqN5vm5kBZNPnox4vUcYIM-5BGb5N2taHq1n25De6od-5WYssKEg')"}}
                   ></div>
               </div>
           </div>
       </header>

       <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                   <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight mb-2">Mon Profil</h1>
               </div>
           </div>

           <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 p-5 border border-emerald-100 dark:border-emerald-900/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
               <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                   <span className="material-symbols-outlined icon-filled">verified_user</span>
               </div>
               <div className="flex-1">
                   <h3 className="text-slate-900 dark:text-white text-lg font-bold">Compte Vérifié (Niveau 2)</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Votre identité a été validée avec succès.</p>
               </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
               <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col">
                   <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                       <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-slate-400">badge</span>
                           <h3 className="text-slate-800 dark:text-white font-bold text-base">Identité</h3>
                       </div>
                   </div>
                   <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
                       <div className="col-span-1">
                           <p className="text-slate-500 text-xs uppercase font-semibold tracking-wider mb-1">Nom</p>
                           <p className="text-slate-900 dark:text-white font-medium">Dupont</p>
                       </div>
                       <div className="col-span-1">
                           <p className="text-slate-500 text-xs uppercase font-semibold tracking-wider mb-1">Prénom</p>
                           <p className="text-slate-900 dark:text-white font-medium">Jean</p>
                       </div>
                   </div>
               </div>
           </div>
       </main>
    </div>
  );
};

export default ProfilePage;