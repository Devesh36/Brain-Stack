import Footer from "../components/landing/Footer";
import Navigation from "../components/landing/Navigation";
import ThankYouSection from "../components/landing/FeedbackForm";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full font-sans bg-gradient-to-br from-[#f8fafc] via-[#e6f0fa] to-[#dbeafe] flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-16">
        {/* Logo/Brand */}
        <div className="mb-6">
          {/* Placeholder for your image */}
        </div>

        {/* Headline with animation */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-4 tracking-tight leading-tight animate-fade-slide"
          style={{ color: '#174EA6', animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          <span className="inline-block animate-fade-slide" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            The Smarter Way to
          </span>
          <span className="block animate-fade-slide" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            Save & Organize
          </span>
        </h1>

        {/* Subheadline with animation */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-center max-w-2xl mx-auto mb-8 font-normal animate-fade-slide"
          style={{ color: '#174EA6', animationDelay: '0.7s', animationFillMode: 'both' }}
        >
          Collect links, notes, and ideas in one place. <br className="hidden sm:block" />
          Simple, fast, and always accessible—your digital brain for everything you want to remember.
        </p>

        {/* CTA */}
        <a
          href="/signup"
          className="inline-block bg-[#2f5591] hover:bg-[#123a7a] text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-200"
        >
          Get Started Free
        </a>

        {/* Dashboard Image & Feedback Form Section */}
        <div className="w-full flex flex-col items-center justify-center mt-10">
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl border border-[#174EA6]/10 bg-white relative animate-dashboard-img">
              <img
              src="/dashboard-screenshot.png"
              alt="BrainStack dashboard preview"
              className="w-full h-auto object-cover"
              style={{ background: '#fff' }}
            />
            {/* Blur overlay at bottom */}
            <div
              className="absolute left-0 right-0 bottom-0 h-24 sm:h-32 md:h-40 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,1) 100%)",
                filter: "blur(10px)",
              }}
            />
          </div>
          <div className="w-full max-w-5xl mt-4">
            <ThankYouSection isActive={true} />
          </div>
        </div>

        {/* Animation keyframes */}
        <style>{`
          @keyframes fadeSlide {
            0% { opacity: 0; transform: translateY(32px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-slide {
            animation: fadeSlide 0.8s cubic-bezier(0.4,0,0.2,1) both;
          }
          @keyframes dashboardImg {
            0% { opacity: 0; transform: scale(0.96) translateY(32px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-dashboard-img {
            animation: dashboardImg 1.1s cubic-bezier(0.4,0,0.2,1) both;
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}
