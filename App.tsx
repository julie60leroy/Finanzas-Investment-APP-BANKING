import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import TransactionsPage from './pages/TransactionsPage';
import ReceiptPage from './pages/ReceiptPage';
import CardsPage from './pages/CardsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import VirementBeneficiaryPage from './pages/transfers/VirementBeneficiaryPage';
import VirementAmountPage from './pages/transfers/VirementAmountPage';
import VirementConfirmPage from './pages/transfers/VirementConfirmPage';
import VirementSuccessPage from './pages/transfers/VirementSuccessPage';
import AdminPage from './pages/AdminPage';
import StatementPage from './pages/StatementPage';
import { AppProvider, useApp } from './context/AppContext';

// Component to protect routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
    <Sidebar />
    <main className="flex-1 flex flex-col h-full overflow-y-auto">
      {children}
    </main>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/receipt', '/statement', '/admin'];
  const useLayout = !noLayoutRoutes.includes(location.pathname);

  // Helper to wrap with Layout if needed, then protect
  const RouteElement = ({ component }: { component: React.ReactNode }) => {
    const wrapped = useLayout ? <Layout>{component}</Layout> : component;
    // Admin, Login, Statement might not need auth check for this demo, or specific ones do.
    // Let's protect everything except login
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
      <Route path="/settings" element={<RouteElement component={<SettingsPage />} />} />
      <Route path="/profile" element={<RouteElement component={<ProfilePage />} />} />
      <Route path="/virement-beneficiary" element={<RouteElement component={<VirementBeneficiaryPage />} />} />
      <Route path="/virement-amount" element={<RouteElement component={<VirementAmountPage />} />} />
      <Route path="/virement-confirm" element={<RouteElement component={<VirementConfirmPage />} />} />
      <Route path="/virement-success" element={<RouteElement component={<VirementSuccessPage />} />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/statement" element={<StatementPage />} />
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