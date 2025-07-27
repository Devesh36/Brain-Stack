import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex justify-between items-center bg-white/[0.07] backdrop-blur-[18px] border-b border-blue-500/[0.03] shadow-[0_-2px_12px_rgba(99,102,241,0.05)]">
      {/* Left: Logo and Brand */}
      <div className="flex items-center gap-3">
        <span className="font-black text-xl sm:text-2xl md:text-[26px] bg-gradient-to-br from-indigo-500 to-sky-400 bg-clip-text text-transparent tracking-[-0.5px]">
          Brain Stack
        </span>
      </div>

      {/* Center: Tagline - Hidden on mobile */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[17px] text-indigo-500 font-semibold tracking-[0.5px] bg-white/[0.22] rounded-lg px-[22px] py-1.5 shadow-[0_2px_12px_rgba(99,102,241,0.07)] backdrop-blur-sm">
        Your digital brain
      </div>

      {/* Right: Sign In */}
      <div className="flex items-center gap-4">
        <button
          className="bg-transparent border-2 border-indigo-500 text-indigo-500 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-[15px] font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1.5 sm:gap-2 hover:bg-indigo-500 hover:text-white"
          onClick={() => navigate("/signin")}
        >
          <LogIn size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Sign In</span>
          <span className="sm:hidden">Sign In</span>
        </button>
      </div>
    </nav>
  );
}
