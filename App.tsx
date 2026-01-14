import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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

  return (
    <Routes>
      <Route path="/" element={<Layout><DashboardPage /></Layout>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/transactions" element={<Layout><TransactionsPage /></Layout>} />
      <Route path="/receipt" element={<ReceiptPage />} />
      <Route path="/cards" element={<Layout><CardsPage /></Layout>} />
      <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
      <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
      <Route path="/virement-beneficiary" element={<Layout><VirementBeneficiaryPage /></Layout>} />
      <Route path="/virement-amount" element={<Layout><VirementAmountPage /></Layout>} />
      <Route path="/virement-confirm" element={<Layout><VirementConfirmPage /></Layout>} />
      <Route path="/virement-success" element={<Layout><VirementSuccessPage /></Layout>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/statement" element={<StatementPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;