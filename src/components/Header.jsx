import React, {useState} from 'react';
import { Link } from "react-router-dom";

import { SecureAPI } from "../utils/ApiRequest";
import webicon from "../webicon.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from "@mui/material/IconButton";

import Drawer from "@mui/material/Drawer";
import createTheme from "@mui/material/styles/createTheme";
import { grey } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const theme = createTheme({
    palette: {
        primary: {
            main: grey['A200']
        }
    }
});

function Header() {

    const pages = [
        { name: "Home", url: "/", icon: <HomeIcon/> },
        { name: "Projects", url: "/projects", icon: <AccountTreeIcon /> },
        { name: "About", url: "/about", icon: <InfoIcon /> },
        { name: "Contact", url: "/contact", icon: <ContactPageIcon /> },
        { name: "Chat", url: "/chat", icon: <ChatIcon /> },
    ];

    const [DrawerOpen, setDrawerOpen] = useState(false);

    const accessToken = SecureAPI.getAccessToken();

    const handleDrawerToggle = () => {
        setDrawerOpen(!DrawerOpen);
    };

    const handleLogout = () => {
        SecureAPI.removeAccessToken();
        window.location.replace('/');
    };

    const renderAuth = () => {
        if (accessToken) {
            return (
                <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItemButton>
            );
        } else {
            return (
                <ListItemButton sx={{ textAlign: 'center' }} component={Link} to="/login">
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                </ListItemButton>
            );
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {pages.map((page, index) => (
                    <ListItemButton key={index} sx={{ textAlign: 'center' }} component={Link} to={page.url}>
                        <ListItemIcon>
                            {page.icon}
                        </ListItemIcon>
                        <ListItemText>
                            {page.name}
                        </ListItemText>
                    </ListItemButton>
                ))}
                {renderAuth()}
            </List>
        </Box>
    )

    return (
        <>
            <AppBar theme={theme} position="fixed">
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton edge="start" component={Link} to="/">
                        <img src={webicon} width={50} height={50}/>
                    </IconButton>
                    <IconButton
                        edge="end"
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleDrawerToggle}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="top"
                open={DrawerOpen}
            >
                {drawer}
            </Drawer>
        </>
    )
}

export default Header;