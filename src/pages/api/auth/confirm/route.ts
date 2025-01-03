import { type EmailOtpType } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { createUserProfile } from '@/lib/supabase/auth/operations'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token_hash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type') as EmailOtpType | null
  const next = url.searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error && data.user) {
      // If this is email verification, create the user profile
      if (type === 'email') {
        const { error: profileError } = await createUserProfile(data.user)
        if (profileError) {
          console.error('Error creating user profile:', profileError)
          return Response.redirect(new URL('/auth/auth-code-error', url.origin))
        }
      }

      // Set the session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (!sessionError && session) {
        // Redirect to success page
        return Response.redirect(new URL(next, url.origin))
      }
    }
  }

  // Redirect to error page
  return Response.redirect(new URL('/auth/auth-code-error', url.origin))
}
