import { useAuth } from '../../components/auth/AuthContext';
import { SubmitLanding } from './SubmitLanding';
import { SubmitForm } from './SubmitForm';

export default function Submit() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <SubmitForm /> : <SubmitLanding />;
}