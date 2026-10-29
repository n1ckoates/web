import "./globals.css";
import { Mona_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import mergeMetadata from "@/lib/mergeMetadata";

export const metadata = mergeMetadata();

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#fafafa" },
		{ media: "(prefers-color-scheme: dark)", color: "#09090b" },
	],
};

const monaSans = Mona_Sans({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${monaSans.className} scrollbar-gutter-stable scroll-smooth`}
		>
			<body className="bg-background text-foreground min-h-screen px-5 pb-12 antialiased lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-14 xl:px-0">
				<div className="bg-grid fixed top-0 left-0 -z-50 size-full mask-[radial-gradient(ellipse_at_top_left,black,transparent_50%)] text-zinc-100/80 dark:text-zinc-900/50" />

				<Navbar />

				<Sidebar />

				<main id="main" className="mt-16 min-w-0 lg:mt-0">
					{children}
				</main>

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
