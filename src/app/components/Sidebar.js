"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	Divider,
	Collapse,
} from "@mui/material";
import {
	Home,
	School,
	BarChart,
	Menu,
	ChevronLeft,
	ExpandLess,
	ExpandMore,
	Person,
	Book,
	AssignmentInd,
	People,
	Grade,
} from "@mui/icons-material";

const menuItems = [
	{ text: "Dashboard", icon: <Home />, path: "/" },
	{ text: "Students", icon: <Person />, path: "/students" },
	{
		text: "Courses",
		icon: <Book />,
		submenu: [
			{ text: "Course List", path: "/courses", icon: <School /> },
			{ text: "Faculty Assign", path: "/faculty-assign", icon: <AssignmentInd /> },
		],
	},
	{
		text: "Faculty",
		icon: <People />,
		submenu: [
			{ text: "Faculty List", path: "/faculty", icon: <Person /> },
			{ text: "Course Enroll", path: "/course-assign", icon: <BarChart /> },
			{ text: "Grades", path: "/grades", icon: <Grade /> },
		],
	},
];

function NavItem({ item, open, isActive, onClick }) {
	return (
		<ListItem button="true" onClick={onClick} selected={isActive}>
			<ListItemIcon>{item.icon}</ListItemIcon>
			{open && <ListItemText primary={item.text} />}
			{open && item.submenu && (isActive ? <ExpandLess /> : <ExpandMore />)}
		</ListItem>
	);
}

function SubMenu({ item, openSidebar, isOpen, isParentActive, pathname }) {
	return (
		<Collapse in={isOpen} timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				{item.submenu.map((subItem) => (
					<Link
						key={subItem.text}
						href={subItem.path}
						style={{ textDecoration: "none", color: "inherit" }}
					>
						<ListItem
							button="true"
							selected={pathname === subItem.path}
							sx={{ pl: 4 }}
						>
							<ListItemIcon>{subItem.icon}</ListItemIcon>
							<ListItemText primary={subItem.text} />
						</ListItem>
					</Link>
				))}
			</List>
		</Collapse>
	);
}

export default function Sidebar() {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [openMenu, setOpenMenu] = useState(null);
	const pathname = usePathname();

	const handleMenuClick = (text) => {
		setOpenMenu(openMenu === text ? null : text);
	};

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: openSidebar ? 240 : 60,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: openSidebar ? 240 : 60,
					transition: "width 0.3s",
					overflowX: "hidden",
				},
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: openSidebar ? "flex-end" : "center",
					padding: 8,
				}}
			>
				<IconButton onClick={() => setOpenSidebar(!openSidebar)}>
					{openSidebar ? <ChevronLeft /> : <Menu />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{menuItems.map((item) => {
					const isActive =
						item.path === "/"
							? pathname === item.path
							: item.submenu
								? item.submenu.some((s) => pathname === s.path)
								: pathname === item.path;

					return (
						<div key={item.text}>
							{item.submenu ? (
								<>
									<NavItem
										item={item}
										open={openSidebar}
										isActive={isActive}
										onClick={() => handleMenuClick(item.text)}
									/>
									<SubMenu
										item={item}
										openSidebar={openSidebar}
										isOpen={openMenu === item.text}
										isParentActive={isActive}
										pathname={pathname}
									/>
								</>
							) : (
								<Link
									href={item.path}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<NavItem
										item={item}
										open={openSidebar}
										isActive={isActive}
									/>
								</Link>
							)}
						</div>
					);
				})}
			</List>
		</Drawer>
	);
}
