export type AspectRatio =
	| "1:1"
	| "3:2"
	| "2:3"
	| "4:3"
	| "3:4"
	| "16:9"
	| "9:16";

export type GalleryItem = {
	id: string; // Generated server-side
	title: string;
	collection: string;
	collectionSlug: string; // Links to /collections/:slug
	aspectRatio: AspectRatio;
	scaleFactor: number;
	imageUrl: string;
};

export type PackedItem = {
	x: number;
	y: number;
	width: number;
	height: number;
	id: string;
};

export type ItemDimensions = {
	width: number;
	height: number;
	id: string;
};
