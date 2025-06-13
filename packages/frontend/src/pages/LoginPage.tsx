import { useRef } from "react";
import {  Link } from "react-router-dom";
import { useActionState } from "react";

interface LoginPageProps {
  isRegistering: boolean;
  onAuthSuccess: (token: string) => void;
}

// Helper function to send auth requests
async function submitAuthRequest({
  username,
  password,
  isRegistering,
}: {
  username: string;
  password: string;
  isRegistering: boolean;
}): Promise<{ error: string | null; token?: string }> {
  const endpoint = isRegistering ? "/auth/register" : "/auth/login";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      return {
        error:
          payload.message ||
          `${isRegistering ? "Registration" : "Login"} failed (${res.status})`,
      };
    }

    const { token } = await res.json();
    return { error: null, token };
  } catch (err: any) {
    return { error: err.message || "Unexpected error occurred." };
  }
}

export default function LoginPage({
  isRegistering,
  onAuthSuccess,
}: LoginPageProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [formError, formAction, isPending] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      if (!username.trim() || !password) {
        return "Username and password are required.";
      }

      const result = await submitAuthRequest({
        username: username.trim(),
        password,
        isRegistering,
      });

      if (!result.error && result.token) {
        onAuthSuccess(result.token); // 🔐 Store token + navigate from App
        return null;
      }

      return result.error;
    },
    null
  );

  return (
    <main className="main-content">
      <div className="container">
        <header className="page-header">
          <h1 className="section-title">Soccer Interactive</h1>
          <p>
            {isRegistering
              ? "Register a new account"
              : "Log in to track your soccer stats and join the community."}
          </p>
        </header>

        <section className="section">
          <h2 className="section-title">
            {isRegistering ? "Register" : "Login"}
          </h2>
          <form className="login-form" action={formAction}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                id="username"
                type="text"
                required
                ref={usernameRef}
                disabled={isPending}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                id="password"
                type="password"
                required
                ref={passwordRef}
                disabled={isPending}
              />
            </div>

            {formError && (
              <p className="error-message" role="alert" aria-live="polite">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              {isPending
                ? isRegistering
                  ? "Registering…"
                  : "Logging in…"
                : isRegistering
                ? "Register"
                : "Log In"}
            </button>
          </form>

          {!isRegistering && (
            <p className="alt-action">
              Don’t have an account? <Link to="/register">Register here</Link>.
            </p>
          )}
          {isRegistering && (
            <p className="alt-action">
              Already have an account? <Link to="/login">Log in here</Link>.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
