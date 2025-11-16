export type AspectRatio =
	| "1:1"
	| "3:2"
	| "2:3"
	| "4:3"
	| "3:4"
	| "16:9"
	| "9:16";

export type Collection =
	| "Architecture"
	| "Interior Design"
	| "Product Design"
	| "Branding"
	| "Web Design";

export type GalleryItem = {
	id: string;
	title: string;
	collection: Collection;
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
