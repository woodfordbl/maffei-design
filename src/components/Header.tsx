import { Link } from "@tanstack/react-router";
import { AnimatedButton } from "@/components/navigation/animated-button";
import { AnimatedLink } from "@/components/navigation/animated-link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

				{/* Mobile Menu Dropdown */}
				<div className="flex md:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48">
							{navLinks.map((link) => (
								<DropdownMenuItem asChild key={link.href}>
									<Link className="w-full cursor-pointer" to={link.href as "/"}>
										{link.label}
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
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
