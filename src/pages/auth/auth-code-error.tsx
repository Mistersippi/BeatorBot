import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

export default function AuthCodeError() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Authentication Error
          </h1>
          <p className="text-muted-foreground mb-8">
            There was a problem with your authentication link. This could happen if:
          </p>
          <ul className="text-left text-muted-foreground mb-8 list-disc pl-5 space-y-2">
            <li>The link has expired</li>
            <li>The link has already been used</li>
            <li>The link was malformed</li>
          </ul>
          <div className="space-y-4">
            <Button
              onClick={() => router.push('/auth/signin')}
              className="w-full"
            >
              Try signing in again
            </Button>
            <Button
              onClick={() => router.push('/auth/signup')}
              variant="outline"
              className="w-full"
            >
              Create a new account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
