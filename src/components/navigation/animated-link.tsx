import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const linkStyles =
	"group relative inline-block w-fit mx-1 px-1 py-1 font-medium text-sm transition-colors";
export const underlineStyles = "absolute bottom-0 left-0 h-px w-full";
/**
 * An animated link component with hover and active state animations.
 *
 * Features:
 * - Hover animation: Underline animates from left to right on hover
 * - Active/Click animation: Spring-based underline animation for active or clicked links
 * - Shared element transition: Uses layoutId for smooth transitions between active links
 * - Uses data-active attribute for styling active state (automatically set by TanStack Router)
 * - Pure motion component using framer-motion lifecycle callbacks
 * - Supports inverted color scheme for dark backgrounds
 * - Supports link-active: CSS variant for styling active links
 */
export function AnimatedLink({
	isActive,
	inverted = false,
	className,
	children,
	...linkProps
}: Omit<React.ComponentProps<typeof Link>, "children"> & {
	/** Whether the link is currently active (optional - will be auto-detected by TanStack Router if not provided) */
	isActive?: boolean;
	/** Whether to use inverted colors (light on dark) */
	inverted?: boolean;
	/** The content to display inside the link */
	children: React.ReactNode;
}) {
	const [isHovered, setIsHovered] = useState(false);

	const textColor = inverted
		? "text-background hover:text-background/80"
		: "text-foreground hover:text-foreground/80";
	const underlineColor = inverted ? "bg-background" : "bg-foreground";

	return (
		<Link
			{...linkProps}
			activeProps={{ "data-active": "" }}
			className={cn(linkStyles, textColor, className)}
			data-active={isActive ? "" : undefined}
			inactiveProps={{ "data-active": undefined }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
			{/* Hover underline - animates from left to right */}
			<motion.div
				animate={{ scaleX: isHovered ? 1 : 0 }}
				className={cn(underlineStyles, underlineColor)}
				initial={{ scaleX: 0 }}
				style={{ transformOrigin: "left" }}
				transition={{
					delay: isHovered ? 0.15 : 0,
					duration: 0.3,
					ease: "easeInOut",
				}}
			/>
			{/* Click/Active underline with shared element transition */}
			<AnimatePresence mode="wait">
				{isActive && (
					<motion.div
						animate={{ opacity: 1, scaleX: 1 }}
						className={cn(underlineStyles, underlineColor)}
						exit={{ opacity: 0, scaleX: 0 }}
						initial={{ opacity: 0, scaleX: 0 }}
						layoutId="activeLink"
						transition={{
							type: "spring",
							stiffness: 380,
							damping: 30,
						}}
					/>
				)}
			</AnimatePresence>
		</Link>
	);
}
