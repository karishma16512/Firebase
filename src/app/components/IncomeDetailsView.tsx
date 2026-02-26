import { useState, useEffect } from "react";
import { DollarSign, Briefcase, TrendingUp, Home, PiggyBank } from 'lucide-react';
import { incomeService } from '../../services/incomeService';
import { Income } from '../../types';
import { toast } from 'sonner';

interface IncomeDetailsViewProps {
  userType: 'individual' | 'sme';
}

export function IncomeDetailsView({ userType }: IncomeDetailsViewProps) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(false);
  const [incomeType, setIncomeType] = useState('salary');
  const [amount, setAmount] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const financialYear = '2023-2024';

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const response = await incomeService.getAll({ financialYear });
      setIncomes(response);

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch incomes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      await incomeService.create({
        sourceType: incomeType,
        amount: parseFloat(amount),
        financialYear
      });
      toast.success('Income added successfully');
      setAmount('');
      fetchIncomes();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add income');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIncome = async (id: string) => {
    if (!confirm('Are you sure you want to delete this income?')) return;

    try {
      setLoading(true);
      await incomeService.delete(id);
      toast.success('Income deleted successfully');
      fetchIncomes();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete income');
    } finally {
      setLoading(false);
    }
  };

  const getTotalIncome = () => {
    return incomes.reduce((sum, income) => sum + income.amount, 0);
  };

  const getIncomeByType = (type: string) => {
    return incomes
      .filter(income => income.sourceType === type)
      .reduce((sum, income) => sum + income.amount, 0);
  };

  const individualIncome = [
    { source: 'Salary Income', amount: getIncomeByType('salary'), icon: Briefcase, color: 'from-blue-500 to-blue-600', type: 'salary' },
    { source: 'Business Income', amount: getIncomeByType('business'), icon: TrendingUp, color: 'from-purple-500 to-purple-600', type: 'business' },
    { source: 'House Property', amount: getIncomeByType('rental'), icon: Home, color: 'from-green-500 to-green-600', type: 'rental' },
    { source: 'Other Sources', amount: getIncomeByType('other'), icon: PiggyBank, color: 'from-orange-500 to-orange-600', type: 'other' },
  ];

  const smeIncome = [
    { source: 'Business Income', amount: getIncomeByType('business'), icon: TrendingUp, color: 'from-blue-500 to-blue-600', type: 'business' },
    { source: 'Capital Gains', amount: getIncomeByType('capital_gains'), icon: DollarSign, color: 'from-green-500 to-green-600', type: 'capital_gains' },
    { source: 'Other Income', amount: getIncomeByType('other'), icon: PiggyBank, color: 'from-orange-500 to-orange-600', type: 'other' },
  ];

  const incomeData = userType === 'individual' ? individualIncome : smeIncome;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Income Details</h2>
        <p className="text-gray-500 mt-1">Track and manage all your income sources</p>
      </div>

      {/* Income Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {incomeData.map((income) => {
          const Icon = income.icon;
          return (
            <div
              key={income.source}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">{income.source}</p>
                  <h3 className="text-2xl font-bold text-gray-800">₹{income.amount.toLocaleString('en-IN')}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${income.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <button
                onClick={() => setFilterType(income.type)}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                View Details →
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Income Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Income Source</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Income Type</label>
            <select
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="salary">Salary</option>
              <option value="business">Business</option>
              <option value="capital_gains">Capital Gains</option>
              <option value="rental">House Property</option>
              <option value="other">Other Sources</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <button
          onClick={handleAddIncome}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Income'}
        </button>
      </div>

      {/* Income Summary Table */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {filterType ? `${filterType.charAt(0).toUpperCase() + filterType.slice(1).replace('_', ' ')} Records` : 'Recent Income Records'}
          </h3>
          {filterType && (
            <button
              onClick={() => setFilterType(null)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Show All
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : incomes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No income records found. Add your first income above.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Source</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomes
                  .filter(income => !filterType || income.sourceType === filterType)
                  .slice(0, 10)
                  .map((income) => (
                    <tr key={income._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-800">
                        {new Date(income.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-4 px-4 text-gray-600 capitalize">
                        {income.sourceType.replace('_', ' ')}
                      </td>
                      <td className="py-4 px-4 text-gray-800 font-semibold">
                        ₹{income.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleDeleteIncome(income._id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
