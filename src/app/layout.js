import Sidebar from "./components/Sidebar";
import Providers from "./providers";

export const metadata = {
	title: "Dashboard",
	description: "Next.js with Material UI",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body style={{ display: "flex" }}>
				<Providers>
					<Sidebar />
					<main style={{ flexGrow: 1, padding: "16px", marginLeft: "240px" }}>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
