export interface VerificationResult {
  success: boolean;
  error?: string;
  email?: string;
  isVerified?: boolean;
}

export interface VerificationOptions {
  redirectTo?: string;
}