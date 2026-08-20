import "../styles/layout.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

function MainLayout() {

    const [lightMode, setLightMode] = useState(
        localStorage.getItem("theme") === "light"
    );

    useEffect(() => {

        const interval = setInterval(() => {

            setLightMode(
                localStorage.getItem("theme") === "light"
            );

        }, 100);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className={`dashboard ${lightMode ? "light" : ""}`}>

            <Sidebar />

            <div className="main">

                <Navbar />

                <div className="content">
                    <Outlet />
                </div>

            </div>

        </div>

    );

}
export default MainLayout;