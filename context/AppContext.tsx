import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Transaction {
  id: string;
  date: string; // ISO String for dynamic calculation
  name: string;
  icon: string;
  cat: string; // Used for Motif/Category
  status: 'Complété' | 'En attente' | 'Échoué';
  amt: number; // Numeric value for calculation
  currency: string;
  beneficiaryDetails?: Beneficiary; // Optional: store full beneficiary details for receipt
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  // Nouveaux champs pour le profil
  phone: string;
  address: string;
  jobTitle: string;
  securityPin: string; // Code PIN à 4 chiffres (Strict)
  checkingIban: string; // IBAN du compte courant modifiable
  checkingAccountName: string; // Nom personnalisé du compte courant
  overdraftLimit: number; // Découvert autorisé
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
  date: string; // ISO string for sorting
  read: boolean;
}

interface AppContextType {
  user: User | null;
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  cards: Card[];
  notifications: Notification[];
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  performTransfer: (amount: number, recipientName: string, motif: string, beneficiaryDetails?: Beneficiary) => void;
  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id'>) => void;
  updateUser: (data: Partial<User>) => void;
  // Card Actions
  addCard: (type: 'physical' | 'virtual', design: 'premium-red' | 'midnight-black') => void;
  toggleCardStatus: (id: string) => void;
  updateCardLimits: (id: string, newLimits: Card['limits']) => void;
  // Notification Actions
  markAllNotificationsAsRead: () => void;
  // Utils
  formatTxDate: (isoString: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- UTILS ---
// Fonction pour le temps relatif
const formatTxDate = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "À l'instant";
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} h`;
  if (diffInSeconds < 172800) return "Hier";
  
  // Sinon date standard
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

// Mock Initial Data
const INITIAL_USER: User = {
  name: "Jean Dupont",
  email: "jean.dupont@finanzas.com",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVlfU9LT1bKOu6YiRJpGLlYM55G-ROq-Imcg0n3XaiPz4Iy8P0pdTm5EyTVq2q_KvY4VmF8wY8R_AmHux0K5GK8c-otO4U9RIjF6TrgtAREMs_IOy6l3zZTlPjAdvDPs4fEHnhG8BryjrP3x0xqqLOYgPVENwGW31j510yl19aLhKoSBSGfp5aZuZxHpxmk7w-Gooz3SRg_KEuZzIcqZrlO9xvqN5vm5kBZNPnox4vUcYIM-5BGb5N2taHq1n25De6od-5WYssKEg",
  phone: "+33 6 12 34 56 78",
  address: "14 Avenue des Champs-Élysées, 75008 Paris, France",
  jobTitle: "Cadre Supérieur",
  securityPin: "0000", // Default PIN set to 4 digits
  checkingIban: "FR76 3000 6000 0123 4567 8901 234",
  checkingAccountName: "Compte Courant",
  overdraftLimit: 500,
  accounts: {
    checking: 2450.00,
    savings: 50000.00
  }
};

// Génération de transactions réalistes (50 items)
const generateTransactions = (): Transaction[] => {
  const now = new Date();
  const txs: Transaction[] = [];
  
  // 1. Très récentes
  txs.push({ id: 't1', date: new Date(now.getTime() - 1000 * 30).toISOString(), name: "Apple Store", icon: "laptop_mac", cat: "Électronique", status: "Complété", amt: -1299.00, currency: '€' });
  txs.push({ id: 't2', date: new Date(now.getTime() - 1000 * 60 * 45).toISOString(), name: "Uber Eats", icon: "restaurant", cat: "Restauration", status: "En attente", amt: -25.50, currency: '€' });
  txs.push({ id: 't3', date: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(), name: "Carrefour City", icon: "shopping_cart", cat: "Alimentation", status: "Complété", amt: -42.15, currency: '€' });

  // 2. Hier
  txs.push({ id: 't4', date: new Date(now.getTime() - 1000 * 60 * 60 * 25).toISOString(), name: "Virement Salaire", icon: "payments", cat: "Revenu", status: "Complété", amt: 3500.00, currency: '€' });

  // 3. Passées (Génération de masse)
  const icons = ["restaurant", "shopping_bag", "local_gas_station", "movie", "fitness_center", "train", "flight"];
  const names = ["Starbucks", "Zara", "Total Energies", "Cinema UGC", "Basic Fit", "SNCF", "Air France", "Amazon Prime", "Netflix", "Spotify"];
  const cats = ["Loisirs", "Shopping", "Transport", "Abonnement", "Santé"];

  for (let i = 0; i < 45; i++) {
    const timeOffset = 1000 * 60 * 60 * 24 * (i + 2); // Jours précédents
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomAmt = -(Math.random() * 100 + 5).toFixed(2);
    
    txs.push({
      id: `old_${i}`,
      date: new Date(now.getTime() - timeOffset).toISOString(),
      name: randomName,
      icon: randomIcon,
      cat: cats[Math.floor(Math.random() * cats.length)],
      status: "Complété",
      amt: Number(randomAmt),
      currency: '€'
    });
  }
  
  return txs;
};

const INITIAL_TRANSACTIONS = generateTransactions();

const INITIAL_BENEFICIARIES: Beneficiary[] = [
  { 
    id: '1',
    name: "Jean Dupont", 
    iban: "FR76 •••• •••• 1234", 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyEK5dwziE9aWcUTJas99Q_e0VxQb6tnUMc01v3dSMnl9mv7L8zb6QJExhH-z_KNag1EqDOI8wrTHCIRb4YBtZzNf-H_RJiT6PKs8EQrGA7tA916Jj6V1_eiSuvlJKzF9wplGiaHl-gwswDLUrEYaU9lbJxiTmr-7pxfETzSSQkNC8xWOTFRqlyld9rVpeWJBAnpnTAHLv0cOdjvghr7LACVdAmeD7zG909zCCpKdcprvBb1_m_ENtld54D-iltQLQj75q26tGtBg",
    favorite: false,
    bankName: "BNP Paribas"
  },
  { 
    id: '2',
    name: "Marie Lefebvre", 
    iban: "BE93 •••• •••• 8821", 
    favorite: true,
    bankName: "KBC Brussels"
  },
  { 
    id: '3',
    name: "Thomas Muller", 
    iban: "DE42 •••• •••• 5678", 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyEK5dwziE9aWcUTJas99Q_e0VxQb6tnUMc01v3dSMnl9mv7L8zb6QJExhH-z_KNag1EqDOI8wrTHCIRb4YBtZzNf-H_RJiT6PKs8EQrGA7tA916Jj6V1_eiSuvlJKzF9wplGiaHl-gwswDLUrEYaU9lbJxiTmr-7pxfETzSSQkNC8xWOTFRqlyld9rVpeWJBAnpnTAHLv0cOdjvghr7LACVdAmeD7zG909zCCpKdcprvBb1_m_ENtld54D-iltQLQj75q26tGtBg",
    favorite: false,
    bankName: "Deutsche Bank"
  },
  { 
    id: '4',
    name: "Sarah Williams", 
    iban: "GB12 •••• •••• 9900", 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGg7_Lh0wYSya4uECacFBdzku7QnQLMBXnA4ikqVPrGk-vgW39rzABKZU3bkoFEaWVQ95T8aKYoebyA6RAqs5e6Eludgofy0ZtAIRTVXVUo3FOSCgTjrXBAoImKhekiDzr3BW3uQJY1iEq2DDTnmHGQMmYZe14JwLQqCHclXlcmgiT7Kyrfau6p99eLK-roxK8TVFH3IDKu4w801ty99qsrGe9e5PHmR8xYcQ39o2-QmKXod-i5NsxSFSofs_XQ73GLdxU8emEdeQ",
    favorite: false,
    bankName: "Barclays"
  }
];

const INITIAL_CARDS: Card[] = [
  {
    id: 'c1',
    type: 'physical',
    network: 'mastercard',
    number: '5324892145823021',
    holder: 'JEAN DUPONT',
    expiry: '09/27',
    cvc: '123',
    pin: '1234',
    status: 'active',
    design: 'premium-red',
    limits: {
      payment: { current: 2450, max: 5000 },
      withdrawal: { current: 400, max: 1000 }
    }
  },
  {
    id: 'c2',
    type: 'virtual',
    network: 'visa',
    number: '4929304910239103',
    holder: 'JEAN DUPONT',
    expiry: '12/25',
    cvc: '987',
    pin: '0000',
    status: 'active',
    design: 'midnight-black',
    limits: {
      payment: { current: 150, max: 1000 },
      withdrawal: { current: 0, max: 0 }
    }
  }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'security',
    title: 'Alerte Sécurité : Nouvelle Connexion',
    message: "Un nouvel appareil s'est connecté à votre compte depuis Paris, France.",
    date: new Date().toISOString(),
    read: false
  },
  {
    id: 'n2',
    type: 'transaction',
    title: 'Virement Reçu',
    message: 'Votre compte a été crédité de 1,250.00 € par SARL TechInvest.',
    date: new Date(Date.now() - 3600000).toISOString(),
    read: true
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser(INITIAL_USER);
      setTransactions(INITIAL_TRANSACTIONS);
      setBeneficiaries(INITIAL_BENEFICIARIES);
      setCards(INITIAL_CARDS);
      setNotifications(INITIAL_NOTIFICATIONS);
    }
  }, []);

  // Helper to push notification
  const pushNotification = (type: Notification['type'], title: string, message: string) => {
    const newNotif: Notification = {
        id: `n${Date.now()}`,
        type,
        title,
        message,
        date: new Date().toISOString(),
        read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUser({ ...INITIAL_USER, email });
    setTransactions(INITIAL_TRANSACTIONS);
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

  const performTransfer = (amount: number, recipientName: string, motif: string = "Virement", beneficiaryDetails?: Beneficiary) => {
    if (!user) return;
    
    if (user.accounts.checking < amount) {
        console.error("Tentative de virement sans solde suffisant.");
        pushNotification('system', 'Échec Virement', `Le virement de ${amount}€ vers ${recipientName} a échoué : Solde insuffisant.`);
        return; 
    }

    const newChecking = user.accounts.checking - amount;
    setUser({
      ...user,
      accounts: { ...user.accounts, checking: newChecking }
    });

    const newTx: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(), // Use Current ISO Time
      name: `${recipientName}`,
      icon: "send",
      cat: motif,
      status: "Complété",
      amt: -amount,
      currency: '€',
      beneficiaryDetails: beneficiaryDetails // Save full details
    };

    setTransactions([newTx, ...transactions]);
    pushNotification('transaction', 'Virement Effectué', `Vous avez envoyé ${amount}€ à ${recipientName}.`);
  };

  const addBeneficiary = (data: Omit<Beneficiary, 'id'>) => {
    const newBeneficiary: Beneficiary = {
      id: Date.now().toString(),
      ...data
    };
    setBeneficiaries([newBeneficiary, ...beneficiaries]);
    pushNotification('system', 'Bénéficiaire Ajouté', `${data.name} a été ajouté à votre liste de bénéficiaires.`);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
      // Notification moins intrusive pour les petites modifications
      if (data.securityPin || data.email || data.checkingIban) {
         pushNotification('security', 'Sécurité', 'Vos informations sensibles ont été mises à jour.');
      }
    }
  };

  // --- CARD ACTIONS ---

  const addCard = (type: 'physical' | 'virtual', design: 'premium-red' | 'midnight-black') => {
    const genPart = () => Math.floor(1000 + Math.random() * 9000).toString();
    const fullNumber = `${genPart()}${genPart()}${genPart()}${genPart()}`;
    
    const newCard: Card = {
      id: `c${Date.now()}`,
      type,
      network: Math.random() > 0.5 ? 'visa' : 'mastercard',
      number: fullNumber,
      holder: user ? user.name.toUpperCase() : 'UTILISATEUR',
      expiry: '12/28',
      cvc: Math.floor(100 + Math.random() * 900).toString(),
      pin: Math.floor(1000 + Math.random() * 9000).toString(),
      status: 'active',
      design,
      limits: {
        payment: { current: 0, max: type === 'physical' ? 5000 : 1000 },
        withdrawal: { current: 0, max: type === 'physical' ? 1000 : 0 }
      }
    };
    setCards([...cards, newCard]);
    pushNotification('system', 'Nouvelle Carte', `Votre carte ${type === 'physical' ? 'physique' : 'virtuelle'} a été créée avec succès.`);
  };

  const toggleCardStatus = (id: string) => {
    let newStatus = '';
    setCards(cards.map(card => {
        if (card.id === id) {
            newStatus = card.status === 'active' ? 'blocked' : 'active';
            return { ...card, status: card.status === 'active' ? 'blocked' : 'active' };
        }
        return card;
    }));
    
    // Find card for notif detail
    const card = cards.find(c => c.id === id);
    if (card) {
        const action = card.status === 'active' ? 'bloquée' : 'débloquée';
        pushNotification('security', 'Statut Carte Modifié', `Votre carte terminant par ${card.number.slice(-4)} a été ${action}.`);
    }
  };

  const updateCardLimits = (id: string, newLimits: Card['limits']) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, limits: newLimits } : card
    ));
    pushNotification('system', 'Plafonds Mis à jour', 'Les limites de votre carte ont été modifiées.');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{ 
      user, transactions, beneficiaries, cards, notifications, isAuthenticated, 
      login, logout, performTransfer, addBeneficiary, updateUser,
      addCard, toggleCardStatus, updateCardLimits, markAllNotificationsAsRead,
      formatTxDate
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