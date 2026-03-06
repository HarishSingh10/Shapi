import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductDetail } from "@/components/ProductDetail";

export default function ProductPage() {
    return (
        <main className="min-h-screen text-white bg-black">
            <Navbar />
            <ProductDetail />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
