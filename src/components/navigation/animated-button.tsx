import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * An animated button component that fills from left to right on hover.
 *
 * Features:
 * - Starts with an outline style
 * - On hover, fills from left to right with foreground color
 * - Children inherit color transitions automatically
 * - Optional arrow icon that rotates on hover
 * - Smooth animations using framer-motion
 * - Supports inverted color scheme for dark backgrounds
 */
export function AnimatedButton({
	className,
	children,
	showArrow = false,
	inverted = false,
	...linkProps
}: Omit<React.ComponentProps<typeof Link>, "children"> & {
	/** The content to display inside the button */
	children: React.ReactNode;
	/** Whether to show the animated arrow icon */
	showArrow?: boolean;
	/** Whether to use inverted colors (light on dark) */
	inverted?: boolean;
}) {
	const [isHovered, setIsHovered] = useState(false);

	// Determine colors based on inverted state and hover
	let textColor: string;
	let fillColor: string;
	let borderColor: string;
	let bgColor: string;
	let hoverOverride: string;

	if (inverted) {
		textColor = isHovered ? "text-foreground" : "text-background";
		fillColor = "bg-background";
		borderColor = "border-background";
		bgColor = "bg-transparent";
		hoverOverride = "hover:bg-transparent hover:text-background";
	} else {
		textColor = isHovered ? "text-background" : "text-foreground";
		fillColor = "bg-foreground";
		borderColor = "";
		bgColor = "";
		hoverOverride = "";
	}

	return (
		<Link
			{...linkProps}
			className={cn(
				buttonVariants({ variant: "outline" }),
				"relative overflow-hidden",
				borderColor,
				bgColor,
				hoverOverride,
				className
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Fill animation background - animates from left to right */}
			<motion.div
				animate={{ scaleX: isHovered ? 1 : 0 }}
				className={cn("absolute inset-0", fillColor)}
				initial={{ scaleX: 0 }}
				style={{ transformOrigin: "left" }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
			/>
			{/* Content with color transition - works for text, icons, and any children */}
			<span
				className={cn(
					"relative z-10 flex items-center gap-2 transition-colors duration-300",
					textColor
				)}
			>
				{showArrow && (
					<motion.span
						animate={{ rotate: isHovered ? 45 : 0 }}
						transition={{
							duration: 0.3,
							ease: "easeInOut",
						}}
					>
						<ArrowUpRight className="size-4" />
					</motion.span>
				)}
				{children}
			</span>
		</Link>
	);
}
