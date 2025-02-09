"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // Get current route
import Link from "next/link";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from "@mui/material";
import { Home, School, BarChart, Menu, ChevronLeft } from "@mui/icons-material";

export default function Sidebar() {
	const [open, setOpen] = useState(true); // Sidebar starts open
	const pathname = usePathname(); // Get active route

	const menuItems = [
		{ text: "Home", icon: <Home />, path: "/" },
		{ text: "Courses", icon: <School />, path: "/courses" },
		{ text: "Analytics", icon: <BarChart />, path: "/analytics" },
	];

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: open ? 240 : 60,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: open ? 240 : 60,
					transition: "width 0.3s",
					overflowX: "hidden",
				},
			}}
		>
			{/* Sidebar Header with Toggle Button */}
			<div style={{ display: "flex", alignItems: "center", justifyContent: open ? "flex-end" : "center", padding: 8 }}>
				<IconButton onClick={() => setOpen(!open)}>
					{open ? <ChevronLeft /> : <Menu />}
				</IconButton>
			</div>
			<Divider />

			{/* Sidebar Items with Routing */}
			<List>
				{menuItems.map((item) => (
					<Link key={item.text} href={item.path} style={{ textDecoration: "none", color: "inherit" }}>
						<ListItem button selected={pathname === item.path}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							{open && <ListItemText primary={item.text} />}
						</ListItem>
					</Link>
				))}
			</List>
		</Drawer>
	);
}
