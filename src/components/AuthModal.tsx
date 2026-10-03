import React, { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { X, LogIn, UserPlus, AlertCircle, Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFlow?: "signIn" | "signUp";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialFlow = "signIn",
}) => {
  let authActions: ReturnType<typeof useAuthActions> | null = null;
  try {
    authActions = useAuthActions();
  } catch {
    authActions = null;
  }
  const signIn = authActions?.signIn;

  const [flow, setFlow] = useState<"signIn" | "signUp">(initialFlow);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!signIn) {
      setError("Convex Auth is not initialized or connected.");
      setLoading(false);
      return;
    }

    try {
      if (flow === "signUp") {
        await signIn("password", { email, password, flow: "signUp", name });
      } else {
        await signIn("password", { email, password, flow: "signIn" });
      }
      onClose();
    } catch (err: any) {
      console.error("Auth error:", err);
      const msg = err?.message || "";
      if (
        msg.includes("Connection lost") ||
        msg.includes("CONVEX") ||
        msg.includes("Failed to fetch") ||
        msg.includes("NetworkError")
      ) {
        setError(
          "Connection to Convex Auth backend could not be established. Please check your Convex backend deployment."
        );
      } else {
        setError(
          msg ||
            (flow === "signUp"
              ? "Could not sign up. Please try again."
              : "Invalid email or password.")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {flow === "signIn" ? (
              <LogIn className="w-5 h-5 text-blue-600" />
            ) : (
              <UserPlus className="w-5 h-5 text-blue-600" />
            )}
            <h3 className="text-lg font-bold text-slate-900">
              {flow === "signIn" ? "Welcome back" : "Create your account"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {flow === "signUp" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {flow === "signIn" ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Footer switch */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-600">
          {flow === "signIn" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setFlow("signUp");
                }}
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setFlow("signIn");
                }}
                className="font-semibold text-blue-600 hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
