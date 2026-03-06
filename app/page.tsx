import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-gold selection:text-black bg-black">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />

      {/* Newsletter / CTA Section */}
      <section className="py-32 relative overflow-hidden bg-black">
        {/* Glassmorphism Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-black to-gray-900/40"></div>

        {/* Animated Glass Orbs */}
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-20 right-20 w-[450px] h-[450px] bg-white/8 rounded-full blur-[100px] animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-[#F4CF57]/12 rounded-full blur-[130px] animate-pulse-slow"></div>

        {/* Glossy Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent"></div>

        <div className="container-custom mx-auto relative z-10 px-6">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-6 block">
              EXCLUSIVE ACCESS
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl tracking-tight">
              Join the <span className="text-[#D4AF37]">Inner Circle</span>
            </h2>

            {/* Description */}
            <p className="max-w-2xl mx-auto mb-12 text-gray-400 font-light text-sm md:text-base leading-relaxed">
              Subscribe for priority access to new automotive care launches, premium home solutions, and member-only distinctions.
            </p>

            {/* Email Form */}
            <div className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-8 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all text-sm"
              />
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] px-10 py-5 text-black font-bold uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-[1.02] transition-all duration-300">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
