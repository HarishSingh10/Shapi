import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = {
    title: "Shipping Policy | Sapi's Crafterina",
    description: "Learn about our shipping methods, delivery times, and charges.",
};

export default function ShippingPolicyPage() {
    return (
        <main className="min-h-screen text-white bg-black">
            <Navbar />
            <section className="pt-36 pb-20 bg-black">
                <div className="container-custom mx-auto px-6 max-w-4xl">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-8">
                        Shipping <span className="text-[#D4AF37]">Policy</span>
                    </h1>
                    <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70 leading-relaxed">
                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Delivery Timeline</h2>
                        <p>We aim to deliver all orders within <strong className="text-white">3-7 business days</strong> across India. Metro cities typically receive deliveries within 3-5 business days, while other areas may take 5-7 business days.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Free Shipping</h2>
                        <p>We offer <strong className="text-[#D4AF37]">free shipping on all orders above ₹499</strong>. For orders below ₹499, a flat shipping fee of ₹49 will be charged.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Shipping Partners</h2>
                        <p>We partner with trusted logistics providers including Delhivery, BlueDart, and DTDC to ensure safe and timely delivery of your products.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Order Tracking</h2>
                        <p>Once your order is shipped, you will receive a tracking number via email and SMS. You can use this to track your package in real-time.</p>

                        <h2 className="text-white text-xl font-semibold mt-8 mb-4">Contact Us</h2>
                        <p>For shipping-related queries, contact us at <a href="mailto:contact@sapiscrafterina.com" className="text-[#D4AF37] hover:underline">contact@sapiscrafterina.com</a> or call <a href="tel:+919654640260" className="text-[#D4AF37] hover:underline">+91 9654640260</a>.</p>
                    </div>
                </div>
            </section>
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
