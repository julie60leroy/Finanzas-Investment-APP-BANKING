import React, { createContext, useContext, useState, useEffect } from 'react';

// --- TYPES ---
export type Language = 'fr' | 'en';

export interface Transaction {
  id: string;
  date: string;
  name: string;
  icon: string;
  cat: string;
  status: 'Complété' | 'En attente' | 'Échoué';
  amt: number;
  currency: string;
  beneficiaryDetails?: Beneficiary;
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
  overdraftLimit: number;
  accounts: {
    checking: number;
    savings: number;
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
    payment: { current: number; max: number };
    withdrawal: { current: number; max: number };
  };
}

export interface Notification {
  id: string;
  type: 'security' | 'transaction' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

// --- DICTIONNAIRE DE TRADUCTION ---
const translations = {
  fr: {
    nav: {
      dashboard: "Tableau de bord",
      transactions: "Transactions",
      transfers: "Virements",
      cards: "Cartes",
      notifications: "Notifications",
      settings: "Paramètres",
      profile: "Mon Profil",
      admin: "Administration",
      logout: "Déconnexion"
    },
    dashboard: {
      welcome: "Bonjour",
      date_format: "fr-FR",
      wealth_estimated: "Patrimoine Total Estimé",
      analysis: "Voir l'analyse détaillée",
      quick_transfer_title: "Virement Rapide",
      send_money: "Envoyer",
      add_beneficiary: "Ajouter",
      quick_transfer_action: "Nouveau Virement",
      quick_card: "Gérer ma Carte",
      quick_rib: "Copier mon RIB",
      quick_docs: "Relevés & Docs",
      rib_copied: "IBAN Copié !",
      expenses_breakdown: "Répartition des Dépenses",
      total_out: "Total Sorties",
      recent_moves: "Derniers Mouvements",
      see_all: "Tout voir",
      no_tx: "Aucune transaction récente"
    },
    notifications: {
      title: "Centre de Notifications",
      mark_all: "Tout marquer comme lu",
      tabs: {
        all: "Toutes",
        alerts: "Alertes",
        transactions: "Transactions"
      },
      sections: {
        today: "Aujourd'hui",
        earlier: "Plus tôt"
      },
      empty: "Aucune notification pour le moment.",
      settings_title: "Paramètres",
      channels: "Canaux de diffusion",
      categories: "Catégories d'alertes",
      save_settings: "Sauvegarder les réglages"
    },
    settings: {
      title: "Paramètres",
      subtitle: "Gérez vos préférences et votre sécurité.",
      tabs: {
        profile: "Profil",
        security: "Sécurité",
        notifications: "Notifications",
        region: "Langues et Région"
      },
      region_section: {
        lang_title: "Langue de l'interface",
        currency_title: "Devise de référence"
      }
    }
  },
  en: {
    nav: {
      dashboard: "Dashboard",
      transactions: "Transactions",
      transfers: "Transfers",
      cards: "Cards",
      notifications: "Notifications",
      settings: "Settings",
      profile: "My Profile",
      admin: "Admin Panel",
      logout: "Logout"
    },
    dashboard: {
      welcome: "Hello",
      date_format: "en-US",
      wealth_estimated: "Estimated Total Wealth",
      analysis: "See detailed analysis",
      quick_transfer_title: "Quick Transfer",
      send_money: "Send",
      add_beneficiary: "Add New",
      quick_transfer_action: "New Transfer",
      quick_card: "Manage Card",
      quick_rib: "Copy IBAN",
      quick_docs: "Statements & Docs",
      rib_copied: "IBAN Copied!",
      expenses_breakdown: "Expenses Breakdown",
      total_out: "Total Out",
      recent_moves: "Recent Movements",
      see_all: "See all",
      no_tx: "No recent transactions"
    },
    notifications: {
      title: "Notification Center",
      mark_all: "Mark all as read",
      tabs: {
        all: "All",
        alerts: "Alerts",
        transactions: "Transactions"
      },
      sections: {
        today: "Today",
        earlier: "Earlier"
      },
      empty: "No notifications yet.",
      settings_title: "Settings",
      channels: "Notification Channels",
      categories: "Alert Categories",
      save_settings: "Save settings"
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your preferences and security.",
      tabs: {
        profile: "Profile",
        security: "Security",
        notifications: "Notifications",
        region: "Language & Region"
      },
      region_section: {
        lang_title: "Interface Language",
        currency_title: "Reference Currency"
      }
    }
  }
};

interface AppContextType {
  user: User | null;
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  cards: Card[];
  notifications: Notification[];
  isAuthenticated: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
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
  addNotification: (type: Notification['type'], title: string, message: string) => void;
  injectFunds: (amount: number, currency: string, motif?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- UTILS ---
const formatTxDate = (isoString: string, lang: string = 'fr-FR') => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const timeAgo = {
    fr: { instant: "À l'instant", min: "Il y a {x} min", hour: "Il y a {x} h", yesterday: "Hier" },
    en: { instant: "Just now", min: "{x} min ago", hour: "{x} h ago", yesterday: "Yesterday" }
  };
  const l = (timeAgo as any)[lang.split('-')[0]] || timeAgo.fr;

  if (diffInSeconds < 60) return l.instant;
  if (diffInSeconds < 3600) return l.min.replace('{x}', Math.floor(diffInSeconds / 60));
  if (diffInSeconds < 86400) return l.hour.replace('{x}', Math.floor(diffInSeconds / 3600));
  if (diffInSeconds < 172800) return l.yesterday;
  
  return date.toLocaleDateString(lang, { day: 'numeric', month: 'short' });
};

// Initial Data
const INITIAL_USER: User = {
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
  checkingAccountName: "Compte Courant",
  overdraftLimit: 500,
  accounts: {
    checking: 2450.00,
    savings: 50000.00
  }
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

const generateTransactions = (): Transaction[] => {
  const now = new Date();
  const txs: Transaction[] = [];
  txs.push({ id: 't1', date: new Date(now.getTime() - 1000 * 30).toISOString(), name: "Apple Store", icon: "laptop_mac", cat: "Électronique", status: "Complété", amt: -1299.00, currency: '€' });
  txs.push({ id: 't2', date: new Date(now.getTime() - 1000 * 60 * 45).toISOString(), name: "Uber Eats", icon: "restaurant", cat: "Restauration", status: "En attente", amt: -25.50, currency: '€' });
  txs.push({ id: 't3', date: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(), name: "Carrefour City", icon: "shopping_cart", cat: "Alimentation", status: "Complété", amt: -42.15, currency: '€' });
  return txs;
};
const _REAL_INITIAL_TRANSACTIONS = generateTransactions();

// --- RESTAURATION DES NOTIFICATIONS (SCÉNARIO) ---
const generateNotifications = (): Notification[] => {
    const now = new Date();
    return [
        {
            id: 'n1',
            type: 'security',
            title: 'Nouvelle connexion détectée',
            message: 'Un appareil "iPhone 15 Pro" s\'est connecté depuis Lyon, France.',
            date: new Date(now.getTime() - 1000 * 60 * 10).toISOString(), // Il y a 10 min
            read: false
        },
        {
            id: 'n2',
            type: 'transaction',
            title: 'Virement reçu',
            message: 'Vous avez reçu un virement instantané de 450,00 € de la part de Thomas Bernard.',
            date: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), // Il y a 2h
            read: false
        },
        {
            id: 'n3',
            type: 'system',
            title: 'Mise à jour des CGU',
            message: 'Nos conditions générales d\'utilisation ont été mises à jour. Veuillez les consulter.',
            date: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), // Hier
            read: true
        }
    ];
};
const INITIAL_NOTIFICATIONS = generateNotifications();


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');

