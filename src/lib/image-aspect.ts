import type { AspectRatio, Image } from "@/components/collections/blocks/types";

const ASPECT_RATIO_MAP: Record<AspectRatio, string> = {
	"1:1": "1 / 1",
	"3:2": "3 / 2",
	"2:3": "2 / 3",
	"4:3": "4 / 3",
	"3:4": "3 / 4",
	"16:9": "16 / 9",
	"9:16": "9 / 16",
};

export function getImageAspectRatio(image: Image, fallback = "4 / 3"): string {
	if (image.width && image.height) {
		return `${image.width} / ${image.height}`;
	}

	if (
		image.portfolioAspectRatio &&
		image.portfolioAspectRatio in ASPECT_RATIO_MAP
	) {
		return ASPECT_RATIO_MAP[image.portfolioAspectRatio];
	}

	return fallback;
}
