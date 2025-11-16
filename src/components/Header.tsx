import { Link } from "@tanstack/react-router";
import { AnimatedButton } from "@/components/navigation/animated-button";
import { AnimatedLink } from "@/components/navigation/animated-link";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { Button } from "@/components/ui/button";

const navLinks = [
	{ label: "Portfolio", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Journal", href: "/journal" },
];

export function Header() {
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
							<nav className="flex flex-col items-start gap-8 p-8">
								{navLinks.map((link) => (
									<MobileMenu.Link asChild key={link.href}>
										<AnimatedLink
											className="font-bold text-4xl"
											inverted
											to={link.href as "/"}
										>
											{link.label}
										</AnimatedLink>
									</MobileMenu.Link>
								))}
								<AnimatedLink
									className="font-bold text-4xl"
									inverted
									to="/contact"
								>
									Contact
								</AnimatedLink>
							</nav>
						</MobileMenu.Content>
					</MobileMenu.Root>
				</div>

				{/* Center: Navigation Links (Desktop) */}
				<div className="hidden items-center gap-8 md:flex">
					{navLinks.map((link) => (
						<AnimatedLink key={link.href} to={link.href as "/"}>
							{link.label}
						</AnimatedLink>
					))}
				</div>

				{/* Right: Contact Button */}
				<div className="hidden items-center md:flex">
					<AnimatedButton showArrow to="/contact">
						Get in touch
					</AnimatedButton>
				</div>
			</nav>
		</header>
	);
}
