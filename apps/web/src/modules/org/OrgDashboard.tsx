import MembersList from './MembersList';
import OrgCredits from './OrgCredits';
import UsageReport from './UsageReport';
import InviteMember from './InviteMember';
import { useRole } from '@/core/auth/useRole';

export default function OrgDashboard() {
    const role = useRole();

    return (
        <div>

            <h2>🏢 Law Firm Dashboard</h2>

            {(role === 'owner' || role === 'admin') && (
                <InviteMember />
            )}

        </div>
    );
}