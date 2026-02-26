import { useState, useEffect, useRef } from 'react';
import { FileText, Upload, Clock, CheckCircle, Download } from 'lucide-react';
import { taxReturnService } from '../../services/taxReturnService';
import { TaxReturn } from '../../types';
import { toast } from 'sonner';

interface FileReturnViewProps {
  userType: 'individual' | 'sme';
}

export function FileReturnView({ userType }: FileReturnViewProps) {
  const [taxReturns, setTaxReturns] = useState<TaxReturn[]>([]);
  const [loading, setLoading] = useState(false);
  const [taxPaid, setTaxPaid] = useState('');
  const financialYear = '2025-2026';
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTaxReturns();
  }, []);

  const fetchTaxReturns = async () => {
    try {
      setLoading(true);
      const response = await taxReturnService.getAll({ financialYear });
      setTaxReturns(response);

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch tax returns');
    } finally {
      setLoading(false);
    }
  };

  const handleStartFiling = async () => {
    try {
      setLoading(true);
      await taxReturnService.create({
        financialYear,
        taxPaid: taxPaid ? parseFloat(taxPaid) : 0
      });
      toast.success('Tax return created successfully');
      setTaxPaid('');
      fetchTaxReturns();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create tax return');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReturn = async (id: string) => {
    try {
      setLoading(true);
      await taxReturnService.submit(id);
      toast.success('Tax return submitted successfully');
      fetchTaxReturns();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit tax return');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (id: string) => {
    try {
      setLoading(true);
      const blob = await taxReturnService.downloadPDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tax-return-${financialYear}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('PDF downloaded successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to download PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast.success(`${files.length} file(s) selected`);
    }
  };

  const returnTypes = userType === 'individual'
    ? [
      { name: 'ITR-1 (Sahaj)', description: 'For salary income and one house property', icon: FileText },
      { name: 'ITR-2', description: 'For capital gains and multiple properties', icon: FileText },
      { name: 'ITR-3', description: 'For business/professional income', icon: FileText },
    ]
    : [
      { name: 'ITR-5', description: 'For firms, LLPs, AOPs, BOIs', icon: FileText },
      { name: 'ITR-6', description: 'For companies other than claiming exemption', icon: FileText },
      { name: 'GSTR-1', description: 'Monthly/Quarterly GST return', icon: FileText },
      { name: 'GSTR-3B', description: 'Summary GST return', icon: FileText },
    ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">File Tax Return</h2>
        <p className="text-gray-500 mt-1">Select the appropriate return type and file your taxes</p>
      </div>

      {/* Start Filing Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-xl text-white">
        <h3 className="text-2xl font-bold mb-4">File Your Tax Return for FY {financialYear}</h3>
        <p className="text-purple-100 mb-6">Start your tax filing process by creating a new return</p>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-purple-100 mb-2">Tax Already Paid (₹) - Optional</label>
            <input
              type="number"
              value={taxPaid}
              onChange={(e) => setTaxPaid(e.target.value)}
              placeholder="Enter amount if any"
              className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <button
            onClick={handleStartFiling}
            disabled={loading}
            className="px-8 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Start Filing'}
          </button>
        </div>
      </div>

      {/* Return Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {returnTypes.map((returnType) => {
          const Icon = returnType.icon;
          return (
            <div
              key={returnType.name}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{returnType.name}</h3>
                  <p className="text-sm text-gray-500">{returnType.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Upload</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-purple-500 transition-colors cursor-pointer">
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 font-medium mb-2">Drag and drop your tax documents here</p>
          <p className="text-sm text-gray-400 mb-4">or click to browse files</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
            id="file-upload"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
          >
            Choose Files
          </button>
        </div>
      </div>

      {/* Tax Returns List */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your Tax Returns</h3>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : taxReturns.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No tax returns found. Start filing above.</div>
        ) : (
          <div className="space-y-3">
            {taxReturns.map((taxReturn) => (
              <div
                key={taxReturn._id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {taxReturn.filingStatus === 'submitted' || taxReturn.filingStatus === 'approved' ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Clock className="text-orange-500" size={20} />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">FY {taxReturn.financialYear}</p>
                    <p className="text-sm text-gray-500">
                      Total Income: ₹{taxReturn.totalIncome.toLocaleString('en-IN')} |
                      Tax: ₹{taxReturn.estimatedTax.toLocaleString('en-IN')}
                    </p>
                    {taxReturn.acknowledgementNumber && (
                      <p className="text-xs text-gray-400 mt-1">ACK: {taxReturn.acknowledgementNumber}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${taxReturn.filingStatus === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : taxReturn.filingStatus === 'submitted'
                      ? 'bg-blue-100 text-blue-700'
                      : taxReturn.filingStatus === 'draft'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                    {taxReturn.filingStatus.charAt(0).toUpperCase() + taxReturn.filingStatus.slice(1)}
                  </span>
                  {taxReturn.filingStatus === 'draft' && (
                    <button
                      onClick={() => handleSubmitReturn(taxReturn._id)}
                      disabled={loading}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50"
                    >
                      Submit
                    </button>
                  )}
                  <button
                    onClick={() => handleDownloadPDF(taxReturn._id)}
                    disabled={loading}
                    className="p-2 text-gray-600 hover:text-purple-600 disabled:opacity-50"
                    title="Download PDF"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
