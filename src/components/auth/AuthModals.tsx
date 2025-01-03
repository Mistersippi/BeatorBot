import { useAuth } from './AuthContext';
import { SignUpForm } from './SignUpForm';
import { SignInForm } from './SignInForm';

export function AuthModals() {
  const { showSignIn, showSignUp, setShowSignIn, setShowSignUp } = useAuth();

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  return (
    <>
      {showSignUp && (
        <SignUpForm
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          switchToSignIn={switchToSignIn}
        />
      )}
      {showSignIn && (
        <SignInForm
          showSignIn={showSignIn}
          setShowSignIn={setShowSignIn}
          switchToSignUp={switchToSignUp}
        />
      )}
    </>
  );
}
