"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    InvalidCallback: "Invalid callback URL",
    Callback: "Callback error",
    OAuthSignin: "OAuth signin error",
    OAuthCallback: "OAuth callback error",
    OAuthCreateAccount: "Could not create OAuth account",
    EmailCreateAccount: "Could not create email account",
    Callback: "Callback error",
    EmailSignInError: "Email signin error",
    CredentialsSignin: "Invalid credentials",
    SessionCallback: "Session callback error",
    default: "Authentication failed"
  };

  const message = errorMessages[error as string] || errorMessages["default"];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>
        </div>

        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">
            Please try logging in again or contact support if the problem persists.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Login
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12"><div className="text-center"><p className="text-gray-600">Loading...</p></div></div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
