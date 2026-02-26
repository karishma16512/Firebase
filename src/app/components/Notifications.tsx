import { AlertCircle, CheckCircle, Info, Clock } from 'lucide-react';

const notifications = [
  {
    type: 'warning',
    icon: AlertCircle,
    message: 'ITR filing deadline approaching',
    time: '2 days ago',
    color: 'orange',
  },
  {
    type: 'error',
    icon: Clock,
    message: 'GST return due in 3 days',
    time: '1 day ago',
    color: 'red',
  },
  {
    type: 'success',
    icon: CheckCircle,
    message: 'Refund processed successfully',
    time: '5 days ago',
    color: 'green',
  },
  {
    type: 'info',
    icon: Info,
    message: 'New tax saving scheme available',
    time: '1 week ago',
    color: 'blue',
  },
  {
    type: 'warning',
    icon: AlertCircle,
    message: 'Update your PAN details',
    time: '1 week ago',
    color: 'orange',
  },
];

export function Notifications() {
  const getColorClasses = (color: string) => {
    const classes = {
      orange: {
        bg: 'bg-orange-100',
        icon: 'text-orange-600',
        border: 'border-orange-200',
      },
      red: {
        bg: 'bg-red-100',
        icon: 'text-red-600',
        border: 'border-red-200',
      },
      green: {
        bg: 'bg-green-100',
        icon: 'text-green-600',
        border: 'border-green-200',
      },
      blue: {
        bg: 'bg-blue-100',
        icon: 'text-blue-600',
        border: 'border-blue-200',
      },
    };
    return classes[color as keyof typeof classes] || classes.blue;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          const colorClasses = getColorClasses(notification.color);
          
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border ${colorClasses.border} ${colorClasses.bg} hover:shadow-md transition-all cursor-pointer`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon className={colorClasses.icon} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
