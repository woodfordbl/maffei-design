import { useMotionValue, useMotionValueEvent } from "motion/react";
import { useCallback, useRef, useState } from "react";
import type {
	AspectRatio,
	GalleryItem,
	ItemDimensions,
	PackedItem,
} from "./types";

// ============================================================================
// DIMENSION CALCULATIONS
// ============================================================================

const aspectRatioValues: Record<AspectRatio, number> = {
	"1:1": 1,
	"3:2": 1.5,
	"2:3": 0.667,
	"4:3": 1.333,
	"3:4": 0.75,
	"16:9": 1.778,
	"9:16": 0.563,
};

/**
 * Convert aspect ratio and scale factor to actual dimensions
 * Base size is 300px
 */
export function getDimensions(
	aspectRatio: AspectRatio,
	scaleFactor: number
): { width: number; height: number } {
	const baseSize = 300;
	const ratio = aspectRatioValues[aspectRatio];

	if (ratio >= 1) {
		// Landscape or square
		const width = baseSize * scaleFactor;
		const height = width / ratio;
		return { width, height };
	}
	// Portrait
	const height = baseSize * scaleFactor;
	const width = height * ratio;
	return { width, height };
}

// ============================================================================
// BIN PACKING ALGORITHM
// ============================================================================

type PreparedItem = ItemDimensions & {
	aspectRatio: number;
};

const TARGET_ROW_HEIGHT = 320;
const ROW_HEIGHT_TOLERANCE = 0.35;
const MIN_ROW_HEIGHT = TARGET_ROW_HEIGHT * (1 - ROW_HEIGHT_TOLERANCE);
const MAX_ROW_HEIGHT = TARGET_ROW_HEIGHT * (1 + ROW_HEIGHT_TOLERANCE);
const MAX_ITEMS_PER_ROW = 5;

function getPreparedItems(items: ItemDimensions[]): PreparedItem[] {
	return items.map((item) => ({
		...item,
		aspectRatio: item.width / Math.max(item.height, 1),
	}));
}

function getWidthBudget(
	containerWidth: number,
	itemCount: number,
	gap: number
): number {
	const totalGap = gap * Math.max(0, itemCount - 1);
	return Math.max(containerWidth - totalGap, 1);
}

/**
 * Organic justified tiling algorithm inspired by Flickr/Google Photos layouts.
 * Rows are built so that their natural height stays within a target band,
 * producing a full-bleed mosaic without rigid columnar grids.
 */
export function packItems(
	items: ItemDimensions[],
	containerWidth: number,
	gap = 0
): PackedItem[] {
	if (items.length === 0 || containerWidth <= 0) {
		return [];
	}

	const prepared = getPreparedItems(items);
	const packed: PackedItem[] = [];

	let rowItems: PreparedItem[] = [];
	let rowAspectSum = 0;
	let currentY = 0;

	const finalizeRow = (isLastRow: boolean) => {
		if (rowItems.length === 0 || rowAspectSum === 0) {
			rowItems = [];
			rowAspectSum = 0;
			return;
		}

		const widthBudget = getWidthBudget(containerWidth, rowItems.length, gap);
		const rowHeight = widthBudget / rowAspectSum;
		let currentX = 0;

		rowItems.forEach((item, index) => {
			const width = item.aspectRatio * rowHeight;
			packed.push({
				id: item.id,
				x: currentX,
				y: currentY,
				width,
				height: rowHeight,
			});
			currentX += width;
			if (index < rowItems.length - 1) {
				currentX += gap;
			}
		});

		currentY += rowHeight;
		if (!isLastRow) {
			currentY += gap;
		}

		rowItems = [];
		rowAspectSum = 0;
	};

	prepared.forEach((item, index) => {
		rowItems.push(item);
		rowAspectSum += item.aspectRatio;

		const widthBudget = getWidthBudget(containerWidth, rowItems.length, gap);
		const rowHeight = rowAspectSum === 0 ? 0 : widthBudget / rowAspectSum;

		const isLastItem = index === prepared.length - 1;
		const rowTooShort = rowHeight < MIN_ROW_HEIGHT && rowItems.length > 1;
		const rowWithinBand =
			rowHeight >= MIN_ROW_HEIGHT && rowHeight <= MAX_ROW_HEIGHT;

		if (rowTooShort) {
			const overflow = rowItems.pop();
			if (overflow) {
				rowAspectSum -= overflow.aspectRatio;
				finalizeRow(false);
				rowItems = [overflow];
				rowAspectSum = overflow.aspectRatio;
			}
			return;
		}

		if (rowWithinBand) {
			finalizeRow(isLastItem);
			return;
		}

		if (rowItems.length >= MAX_ITEMS_PER_ROW || isLastItem) {
			finalizeRow(isLastItem);
		}
	});

	if (rowItems.length > 0) {
		finalizeRow(true);
	}

	return packed;
}

/**
 * Calculate the total height needed for all packed items
 */
export function calculatePackedHeight(packedItems: PackedItem[]): number {
	if (packedItems.length === 0) {
		return 0;
	}

	return Math.max(...packedItems.map((item) => item.y + item.height));
}

// ============================================================================
// LAYOUT HOOK
// ============================================================================

export type UseGalleryLayoutOptions = {
	items: GalleryItem[];
	gap?: number;
};

export type UseGalleryLayoutReturn = {
	packedItems: PackedItem[];
	containerHeight: number;
	containerRefCallback: (node: HTMLDivElement | null) => void;
};

/**
 * Hook that handles gallery layout calculations and resize observation.
 * Separates layout logic from rendering for better composability.
 */
export function useGalleryLayout({
	items,
	gap = 16,
}: UseGalleryLayoutOptions): UseGalleryLayoutReturn {
	const [packedItems, setPackedItems] = useState<PackedItem[]>([]);
	const [containerHeight, setContainerHeight] = useState(0);
	const containerWidth = useMotionValue(0);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);

	// Calculate layout whenever container width changes
	const calculateLayout = useCallback(
		(width: number) => {
			if (width <= 0) {
				return;
			}

			// Convert gallery items to dimensions for bin packing
			const itemDimensions = items.map((item) => {
				const dimensions = getDimensions(item.aspectRatio, item.scaleFactor);
				return {
					id: item.id,
					width: dimensions.width,
					height: dimensions.height,
				};
			});

			// Run bin packing algorithm
			const packed = packItems(itemDimensions, width, gap);
			setPackedItems(packed);

			// Calculate total height needed
			const height = calculatePackedHeight(packed);
			setContainerHeight(height);
		},
		[items, gap]
	);

	// Listen to container width changes via motion value events
	useMotionValueEvent(containerWidth, "change", calculateLayout);

	// Set up ResizeObserver through ref callback with proper cleanup
	const containerRefCallback = useCallback(
		(node: HTMLDivElement | null) => {
			// Cleanup previous observer
			if (resizeObserverRef.current) {
				resizeObserverRef.current.disconnect();
				resizeObserverRef.current = null;
			}

			if (node) {
				// Initial measurement
				containerWidth.set(node.offsetWidth);

				// Set up ResizeObserver for container size changes
				const resizeObserver = new ResizeObserver(() => {
					containerWidth.set(node.offsetWidth);
				});

				resizeObserver.observe(node);
				resizeObserverRef.current = resizeObserver;
			}
		},
		[containerWidth]
	);

	return {
		packedItems,
		containerHeight,
		containerRefCallback,
	};
}
