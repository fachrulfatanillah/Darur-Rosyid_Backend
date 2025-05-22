'use client';
import './MainLayout.css'
import { useState } from "react";
import Sidebar from "../component/sidebar/Sidebar";
import TopNavbar from '../component/top-navbar/TopNavbar';

const MainLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="app-layout">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className={`main-content-main-layout ${isCollapsed ? "collapsed" : "expanded"}`}>
                <TopNavbar/>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;