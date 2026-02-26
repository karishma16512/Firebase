import { Building2, FileText, CreditCard, TrendingUp, Calendar } from 'lucide-react';

interface GSTViewProps {
  userType: 'individual' | 'sme';
}

export function GSTView({ userType }: GSTViewProps) {
  const gstSummary = [
    { title: 'GST Collected', amount: '₹4,25,000', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
    { title: 'Input Tax Credit', amount: '₹1,75,000', icon: CreditCard, color: 'from-green-500 to-green-600' },
    { title: 'GST Payable', amount: '₹2,50,000', icon: FileText, color: 'from-orange-500 to-orange-600' },
    { title: 'Returns Filed', amount: '11/12', icon: Building2, color: 'from-purple-500 to-purple-600' },
  ];

  const gstReturns = [
    { returnType: 'GSTR-1', month: 'February 2026', status: 'Filed', dueDate: '11 Mar 2026', statusColor: 'green' },
    { returnType: 'GSTR-3B', month: 'February 2026', status: 'Pending', dueDate: '20 Mar 2026', statusColor: 'red' },
    { returnType: 'GSTR-1', month: 'January 2026', status: 'Filed', dueDate: '11 Feb 2026', statusColor: 'green' },
    { returnType: 'GSTR-3B', month: 'January 2026', status: 'Filed', dueDate: '20 Feb 2026', statusColor: 'green' },
  ];

  if (userType === 'individual') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-100 text-center">
          <Building2 className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">GST Not Applicable</h3>
          <p className="text-gray-500">GST filing is only available for SME accounts</p>
          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md">
            Switch to SME Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">GST Management</h2>
        <p className="text-gray-500 mt-1">Manage your GST returns and compliance</p>
      </div>

      {/* GST Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gstSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{item.amount}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 text-left group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <FileText className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-1">File GSTR-1</h3>
          <p className="text-sm text-gray-500">File outward supply details</p>
        </button>

        <button className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 text-left group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <FileText className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-1">File GSTR-3B</h3>
          <p className="text-sm text-gray-500">File summary return</p>
        </button>

        <button className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 text-left group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-1">View Calendar</h3>
          <p className="text-sm text-gray-500">Check upcoming due dates</p>
        </button>
      </div>

      {/* GST Returns Table */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">GST Return Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Return Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Month</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {gstReturns.map((gst, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-800">{gst.returnType}</td>
                  <td className="py-4 px-4 text-gray-600">{gst.month}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      gst.statusColor === 'green'
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {gst.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{gst.dueDate}</td>
                  <td className="py-4 px-4">
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      {gst.status === 'Filed' ? 'View' : 'File Now'} →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
