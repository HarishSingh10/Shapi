import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = {
    title: "Privacy Policy | Sapi's Crafterina",
    description: "Read our privacy policy to understand how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen text-white bg-black">
            <Navbar />
            <section className="pt-36 pb-20 bg-black">
                <div className="container-custom mx-auto px-6 max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-8">
                        Privacy <span className="text-[#D4AF37]">Policy</span>
                    </h1>
                    <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70 leading-relaxed">
                        <p>At Sapi&apos;s Crafterina, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
                        <p>We may collect information about you in a variety of ways including personal data (name, email, phone number, shipping address) and derivative data (browser type, IP address, pages visited).</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Use of Your Information</h2>
                        <p>We use information collected about you to process your orders, send you promotional communications (with your consent), improve our website, and respond to customer service requests.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Disclosure of Your Information</h2>
                        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to facilitate your order (e.g., shipping partners).</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Security of Your Information</h2>
                        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps, no method of transmission over the Internet is 100% secure.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:contact@sapiscrafterina.com" className="text-[#D4AF37] hover:underline">contact@sapiscrafterina.com</a></p>
                    </div>
                </div>
            </section>
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
