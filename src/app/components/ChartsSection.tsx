import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartsSectionProps {
  userType: 'individual' | 'sme';
}

export function ChartsSection({ userType }: ChartsSectionProps) {
  // Line Chart Data - Income vs Tax Trend
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: userType === 'individual' 
          ? [95000, 98000, 102000, 105000, 108000, 110000, 112000, 115000, 118000, 120000, 122000, 125000]
          : [650000, 680000, 700000, 720000, 740000, 760000, 780000, 800000, 820000, 840000, 860000, 850000],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Tax',
        data: userType === 'individual'
          ? [14250, 14700, 15300, 15750, 16200, 16500, 16800, 17250, 17700, 18000, 18300, 18750]
          : [32500, 34000, 35000, 36000, 37000, 38000, 39000, 40000, 41000, 42000, 43000, 42500],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Doughnut Chart Data - Income Breakdown
  const doughnutChartData = {
    labels: userType === 'individual' 
      ? ['Salary', 'Business', 'Investments', 'Other']
      : ['Product Sales', 'Services', 'Exports', 'Other'],
    datasets: [
      {
        data: userType === 'individual' 
          ? [750000, 300000, 150000, 50000]
          : [4500000, 2800000, 1500000, 200000],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(168, 85, 247)',
          'rgb(236, 72, 153)',
          'rgb(251, 146, 60)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  // Bar Chart Data - Quarterly Tax Payment
  const barChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Tax Paid',
        data: userType === 'individual' 
          ? [45000, 47000, 48000, 50000]
          : [95000, 98000, 102000, 105000],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Tax Due',
        data: userType === 'individual'
          ? [5000, 3000, 2000, 1000]
          : [15000, 12000, 10000, 8000],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgb(236, 72, 153)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Line Chart */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Income vs Tax Trend (Monthly)</h3>
        <div className="h-80">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Income Breakdown</h3>
        <div className="h-80 flex items-center justify-center">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quarterly Tax Payment Overview</h3>
        <div className="h-80">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
}
