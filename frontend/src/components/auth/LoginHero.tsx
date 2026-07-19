import {
  CalendarDays,
  PawPrint,
  ShieldCheck,
} from "lucide-react";

import heroImage from "../../assets/images/login-hero.png";

function LoginHero() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 px-10 py-7 text-white">

      <div>

        {/* Logo */}

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
            <PawPrint size={34} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              PawCare
            </h1>

            <p className="text-sm text-cyan-100">
              Veterinary Clinic Management System
            </p>
          </div>

        </div>

        {/* Hero Image */}

        <div className="mt-6 flex justify-center">

          <img
            src={heroImage}
            alt="Veterinarian"
            className="w-40 xl:w-48 drop-shadow-2xl"
          />

        </div>

        {/* Welcome */}

        <div className="mt-5">

          <h2 className="text-4xl font-bold">
            Welcome Back
          </h2>

          <p className="mt-3 text-base leading-7 text-cyan-100">
            Manage appointments, pets, owners, and medical records
            from one secure dashboard.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">

            <CalendarDays size={22} />

            <span className="text-base font-medium">
              Manage Daily Appointments
            </span>

          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">

            <ShieldCheck size={22} />

            <span className="text-base font-medium">
              Secure Authentication
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginHero;