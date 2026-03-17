import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import { parentTabs } from '../../../data/screenContent';
import DashboardHome from './DashboardHome';

export default function DashboardOnline() {
  return (
    <PhoneFrame bottomNav={parentTabs}>
      <DashboardHome />
    </PhoneFrame>
  );
}
