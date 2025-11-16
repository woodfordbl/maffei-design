import { motion } from "motion/react";
import { getImageAspectRatio } from "@/lib/image-aspect";
import type { Image as ColumnImageType, Column as ColumnType } from "./types";

type ColumnProps = {
	column: ColumnType;
};

const fadeInUp = {
	initial: { opacity: 0, y: 40 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

export function Column({ column }: ColumnProps) {
	const widthClass = column.width ? `lg:col-span-${column.width}` : "";

	const stickyClass = column.sticky
		? "h-fit lg:sticky lg:top-24 lg:self-start"
		: "";

	return (
		<motion.div
			className={`${widthClass} ${stickyClass}`.trim()}
			initial="initial"
			variants={fadeInUp}
			viewport={{ once: true, margin: "-100px" }}
			whileInView="animate"
		>
			{(column.type === "image" || column.type === "mixed") && column.images ? (
				<div className="space-y-6">
					{column.images.map((img, i) => (
						<ColumnImage image={img} index={i} key={`${img.src}-${i}`} />
					))}
				</div>
			) : null}

			{(column.type === "text" || column.type === "mixed") && column.content ? (
				<div className="space-y-6">
					{column.content.heading && (
						<h2 className="font-light text-3xl md:text-4xl">
							{column.content.heading}
						</h2>
					)}
					{column.content.text && column.content.text.length > 0 && (
						<div className="space-y-6">
							{column.content.text.map((p, i) => {
								const safeKey = `${column.id}-text-${i}-${p.slice(0, 12)}`;
								return (
									<p
										className="text-base text-gray-800 leading-relaxed"
										key={safeKey}
									>
										{p}
									</p>
								);
							})}
						</div>
					)}
				</div>
			) : null}
		</motion.div>
	);
}

type ColumnImageProps = {
	image: ColumnImageType;
	index: number;
};

function ColumnImage({ image, index }: ColumnImageProps) {
	const aspectRatio = getImageAspectRatio(image);

	return (
		<motion.img
			alt={image.alt}
			className="h-auto w-full object-cover"
			decoding="async"
			height={image.height}
			initial={{ opacity: 0, y: 30 }}
			loading="lazy"
			src={image.src}
			style={{
				aspectRatio,
			}}
			transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
			viewport={{ once: true, margin: "-50px" }}
			whileInView={{ opacity: 1, y: 0 }}
			width={image.width}
		/>
	);
}
