import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { linkStyles, underlineStyles } from "./animated-link";

/**
 * An animated external link component with hover animations.
 * Similar to AnimatedLink but uses a regular anchor tag for external links.
 *
 * Features:
 * - Hover animation: Underline animates from left to right on hover
 * - Uses regular anchor tag for external links (mailto, http, etc.)
 */
export function AnimatedExternalLink({
	className,
	children,
	href,
	target,
	rel,
	...anchorProps
}: React.ComponentProps<"a"> & {
	/** The content to display inside the link */
	children: React.ReactNode;
}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<a
			{...anchorProps}
			className={cn(linkStyles, className)}
			href={href}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			rel={rel}
			target={target}
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
		</a>
	);
}
