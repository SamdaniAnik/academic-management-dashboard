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

export default function Sidebar() {
	const [open, setOpen] = useState(true);
	const [coursesOpen, setCoursesOpen] = useState(false);
	const [facultyOpen, setFacultyOpen] = useState(false);
	const pathname = usePathname();

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

	const handleCoursesClick = () => {
		setCoursesOpen(!coursesOpen);
	};

	const handleFacultyClick = () => {
		setFacultyOpen(!facultyOpen);
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
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: open ? "flex-end" : "center",
					padding: 8,
				}}
			>
				<IconButton onClick={() => setOpen(!open)}>
					{open ? <ChevronLeft /> : <Menu />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<div key={item.text}>
						{item.submenu ? (
							item.text === "Faculty" ? (
								<>
									<ListItem button="true" onClick={handleFacultyClick} selected={pathname === item.path}>
										<ListItemIcon>{item.icon}</ListItemIcon>
										{open && <ListItemText primary={item.text} />}
										{open && (facultyOpen ? <ExpandLess /> : <ExpandMore />)}
									</ListItem>
									<Collapse in={facultyOpen} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											{item.submenu.map((subItem) => (
												<Link key={subItem.text} href={subItem.path} style={{ textDecoration: "none", color: "inherit" }}>
													<ListItem button="true" selected={pathname === subItem.path} sx={{ pl: 4 }}>
														<ListItemIcon>{subItem.icon}</ListItemIcon>
														<ListItemText primary={subItem.text} />
													</ListItem>
												</Link>
											))}
										</List>
									</Collapse>
								</>
							) : (
								<>
									<ListItem button="true" onClick={handleCoursesClick} selected={pathname === item.path}>
										<ListItemIcon>{item.icon}</ListItemIcon>
										{open && <ListItemText primary={item.text} />}
										{open && (coursesOpen ? <ExpandLess /> : <ExpandMore />)}
									</ListItem>
									<Collapse in={coursesOpen} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											{item.submenu.map((subItem) => (
												<Link key={subItem.text} href={subItem.path} style={{ textDecoration: "none", color: "inherit" }}>
													<ListItem button="true" selected={pathname === subItem.path} sx={{ pl: 4 }}>
														<ListItemIcon>{subItem.icon}</ListItemIcon>
														<ListItemText primary={subItem.text} />
													</ListItem>
												</Link>
											))}
										</List>
									</Collapse>
								</>
							)
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
