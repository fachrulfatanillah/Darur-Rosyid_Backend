"use client";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import Link from 'next/link'
import './Navbar.css'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    
    return (
        <nav className="navbar">
            <div className="navContainer">
                <div className="nav-container-logo">
                    <Link href="/">
                        <div className="nav-logo-img">
                            <img src="/Logo/_1L-Logo_Darul-Rosyid.webp" alt="Darul Rosyid" />
                        </div>
                        <div className="nav-logo-title">
                            <h1>Darur Rosyid</h1>
                        </div>
                    </Link>
                </div>

                <button className={`menu-toggle ${menuOpen ? "show" : ""}`}onClick={() => setMenuOpen(!menuOpen)}aria-label="Toggle menu"></button>

                {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)}></div>}

                <ul className={`navLinks ${menuOpen ? "active" : ""}`}>
                    <li><Link href="/" className="link" onClick={() => setMenuOpen(false)}>Utama</Link></li>
                    <li><Link href="/tentang" className="link" onClick={() => setMenuOpen(false)}>Tentang</Link></li>
                    <li className="has-submenu">
                        <span
                        className="link has-chevron"
                        onClick={() => {
                            if (isMobile) setSubMenuOpen(!subMenuOpen);
                        }}
                        >
                        Akademik
                        <span
                        className={`chevron-icon ${subMenuOpen ? "open" : ""} ${!isMobile ? "desktop-hover" : ""}`}
                        >
                        <FaChevronDown size={12} />
                        </span>
                        </span>
                        {(isMobile ? subMenuOpen : true) && (
                        <ul className="submenu">
                            <li><Link href="" className="submenu-link" onClick={() => setMenuOpen(false)}>SD</Link></li>
                            <li><Link href="" className="submenu-link" onClick={() => setMenuOpen(false)}>SMP</Link></li>
                            <li><Link href="" className="submenu-link" onClick={() => setMenuOpen(false)}>SMA</Link></li>
                        </ul>
                        )}
                    </li>
                    <li><Link href="" className="link" onClick={() => setMenuOpen(false)}>Kehidupan Pesantren</Link></li>
                    <li><Link href="" className="link" onClick={() => setMenuOpen(false)}>Kontak</Link></li>
                </ul>
            </div>
        </nav>
    )
}
