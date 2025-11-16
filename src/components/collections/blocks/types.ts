// Shared types
export type AspectRatio =
	| "1:1"
	| "3:2"
	| "2:3"
	| "4:3"
	| "3:4"
	| "16:9"
	| "9:16";

export type Image =
	| {
			src: string;
			alt: string;
			width?: number;
			height?: number;
			showInPortfolio?: false;
			portfolioTitle?: never;
			portfolioAspectRatio?: never;
			portfolioScaleFactor?: never;
	  }
	| {
			src: string;
			alt: string;
			width?: number;
			height?: number;
			showInPortfolio: true;
			portfolioTitle: string;
			portfolioAspectRatio: AspectRatio;
			portfolioScaleFactor: number; // 0.8-1.5 for grid variation
	  };

// Column can contain text, images, or both
export type Column = {
	id: string;
	type: "text" | "image" | "mixed";
	content?: {
		heading?: string;
		text?: string[];
	};
	images?: Image[];
	sticky?: boolean; // Makes this column sticky on scroll
	width?: number; // Tailwind column span (1-12), defaults based on column count
};

// Hero - special first block
export type HeroBlock = {
	type: "hero";
	id: string;
	title: string;
	subtitle: string;
	author: string;
	date?: string;
	tags?: string[];
	image: Image;
	intro?: string[];
	variant?: "default" | "about"; // Add variant for different hero styles
};

// Section - flexible multi-column container
export type SectionBlock = {
	type: "section";
	id: string;
	columns: Column[]; // 1-4 columns typically
	gap?: "sm" | "md" | "lg"; // 4, 8, 12
	padding?: "sm" | "md" | "lg"; // py-12, py-20, py-32
};

// Main types
export type Block = HeroBlock | SectionBlock;

export type Collection = {
	id: string;
	slug: string;
	title: string;
	description: string;
	blocks: Block[];
};
