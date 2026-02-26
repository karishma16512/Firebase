import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  RefreshCw,
  Building2,
  FileText,
  CreditCard
} from 'lucide-react';

interface SummaryCardsProps {
  userType: 'individual' | 'sme';
}

const individualData = [
  {
    title: 'Total Income',
    value: '₹12,50,000',
    change: '+8.5%',
    isPositive: true,
    icon: DollarSign,
    bgColor: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Total Deductions',
    value: '₹2,50,000',
    change: '+12.3%',
    isPositive: true,
    icon: TrendingDown,
    bgColor: 'from-green-500 to-green-600',
  },
  {
    title: 'Tax Payable',
    value: '₹1,87,500',
    change: '-5.2%',
    isPositive: false,
    icon: FileText,
    bgColor: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Estimated Refund',
    value: '₹25,000',
    change: '+18.7%',
    isPositive: true,
    icon: RefreshCw,
    bgColor: 'from-purple-500 to-purple-600',
  },
];

const smeData = [
  {
    title: 'Business Revenue',
    value: '₹85,00,000',
    change: '+15.8%',
    isPositive: true,
    icon: Building2,
    bgColor: 'from-blue-500 to-blue-600',
  },
  {
    title: 'GST Payable',
    value: '₹4,25,000',
    change: '+8.2%',
    isPositive: true,
    icon: FileText,
    bgColor: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Input Tax Credit',
    value: '₹1,75,000',
    change: '+22.5%',
    isPositive: true,
    icon: CreditCard,
    bgColor: 'from-green-500 to-green-600',
  },
  {
    title: 'Pending Filings',
    value: '3',
    change: '-40.0%',
    isPositive: false,
    icon: TrendingDown,
    bgColor: 'from-red-500 to-red-600',
  },
];

export function SummaryCards({ userType }: SummaryCardsProps) {
  const data = userType === 'individual' ? individualData : smeData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.bgColor} flex items-center justify-center shadow-lg`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {card.isPositive ? (
                <TrendingUp className="text-green-500" size={16} />
              ) : (
                <TrendingDown className="text-red-500" size={16} />
              )}
              <span className={`text-sm font-medium ${card.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {card.change}
              </span>
              <span className="text-xs text-gray-400 ml-1">vs last year</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
