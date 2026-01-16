import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

// --- TYPES ---
export type Language = 'fr' | 'en' | 'es' | 'de' | 'pt' | 'it';

export interface CurrencyConfig {
  code: string;
  name: string;
  flag: string;
  rate: number; // Taux par rapport à 1 EUR
}

// Liste complète des devises demandées
export const CURRENCIES: CurrencyConfig[] = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rate: 1 },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rate: 1.08 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: 0.85 },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', rate: 0.95 },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰', rate: 7.46 },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴', rate: 11.45 },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪', rate: 11.25 },
  { code: 'ISK', name: 'Icelandic Króna', flag: '🇮🇸', rate: 150.0 },
  { code: 'PLN', name: 'Polish Złoty', flag: '🇵🇱', rate: 4.32 },
  { code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺', rate: 395.5 },
  { code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿', rate: 25.30 },
  { code: 'RON', name: 'Romanian Leu', flag: '🇷🇴', rate: 4.97 },
  { code: 'BGN', name: 'Bulgarian Lev', flag: '🇧🇬', rate: 1.95 },
  { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷', rate: 920.5 },
  { code: 'BOB', name: 'Bolivian Boliviano', flag: '🇧🇴', rate: 7.50 },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', rate: 5.45 },
  { code: 'CLP', name: 'Chilean Peso', flag: '🇨🇱', rate: 1050.0 },
  { code: 'COP', name: 'Colombian Peso', flag: '🇨🇴', rate: 4200.0 },
  { code: 'PYG', name: 'Paraguayan Guaraní', flag: '🇵🇾', rate: 8000.0 },
  { code: 'PEN', name: 'Peruvian Sol', flag: '🇵🇪', rate: 4.05 },
  { code: 'UYU', name: 'Uruguayan Peso', flag: '🇺🇾', rate: 42.5 },
  { code: 'VES', name: 'Venezuelan Bolívar', flag: '🇻🇪', rate: 39.5 },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽', rate: 18.20 },
  { code: 'GTQ', name: 'Guatemalan Quetzal', flag: '🇬🇹', rate: 8.40 },
  { code: 'HNL', name: 'Honduran Lempira', flag: '🇭🇳', rate: 26.8 },
  { code: 'NIO', name: 'Nicaraguan Córdoba', flag: '🇳🇮', rate: 39.8 },
  { code: 'CRC', name: 'Costa Rican Colón', flag: '🇨🇷', rate: 555.0 },
  { code: 'PAB', name: 'Panamanian Balboa', flag: '🇵🇦', rate: 1.08 },
  { code: 'CUP', name: 'Cuban Peso', flag: '🇨🇺', rate: 25.75 },
  { code: 'DOP', name: 'Dominican Peso', flag: '🇩🇴', rate: 63.5 },
];

export interface Transaction {
  id: string;
  date: string;
  name: string;
  icon: string;
  cat: string;
  status: string;
  amt: number; // Toujours stocké en EUR
  currency: string; // Devise d'origine de la transaction (affichage seulement)
  beneficiaryDetails?: Beneficiary;
  catKey?: string; 
  statusKey?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  jobTitle: string;
  securityPin: string;
  checkingIban: string;
  checkingAccountName: string;
  overdraftLimit: number; // Stocké en EUR
  accounts: {
    checking: number; // Stocké en EUR
    savings: number; // Stocké en EUR
  };
}

export interface Beneficiary {
  id: string;
  name: string;
  iban: string;
  img?: string;
  favorite: boolean;
  bankName?: string;
}

export interface Card {
  id: string;
  type: 'physical' | 'virtual';
  network: 'mastercard' | 'visa';
  number: string;
  holder: string;
  expiry: string;
  cvc: string;
  pin: string;
  status: 'active' | 'blocked';
  design: 'premium-red' | 'midnight-black';
  limits: {
    payment: { current: number; max: number }; // Stocké en EUR
    withdrawal: { current: number; max: number }; // Stocké en EUR
  };
}

export interface Notification {
  id: string;
  type: 'security' | 'transaction' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  translationKey?: string;
  translationParams?: Record<string, string | number>;
  templateId?: 'n1_login' | 'n2_transfer' | 'n3_tos'; 
}

interface AppContextType {
  user: User | null;
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  cards: Card[];
  notifications: Notification[];
  isAuthenticated: boolean;
  language: Language;
  currency: string; // La devise sélectionnée (ex: 'USD')
  currentLocale: string;
  setLanguage: (lang: Language) => void;
  setCurrency: (code: string) => void;
  t: (key: string) => string;
  login: (email: string) => void;
  logout: () => void;
  performTransfer: (amount: number, recipientName: string, motif: string, beneficiaryDetails?: Beneficiary) => void;
  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id'>) => void;
  updateUser: (data: Partial<User>) => void;
  addCard: (type: 'physical' | 'virtual', design: 'premium-red' | 'midnight-black') => void;
  toggleCardStatus: (id: string) => void;
  updateCardLimits: (id: string, newLimits: Card['limits']) => void;
  markAllNotificationsAsRead: () => void;
  formatTxDate: (isoString: string) => string;
  addNotification: (type: Notification['type'], title: string, message: string, translationKey?: string, translationParams?: Record<string, string | number>) => void;
  injectFunds: (amount: number, currency: string, motif?: string) => void;
  
  // Nouveaux Helpers
  formatGlobalMoney: (amountInEur: number) => string;
  convertAmount: (amountInEur: number) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- LOCALE MAPPING ---
const localeMap: Record<Language, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
  pt: 'pt-PT',
  it: 'it-IT'
};

// --- UTILS ---
const formatTxDate = (isoString: string, lang: Language) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const locales: Record<Language, { instant: string; min: string; hour: string; yesterday: string }> = {
    fr: { instant: "À l'instant", min: "Il y a {x} min", hour: "Il y a {x} h", yesterday: "Hier" },
    en: { instant: "Just now", min: "{x} min ago", hour: "{x} h ago", yesterday: "Yesterday" },
    es: { instant: "Ahora mismo", min: "Hace {x} min", hour: "Hace {x} h", yesterday: "Ayer" },
    de: { instant: "Gerade eben", min: "Vor {x} Min", hour: "Vor {x} Std", yesterday: "Gestern" },
    pt: { instant: "Agora mesmo", min: "Há {x} min", hour: "Há {x} h", yesterday: "Ontem" },
    it: { instant: "Proprio ora", min: "{x} min fa", hour: "{x} h fa", yesterday: "Ieri" },
  };

  const l = locales[lang] || locales.fr;
  const localeCode = localeMap[lang];

  if (diffInSeconds < 60) return l.instant;
  if (diffInSeconds < 3600) return l.min.replace('{x}', Math.floor(diffInSeconds / 60).toString());
  if (diffInSeconds < 86400) return l.hour.replace('{x}', Math.floor(diffInSeconds / 3600).toString());
  if (diffInSeconds < 172800) return l.yesterday;
  
  return date.toLocaleDateString(localeCode, { day: 'numeric', month: 'short' });
};

// Data Generation Helpers (inchangés sauf appelés dans context)
const getInitialUser = (t: (key: string) => string): User => ({
  name: "Jean Dupont",
  email: "jean.dupont@finanzas.com",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVlfU9LT1bKOu6YiRJpGLlYM55G-ROq-Imcg0n3XaiPz4Iy8P0pdTm5EyTVq2q_KvY4VmF8wY8R_AmHux0K5GK8c-otO4U9RIjF6TrgtAREMs_IOy6l3zZTlPjAdvDPs4fEHnhG8BryjrP3x0xqqLOYgPVENwGW31j510yl19aLhKoSBSGfp5aZuZxHpxmk7w-Gooz3SRg_KEuZzIcqZrlO9xvqN5vm5kBZNPnox4vUcYIM-5BGb5N2taHq1n25De6od-5WYssKEg",
  phone: "+33 6 12 34 56 78",
  address: "14 Avenue des Champs-Élysées",
  city: "Paris",
  zipCode: "75008",
  country: "France",
  jobTitle: "Cadre Supérieur",
  securityPin: "0000", 
  checkingIban: "FR76 3000 6000 0123 4567 8901 234",
  checkingAccountName: t('dashboard.accounts.checking'),
  overdraftLimit: 500,
  accounts: {
    checking: 2450.00,
    savings: 50000.00
  }
});

const getInitialTransactions = (t: (key: string) => string): Transaction[] => {
  const txs: Transaction[] = [];
  const now = new Date();
  const merchants = [
      { name: "Carrefour City", icon: "shopping_cart", catKey: 'dashboard.chart.food', min: -80, max: -15 },
      { name: "Uber Eats", icon: "restaurant", catKey: 'dashboard.chart.food', min: -40, max: -15 },
      { name: "Total Energies", icon: "local_gas_station", catKey: 'dashboard.chart.housing', min: -60, max: -40 },
      { name: "Netflix", icon: "movie", catKey: 'dashboard.chart.leisure', min: -17.99, max: -17.99 },
      { name: "Spotify", icon: "headphones", catKey: 'dashboard.chart.leisure', min: -10.99, max: -10.99 },
      { name: "Apple Store", icon: "laptop_mac", catKey: 'High-Tech', min: -1200, max: -50 },
      { name: "Salaire", icon: "work", catKey: 'Revenus', min: 3200, max: 3500 },
      { name: "Loyer", icon: "home", catKey: 'dashboard.chart.housing', min: -1100, max: -1100 },
      { name: "Amazon", icon: "shopping_bag", catKey: 'dashboard.chart.leisure', min: -150, max: -20 },
      { name: "SNCF Connect", icon: "train", catKey: 'Transport', min: -120, max: -30 },
      { name: "Pharmacie", icon: "local_pharmacy", catKey: 'Santé', min: -40, max: -10 },
      { name: "Boulangerie", icon: "bakery_dining", catKey: 'dashboard.chart.food', min: -10, max: -2 },
  ];

  for (let i = 0; i < 100; i++) {
      let dateOffset = 0;
      if (i < 5) dateOffset = i * 1000 * 3600; 
      else dateOffset = Math.floor(Math.random() * (90 * 24 * 3600 * 1000));

      const date = new Date(now.getTime() - dateOffset).toISOString();
      const merch = merchants[Math.floor(Math.random() * merchants.length)];
      const amt = parseFloat((Math.random() * (merch.max - merch.min) + merch.min).toFixed(2));

      txs.push({
          id: `tx-${i}-${Date.now()}`,
          date: date,
          name: merch.name,
          icon: merch.icon,
          cat: t(merch.catKey),
          catKey: merch.catKey,
          status: t('common.success'),
          statusKey: 'common.success',
          amt: amt,
          currency: 'EUR' // On stocke la devise d'origine de la transaction (ici supposée EUR pour simplifier)
      });
  }
  return txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const getSystemNotificationText = (id: string, lang: Language) => {
    // ... (inchangé, voir bloc précédent pour le contenu complet)
    const texts: any = {
        n1_login: {
            fr: { title: "Nouvelle connexion détectée", msg: "Un appareil \"iPhone 15 Pro\" s'est connecté depuis Lyon, France." },
            en: { title: "New login detected", msg: "An \"iPhone 15 Pro\" device connected from Lyon, France." },
            es: { title: "Nuevo inicio de sesión", msg: "Un dispositivo \"iPhone 15 Pro\" se conectó desde Lyon, Francia." },
            de: { title: "Neue Anmeldung erkannt", msg: "Ein \"iPhone 15 Pro\" Gerät hat sich aus Lyon, Frankreich angemeldet." },
            pt: { title: "Novo login detectado", msg: "Um dispositivo \"iPhone 15 Pro\" conectou-se de Lyon, França." },
            it: { title: "Nuovo accesso rilevato", msg: "Un dispositivo \"iPhone 15 Pro\" si è connesso da Lione, Francia." }
        },
        n2_transfer: {
            fr: { title: "Virement reçu", msg: "Vous avez reçu un virement instantané de 450,00 € de la part de Thomas Bernard." },
            en: { title: "Transfer received", msg: "You received an instant transfer of €450.00 from Thomas Bernard." },
            es: { title: "Transferencia recibida", msg: "Ha recibido una transferencia instantánea de 450,00 € de Thomas Bernard." },
            de: { title: "Überweisung erhalten", msg: "Sie haben eine Sofortüberweisung von 450,00 € von Thomas Bernard erhalten." },
            pt: { title: "Transferência recebida", msg: "Você recebeu uma transferência instantânea de 450,00 € de Thomas Bernard." },
            it: { title: "Bonifico ricevuto", msg: "Hai ricevuto un bonifico istantaneo di 450,00 € da Thomas Bernard." }
        },
        n3_tos: {
            fr: { title: "Mise à jour des CGU", msg: "Nos conditions générales d'utilisation ont été mises à jour. Veuillez les consulter." },
            en: { title: "TOS Update", msg: "Our terms of service have been updated. Please review them." },
            es: { title: "Actualización de CGU", msg: "Nuestras condiciones generales han sido actualizadas. Por favor revíselas." },
            de: { title: "AGB Aktualisierung", msg: "Unsere Allgemeinen Geschäftsbedingungen wurden aktualisiert. Bitte überprüfen." },
            pt: { title: "Atualização dos Termos", msg: "Nossos termos de serviço foram atualizados. Por favor, revise-os." },
            it: { title: "Aggiornamento Termini", msg: "I nostri termini di servizio sono stati aggiornati. Si prega di prenderne visione." }
        }
    };
    return texts[id]?.[lang] || texts[id]?.['fr'];
};

const getInitialNotifications = (lang: Language): Notification[] => {
    // ... (inchangé, voir bloc précédent)
    const now = new Date();
    const t1 = getSystemNotificationText('n1_login', lang);
    const t2 = getSystemNotificationText('n2_transfer', lang);
    const t3 = getSystemNotificationText('n3_tos', lang);

    return [
        { id: 'n1', type: 'security', title: t1.title, message: t1.msg, date: new Date(now.getTime() - 1000 * 60 * 10).toISOString(), read: false, templateId: 'n1_login' },
        { id: 'n2', type: 'transaction', title: t2.title, message: t2.msg, date: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), read: false, templateId: 'n2_transfer' },
        { id: 'n3', type: 'system', title: t3.title, message: t3.msg, date: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), read: true, templateId: 'n3_tos' }
    ];
};

