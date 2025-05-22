'use client';
import "./Sidebar.css";
import { useState, useEffect, useRef  } from "react";
import { FaChevronDown, FaChartPie, FaClipboardList, FaHome } from "react-icons/fa";
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
                    <li
                        className={`sidebar-item ${isCollapsed ? "collapsed-hover" : ""}`}
                        ref={sidebarRef}
                    >
                        <div
                            className={`sidebar-link sidebar-toggle ${showProjectsSubmenu ? "active" : ""}`}
                            onClick={() => setShowProjectsSubmenu(!showProjectsSubmenu)}
                        >
                            <div className="sidebar-toggle-label">
                                <FaClipboardList className="sidebar-menu-icon" />
                                <span className={`menu-text ${isCollapsed ? "hidden" : ""}`}>Projects</span>
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
                                    <Link href="" className="submenu-link">List Projects</Link>
                                </li>
                                <li>
                                    <Link href="" className="submenu-link">List Tables</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;