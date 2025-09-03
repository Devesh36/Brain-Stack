

interface ThankYouSectionProps {
  isActive: boolean;
}

export default function ThankYouSection({ isActive }: ThankYouSectionProps) {
  const fadeInSlide = {
    opacity: isActive ? 1 : 0,
    transform: isActive ? "scale(1) translateY(0)" : "scale(0.98) translateY(40px)",
    transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <div 
      className="min-w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 text-slate-800 p-4 sm:p-6 md:p-8 box-border relative overflow-hidden"
      style={fadeInSlide}
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none blur-[24px]">
        <div className="absolute left-[10%] top-[20%] w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] bg-gradient-to-br from-indigo-500 to-indigo-300 rounded-full opacity-[0.13] animate-[feedbackObj1_4s_ease-in-out_infinite_alternate]" />
        <div className="absolute right-[12%] top-[60%] w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] bg-gradient-to-br from-sky-400 to-indigo-300 rounded-full opacity-[0.1] animate-[feedbackObj2_3.5s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-[70%] top-[10%] w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-[0.09] animate-[feedbackObj3_5s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4">
        {/* Heart Icon */}
        

        {/* Main Quote */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-indigo-500 to-sky-400 bg-clip-text text-transparent tracking-tight leading-tight">
          Thank You for Being Here
        </h3>

        {/* Appreciation Message */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8 leading-relaxed font-medium">
            "Your curiosity and interest in{" "}
            <span className="text-indigo-500 font-bold">Brain Stack</span>{" "}
            mean the world to us."
          </p>
          
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Every great journey begins with a single step. Thank you for taking that step with us. 
            We're excited to help you organize your thoughts, save your ideas, and build your digital sanctuary.
          </p>
        </div>

        {/* Decorative Quote */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-slate-600 italic leading-relaxed">
            "The best way to organize your thoughts is to give them a home. 
            Welcome to yours."
          </p>
          <div className="mt-4 text-xs sm:text-sm text-slate-400 font-medium">
            — The Brain Stack Team
          </div>
        </div>
      </div>
    </div>
  );
}
