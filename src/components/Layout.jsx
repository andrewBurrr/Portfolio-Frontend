import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Toolbar} from "@mui/material";

function Layout({ children }) {
    return (
        <div>
            <Header />
            <Toolbar />
            { children }
            <Footer />
        </div>
    );
}

export default Layout;