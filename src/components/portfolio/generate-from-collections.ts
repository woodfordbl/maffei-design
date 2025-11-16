import type {
	Block,
	HeroBlock,
	Image,
	SectionBlock,
} from "@/components/collections/blocks/types";
import { collections } from "@/components/collections/example-data";
import { getPortfolioImageId } from "@/lib/portfolio-image-id";
import type { GalleryItem } from "./types";

type ImageWithBlockContext = Image & { blockId: string };

function extractImagesFromBlocks(blocks: Block[]): ImageWithBlockContext[] {
	return blocks.flatMap((block) => collectBlockImages(block));
}

function collectBlockImages(block: Block): ImageWithBlockContext[] {
	if (block.type === "hero") {
		return collectHeroBlockImage(block);
	}

	if (block.type === "section") {
		return collectSectionBlockImages(block);
	}

	return [];
}

function collectHeroBlockImage(block: HeroBlock): ImageWithBlockContext[] {
	return [
		{
			...block.image,
			blockId: block.id,
		},
	];
}

function collectSectionBlockImages(
	block: SectionBlock
): ImageWithBlockContext[] {
	const images: ImageWithBlockContext[] = [];

	for (const column of block.columns) {
		if (!column.images) {
			continue;
		}

		for (const image of column.images) {
			images.push({
				...image,
				blockId: block.id,
			});
		}
	}

	return images;
}

/**
 * Generates portfolio gallery items from all collections
 * Filters for images marked with showInPortfolio: true
 */
export function generatePortfolioFromCollections(): GalleryItem[] {
	const portfolioItems: GalleryItem[] = [];

	for (const collection of collections) {
		// Extract all images from all blocks
		const images = extractImagesFromBlocks(collection.blocks);

		// Filter for portfolio images
		const portfolioImages = images.filter((img) => img.showInPortfolio);

		// Convert to GalleryItem format
		for (const img of portfolioImages) {
			if (!img.portfolioTitle) {
				console.error(
					"No portfolio title found for image. This should never happen.",
					img
				);
				continue;
			}
			portfolioItems.push({
				id: getPortfolioImageId(collection.slug, img.src),
				title: img.portfolioTitle,
				collection: collection.title,
				collectionSlug: collection.slug,
				aspectRatio: img.portfolioAspectRatio || "3:2",
				scaleFactor: img.portfolioScaleFactor || 1.0,
				imageUrl: img.src,
			});
		}
	}

	return portfolioItems;
}
