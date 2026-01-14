import React from 'react';
import { useNavigate } from 'react-router-dom';

const VirementBeneficiaryPage: React.FC = () => {
  const navigate = useNavigate();

  const beneficiaries = [
    { 
      name: "Jean Dupont", 
      iban: "FR76 •••• •••• 1234", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyEK5dwziE9aWcUTJas99Q_e0VxQb6tnUMc01v3dSMnl9mv7L8zb6QJExhH-z_KNag1EqDOI8wrTHCIRb4YBtZzNf-H_RJiT6PKs8EQrGA7tA916Jj6V1_eiSuvlJKzF9wplGiaHl-gwswDLUrEYaU9lbJxiTmr-7pxfETzSSQkNC8xWOTFRqlyld9rVpeWJBAnpnTAHLv0cOdjvghr7LACVdAmeD7zG909zCCpKdcprvBb1_m_ENtld54D-iltQLQj75q26tGtBg",
      favorite: false
    },
    { 
      name: "Marie Lefebvre", 
      iban: "BE93 •••• •••• 8821", 
      icon: "person",
      favorite: true
    },
    { 
      name: "Thomas Muller", 
      iban: "DE42 •••• •••• 5678", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyEK5dwziE9aWcUTJas99Q_e0VxQb6tnUMc01v3dSMnl9mv7L8zb6QJExhH-z_KNag1EqDOI8wrTHCIRb4YBtZzNf-H_RJiT6PKs8EQrGA7tA916Jj6V1_eiSuvlJKzF9wplGiaHl-gwswDLUrEYaU9lbJxiTmr-7pxfETzSSQkNC8xWOTFRqlyld9rVpeWJBAnpnTAHLv0cOdjvghr7LACVdAmeD7zG909zCCpKdcprvBb1_m_ENtld54D-iltQLQj75q26tGtBg",
      favorite: false
    },
    { 
      name: "Sarah Williams", 
      iban: "GB12 •••• •••• 9900", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGg7_Lh0wYSya4uECacFBdzku7QnQLMBXnA4ikqVPrGk-vgW39rzABKZU3bkoFEaWVQ95T8aKYoebyA6RAqs5e6Eludgofy0ZtAIRTVXVUo3FOSCgTjrXBAoImKhekiDzr3BW3uQJY1iEq2DDTnmHGQMmYZe14JwLQqCHclXlcmgiT7Kyrfau6p99eLK-roxK8TVFH3IDKu4w801ty99qsrGe9e5PHmR8xYcQ39o2-QmKXod-i5NsxSFSofs_XQ73GLdxU8emEdeQ",
      favorite: false
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-4 py-8 lg:px-8 xl:px-40 overflow-y-auto">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              Virement International
            </h1>
            <p className="text-slate-500 text-lg">
              Étape 1 : Sélectionnez le destinataire de votre transfert.
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-16">
            <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto">
              <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-100 dark:bg-slate-800"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white dark:ring-background-dark">
                  <span className="text-sm font-bold">1</span>
                </div>
                <span className="absolute top-14 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">Bénéficiaire</span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400 ring-4 ring-white dark:ring-background-dark">
                  <span className="text-sm font-bold">2</span>
                </div>
                <span className="absolute top-14 text-sm font-medium text-slate-400 whitespace-nowrap">Montant</span>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400 ring-4 ring-white dark:ring-background-dark">
                  <span className="text-sm font-bold">3</span>
                </div>
                <span className="absolute top-14 text-sm font-medium text-slate-400 whitespace-nowrap">Sécurité</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-10">
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
                  />
                </div>
              </div>
              <button className="w-full md:w-auto whitespace-nowrap flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-white font-bold shadow-lg hover:bg-primary-hover transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">person_add</span>
                Ajouter un nouveau bénéficiaire
              </button>
            </div>

            {/* Beneficiaries Grid */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bénéficiaires favoris et récents</h3>
                <button className="text-sm font-semibold text-primary hover:underline">Voir tout</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {beneficiaries.map((b, i) => (
                  <div 
                    key={i} 
                    onClick={() => navigate('/virement-amount')}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer group"
                  >
                    {b.img ? (
                       <div 
                        className="size-14 overflow-hidden rounded-full border-2 border-slate-50 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 bg-center bg-cover"
                        style={{ backgroundImage: `url("${b.img}")` }}
                      ></div>
                    ) : (
                      <div className="size-14 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <span className="material-symbols-outlined text-3xl">person</span>
                      </div>
                    )}
                   
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{b.name}</p>
                        {b.favorite ? (
                           <span className="material-symbols-outlined text-yellow-400 text-lg icon-filled">star</span>
                        ) : (
                           <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-lg">star</span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-tight">{b.iban}</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-500 shadow-sm">
                <span className="material-symbols-outlined">info</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white">Virements hors zone SEPA</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Les virements internationaux peuvent prendre jusqu'à 3 jours ouvrables. Assurez-vous que les informations du bénéficiaire sont exactes pour éviter tout retard.
                </p>
              </div>
              <button className="text-sm font-bold text-slate-900 dark:text-white underline whitespace-nowrap">En savoir plus</button>
            </div>

            {/* Footer Help */}
            <div className="mt-12 flex items-center justify-center gap-2 py-4 border-t border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-slate-400">headset_mic</span>
              <span className="text-sm text-slate-500">
                Besoin d'aide pour votre virement ? <a className="font-medium text-slate-900 dark:text-white hover:underline" href="#">Contacter le support</a>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VirementBeneficiaryPage;