const INITIAL_BENEFICIARIES: Beneficiary[] = [
    { id: 'b1', name: 'Alice Martin', iban: 'FR76 1234 5678 9012', favorite: true, img: 'https://i.pravatar.cc/150?u=alice' },
    { id: 'b2', name: 'Thomas Bernard', iban: 'FR76 9876 5432 1098', favorite: true, img: 'https://i.pravatar.cc/150?u=thomas' },
    { id: 'b3', name: 'Sophie Dubreuil', iban: 'FR76 5678 9012 3456', favorite: false, img: 'https://i.pravatar.cc/150?u=sophie' }
];

const INITIAL_CARDS: Card[] = [
  {
    id: 'c1',
    type: 'physical',
    network: 'mastercard',
    number: '5300 1234 5678 4242',
    holder: 'JEAN DUPONT',
    expiry: '09/28',
    cvc: '123',
    pin: '1234',
    status: 'active',
    design: 'premium-red',
    limits: { payment: { current: 450, max: 2000 }, withdrawal: { current: 120, max: 500 } }
  },
  {
    id: 'c2',
    type: 'virtual',
    network: 'visa',
    number: '4970 9876 5432 1098',
    holder: 'JEAN DUPONT',
    expiry: '12/29',
    cvc: '456',
    pin: '0000',
    status: 'active',
    design: 'midnight-black',
    limits: { payment: { current: 129, max: 1000 }, withdrawal: { current: 0, max: 0 } }
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(INITIAL_BENEFICIARIES);
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [currency, setCurrencyState] = useState<string>('EUR');

  // --- HELPER CONVERSION ---
  // Convertit un montant en EUR vers la devise sélectionnée
  const convertAmount = (amountInEur: number): number => {
      if (currency === 'EUR') return amountInEur;
      const targetRate = CURRENCIES.find(c => c.code === currency)?.rate || 1;
      return amountInEur * targetRate;
  };

  // --- HELPER FORMATAGE GLOBAL ---
  // Affiche le montant converti avec le bon symbole et locale
  const formatGlobalMoney = (amountInEur: number): string => {
      const value = convertAmount(amountInEur);
      return new Intl.NumberFormat(localeMap[language], {
          style: 'currency',
          currency: currency
      }).format(value);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const k of keys) {
      if (current[k] === undefined) return path;
      current = current[k];
    }
    return current;
  };

  const replaceParams = (text: string, params?: Record<string, string | number>) => {
      if (!params) return text;
      let res = text;
      for (const [key, value] of Object.entries(params)) {
          res = res.replace(`{${key}}`, String(value));
      }
      return res;
  };

  const addNotification = (
      type: Notification['type'], 
      title: string, 
      message: string, 
      translationKey?: string, 
      translationParams?: Record<string, string | number>
  ) => {
    const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        type,
        title,
        message,
        date: new Date().toISOString(),
        read: false,
        translationKey,
        translationParams
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSetLanguage = (lang: Language) => {
      if (lang !== language) {
          setLanguage(lang);
          const newLangName = lang.toUpperCase();
          addNotification('system', 'Language changed', `Language is now ${newLangName}`, 'language_changed', { lang: newLangName });
      }
  };

  const setCurrency = (code: string) => {
      if (code !== currency) {
          setCurrencyState(code);
          addNotification('system', 'Currency changed', `Currency is now ${code}`, 'currency_changed', { currency: code });
      }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (isAuthenticated) {
        setTransactions(prevTxs => prevTxs.map(tx => {
            let newCat = tx.cat;
            let newStatus = tx.status;
            if (tx.catKey) newCat = tx.catKey.includes('.') ? t(tx.catKey) : tx.catKey;
            if (tx.statusKey === 'common.success') newStatus = t('common.success');
            else if (tx.statusKey === 'status_pending') newStatus = language === 'fr' ? 'En attente' : 'Pending'; 
            else if (tx.statusKey === 'admin.status_success') newStatus = t('admin.status_success');
            return { ...tx, cat: newCat, status: newStatus };
        }));

        setUser(prevUser => {
            if (!prevUser) return null;
            return {
                ...prevUser,
                checkingAccountName: t('dashboard.accounts.checking'),
            };
        });
        
        setNotifications(prevNotifs => prevNotifs.map(n => {
            if (n.templateId) {
                const translated = getSystemNotificationText(n.templateId, language);
                return { ...n, title: translated.title, message: translated.msg };
            }
            if (n.translationKey) {
                const titleTemplate = t(`notif_templates.${n.translationKey}_title`);
                const msgTemplate = t(`notif_templates.${n.translationKey}_msg`);
                if (!titleTemplate.includes('notif_templates')) {
                     return { ...n, title: replaceParams(titleTemplate, n.translationParams), message: replaceParams(msgTemplate, n.translationParams) };
                }
            }
            return n;
        }));
    }
  }, [language, isAuthenticated]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser(getInitialUser(t));
      setTransactions(getInitialTransactions(t));
      setCards(INITIAL_CARDS); 
      setNotifications(getInitialNotifications('fr'));
    }
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUser({ ...getInitialUser(t), email });
    setTransactions(getInitialTransactions(t));
    setBeneficiaries(INITIAL_BENEFICIARIES);
    setCards(INITIAL_CARDS);
    setNotifications(getInitialNotifications(language));
    localStorage.setItem('isAuth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuth');
  };

  const performTransfer = (amount: number, recipientName: string, motif: string, beneficiaryDetails?: Beneficiary) => {
      // NOTE: Le montant passé ici est supposé être dans la devise affichée.
      // Pour stocker en EUR, on devrait le reconvertir inversement. 
      // Pour cette démo, simplifions en disant que amount est en EUR pour les calculs internes.
      const newTx: Transaction = {
          id: `tx-${Date.now()}`,
          date: new Date().toISOString(),
          name: recipientName,
          icon: 'send',
          cat: motif || t('transfers.success.title'),
          status: t('common.success'),
          statusKey: 'common.success',
          amt: -amount,
          currency: 'EUR',
          beneficiaryDetails
      };
      setTransactions(prev => [newTx, ...prev]);
      if (user) {
          setUser({ ...user, accounts: { ...user.accounts, checking: user.accounts.checking - amount } });
      }
      addNotification('transaction', t('transfers.success.title'), `${t('transfers.amount.source')} ${amount}€ -> ${recipientName}.`, 'transfer_sent', { amount: amount, name: recipientName });
  };

  const addBeneficiary = (beneficiary: Omit<Beneficiary, 'id'>) => {
      const newB = { ...beneficiary, id: `b-${Date.now()}` };
      setBeneficiaries([...beneficiaries, newB]);
      addNotification('security', t('transfers.fav_title'), `${beneficiary.name} ${t('common.add')}.`, 'beneficiary_added', { name: beneficiary.name });
  };

  const updateUser = (data: Partial<User>) => { 
      if(user) {
          setUser({...user, ...data}); 
          if (data.securityPin) {
              addNotification('security', t('profile.security.auth_title'), t('profile.security.modified'), 'pin_changed', {});
          }
      }
  };
  
  const addCard = (type: 'physical' | 'virtual', design: 'premium-red' | 'midnight-black') => {
      const newCard: Card = {
          id: `c-${Date.now()}`,
          type,
          network: 'mastercard',
          number: `5300${Math.floor(1000 + Math.random() * 9000)}${Math.floor(1000 + Math.random() * 9000)}4242`,
          holder: user?.name || 'USER',
          expiry: '09/28',
          cvc: '123',
          pin: '0000',
          status: 'active',
          design,
          limits: { payment: { current: 0, max: 2000 }, withdrawal: { current: 0, max: 500 } }
      };
      setCards([...cards, newCard]);
      addNotification('system', t('cards.new_card'), `${t('cards.new_card')} (${type})`, 'card_added', { type: type });
  };
  
  const toggleCardStatus = (id: string) => {
      let newStatusStr = '';
      setCards(cards.map(c => {
          if (c.id === id) {
              const newStatus = c.status === 'active' ? 'blocked' : 'active';
              newStatusStr = newStatus;
              return { ...c, status: newStatus };
          }
          return c;
      }));
      const key = newStatusStr === 'blocked' ? 'card_locked' : 'card_unlocked';
      addNotification('security', t('cards.title'), t('cards.modal.info_update'), key, {});
  };
  
  const updateCardLimits = (id: string, newLimits: Card['limits']) => {
      setCards(cards.map(c => c.id === id ? { ...c, limits: newLimits } : c));
      addNotification('security', t('cards.limits.payment'), t('cards.modal.info_update'), 'limits_updated', {});
  };
  
  const markAllNotificationsAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const injectFunds = (amount: number, currency: string, motif: string = "Injection Capital") => {
      if (user) {
           setUser({ ...user, accounts: { ...user.accounts, checking: user.accounts.checking + amount } });
          const newTx: Transaction = {
            id: `tx-inj-${Date.now()}`,
            date: new Date().toISOString(),
            name: t('admin.central_treasury'), 
            icon: "account_balance",
            cat: motif === "Injection Capital" ? t('admin.motif_compliance') : motif, 
            catKey: motif === "Injection Capital" ? 'admin.motif_compliance' : undefined,
            status: t('admin.status_success'),
            statusKey: 'admin.status_success',
            amt: amount,
            currency: currency === 'USD' ? '$' : '€', 
            beneficiaryDetails: { id: 'admin-treasury', name: 'Finanzas Treasury', iban: 'FI76 9999', favorite: false, bankName: 'Finanzas Central Bank' }
          };
          setTransactions(prev => [newTx, ...prev]);
          addNotification('transaction', t('admin.toast_success'), `${amount} ${currency} - ${motif}`, 'injection', { amount: amount, currency: currency, motif: motif });
      }
  };

  return (
    <AppContext.Provider value={{ 
      user, transactions, beneficiaries, cards, notifications, isAuthenticated, 
      language, setLanguage: handleSetLanguage, t, currentLocale: localeMap[language],
      login, logout, performTransfer, addBeneficiary, updateUser,
      addCard, toggleCardStatus, updateCardLimits, markAllNotificationsAsRead,
      formatTxDate: (d) => formatTxDate(d, language),
      addNotification, injectFunds,
      currency, setCurrency, formatGlobalMoney, convertAmount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};