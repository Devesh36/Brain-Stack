

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
      className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-12 my-8 px-4 sm:px-6 md:px-8 box-border relative overflow-hidden"
      style={fadeInSlide}
    >
      {/* Decorative background shapes */}
      

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4">
        {/* Heart Icon */}
        

        {/* Main Quote */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 tracking-tight leading-tight" style={{ color: '#174EA6' }}>
          Thank You for Being Here
        </h3>

        {/* Appreciation Message */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed font-medium" style={{ color: '#174EA6' }}>
            "Your curiosity and interest in{" "}
            <span className="font-bold" style={{ color: '#174EA6' }}>Brain Stack</span>{" "}
            mean the world to us."
          </p>
        </div>

        {/* Decorative Quote */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base italic leading-relaxed" style={{ color: '#174EA6' }}>
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
