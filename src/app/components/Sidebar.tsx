import {
  BarChart3,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  FileText,
  DollarSign,
  TrendingDown,
  Building2
} from 'lucide-react';
import { authService } from '../../services/authService';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: FileText, label: 'File Return', id: 'file-return' },
  { icon: DollarSign, label: 'Income Details', id: 'income' },
  { icon: TrendingDown, label: 'Deductions', id: 'deductions' },
  { icon: Building2, label: 'GST', id: 'gst' },
  { icon: BarChart3, label: 'Reports', id: 'reports' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export function Sidebar({ isOpen, onToggle, activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-20'
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ST</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">SmartTax</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex flex-col h-[calc(100vh-100px)]">
        <div className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Icon size={20} />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => authService.logout()}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 mt-auto"
        >
          <LogOut size={20} />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </nav>
    </aside>
  );
}