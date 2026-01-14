import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Finanzas Investment</h2>
          </div>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors" href="#">Tableau de bord</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors" href="#">Portefeuille</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors" href="#">Marchés</a>
            <a className="text-primary text-sm font-bold border-b-2 border-primary pb-0.5" href="#">Mon Profil</a>
          </nav>
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button className="flex size-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <button className="flex size-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </button>
            </div>
            <div className="relative group cursor-pointer">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-gray-200 dark:border-slate-700" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVlfU9LT1bKOu6YiRJpGLlYM55G-ROq-Imcg0n3XaiPz4Iy8P0pdTm5EyTVq2q_KvY4VmF8wY8R_AmHux0K5GK8c-otO4U9RIjF6TrgtAREMs_IOy6l3zZTlPjAdvDPs4fEHnhG8BryjrP3x0xqqLOYgPVENwGW31j510yl19aLhKoSBSGfp5aZuZxHpxmk7w-Gooz3SRg_KEuZzIcqZrlO9xvqN5vm5kBZNPnox4vUcYIM-5BGb5N2taHq1n25De6od-5WYssKEg")'}}
              ></div>
              <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Heading */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight mb-2">Mon Profil</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">
              Gérez vos informations personnelles, vos préférences de contact et vos documents de conformité (KYC).
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/80 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">history</span>
              Historique
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Enregistrer les modifications
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="mb-8 rounded-xl bg-white dark:bg-slate-900 p-5 border border-emerald-100 dark:border-emerald-900/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
            <span className="material-symbols-outlined icon-filled">verified_user</span>
          </div>
          <div className="flex-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Compte Vérifié (Niveau 2)</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Votre identité a été validée avec succès. Vous avez accès à l'ensemble des fonctionnalités d'investissement, y compris les retraits illimités.
            </p>
          </div>
          <button className="mt-4 sm:mt-0 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors whitespace-nowrap">
            Voir les limites
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Identity Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">badge</span>
                <h3 className="text-slate-800 dark:text-white font-bold text-base">Identité</h3>
              </div>
              <button className="text-primary hover:text-primary-hover p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="col-span-1">
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Nom</p>
                <p className="text-slate-900 dark:text-white font-medium">Dupont</p>
              </div>
              <div className="col-span-1">
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Prénom</p>
                <p className="text-slate-900 dark:text-white font-medium">Jean</p>
              </div>
              <div className="col-span-1">
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Date de naissance</p>
                <p className="text-slate-900 dark:text-white font-medium">14/05/1985</p>
              </div>
              <div className="col-span-1">
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Nationalité</p>
                <div className="flex items-center gap-2">
                  <img alt="French Flag" className="h-4 w-auto rounded-sm shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa2WKruaOSH3ONDfu-_w6RnfUBQB-CFmAKkNKB_1c-c83UhFHFQamw3qvC3E5te9dA4P5NMTVDcxbY8927eVlOiCmvi4kyKjS2AwecNltglEIIscoq70xKP-7gIW4s9cTF8IB8Oa9uR6-0O4n32Bx9vwJjVMNwu2NCHS-6Jl4j9sBK-yTsXG9NxBH_ec2INVKKf4ZP2U36wpXZkAHubBbDZE-msvJQCE0QGg-yNbyMCOAdD2tnFSm9XSBUuxxG6e6x7Wnlh3zcPbY"/>
                  <p className="text-slate-900 dark:text-white font-medium">Française</p>
                </div>
              </div>
              <div className="col-span-2 pt-2 border-t border-dashed border-gray-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Numéro Fiscal (NIF)</p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-[16px]">lock</span>
                  <p className="text-slate-900 dark:text-white font-mono text-sm">FR 89 ••••• 9823</p>
                  <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[16px]">visibility</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">contact_mail</span>
                <h3 className="text-slate-800 dark:text-white font-bold text-base">Coordonnées</h3>
              </div>
              <button className="text-primary hover:text-primary-hover p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider">Adresse E-mail</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/30">
                    <span className="material-symbols-outlined text-[12px] icon-filled">check_circle</span> Vérifié
                  </span>
                </div>
                <p className="text-slate-900 dark:text-white font-medium">jean.dupont@email.com</p>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider">Téléphone mobile</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-500/30">
                    <span className="material-symbols-outlined text-[12px]">shield_lock</span> SCA Activé
                  </span>
                </div>
                <p className="text-slate-900 dark:text-white font-medium font-mono">+33 6 12 •• •• 78</p>
              </div>
              <div className="pt-2 border-t border-dashed border-gray-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Préférences de communication</p>
                <p className="text-slate-900 dark:text-white text-sm">Notifications de sécurité, Rapports mensuels</p>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">home_pin</span>
                <h3 className="text-slate-800 dark:text-white font-bold text-base">Adresse Fiscale</h3>
              </div>
              <button className="text-primary hover:text-primary-hover p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div 
                  className="h-20 w-20 shrink-0 rounded-lg bg-gray-100 dark:bg-slate-800 overflow-hidden bg-cover bg-center" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0xEFdA_bm0PdbU7szKpONWJALDKoj6Dl19ONQX1rfP9VfyOa8yk8oCEGFNNsppRtAhKWKDZyreXD0-xzIs98pIo3Xk8sNAIcYww2zI5QfmZDuB-LhS0_8Bd4qLPYXKEo92Wu_cc6GSdDFiB5rrL7gZmjOj-8pdlJYoMREIKhqFpW5mWZDh26qMObTOAnnO-eV0SwjZPHnWGa1ApTIW-kvnqRJZGFd-jsdlyqDONBlT99nydE5I7uxOKfgPK96n-Kt0d_z7JSB76c")'}}
                ></div>
                <div className="flex-1">
                  <p className="text-slate-900 dark:text-white font-medium leading-relaxed">
                    14 Avenue des Champs-Élysées<br/>
                    Bâtiment B, 3ème étage<br/>
                    75008 Paris<br/>
                    France
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20">Résidence principale</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">work</span>
                <h3 className="text-slate-800 dark:text-white font-bold text-base">Informations Professionnelles</h3>
              </div>
              <button className="text-primary hover:text-primary-hover p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Situation professionnelle</p>
                <p className="text-slate-900 dark:text-white font-medium">Cadre Supérieur</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Secteur d'activité</p>
                <p className="text-slate-900 dark:text-white font-medium">Finance & Banque</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Revenu annuel estimé</p>
                <p className="text-slate-900 dark:text-white font-medium">80k - 120k €</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold tracking-wider mb-1">Origine des fonds</p>
                <p className="text-slate-900 dark:text-white font-medium">Salaires, Épargne</p>
              </div>
            </div>
          </div>

        </div>

        {/* Documents Section */}
        <section className="mb-10">
          <div className="flex justify-between items-end mb-4 px-1">
            <div>
              <h3 className="text-slate-900 dark:text-white text-xl font-bold">Documents Justificatifs</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Gérez les documents utilisés pour vérifier votre identité.</p>
            </div>
            <button className="text-primary text-sm font-semibold hover:text-primary-hover flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">add_circle</span> Ajouter un document
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
                <thead className="bg-gray-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider" scope="col">Type de document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider" scope="col">Date d'envoi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider" scope="col">Statut</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider" scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 size-8 bg-red-50 dark:bg-red-900/20 text-red-500 rounded flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Passeport Européen</div>
                          <div className="text-sm text-gray-500 dark:text-slate-500">passeport_scan_2023.pdf</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">12 Oct 2023</div>
                      <div className="text-xs text-gray-500 dark:text-slate-500">Exp. 14 Mai 2030</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-900/20 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30">
                        Validé
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-slate-400 hover:text-primary mx-2"><span className="material-symbols-outlined">visibility</span></button>
                      <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">download</span></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 size-8 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px]">image</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Justificatif de domicile</div>
                          <div className="text-sm text-gray-500 dark:text-slate-500">facture_edf_octobre.jpg</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">14 Oct 2023</div>
                      <div className="text-xs text-gray-500 dark:text-slate-500">Moins de 3 mois</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-400 ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-500/30">
                        En cours de révision
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-slate-400 hover:text-primary mx-2"><span className="material-symbols-outlined">visibility</span></button>
                      <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">delete</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer / Disclaimer */}
        <footer className="border-t border-gray-200 dark:border-slate-800 pt-6 mt-12 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
            <p>© 2023 Finanzas Investment. Tous droits réservés.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors" href="#">Politique de confidentialité</a>
              <a className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors" href="#">Conditions générales</a>
              <a className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors" href="#">Sécurité</a>
            </div>
          </div>
          <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-4 text-center md:text-left">
            Finanzas Investment est réglementée par l'Autorité des Marchés Financiers (AMF). Vos données sont cryptées et stockées conformément aux normes RGPD.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default ProfilePage;