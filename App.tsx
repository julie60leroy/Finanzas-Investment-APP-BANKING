import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import TransactionsPage from './pages/TransactionsPage';
import ReceiptPage from './pages/ReceiptPage';
import CardsPage from './pages/CardsPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import VirementBeneficiaryPage from './pages/transfers/VirementBeneficiaryPage';
import VirementAmountPage from './pages/transfers/VirementAmountPage';
import VirementConfirmPage from './pages/transfers/VirementConfirmPage';
import VirementSuccessPage from './pages/transfers/VirementSuccessPage';
import AdminPage from './pages/AdminPage';
import StatementPage from './pages/StatementPage';
import AccountDetailsPage from './pages/AccountDetailsPage';
import { AppProvider, useApp } from './context/AppContext';

// Component to protect routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useApp();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar Responsive */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative w-full">
        {/* Mobile Header (Visible uniquement sur mobile) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-4">
            {/* Hamburger Button (3 traits) */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
            <div className="flex items-center gap-2">
               <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">token</span>
               </div>
               <h1 className="text-lg font-bold tracking-tight">
                 Finanzas<span className="text-primary">.</span>
               </h1>
            </div>
          </div>
          <div 
            className="size-8 rounded-full bg-cover bg-center border border-white/20"
            style={{ backgroundImage: `url("${user?.avatar || ''}")` }}
          ></div>
        </header>

        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/receipt', '/statement', '/admin'];
  const useLayout = !noLayoutRoutes.includes(location.pathname);

  // Helper to wrap with Layout if needed, then protect
  const RouteElement = ({ component }: { component: React.ReactNode }) => {
    const wrapped = useLayout ? <Layout>{component}</Layout> : component;
    
    if (location.pathname === '/login') return <>{wrapped}</>;
    
    return <ProtectedRoute>{wrapped}</ProtectedRoute>;
  };

  return (
    <Routes>
      <Route path="/" element={<RouteElement component={<DashboardPage />} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/transactions" element={<RouteElement component={<TransactionsPage />} />} />
      <Route path="/receipt" element={<RouteElement component={<ReceiptPage />} />} />
      <Route path="/cards" element={<RouteElement component={<CardsPage />} />} />
      <Route path="/notifications" element={<RouteElement component={<NotificationsPage />} />} />
      <Route path="/settings" element={<RouteElement component={<SettingsPage />} />} />
      <Route path="/profile" element={<RouteElement component={<ProfilePage />} />} />
      <Route path="/virement-beneficiary" element={<RouteElement component={<VirementBeneficiaryPage />} />} />
      <Route path="/virement-amount" element={<RouteElement component={<VirementAmountPage />} />} />
      <Route path="/virement-confirm" element={<RouteElement component={<VirementConfirmPage />} />} />
      <Route path="/virement-success" element={<RouteElement component={<VirementSuccessPage />} />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/statement" element={<StatementPage />} />
      <Route path="/account-checking" element={<RouteElement component={<AccountDetailsPage />} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
};

export default App;