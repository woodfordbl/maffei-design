import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatedButton } from "@/components/navigation/animated-button";
import { AnimatedLink } from "@/components/navigation/animated-link";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
	{ label: "Portfolio", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Journal", href: "/journal" },
];

export function Header() {
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;

	return (
		<header className="sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<nav className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Left: Logo */}
				<div className="flex items-center">
					<Link className="flex items-center" to="/">
						<span>Maffei Design</span>
					</Link>
				</div>

				{/* Mobile Menu */}
				<div className="flex md:hidden">
					<MobileMenu.Root tileSize={40}>
						<MobileMenu.Trigger asChild>
							<Button variant="outline">Menu</Button>
						</MobileMenu.Trigger>
						<MobileMenu.Content className="justify-start">
							<div className="flex flex-col gap-4 p-8">
								<h2 className="font-bold text-5xl text-background uppercase">
									Menu
								</h2>
								<MobileMenu.Close asChild>
									<button
										className="flex w-fit items-center gap-2 font-medium text-background text-sm uppercase tracking-wider"
										type="button"
									>
										<span className="rotate-180 text-xl">↓</span>
										<span>Close</span>
									</button>
								</MobileMenu.Close>
							</div>
							<nav className="flex flex-1 flex-col items-start justify-start gap-6 p-8 pt-12">
								{navLinks.map((link) => {
									const isActive = currentPath === link.href;
									return (
										<MobileMenu.Link asChild key={link.href}>
											<AnimatedLink
												className={cn(
													"font-bold text-2xl uppercase transition-colors sm:text-3xl md:text-4xl lg:text-5xl",
													isActive
														? "text-background"
														: "text-background/60 hover:text-background"
												)}
												preload="intent"
												preloadIntentProximity={100}
												to={link.href as "/"}
											>
												{link.label}
											</AnimatedLink>
										</MobileMenu.Link>
									);
								})}
								<MobileMenu.Link asChild>
									<AnimatedLink
										className={cn(
											"font-bold text-2xl uppercase transition-colors sm:text-3xl md:text-4xl lg:text-5xl",
											currentPath === "/contact"
												? "text-background"
												: "text-background/60 hover:text-background"
										)}
										preload="intent"
										preloadIntentProximity={100}
										to="/contact"
									>
										Contact
									</AnimatedLink>
								</MobileMenu.Link>
							</nav>
						</MobileMenu.Content>
					</MobileMenu.Root>
				</div>

				{/* Center: Navigation Links (Desktop) */}
				<div className="hidden items-center gap-8 md:flex">
					{navLinks.map((link) => (
						<AnimatedLink
							key={link.href}
							preload="intent"
							preloadIntentProximity={100}
							to={link.href as "/"}
						>
							{link.label}
						</AnimatedLink>
					))}
				</div>

				{/* Right: Contact Button */}
				<div className="hidden items-center md:flex">
					<AnimatedButton
						preload="intent"
						preloadIntentProximity={100}
						showArrow
						to="/contact"
					>
						Get in touch
					</AnimatedButton>
				</div>
			</nav>
		</header>
	);
}
