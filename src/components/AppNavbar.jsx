import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IoDiamondSharp } from "react-icons/io5";
import Tooltip from '@mui/material/Tooltip';

export default function AppNavbar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
        setOpen(newOpen);
    };

    const navItems = [
        { text: "Home", to: "/", icon: <InboxIcon /> },
        { text: "Add Product", to: "/add", icon: <MailIcon /> },
        {
            text: "About",
            to: "/about",
            icon: <InboxIcon />,
            tooltip: "Gadget Catalog is your one-stop destination to explore the latest and greatest tech products. From high-performance laptops and sleek smartphones to premium headphones, our app helps you discover, compare, and keep track of your favorite gadgets. Each product card provides essential details such as brand, specifications, price, and an image for a complete overview."
        }
    ];

    const DrawerList = (
        <Box sx={{ width: 260, backgroundColor: "#2f3e46", height: "100%", color: "white" }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        {item.tooltip ? (
                            <Tooltip title={item.tooltip}>
                                <ListItemButton component={Link} to={item.to} sx={{ color: "white" }}>
                                    <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </Tooltip>
                        ) : (
                            <ListItemButton component={Link} to={item.to} sx={{ color: "white" }}>
                                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <Navbar expand="lg" sticky="top" variant="dark" style={{ backgroundColor: "#34414a" }}>
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-light">
                        <IoDiamondSharp className="me-2 fs-2" />  <b>GadgetHub</b>
                    </Navbar.Brand>

                    <div className="d-lg-none">
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer(true)}>
                            <MenuIcon style={{ color: "white" }} />
                        </IconButton>
                    </div>

                    <Navbar.Collapse className="d-none d-lg-flex justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to="/" className="text-light"><b>Home</b></Nav.Link>
                            <Nav.Link as={Link} to="/add" className="text-light"><b>Add Product</b></Nav.Link>
                            <Tooltip title="Gadget Catalog is your one-stop destination to explore the latest and greatest tech products. 
        From high-performance laptops and sleek smartphones to premium headphones, our app helps you 
        discover, compare, and keep track of your favorite gadgets. Each product card provides essential 
        details such as brand, specifications, price, and an image for a complete overview.">
                                <Nav.Link as={Link} to="/about" className="text-light">
                                    About
                                </Nav.Link>
                            </Tooltip>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}
