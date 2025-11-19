"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState({
    type: null,
    text: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: null, text: null });
    setResetUrl(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage({
          type: "success",
          text: data.message,
        });
        
        // For development, show the reset URL
        if (data.resetUrl) {
          setResetUrl(data.resetUrl);
        }
        
        setEmail("");
      } else {
        setStatusMessage({
          type: "error",
          text: data.message || "Failed to process request. Please try again.",
        });
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-heading">
              Forgot Password?
            </h1>
            <p className="text-gray-600 mt-2">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {statusMessage.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                statusMessage.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {resetUrl && (
            <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-2">
                Development Mode - Reset Link:
              </p>
              <Link
                href={resetUrl}
                className="text-sm text-blue-600 hover:text-blue-800 break-all underline"
              >
                {resetUrl}
              </Link>
              <p className="text-xs text-blue-700 mt-2">
                Click the link above to reset your password
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brown-600 text-white py-3 px-4 rounded-lg hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-brown-600 hover:text-brown-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
