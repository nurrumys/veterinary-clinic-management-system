import LoginForm from "../../components/auth/LoginForm";
import LoginHero from "../../components/auth/LoginHero";

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 p-4">
      <div className="flex h-[90vh] w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        <LoginHero />

        <div className="flex w-full items-center justify-center px-10 py-8 lg:w-1/2">
          <div className="w-full max-w-md">

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
              Welcome Back
            </span>

            <h1 className="mt-3 text-5xl font-bold text-slate-900">
              Sign In
            </h1>

            <p className="mt-3 mb-8 max-w-md text-lg leading-8 text-slate-500">
              Sign in to manage appointments, pets, owners, and medical records.
            </p>

            <LoginForm />

          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;