  // --- FONCTION DE TRADUCTION ---
  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const k of keys) {
      if (current[k] === undefined) return path;
      current = current[k];
    }
    return current;
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser(INITIAL_USER);
      setTransactions(_REAL_INITIAL_TRANSACTIONS);
      setBeneficiaries(INITIAL_BENEFICIARIES);
      setCards(INITIAL_CARDS); 
      setNotifications(INITIAL_NOTIFICATIONS);
    }
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUser({ ...INITIAL_USER, email });
    setTransactions(_REAL_INITIAL_TRANSACTIONS);
    setBeneficiaries(INITIAL_BENEFICIARIES);
    setCards(INITIAL_CARDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.setItem('isAuth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuth');
  };

  // --- HELPER DE NOTIFICATION ---
  const addNotification = (type: Notification['type'], title: string, message: string) => {
    const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        type,
        title,
        message,
        date: new Date().toISOString(),
        read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const performTransfer = (amount: number, recipientName: string, motif: string, beneficiaryDetails?: Beneficiary) => {
      // Simuler le transfert
      const newTx: Transaction = {
          id: `tx-${Date.now()}`,
          date: new Date().toISOString(),
          name: recipientName,
          icon: 'send',
          cat: motif || 'Virement',
          status: 'Complété',
          amt: -amount,
          currency: '€',
          beneficiaryDetails
      };
      setTransactions([newTx, ...transactions]);
      if (user) {
          setUser({
              ...user,
              accounts: {
                  ...user.accounts,
                  checking: user.accounts.checking - amount
              }
          });
      }
      // Notification
      addNotification('transaction', 'Virement envoyé', `Votre virement de ${amount}€ vers ${recipientName} a été effectué.`);
  };

  const addBeneficiary = (beneficiary: Omit<Beneficiary, 'id'>) => {
      const newB = { ...beneficiary, id: `b-${Date.now()}` };
      setBeneficiaries([...beneficiaries, newB]);
      // Notification
      addNotification('security', 'Nouveau bénéficiaire', `Le bénéficiaire ${beneficiary.name} a été ajouté à votre liste de confiance.`);
  };

  const updateUser = (data: Partial<User>) => { 
      if(user) {
          setUser({...user, ...data}); 
          // Logique de notification selon le champ modifié
          if (data.securityPin) {
              addNotification('security', 'Sécurité mise à jour', 'Votre code secret pour les virements a été modifié.');
          }
          else if (data.email || data.phone || data.address) {
               addNotification('system', 'Profil mis à jour', 'Vos coordonnées personnelles ont été modifiées.');
          }
          else if (data.checkingIban || data.checkingAccountName) {
               addNotification('system', 'Compte modifié', 'Les détails de votre compte courant ont été mis à jour.');
          }
          else if (data.overdraftLimit) {
               addNotification('system', 'Découvert autorisé', `Votre plafond de découvert est maintenant de ${data.overdraftLimit}€.`);
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
      addNotification('system', 'Nouvelle carte', `Votre carte ${type === 'physical' ? 'Physique' : 'Virtuelle'} a été créée avec succès.`);
  };
  
  const toggleCardStatus = (id: string) => {
      let newStatus = '';
      setCards(cards.map(c => {
          if (c.id === id) {
              newStatus = c.status === 'active' ? 'bloquée' : 'débloquée';
              return { ...c, status: c.status === 'active' ? 'blocked' : 'active' };
          }
          return c;
      }));
      if (newStatus) {
        addNotification('security', 'Statut Carte', `Votre carte a été ${newStatus} temporairement.`);
      }
  };
  
  const updateCardLimits = (id: string, newLimits: Card['limits']) => {
      setCards(cards.map(c => c.id === id ? { ...c, limits: newLimits } : c));
      addNotification('security', 'Plafonds mis à jour', 'Les limites de paiement/retrait de votre carte ont été modifiées.');
  };
  
  const markAllNotificationsAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Fonction Admin pour injecter des fonds
  const injectFunds = (amount: number, currency: string, motif: string = "Injection Capital") => {
      if (user) {
           setUser({
              ...user,
              accounts: {
                  ...user.accounts,
                  checking: user.accounts.checking + amount
              }
          });
          const newTx: Transaction = {
            id: `tx-inj-${Date.now()}`,
            date: new Date().toISOString(),
            name: "Trésorerie Centrale", // Nom affiché sur le relevé
            icon: "account_balance",
            cat: motif, // Utilisation du motif personnalisé (ex: Dividendes)
            status: "Complété",
            amt: amount,
            currency: currency === 'USD' ? '$' : '€', 
            beneficiaryDetails: {
                id: 'admin-treasury',
                name: 'Finanzas Trésorerie',
                iban: 'FI76 9999 9999 9999 9999',
                favorite: false,
                bankName: 'Finanzas Central Bank - Administration'
            }
          };
          setTransactions([newTx, ...transactions]);
          // La notification reprend le motif pour être claire
          addNotification('transaction', 'Fonds reçus', `Injection de capital de ${amount} ${currency === 'USD' ? '$' : '€'} reçue. Motif : ${motif}`);
      }
  };

  return (
    <AppContext.Provider value={{ 
      user, transactions, beneficiaries, cards, notifications, isAuthenticated, 
      language, setLanguage, t,
      login, logout, performTransfer, addBeneficiary, updateUser,
      addCard, toggleCardStatus, updateCardLimits, markAllNotificationsAsRead,
      formatTxDate: (d) => formatTxDate(d, language),
      addNotification, injectFunds
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