import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AllProductsGrid } from "@/components/AllProductsGrid";

export const metadata = {
    title: "All Products | Sapi's Crafterina",
    description: "Browse our complete collection of premium automotive, home care, grooming, and safety products.",
};

export default function ProductsPage() {
    return (
        <main className="min-h-screen text-white bg-black">
            <Navbar />

            {/* Page Header */}
            <section className="pt-36 pb-12 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-black"></div>
                <div className="container-custom mx-auto px-6 relative z-10">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-3">
                        All <span className="text-[#D4AF37]">Products</span>
                    </h1>
                    <p className="text-white/50 text-sm max-w-lg">
                        Discover our premium selection of automotive care, home solutions, personal grooming, and safety products.
                    </p>
                </div>
            </section>

            <AllProductsGrid />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
