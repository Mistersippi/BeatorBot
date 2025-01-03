import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { toast } from 'react-hot-toast';
import { HeroSection } from '../components/HeroSection';
import { MissionSection } from '../components/MissionSection';
import { GenreSelection } from '../components/game/GenreSelection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { FeatureSection } from '../components/FeatureSection';
import { CTASection } from '../components/CTASection';
import { Newsletter } from '../components/Newsletter/Newsletter';
import { Footer } from '../components/Footer';

export function Home() {
  const [searchParams] = useSearchParams();
  const { setShowSignIn } = useAuth();

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');

    if (error) {
      toast.error(decodeURIComponent(error), {
        duration: 5000,
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          padding: '16px',
        },
      });
      setShowSignIn(true);
    } else if (message) {
      toast.success(decodeURIComponent(message), {
        duration: 5000,
        style: {
          background: '#ECFDF5',
          color: '#065F46',
          padding: '16px',
        },
      });
    }
  }, [searchParams, setShowSignIn]);

  return (
    <>
      <main>
        <HeroSection />
        <MissionSection />
        <GenreSelection />
        <HowItWorksSection />
        <FeatureSection />
        <CTASection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}