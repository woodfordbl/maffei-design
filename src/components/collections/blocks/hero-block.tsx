import { motion } from "motion/react";
import type { HeroBlock as HeroBlockType } from "./types";

type HeroBlockProps = {
	block: HeroBlockType;
	collectionSlug: string;
};

export function HeroBlock({ block }: HeroBlockProps) {
	// About variant with fixed title and parallax scrolling
	if (block.variant === "about") {
		return (
			<section className="relative min-h-screen">
				{/* Fixed ABOUT Title */}
				<div className="pointer-events-none fixed inset-0 z-10 flex items-start justify-start px-6 pt-32 md:px-12 md:pt-40">
					<h1 className="font-bold text-[12vw] text-black leading-none tracking-tighter md:text-[10vw]">
						{block.title}
					</h1>
				</div>

				{/* Scrolling Images Behind */}
				<div className="relative z-0 min-h-screen px-6 pt-40 pb-20 md:px-12 md:pt-48">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="w-full"
							initial={{ opacity: 0, y: 40 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<img
								alt={block.image.alt}
								className="h-auto w-full object-cover"
								decoding="async"
								height={block.image.height ?? 1600}
								loading="eager"
								src={block.image.src}
								width={block.image.width ?? 1200}
							/>
						</motion.div>

						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="flex items-end lg:pt-32"
							initial={{ opacity: 0, y: 40 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<p className="font-bold text-2xl leading-tight md:text-3xl lg:text-4xl">
								{block.subtitle || ""}
							</p>
						</motion.div>
					</div>
				</div>
			</section>
		);
	}

	// Default hero variant
	return (
		<section className="container mx-auto px-6 py-12 md:py-20">
			<div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
				<div className="w-full">
					<motion.img
						alt={block.image.alt}
						className="h-auto w-full object-cover"
						decoding="async"
						height={block.image.height ?? 1600}
						loading="eager"
						src={block.image.src}
						width={block.image.width ?? 1200}
					/>
				</div>

				<div className="space-y-6 lg:pt-8">
					<h1 className="font-light text-4xl leading-tight md:text-5xl lg:text-6xl">
						{block.title}
					</h1>

					{block.subtitle && (
						<p className="text-gray-600 text-xl">{block.subtitle}</p>
					)}

					{block.author && (
						<p className="text-gray-600 text-sm">
							{block.date ? `${block.author} • ${block.date}` : block.author}
						</p>
					)}

					{block.tags && block.tags.length > 0 && (
						<div className="flex gap-4 pt-4">
							{block.tags.map((tag) => (
								<span className="text-gray-500 text-xs" key={tag}>
									#{tag}
								</span>
							))}
						</div>
					)}

					{block.intro && block.intro.length > 0 && (
						<div className="space-y-4 pt-6 text-base leading-relaxed">
							{block.intro.map((paragraph, i) => {
								const key = `${block.id}-intro-${i}-${paragraph.slice(0, 10)}`;
								return (
									<p className="text-gray-800" key={key}>
										{paragraph}
									</p>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
