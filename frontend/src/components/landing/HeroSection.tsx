import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  isActive: boolean;
}

export default function HeroSection({ isActive }: HeroSectionProps) {
  const navigate = useNavigate();

  const fadeInSlide = {
    opacity: isActive ? 1 : 0,
    transform: isActive ? "scale(1) translateY(0)" : "scale(0.98) translateY(40px)",
    transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <div
      className="min-w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100 relative text-center p-4 sm:p-6 md:p-8 box-border overflow-hidden"
      style={fadeInSlide}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg
          width="100%"
          height="100%"
          className="absolute left-0 top-0 opacity-[0.08]"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute left-[15%] top-[25%] w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] bg-gradient-to-br from-indigo-500 to-indigo-300 rounded-full opacity-70 animate-[moveObj1_2.5s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[70%] top-[60%] w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-br from-sky-400 to-indigo-300 rounded-full opacity-60 animate-[moveObj2_2s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[80%] top-[18%] w-3 h-3 sm:w-[14px] sm:h-[14px] bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-full opacity-50 animate-[moveObj3_2.8s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[30%] top-[75%] w-2 h-2 sm:w-[10px] sm:h-[10px] bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full opacity-50 animate-[moveObj4_2.2s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-3xl mx-auto flex flex-col items-center">
        {/* Logo/emoji */}
        <div className="mb-5">
          <div className="w-20 h-20 rounded-2xl bg-[#174EA6]/10 flex items-center justify-center mx-auto">
            <span className="text-5xl" role="img" aria-label="logo">🧠</span>
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight leading-tight" style={{ color: '#174EA6' }}>
          The Smarter Way to <span className="block">Save & Organize</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-8 font-normal" style={{ color: '#174EA6' }}>
          Collect links, notes, and ideas in one place.<br className="hidden sm:block" />
          Simple, fast, and always accessible—your digital brain for everything you want to remember.
        </p>
        <button
          className="bg-[#174EA6] hover:bg-[#123a7a] text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 inline-flex items-center gap-2"
          onClick={() => navigate("/signup")}
        >
          Get Started Free <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
