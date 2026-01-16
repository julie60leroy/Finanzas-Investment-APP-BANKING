import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, t } = useApp();
  const [email, setEmail] = useState("marc.dubois@finanzas.com");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/');
  };

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
              {t('auth.hero_title')}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t('auth.hero_subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              <span>{t('auth.cert_dsp2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lock</span>
              <span>{t('auth.cert_aes')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white dark:bg-background-dark flex flex-col justify-center items-center px-8 lg:px-24">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-[#171211] dark:text-white text-3xl font-bold tracking-tight">{t('auth.title')}</h2>
            <p className="text-[#876664] dark:text-gray-400">{t('auth.subtitle')}</p>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-2">
              <label className="text-[#171211] dark:text-white text-sm font-medium">{t('auth.label_id')}</label>
              <input
                className="form-input w-full rounded-lg border-[#e5dcdc] dark:border-gray-700 bg-white dark:bg-gray-800 h-14 p-[15px] focus:ring-primary text-slate-900 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[#171211] dark:text-white text-sm font-medium">{t('auth.label_pass')}</label>
                <a className="text-primary text-sm font-semibold hover:underline" href="#">
                  {t('auth.forgot')}
                </a>
              </div>
              <input
                className="form-input w-full rounded-lg border-[#e5dcdc] dark:border-gray-700 bg-white dark:bg-gray-800 h-14 p-[15px] focus:ring-primary text-slate-900 dark:text-white"
                defaultValue="password123"
                type="password"
              />
            </div>
            <button
              className="w-full h-14 bg-primary text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
              type="submit"
            >
              {t('auth.btn_login')}
            </button>
          </form>
          <div className="text-center pt-4">
            <p className="text-[#876664] dark:text-gray-400">
              {t('auth.new_account')}{' '}
              <a className="text-primary font-bold hover:underline" href="#">
                {t('auth.create_account')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;