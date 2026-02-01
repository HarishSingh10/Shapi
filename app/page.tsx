import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />

      {/* Newsletter / CTA Section - Dark Gold Theme */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

        {/* Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[128px]" />

        <div className="container-custom mx-auto relative z-10 text-center text-white px-6">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Exclusive Access</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">JOIN THE <span className="text-gold">INNER CIRCLE</span></h2>
          <p className="max-w-xl mx-auto mb-10 text-gray-400 font-light">
            Subscribe for priority access to new automotive care launches, premium home solutions, and member-only distinctions.
          </p>

          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:bg-white/10 transition-all"
            />
            <button className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
