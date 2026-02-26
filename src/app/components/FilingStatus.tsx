import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface FilingStatusProps {
  userType: 'individual' | 'sme';
}

const individualFilings = [
  {
    returnType: 'ITR Filing',
    status: 'Completed',
    dueDate: '31 July 2025',
    statusColor: 'green',
  },
  {
    returnType: 'Advance Tax Q4',
    status: 'Pending',
    dueDate: '15 March 2026',
    statusColor: 'red',
  },
  {
    returnType: 'Form 26AS Review',
    status: 'Upcoming',
    dueDate: '10 March 2026',
    statusColor: 'orange',
  },
  {
    returnType: 'TDS Return',
    status: 'Completed',
    dueDate: '31 January 2026',
    statusColor: 'green',
  },
];

const smeFilings = [
  {
    returnType: 'ITR Filing',
    status: 'Pending',
    dueDate: '31 October 2025',
    statusColor: 'red',
  },
  {
    returnType: 'GST Return (GSTR-3B)',
    status: 'Upcoming',
    dueDate: '20 March 2026',
    statusColor: 'orange',
  },
  {
    returnType: 'GST Return (GSTR-1)',
    status: 'Completed',
    dueDate: '11 February 2026',
    statusColor: 'green',
  },
  {
    returnType: 'Advance Tax Q4',
    status: 'Upcoming',
    dueDate: '15 March 2026',
    statusColor: 'orange',
  },
  {
    returnType: 'TDS Return',
    status: 'Completed',
    dueDate: '31 January 2026',
    statusColor: 'green',
  },
];

export function FilingStatus({ userType }: FilingStatusProps) {
  const filings = userType === 'individual' ? individualFilings : smeFilings;

  const getStatusIcon = (statusColor: string) => {
    switch (statusColor) {
      case 'green':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'red':
        return <AlertCircle className="text-red-500" size={18} />;
      case 'orange':
        return <Clock className="text-orange-500" size={18} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string, statusColor: string) => {
    const colorClasses = {
      green: 'bg-green-100 text-green-700 border-green-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colorClasses[statusColor as keyof typeof colorClasses]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filing Status</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Return Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Due Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {filings.map((filing, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(filing.statusColor)}
                    <span className="font-medium text-gray-800">{filing.returnType}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(filing.status, filing.statusColor)}
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">{filing.dueDate}</span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
