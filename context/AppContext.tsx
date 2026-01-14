import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Transaction {
  id: string;
  date: string; // Formatted date string
  name: string;
  icon: string;
  cat: string;
  status: 'Complété' | 'En attente' | 'Échoué';
  amt: number; // Numeric value for calculation
  currency: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  accounts: {
    checking: number;
    savings: number;
  };
}

interface AppContextType {
  user: User | null;
  transactions: Transaction[];
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  performTransfer: (amount: number, recipientName: string) => void;
  updateUser: (data: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Initial Data
const INITIAL_USER: User = {
  name: "Marc Dubois",
  email: "marc.dubois@finanzas.com",
  avatar: "https://picsum.photos/200",
  accounts: {
    checking: 2450.00,
    savings: 50000.00
  }
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: "Aujourd'hui, 14:30", name: "Apple Store", icon: "laptop_mac", cat: "Électronique", status: "Complété", amt: -1299.00, currency: '€' },
  { id: '2', date: "Hier, 19:15", name: "Uber Eats", icon: "restaurant", cat: "Restauration", status: "En attente", amt: -45.50, currency: '€' },
  { id: '3', date: "22 Oct 2023", name: "Virement Salaire", icon: "payments", cat: "Revenu", status: "Complété", amt: 3500.00, currency: '€' }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize (Simulate fetching data)
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser(INITIAL_USER); // Reset to default on reload for demo, normally fetch from DB
      setTransactions(INITIAL_TRANSACTIONS);
    }
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUser({ ...INITIAL_USER, email });
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.setItem('isAuth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuth');
  };

  const performTransfer = (amount: number, recipientName: string) => {
    if (!user) return;

    // Deduct from checking
    const newChecking = user.accounts.checking - amount;
    setUser({
      ...user,
      accounts: { ...user.accounts, checking: newChecking }
    });

    // Add Transaction
    const newTx: Transaction = {
      id: Date.now().toString(),
      date: "A l'instant",
      name: `Virement: ${recipientName}`,
      icon: "send",
      cat: "Virement",
      status: "Complété",
      amt: -amount,
      currency: '€'
    };

    setTransactions([newTx, ...transactions]);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AppContext.Provider value={{ user, transactions, isAuthenticated, login, logout, performTransfer, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
