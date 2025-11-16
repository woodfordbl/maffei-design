import { GalleryItem } from "./item";
import type { GalleryItem as GalleryItemData, PackedItem } from "./types";

export type GalleryGridProps = {
	items: GalleryItemData[];
	packedItems: PackedItem[];
	containerHeight: number;
	containerRef?: (node: HTMLDivElement | null) => void;
};

/**
 * Renders a grid of gallery items with absolute positioning.
 * This component is purely presentational and receives all layout data via props.
 */
export function GalleryGrid({
	items,
	packedItems,
	containerHeight,
	containerRef,
}: GalleryGridProps) {
	return (
		<div
			className="relative w-full"
			ref={containerRef}
			style={{ height: `${containerHeight}px` }}
		>
			{packedItems.map((packed) => {
				const item = items.find((i) => i.id === packed.id);
				if (!item) {
					return null;
				}

				return (
					<GalleryItem
						collection={item.collection}
						height={packed.height}
						id={item.id}
						imageUrl={item.imageUrl}
						key={item.id}
						title={item.title}
						width={packed.width}
						x={packed.x}
						y={packed.y}
					/>
				);
			})}
		</div>
	);
}
