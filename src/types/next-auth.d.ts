import NextAuth, { DefaultSession } from 'next-auth';

/**
 * Extend NextAuth types to include custom fields
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'CUSTOMER' | 'ADMIN';
    } & DefaultSession['user'];
  }

  interface User {
    role?: 'CUSTOMER' | 'ADMIN';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'CUSTOMER' | 'ADMIN';
  }
}

