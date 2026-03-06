import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = {
    title: "Refund & Return Policy | Sapi's Crafterina",
    description: "Learn about our refund, return, and exchange policies.",
};

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen text-white bg-black">
            <Navbar />
            <section className="pt-36 pb-20 bg-black">
                <div className="container-custom mx-auto px-6 max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-8">
                        Refund & Return <span className="text-[#D4AF37]">Policy</span>
                    </h1>
                    <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70 leading-relaxed">
                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Return Window</h2>
                        <p>We accept returns within <strong className="text-white">7 days</strong> of delivery. The product must be unused, in its original packaging, and in the same condition as received.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Refund Process</h2>
                        <p>Once your return is received and inspected, we will notify you via email. If approved, your refund will be processed within <strong className="text-white">5-7 business days</strong> to your original payment method.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Exchange Policy</h2>
                        <p>We offer exchanges for damaged or defective products. Please email us at <a href="mailto:contact@sapiscrafterina.com" className="text-[#D4AF37] hover:underline">contact@sapiscrafterina.com</a> with your order number and photos of the damaged product.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Non-Returnable Items</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Products that have been opened or used</li>
                            <li>Gift cards</li>
                            <li>Items purchased during clearance sales</li>
                        </ul>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Contact Us</h2>
                        <p>For return/refund queries, contact us at <a href="mailto:contact@sapiscrafterina.com" className="text-[#D4AF37] hover:underline">contact@sapiscrafterina.com</a>.</p>
                    </div>
                </div>
            </section>
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
