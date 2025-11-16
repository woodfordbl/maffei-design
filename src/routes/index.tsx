import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Cursor } from "@/components/motion/cursor";
import { GalleryContainer } from "@/components/portfolio/container";
import { generatePortfolioFromCollections } from "@/components/portfolio/generate-from-collections";
import { useMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	const items = generatePortfolioFromCollections();
	const [isHovering, setIsHovering] = useState(false);
	const isMobile = useMobile();

	const handlePositionChange = (x: number, y: number) => {
		// Check if cursor is over an actual gallery item (not empty space)
		const elementAtPoint = document.elementFromPoint(x, y);
		const isOverGalleryItem =
			elementAtPoint &&
			(elementAtPoint.closest("[data-gallery-item]") !== null ||
				elementAtPoint.hasAttribute("data-gallery-item"));
		setIsHovering(!!isOverGalleryItem);
	};

	return (
		<div className="min-h-screen w-full p-4 sm:p-8 md:p-12 lg:p-16">
			{!isMobile && (
				<Cursor
					attachToParent
					onPositionChange={handlePositionChange}
					springConfig={{
						stiffness: 400,
						damping: 30,
						mass: 0.5,
					}}
					transition={{
						ease: "easeInOut",
						duration: 0.15,
					}}
					variants={{
						initial: { scale: 0.3, opacity: 0 },
						animate: { scale: 1, opacity: 1 },
						exit: { scale: 0.3, opacity: 0 },
					}}
				>
					<motion.div
						animate={{
							width: isHovering ? 120 : 16,
							height: isHovering ? 32 : 16,
						}}
						className="flex items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40"
					>
						<AnimatePresence>
							{isHovering ? (
								<motion.div
									animate={{ opacity: 1, scale: 1 }}
									className="inline-flex w-full items-center justify-center"
									exit={{ opacity: 0, scale: 0.6 }}
									initial={{ opacity: 0, scale: 0.6 }}
								>
									<div className="inline-flex items-center text-sm text-white dark:text-black">
										Collection
										<ArrowRight className="-rotate-45 ml-1 h-4 w-4" />
									</div>
								</motion.div>
							) : null}
						</AnimatePresence>
					</motion.div>
				</Cursor>
			)}
			<GalleryContainer items={items} />
		</div>
	);
}
