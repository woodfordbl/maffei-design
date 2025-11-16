import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const linkStyles =
	"group relative inline-block w-fit mx-1 px-1 py-1 font-medium text-foreground text-sm transition-colors hover:text-foreground/80";
export const underlineStyles =
	"absolute bottom-0 left-0 h-px w-full bg-foreground";
/**
 * An animated link component with hover and active state animations.
 *
 * Features:
 * - Hover animation: Underline animates from left to right on hover
 * - Active/Click animation: Spring-based underline animation for active or clicked links
 * - Shared element transition: Uses layoutId for smooth transitions between active links
 * - Uses data-active attribute for styling active state
 * - Pure motion component using framer-motion lifecycle callbacks
 */
export function AnimatedLink({
	isActive = false,
	className,
	children,
	...linkProps
}: Omit<React.ComponentProps<typeof Link>, "children"> & {
	/** Whether the link is currently active */
	isActive?: boolean;
	/** The content to display inside the link */
	children: React.ReactNode;
}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			{...linkProps}
			className={cn(linkStyles, className)}
			data-active={isActive ? "" : undefined}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
			{/* Hover underline - animates from left to right */}
			<motion.div
				animate={{ scaleX: isHovered ? 1 : 0 }}
				className={underlineStyles}
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
						className={underlineStyles}
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
