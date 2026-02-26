import { Bell, AlertCircle, CheckCircle, Info, Clock, X } from 'lucide-react';

export function NotificationsView() {
  const allNotifications = [
    {
      id: 1,
      type: 'warning',
      icon: AlertCircle,
      title: 'ITR filing deadline approaching',
      message: 'Your ITR filing deadline is approaching on 31st July 2025. Please file your returns to avoid penalties.',
      time: '2 days ago',
      color: 'orange',
      read: false,
    },
    {
      id: 2,
      type: 'error',
      icon: Clock,
      title: 'GST return due in 3 days',
      message: 'GSTR-3B for February 2026 is due on 20th March. File your return to stay compliant.',
      time: '1 day ago',
      color: 'red',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      icon: CheckCircle,
      title: 'Refund processed successfully',
      message: 'Your tax refund of ₹25,000 has been processed and will be credited to your account within 2-3 business days.',
      time: '5 days ago',
      color: 'green',
      read: true,
    },
    {
      id: 4,
      type: 'info',
      icon: Info,
      title: 'New tax saving scheme available',
      message: 'The government has introduced new tax saving schemes under Section 80CCD. Check eligibility and invest now.',
      time: '1 week ago',
      color: 'blue',
      read: true,
    },
    {
      id: 5,
      type: 'warning',
      icon: AlertCircle,
      title: 'Update your PAN details',
      message: 'Please update your PAN card details with Aadhaar to avoid any issues during tax filing.',
      time: '1 week ago',
      color: 'orange',
      read: true,
    },
    {
      id: 6,
      type: 'success',
      icon: CheckCircle,
      title: 'TDS return filed successfully',
      message: 'Your TDS return for Q3 has been filed successfully. Acknowledgement number: ACK123456789.',
      time: '2 weeks ago',
      color: 'green',
      read: true,
    },
    {
      id: 7,
      type: 'info',
      icon: Info,
      title: 'Form 16 available for download',
      message: 'Your Form 16 for FY 2024-25 is now available. Download it from the Reports section.',
      time: '2 weeks ago',
      color: 'blue',
      read: true,
    },
    {
      id: 8,
      type: 'warning',
      icon: Clock,
      title: 'Advance tax payment reminder',
      message: 'Fourth installment of advance tax is due on 15th March 2026. Calculate and pay your advance tax.',
      time: '3 weeks ago',
      color: 'orange',
      read: true,
    },
  ];

  const getColorClasses = (color: string) => {
    const classes = {
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-700',
      },
      red: {
        bg: 'bg-red-50',
        icon: 'text-red-600',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-700',
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-700',
      },
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700',
      },
    };
    return classes[color as keyof typeof classes] || classes.blue;
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          <p className="text-gray-500 mt-1">Stay updated with all your tax alerts</p>
        </div>
        <button className="px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium hover:bg-purple-50 rounded-lg transition-colors">
          Mark all as read
        </button>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Bell className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">8</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <AlertCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">2</p>
              <p className="text-xs text-gray-500">Unread</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-xs text-gray-500">Urgent</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">6</p>
              <p className="text-xs text-gray-500">Read</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-2 shadow-md border border-gray-100 flex space-x-2">
        <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium">
          All
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
          Unread
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
          Urgent
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
          Archive
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {allNotifications.map((notification) => {
          const Icon = notification.icon;
          const colorClasses = getColorClasses(notification.color);
          
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-xl p-5 shadow-md border ${
                notification.read ? 'border-gray-100' : `${colorClasses.border} border-l-4`
              } hover:shadow-lg transition-all relative`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
                  <Icon className={colorClasses.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{notification.title}</h4>
                      {!notification.read && (
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full mb-2">
                          New
                        </span>
                      )}
                    </div>
                    <button className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors">
                      <X className="text-gray-400" size={16} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{notification.time}</span>
                    <div className="flex space-x-2">
                      <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                        View Details
                      </button>
                      {!notification.read && (
                        <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
