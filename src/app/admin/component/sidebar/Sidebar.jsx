'use client';
import "./Sidebar.css";
import { useState, useEffect, useRef  } from "react";
import { FaChevronDown, FaChartPie, FaSchool , FaHome, FaMosque  } from "react-icons/fa";
import { RiContactsBook2Fill, RiInformationFill  } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const [showProjectsSubmenu, setShowProjectsSubmenu] = useState(false);
    const sidebarRef = useRef(null);
    const containerRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            setIsCollapsed(true);
        }
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isMobile = window.innerWidth <= 768;
            const clickedOutsideSidebar = containerRef.current && !containerRef.current.contains(event.target);
            const clickedOutsideSubmenu = sidebarRef.current && !sidebarRef.current.contains(event.target);
    
            if (!isCollapsed && clickedOutsideSidebar && isMobile) {
                setIsCollapsed(true);
            }
    
            if (isCollapsed && showProjectsSubmenu && clickedOutsideSubmenu) {
                setShowProjectsSubmenu(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCollapsed, showProjectsSubmenu]);
    


    return (
        <div className={`section-sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <div ref={containerRef} className={`container-sidebar ${isCollapsed ? "collapsed" : ""}`}>
                <div className="container-title-sidebar">
                    <h2 className="title-sidebar">{!isCollapsed && ""}</h2>
                    <button
                        className="sidebar-menu-toggle"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    ></button>
                </div>

                <ul className="sidebar-menu">
                    <li className="sidebar-item">
                        <Link href="/admin/dashboard" className="sidebar-link">
                            <FaChartPie className="sidebar-menu-icon" />
                            <span
                                className={`menu-text ${isCollapsed ? "hidden" : ""} ${
                                    pathname === "/" ? "active-text" : ""
                                }`}
                                >
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link href="/admin/index" className="sidebar-link">
                            <FaHome className="sidebar-menu-icon" />
                            <span
                                className={`menu-text ${isCollapsed ? "hidden" : ""} ${
                                    pathname === "/" ? "active-text" : ""
                                }`}
                                >
                                Utama
                            </span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link href="/admin/about" className="sidebar-link">
                            <RiInformationFill  className="sidebar-menu-icon" />
                            <span
                                className={`menu-text ${isCollapsed ? "hidden" : ""} ${
                                    pathname === "/" ? "active-text" : ""
                                }`}
                                >
                                Tentang
                            </span>
                        </Link>
                    </li>
                    <li
                        className={`sidebar-item ${isCollapsed ? "collapsed-hover" : ""}`}
                        ref={sidebarRef}
                    >
                        <div
                            className={`sidebar-link sidebar-toggle ${showProjectsSubmenu ? "active" : ""}`}
                            onClick={() => setShowProjectsSubmenu(!showProjectsSubmenu)}
                        >
                            <div className="sidebar-toggle-label">
                                <FaSchool  className="sidebar-menu-icon" />
                                <span className={`menu-text ${isCollapsed ? "hidden" : ""}`}>Akademik</span>
                            </div>

                            {!isCollapsed && (
                                <FaChevronDown
                                    className={`sidebar-submenu-icon ${showProjectsSubmenu ? "open" : ""}`}
                                />
                            )}
                        </div>

                        {(isCollapsed || showProjectsSubmenu) && (
                            <ul className={`submenu-sidebar ${isCollapsed && showProjectsSubmenu ? "active" : ""}`}>
                                <li>
                                    <Link href="/admin/academic/elementary-school" className="submenu-link">SD</Link>
                                </li>
                                <li>
                                    <Link href="/admin/academic/junior-high-school" className="submenu-link">SMP</Link>
                                </li>
                                <li>
                                    <Link href="/admin/academic/senior-high-school" className="submenu-link">SMA</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="sidebar-item">
                        <Link href="/admin/living" className="sidebar-link">
                            <FaMosque className="sidebar-menu-icon" />
                            <span
                                className={`menu-text ${isCollapsed ? "hidden" : ""} ${
                                    pathname === "/" ? "active-text" : ""
                                }`}
                                >
                                Kehidupan Pesantren
                            </span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link href="/admin/contact" className="sidebar-link">
                            <RiContactsBook2Fill className="sidebar-menu-icon" />
                            <span
                                className={`menu-text ${isCollapsed ? "hidden" : ""} ${
                                    pathname === "/" ? "active-text" : ""
                                }`}
                                >
                                Kontak
                            </span>
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;