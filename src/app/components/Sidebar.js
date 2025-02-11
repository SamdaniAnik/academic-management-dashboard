"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // Get current route
import Link from "next/link";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Collapse } from "@mui/material";
import { Home, School, BarChart, Menu, ChevronLeft, ExpandLess, ExpandMore } from "@mui/icons-material";

export default function Sidebar() {
	const [open, setOpen] = useState(true); // Sidebar starts open
	const [coursesOpen, setCoursesOpen] = useState(false); // Submenu for courses
	const pathname = usePathname(); // Get active route

	const menuItems = [
		{ text: "Home", icon: <Home />, path: "/" },
		{ text: "Students", icon: <School />, path: "/students" },
		{ text: "Faculty", icon: <BarChart />, path: "/faculty" },
		{
			text: "Courses",
			icon: <School />,
			submenu: [
				{ text: "Course List", path: "/courses", icon: <School /> },
				{ text: "Assign Faculty", path: "/courses/assign-faculty", icon: <School /> }, ,
			]
		},
	];

	const handleCoursesClick = () => {
		setCoursesOpen(!coursesOpen);
	};

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
			<div style={{ display: "flex", alignItems: "center", justifyContent: open ? "flex-end" : "center", padding: 8 }}>
				<IconButton onClick={() => setOpen(!open)}>
					{open ? <ChevronLeft /> : <Menu />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<div key={item.text}>
						{item.submenu ? (
							<>
								<ListItem button onClick={handleCoursesClick} selected={pathname === item.path}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									{open && <ListItemText primary={item.text} />}
									{open && (coursesOpen ? <ExpandLess /> : <ExpandMore />)}
								</ListItem>
								<Collapse in={coursesOpen} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										{item.submenu.map((subItem) => (
											<Link key={subItem.text} href={subItem.path} style={{ textDecoration: "none", color: "inherit" }}>
												<ListItem button="true" selected={pathname === subItem.path} sx={{ pl: 4 }}>
													<ListItemText primary={subItem.text} />
												</ListItem>
											</Link>
										))}
									</List>
								</Collapse>
							</>
						) : (
							<Link href={item.path} style={{ textDecoration: "none", color: "inherit" }}>
								<ListItem button="true" selected={pathname === item.path}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									{open && <ListItemText primary={item.text} />}
								</ListItem>
							</Link>
						)}
					</div>
				))}
			</List>
		</Drawer>
	);
}
