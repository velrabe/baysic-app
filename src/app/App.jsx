import { Outlet } from 'react-router-dom';
import PrototypeLayout from '../layout/PrototypeLayout/PrototypeLayout';

export default function App() {
  return (
    <PrototypeLayout>
      <Outlet />
    </PrototypeLayout>
  );
}
