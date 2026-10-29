"use client";

import { useEffect, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import clsx from "clsx";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [solid, setSolid] = useState(false);

	useEffect(() => {
		function handleScroll() {
			setSolid(window.scrollY >= 20);
		}

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={clsx(
				"before:bg-background fixed top-0 left-0 z-50 flex w-full items-center justify-between px-5 py-3 before:absolute before:inset-0 before:-z-10 before:border-b before:transition lg:hidden",
				{
					"before:border-border/70 before:opacity-100": solid,
					"before:border-transparent before:opacity-0": !solid,
				},
			)}
		>
			<Link
				className="hover:text-muted-foreground relative z-10 text-lg font-bold tracking-tight"
				href="/"
			>
				Nick Oates
			</Link>

			<Menu open={open} setOpen={setOpen} />
		</nav>
	);
}
