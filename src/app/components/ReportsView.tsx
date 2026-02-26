import { Download, FileText, TrendingUp, Calendar } from 'lucide-react';

interface ReportsViewProps {
  userType: 'individual' | 'sme';
}

export function ReportsView({ userType }: ReportsViewProps) {
  const reports = [
    {
      name: 'Annual Tax Summary',
      description: 'Complete tax summary for FY 2025-26',
      date: '25 Feb 2026',
      type: 'PDF',
      icon: FileText,
    },
    {
      name: 'Income Statement',
      description: 'Detailed income breakdown',
      date: '20 Feb 2026',
      type: 'Excel',
      icon: TrendingUp,
    },
    {
      name: 'Deductions Report',
      description: 'All claimed deductions summary',
      date: '15 Feb 2026',
      type: 'PDF',
      icon: FileText,
    },
    {
      name: 'Quarterly Tax Report',
      description: 'Q4 FY 2025-26 tax report',
      date: '10 Feb 2026',
      type: 'PDF',
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Reports & Documents</h2>
        <p className="text-gray-500 mt-1">Download and view your tax reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl text-white">
          <FileText className="mb-3" size={32} />
          <h3 className="text-3xl font-bold mb-1">24</h3>
          <p className="text-blue-100">Total Reports</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
          <Download className="mb-3" size={32} />
          <h3 className="text-3xl font-bold mb-1">156</h3>
          <p className="text-purple-100">Downloads</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-xl text-white">
          <Calendar className="mb-3" size={32} />
          <h3 className="text-3xl font-bold mb-1">12</h3>
          <p className="text-green-100">This Month</p>
        </div>
      </div>

      {/* Generate Report Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Tax Summary</option>
              <option>Income Statement</option>
              <option>Deductions Report</option>
              <option>Payment History</option>
              <option>Form 26AS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Financial Year</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>FY 2025-26</option>
              <option>FY 2024-25</option>
              <option>FY 2023-24</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md flex items-center space-x-2">
          <FileText size={18} />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {reports.map((report, index) => {
            const Icon = report.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
                    <Icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{report.name}</h4>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{report.date}</p>
                    <span className="text-xs text-gray-400">{report.type}</span>
                  </div>
                  <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors group">
                    <Download className="text-purple-600 group-hover:text-purple-700" size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tax Reports</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-between">
              <span className="text-gray-700">Form 16</span>
              <Download className="text-purple-600" size={18} />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-between">
              <span className="text-gray-700">Form 26AS</span>
              <Download className="text-purple-600" size={18} />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-between">
              <span className="text-gray-700">ITR Acknowledgement</span>
              <Download className="text-purple-600" size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Reports</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-between">
              <span className="text-gray-700">Balance Sheet</span>
              <Download className="text-purple-600" size={18} />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-between">
              <span className="text-gray-700">Profit & Loss</span>
              <Download className="text-purple-600" size={18} />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-between">
              <span className="text-gray-700">Cash Flow Statement</span>
              <Download className="text-purple-600" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
