'use client';

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import WhatsAppBtn from "./components/whatsapp-btn/WhatsappBtn";
import { usePathname } from "next/navigation";

export default function RootLayoutClient({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith("/auth") || pathname.startsWith("/admin");

    return (
        <>
            {!isAuthPage && <Navbar />}
            {children}
            {!isAuthPage && <WhatsAppBtn />}
            {!isAuthPage && <Footer />}
        </>
    );
}