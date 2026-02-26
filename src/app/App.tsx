import { LoginView } from './components/LoginView';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Toaster } from 'sonner';
import { Sidebar } from './components/Sidebar';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardView } from './components/DashboardView';
import { FileReturnView } from './components/FileReturnView';
import { IncomeDetailsView } from './components/IncomeDetailsView';
import { DeductionsView } from './components/DeductionsView';
import { GSTView } from './components/GSTView';
import { ReportsView } from './components/ReportsView';
import { NotificationsView } from './components/NotificationsView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;
  const [userType, setUserType] = useState<'individual' | 'sme'>('individual');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView userType={userType} />;
      case 'file-return':
        return <FileReturnView userType={userType} />;
      case 'income':
        return <IncomeDetailsView userType={userType} />;
      case 'deductions':
        return <DeductionsView userType={userType} />;
      case 'gst':
        return <GSTView userType={userType} />;
      case 'reports':
        return <ReportsView userType={userType} />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView userType={userType} />;
    }
  };
  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <LoginView />;
  }


  return (
    <div className="flex min-h-screen bg-[#f4f6f9]">
      <Toaster position="top-right" richColors />
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <DashboardHeader
          userType={userType}
          onUserTypeChange={setUserType}
        />

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}