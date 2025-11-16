import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * An animated external link component with hover underline animation.
 */
export function AnimatedExternalLink({
	className,
	children,
	...anchorProps
}: React.ComponentProps<"a">) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: <Simple anchor element interaction>
		<a
			{...anchorProps}
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
		</a>
	);
}
