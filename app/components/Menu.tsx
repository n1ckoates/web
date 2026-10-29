"use client";

import Link from "next/link";
import { useEffect } from "react";
import { links } from "@/lib/navData";
import clsx from "clsx";
import SocialIcons from "@/components/SocialIcons";

export default function Menu({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	useEffect(() => {
		const main = document.getElementById("main");
		main?.toggleAttribute("inert", open);
		document.body.classList.toggle("overflow-hidden", open);

		return () => {
			main?.removeAttribute("inert");
			document.body.classList.remove("overflow-hidden");
		};
	}, [open]);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth >= 1024) setOpen(false);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [setOpen]);

	return (
		<>
			<button
				aria-label="Toggle navigation"
				aria-expanded={open}
				onClick={() => setOpen(!open)}
				className="hover:bg-secondary/70 relative grid size-8 place-items-center rounded-md p-2"
				type="button"
			>
				<span
					className={clsx(
						"bg-foreground absolute h-0.5 w-4 rounded-full transition",
						{
							"-translate-y-1": !open,
							"scale-125 rotate-45": open,
						},
					)}
				/>
				<span
					className={clsx(
						"bg-foreground absolute h-0.5 w-4 rounded-full transition",
						{
							"translate-y-1": !open,
							"scale-125 -rotate-45": open,
						},
					)}
				/>
			</button>

			<div
				aria-hidden={!open}
				inert={!open}
				className={clsx(
					"bg-background/90 absolute top-0 left-0 -z-10 h-dvh w-screen backdrop-blur-xl transition-[opacity,visibility]",
					// Hidden (not just transparent) when closed, otherwise Safari sees a
					// fixed full-height layer and fills its bottom toolbar to match.
					{ "invisible opacity-0": !open },
				)}
			>
				<div className="divide-border flex flex-col divide-y px-5 pt-20 text-lg font-medium">
					{links.map(({ title, href }) => (
						<Link
							key={href}
							href={href}
							className="group py-3.5"
							onClick={() => setOpen(false)}
						>
							<div
								className={clsx({
									"transition group-nth-of-type-2:delay-100 group-nth-of-type-3:delay-175 group-nth-of-type-4:delay-225":
										open,
									"-translate-x-40": !open,
								})}
							>
								<span className="group-hover:text-muted-foreground">
									{title}
								</span>
							</div>
						</Link>
					))}
				</div>

				<div className="border-border mx-5 mt-5 flex items-center justify-center gap-1 border-t pt-4">
					<SocialIcons />
				</div>
			</div>
		</>
	);
}
