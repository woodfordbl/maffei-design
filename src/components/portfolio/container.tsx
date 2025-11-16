import { GalleryGrid } from "./grid";
import type { GalleryItem } from "./types";
import { useGalleryLayout } from "./utils";

export type GalleryContainerProps = {
	items: GalleryItem[];
	gap?: number;
};

/**
 * Main gallery component that handles layout calculations and renders the grid.
 * Accepts items as props, making it composable and SSR-friendly.
 *
 * @example
 * ```tsx
 * // With static data
 * <GalleryContainer items={galleryItems} />
 *
 * // With SSR data (future)
 * const items = await loadGalleryItems();
 * <GalleryContainer items={items} />
 * ```
 */
export function GalleryContainer({ items, gap = 16 }: GalleryContainerProps) {
	const { packedItems, containerHeight, containerRefCallback } =
		useGalleryLayout({
			items,
			gap,
		});

	return (
		<GalleryGrid
			containerHeight={containerHeight}
			containerRef={containerRefCallback}
			items={items}
			packedItems={packedItems}
		/>
	);
}
