import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * An animated link component with hover underline animation.
 */
export function AnimatedLink({
	className,
	children,
	...linkProps
}: Omit<React.ComponentProps<typeof Link>, "children"> & {
	children: React.ReactNode;
}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			{...linkProps}
			className={cn(
				"relative mx-1 inline-block px-1 py-1 font-medium text-sm",
				className
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
			<motion.span
				animate={{ scaleX: isHovered ? 1 : 0 }}
				className="absolute bottom-0 left-0 h-px w-full bg-current"
				initial={{ scaleX: 0 }}
				style={{ transformOrigin: "left" }}
				transition={{ duration: 0.2, ease: "easeOut" }}
			/>
		</Link>
	);
}
