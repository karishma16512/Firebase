import { useState, useEffect } from 'react';
import { Heart, GraduationCap, Home, Shield, TrendingDown } from 'lucide-react';
import { deductionService } from '../../services/deductionService';
import { Deduction } from '../../types';
import { toast } from 'sonner';

interface DeductionsViewProps {
  userType: 'individual' | 'sme';
}

export function DeductionsView({ userType }: DeductionsViewProps) {
  const [deductions, setDeductions] = useState<Deduction[]>([]);
  const [loading, setLoading] = useState(false);
  const [sectionType, setSectionType] = useState('80C');
  const [amount, setAmount] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const financialYear = '2023-2024';

  useEffect(() => {
    fetchDeductions();
  }, []);

  const fetchDeductions = async () => {
    try {
      setLoading(true);
      const response = await deductionService.getAll({ financialYear });
      setDeductions(response);

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch deductions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDeduction = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      await deductionService.create({
        sectionType,
        amount: parseFloat(amount),
        financialYear
      });
      toast.success('Deduction added successfully');
      setAmount('');
      fetchDeductions();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add deduction');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeduction = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deduction?')) return;

    try {
      setLoading(true);
      await deductionService.delete(id);
      toast.success('Deduction deleted successfully');
      fetchDeductions();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete deduction');
    } finally {
      setLoading(false);
    }
  };

  const getTotalDeductions = () => {
    return deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
  };

  const getDeductionBySection = (section: string) => {
    return deductions
      .filter(deduction => deduction.sectionType === section)
      .reduce((sum, deduction) => sum + deduction.amount, 0);
  };

  const deductionCards = [
    { section: 'Section 80C', description: 'PPF, ELSS, Life Insurance', amount: getDeductionBySection('80C'), icon: Shield, color: 'from-blue-500 to-blue-600' },
    { section: 'Section 80D', description: 'Health Insurance Premium', amount: getDeductionBySection('80D'), icon: Heart, color: 'from-red-500 to-red-600' },
    { section: 'Section 80E', description: 'Education Loan Interest', amount: getDeductionBySection('80E'), icon: GraduationCap, color: 'from-purple-500 to-purple-600' },
    { section: 'Section 80G', description: 'Donations', amount: getDeductionBySection('80G'), icon: Home, color: 'from-green-500 to-green-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Tax Deductions</h2>
        <p className="text-gray-500 mt-1">Maximize your tax savings with eligible deductions</p>
      </div>

      {/* Total Deductions Card */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 mb-2">Total Deductions Claimed</p>
            <h2 className="text-4xl font-bold">₹{getTotalDeductions().toLocaleString('en-IN')}</h2>
            <p className="text-purple-100 mt-2">Tax Saved: ₹{(getTotalDeductions() * 0.3).toLocaleString('en-IN')}</p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <TrendingDown size={40} />
          </div>
        </div>
      </div>

      {/* Deduction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deductionCards.map((deduction) => {
          const Icon = deduction.icon;
          return (
            <div
              key={deduction.section}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${deduction.color} flex items-center justify-center shadow-lg mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{deduction.section}</h3>
              <p className="text-sm text-gray-500 mb-3">{deduction.description}</p>
              <p className="text-2xl font-bold text-gray-800">₹{deduction.amount.toLocaleString('en-IN')}</p>
              <button
                onClick={() => setFilterType(deduction.section.replace('Section ', ''))}
                className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                View Details →
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Deduction Form */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Claim New Deduction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <select
              value={sectionType}
              onChange={(e) => setSectionType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="80C">Section 80C</option>
              <option value="80D">Section 80D</option>
              <option value="80E">Section 80E</option>
              <option value="80G">Section 80G</option>
              <option value="80TTA">Section 80TTA</option>
              <option value="80TTB">Section 80TTB</option>
              <option value="other">Other</option>
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
          onClick={handleAddDeduction}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Deduction'}
        </button>
      </div>

      {/* Recent Deductions Table */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {filterType ? `Records for Section ${filterType}` : 'Recent Deductions'}
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
          ) : deductions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No deductions found. Add your first deduction above.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Section</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deductions
                  .filter(d => !filterType || d.sectionType === filterType)
                  .slice(0, 10)
                  .map((deduction) => (
                    <tr key={deduction._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-800">
                        {new Date(deduction.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        Section {deduction.sectionType}
                      </td>
                      <td className="py-4 px-4 text-gray-800 font-semibold">
                        ₹{deduction.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleDeleteDeduction(deduction._id)}
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

      {/* Deduction Tips */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Tax Saving Tips</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Section 80C:</span> Invest up to ₹1.5 lakh in PPF, ELSS, or NSC to save taxes
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Section 80D:</span> Claim up to ₹25,000 for health insurance premiums
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Home Loan:</span> Deduct up to ₹2 lakh on home loan interest under Section 24
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
