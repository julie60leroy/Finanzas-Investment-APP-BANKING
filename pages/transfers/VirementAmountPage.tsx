import React from 'react';
import { useNavigate } from 'react-router-dom';

const VirementAmountPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 px-4 py-8 lg:px-8 xl:px-40 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white lg:text-4xl">Virement International</h1>
          <p className="text-slate-500 text-lg">Envoyez des fonds en toute sécurité vers l'étranger.</p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-100 dark:bg-slate-800"></div>
            
            {/* Active Line (First Half) */}
            <div className="absolute left-0 top-1/2 h-0.5 w-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-200 to-primary"></div>

            {/* Step 1: Completed */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm ring-4 ring-white dark:ring-background-dark">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </div>
              <span className="absolute top-14 text-sm font-medium text-slate-500 whitespace-nowrap">Bénéficiaire</span>
            </div>

            {/* Step 2: Active */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white dark:ring-background-dark">
                <span className="text-sm font-bold">2</span>
              </div>
              <span className="absolute top-14 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">Montant et Devises</span>
            </div>

            {/* Step 3: Pending */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400 ring-4 ring-white dark:ring-background-dark">
                <span className="text-sm font-bold">3</span>
              </div>
              <span className="absolute top-14 text-sm font-medium text-slate-400 whitespace-nowrap">Sécurité</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Left Column: Conversion Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800">
              
              {/* Source Amount */}
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-slate-500">Vous envoyez</label>
                <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all p-1">
                  <input 
                    className="w-full bg-transparent border-none px-4 py-4 text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-300 focus:ring-0" 
                    placeholder="0.00" 
                    type="number" 
                    defaultValue="1000"
                  />
                  <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-2 mr-1 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600 shadow-sm transition-colors">
                    <div className="size-6 overflow-hidden rounded-full bg-slate-200 bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrJbUIjNWHX6eGPoZ-BCEyuhNayCNI1VwPZeYYkFCnDvUvqod3swFJvYNqq_g0QhF9_VEJLsx1VlKT_tjrxWTBHjsX-SQhdmRaMBwO-Wz-Yl-VOiW56iwGoWXBftrffdaUwcs6N5kWSxDlayZQNvjjeMeYRCl-vpjH2js5RF-tJGOOKy4N5QjRyiI3pcwsOkUpLMTXkQ7BB1L1bpHSALrYUP88WmC9GrouEvT2vLpAeQp7nJzlsb3by7RJ8QUoIrwoWIK96EWeofs")'}}></div>
                    <span className="font-bold text-slate-900 dark:text-white">EUR</span>
                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Conversion Details (Vertical Line) */}
              <div className="relative pl-8 my-4 py-2">
                <div className="absolute left-[1.6rem] top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
                <div className="flex flex-col gap-4">
                  {/* Fee */}
                  <div className="flex items-center justify-between group">
                    <div className="absolute left-[1.35rem] size-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">4.52 EUR</span>
                      <span className="text-sm text-slate-400">Frais de virement</span>
                    </div>
                  </div>
                  {/* Converted Amount */}
                  <div className="flex items-center justify-between">
                    <div className="absolute left-[1.35rem] size-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">drag_handle</span>
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">995.48 EUR</span>
                      <span className="text-sm text-slate-400">Montant converti</span>
                    </div>
                  </div>
                  {/* Rate */}
                  <div className="flex items-center justify-between">
                    <div className="absolute left-[1.35rem] size-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                    <div className="flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </div>
                      <span className="text-sm font-bold text-primary">1.0842</span>
                      <span className="text-sm text-slate-500">Taux de change garanti (24h)</span>
                      <span className="material-symbols-outlined text-[16px] text-primary cursor-help" title="Taux en temps réel">info</span>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">Voir graphique</button>
                  </div>
                </div>
              </div>

              {/* Destination Amount */}
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-slate-500">Le bénéficiaire reçoit</label>
                <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all p-1">
                  <input 
                    className="w-full bg-transparent border-none px-4 py-4 text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-300 focus:ring-0" 
                    readOnly 
                    type="number" 
                    value="1079.30"
                  />
                  <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-2 mr-1 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600 shadow-sm transition-colors">
                    <div className="size-6 overflow-hidden rounded-full bg-slate-200 bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvvZ2_d_Fk-rAfBUJnBoHx3XkjzsENeB7xCganDGdQ7_3n71GI93Jik_AWGJVwCqY_DJ7BG3N284BOFAjkUPOtzqQWIf6kAxgJtYOv8KfTG4Bb4dQT36n2PZY5FDacwHv00Frr1OjJYXzyfz1t_jQaVDQrr6IGMs-cmdXXJCp-REIf5WfdmF79H2ZHiz8Q_O6fhE8-9oMsBWA1U6B0SfjYXhYv3EeIDwa5FTh-84rd_E-EvYhs1qSe3QgS1O-Qs73FU8kkWmeq86g")'}}></div>
                    <span className="font-bold text-slate-900 dark:text-white">USD</span>
                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Arrival Time */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800 p-3 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">calendar_today</span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Arrivée estimée</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">Demain, le 14 Octobre</span>
                    </div>
                  </div>
                </div>

                {/* Main CTA */}
                <button 
                  onClick={() => navigate('/virement-confirm')}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-4 text-white shadow-lg transition-all hover:bg-primary-hover active:scale-[0.98]"
                >
                  <span className="text-lg font-bold">Valider le transfert</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
                <p className="text-center text-xs text-slate-400">En cliquant sur valider, vous acceptez les <a className="text-slate-600 dark:text-slate-300 underline hover:text-slate-900" href="#">conditions générales</a> de Finanzas.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Beneficiary & Security */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Beneficiary Card */}
            <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Bénéficiaire</h3>
                <button 
                  onClick={() => navigate('/virement-beneficiary')}
                  className="text-xs font-semibold text-primary hover:text-red-700"
                >
                  Modifier
                </button>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-slate-100 dark:border-slate-700 bg-slate-100 bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyEK5dwziE9aWcUTJas99Q_e0VxQb6tnUMc01v3dSMnl9mv7L8zb6QJExhH-z_KNag1EqDOI8wrTHCIRb4YBtZzNf-H_RJiT6PKs8EQrGA7tA916Jj6V1_eiSuvlJKzF9wplGiaHl-gwswDLUrEYaU9lbJxiTmr-7pxfETzSSQkNC8xWOTFRqlyld9rVpeWJBAnpnTAHLv0cOdjvghr7LACVdAmeD7zG909zCCpKdcprvBb1_m_ENtld54D-iltQLQj75q26tGtBg")'}}></div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Jean Dupont</p>
                  <p className="text-sm text-slate-500">Compte Personnel • USA</p>
                  <div className="mt-1 flex items-center gap-1.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-1 self-start">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">lock</span>
                    <p className="font-mono text-xs text-slate-600 dark:text-slate-300 font-medium">US89 •••• •••• 9821</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Check Card */}
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-700/50 p-6">
              <div className="flex gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                  <span className="material-symbols-outlined">shield_lock</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-yellow-800 dark:text-yellow-400">Vérification de sécurité</h3>
                  <p className="text-sm leading-relaxed text-yellow-700 dark:text-yellow-200/80">
                    Ce bénéficiaire a été ajouté il y a moins de 24h. Une authentification forte (SCA) sera requise à l'étape suivante pour valider la transaction.
                  </p>
                  <label className="mt-2 flex items-start gap-3 cursor-pointer group">
                    <input 
                      className="mt-1 rounded border-yellow-300 bg-white text-yellow-600 focus:ring-yellow-600 focus:ring-offset-0" 
                      type="checkbox"
                    />
                    <span className="text-sm text-yellow-800 dark:text-yellow-300 group-hover:text-yellow-900 dark:group-hover:text-yellow-200 transition-colors">Je confirme connaître ce bénéficiaire.</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Support Link */}
            <div className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 p-4 border border-dashed border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-slate-400">headset_mic</span>
              <span className="text-sm text-slate-500">Besoin d'aide ? <a className="font-medium text-slate-900 dark:text-white hover:underline" href="#">Contacter le support</a></span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VirementAmountPage;