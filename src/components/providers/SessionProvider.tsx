'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

/**
 * Session Provider Component
 * Wraps the app to provide authentication context
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}

