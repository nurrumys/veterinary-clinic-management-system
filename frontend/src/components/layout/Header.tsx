import {
  Bell,
  CalendarDays,
  Search,
  ChevronDown,
} from "lucide-react";

function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex h-18 items-center border-b border-slate-200 bg-white px-8">

      {/* Left */}

      <div className="flex-1">

        <div className="relative max-w-[440px]">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search owners, pets or appointments..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-2.5
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all
              duration-200
              focus:border-cyan-500
              focus:bg-white
              focus:ring-4
              focus:ring-cyan-100
            "
          />

        </div>

      </div>

      {/* Right */}

      <div className="ml-8 flex items-center gap-5">

        {/* Date */}

        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 lg:flex">

          <CalendarDays
            size={18}
            className="text-slate-500"
          />

          <span className="text-sm font-medium text-slate-600">
            {today}
          </span>

        </div>

        {/* Notification */}

        <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 transition-all duration-200 hover:bg-slate-50">

          <Bell
            size={20}
            className="text-slate-600"
          />

          <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>

        </button>

        {/* User */}

        <button className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-slate-50">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-600 text-base font-semibold text-white">
            A
          </div>

          <div className="hidden text-left lg:block">

            <h4 className="font-semibold text-slate-800">
              Admin
            </h4>

            <p className="text-sm text-slate-500">
              Veterinary Administrator
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-500"
          />

        </button>

      </div>

    </header>
  );
}

export default Header;
