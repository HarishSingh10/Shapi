import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
    title: "Contact Us | Sapi's Crafterina",
    description: "Get in touch with Sapi's Crafterina. We'd love to hear from you.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen text-white bg-black">
            <Navbar />
            <ContactForm />
            <Footer />
            <WhatsAppButton />
        </main>
    );
}
