'use client';

import Link from 'next/link';

/**
 * Global Error Component
 * Handles errors that occur during rendering
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-600">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>

        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Try again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300"
          >
            Go home
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mt-8 rounded-lg bg-gray-100 p-4 text-left">
            <p className="text-xs font-mono text-gray-600">
              Error digest: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

