import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#171211] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-primary/20 via-transparent to-black"></div>
        <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full">
          <div className="flex items-center gap-3 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
            <h1 className="text-xl font-bold tracking-tight">FINANZAS INVESTMENT</h1>
          </div>
          <div className="max-w-md">
            <h2 className="text-white text-5xl font-black leading-tight tracking-tight mb-6">
              L'excellence financière, à portée de clic.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Accédez à votre portefeuille institutionnel et gérez vos actifs avec la sécurité d'une banque privée.
            </p>
          </div>
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              <span>Certifié DSP2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lock</span>
              <span>Chiffrement AES-256</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white dark:bg-background-dark flex flex-col justify-center items-center px-8 lg:px-24">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-[#171211] dark:text-white text-3xl font-bold tracking-tight">Connexion</h2>
            <p className="text-[#876664] dark:text-gray-400">Ravi de vous revoir. Veuillez entrer vos accès.</p>
          </div>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            <div className="flex flex-col gap-2">
              <label className="text-[#171211] dark:text-white text-sm font-medium">Identifiant ou E-mail</label>
              <input
                className="form-input w-full rounded-lg border-[#e5dcdc] dark:border-gray-700 bg-white dark:bg-gray-800 h-14 p-[15px] focus:ring-primary"
                defaultValue="marc.dubois@finanzas.com"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[#171211] dark:text-white text-sm font-medium">Mot de passe</label>
                <a className="text-primary text-sm font-semibold hover:underline" href="#">
                  Oublié ?
                </a>
              </div>
              <input
                className="form-input w-full rounded-lg border-[#e5dcdc] dark:border-gray-700 bg-white dark:bg-gray-800 h-14 p-[15px] focus:ring-primary"
                defaultValue="password123"
                type="password"
              />
            </div>
            <button
              className="w-full h-14 bg-primary text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
              type="submit"
            >
              Se connecter
            </button>
          </form>
          <div className="text-center pt-4">
            <p className="text-[#876664] dark:text-gray-400">
              Nouveau ?{' '}
              <a className="text-primary font-bold hover:underline" href="#">
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;