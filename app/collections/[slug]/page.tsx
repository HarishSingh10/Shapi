import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CollectionGrid } from "@/components/CollectionGrid";

export default function CollectionPage() {
    return (
        <main className="min-h-screen text-white bg-black">
            <Navbar />
            <CollectionGrid />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
