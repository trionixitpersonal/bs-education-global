"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Verify user has admin role before redirecting
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        
        if (session?.user?.role === "admin" || session?.user?.role === "super_admin") {
          router.push("/admin/dashboard");
          router.refresh();
        } else {
          setError("Access denied. Admin privileges required.");
          await fetch("/api/auth/signout", { method: "POST" });
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '1rem' }} className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div style={{ width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="w-full max-w-md space-y-8">
        <div>
          <h2 style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: 'bold', letterSpacing: '-0.02em', color: '#111827' }} className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Admin Login
          </h2>
          <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.875rem', lineHeight: '1.25rem', color: '#4b5563' }} className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>
        <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div style={{ borderRadius: '0.375rem', backgroundColor: '#fef2f2', padding: '1rem' }} className="rounded-md bg-red-50 p-4">
              <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#7f1d1d' }} className="text-sm text-red-800">{error}</p>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '-0.25rem', borderRadius: '0.375rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }} className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }} className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                style={{ 
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem 0.375rem 0 0',
                  border: '1px solid #d1d5db',
                  padding: '0.5rem 0.75rem',
                  color: '#111827',
                  fontSize: '0.875rem',
                  lineHeight: '1.5rem',
                  backgroundColor: '#ffffff'
                }}
                className="relative block w-full rounded-t-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }} className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  borderRadius: '0 0 0.375rem 0.375rem',
                  border: '1px solid #d1d5db',
                  padding: '0.5rem 0.75rem',
                  color: '#111827',
                  fontSize: '0.875rem',
                  lineHeight: '1.5rem',
                  backgroundColor: '#ffffff'
                }}
                className="relative block w-full rounded-b-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                display: 'flex',
                position: 'relative',
                width: '100%',
                justifyContent: 'center',
                borderRadius: '0.375rem',
                backgroundColor: '#2563eb',
                padding: '0.75rem 0.75rem',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                fontWeight: '600',
                color: '#ffffff',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1
              }}
              onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
