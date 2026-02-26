import { SummaryCards } from './SummaryCards';
import { ChartsSection } from './ChartsSection';
import { FilingStatus } from './FilingStatus';
import { Notifications } from './Notifications';

interface DashboardViewProps {
  userType: 'individual' | 'sme';
}

export function DashboardView({ userType }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <SummaryCards userType={userType} />
      <ChartsSection userType={userType} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FilingStatus userType={userType} />
        </div>
        <div>
          <Notifications />
        </div>
      </div>
    </div>
  );
}
