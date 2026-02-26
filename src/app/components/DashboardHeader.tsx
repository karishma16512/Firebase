import { User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DashboardHeaderProps {
  userType: 'individual' | 'sme';
  onUserTypeChange: (type: 'individual' | 'sme') => void;
}

export function DashboardHeader({ userType, onUserTypeChange }: DashboardHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (type: 'individual' | 'sme') => {
    onUserTypeChange(type);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tax Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's your tax overview</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* User Type Selector - Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 pr-10 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md flex items-center space-x-2"
            >
              <span>{userType === 'individual' ? '👤 Individual' : '🏢 SME'}</span>
              <ChevronDown className={`absolute right-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={16} />
            </button>
            
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20 min-w-[180px]">
                  <button
                    onClick={() => handleSelect('individual')}
                    className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center space-x-2 ${
                      userType === 'individual' ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <span>👤 Individual</span>
                  </button>
                  <button
                    onClick={() => handleSelect('sme')}
                    className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center space-x-2 ${
                      userType === 'sme' ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <span>🏢 SME</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">PAN: ABCDE1234F</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}