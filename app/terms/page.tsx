import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = {
    title: "Terms & Conditions | Sapi's Crafterina",
    description: "Read our terms and conditions for using the Sapi's Crafterina website and services.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen text-white bg-black">
            <Navbar />
            <section className="pt-36 pb-20 bg-black">
                <div className="container-custom mx-auto px-6 max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-8">
                        Terms & <span className="text-[#D4AF37]">Conditions</span>
                    </h1>
                    <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70 leading-relaxed">
                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
                        <p>By accessing and using the Sapi&apos;s Crafterina website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Use of Website</h2>
                        <p>You may use our website for lawful purposes only. You must not use our website in any way that causes damage to the website or impairs the availability of the website.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Product Information</h2>
                        <p>We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. We reserve the right to correct any errors and update information at any time.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Pricing</h2>
                        <p>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices without prior notice.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Intellectual Property</h2>
                        <p>All content on this website including text, graphics, logos, images, and software is the property of Sapi&apos;s Crafterina and is protected by intellectual property laws.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
                        <p>Sapi&apos;s Crafterina shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Contact Us</h2>
                        <p>For questions about these Terms, contact us at <a href="mailto:contact@sapiscrafterina.com" className="text-[#D4AF37] hover:underline">contact@sapiscrafterina.com</a>.</p>
                    </div>
                </div>
            </section>
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
