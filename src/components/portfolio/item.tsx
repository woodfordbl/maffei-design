import { motion } from "motion/react";
import { useState } from "react";
import { ProgressiveBlur } from "@/components/motion/progressive-blur";

export type GalleryItemProps = {
	id: string;
	imageUrl: string;
	title: string;
	collection: string;
	x: number;
	y: number;
	width: number;
	height: number;
};

export function GalleryItem({
	x,
	y,
	width,
	height,
	imageUrl,
	title,
	collection,
}: GalleryItemProps) {
	const [isHover, setIsHover] = useState(false);

	return (
		<motion.div
			className="absolute overflow-hidden rounded-[4px] transition-all duration-200"
			data-gallery-item
			initial={{ zIndex: 1 }}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			style={{
				left: `${x}px`,
				top: `${y}px`,
				width: `${width}px`,
				height: `${height}px`,
			}}
			whileHover={{ zIndex: 10 }}
		>
			<img
				alt={`${title} - ${collection}`}
				className="absolute inset-0 h-full w-full object-cover"
				height={Math.round(height)}
				loading="lazy"
				src={imageUrl}
				width={Math.round(width)}
			/>
			<ProgressiveBlur
				animate={isHover ? "visible" : "hidden"}
				blurIntensity={0.5}
				className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
				transition={{ duration: 0.2, ease: "easeOut" }}
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 1 },
				}}
			/>
			<motion.div
				animate={isHover ? "visible" : "hidden"}
				className="absolute bottom-0 left-0"
				transition={{ duration: 0.2, ease: "easeOut" }}
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 1 },
				}}
			>
				<div className="flex flex-col items-start gap-0 px-5 py-4">
					<p className="font-medium text-base text-white">{title}</p>
					<span className="text-base text-zinc-300">{collection}</span>
				</div>
			</motion.div>
		</motion.div>
	);
}
