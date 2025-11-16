import type { AspectRatio, Collection, GalleryItem } from "./types";

// ============================================================================
// RANDOM GENERATORS (for demo data only)
// ============================================================================

function randomScale(): number {
	return 0.8 + Math.random() * 0.7;
}

function randomAspectRatio(): AspectRatio {
	const rand = Math.random();
	if (rand < 0.3) {
		return "1:1";
	}
	if (rand < 0.6) {
		return Math.random() < 0.5 ? "3:2" : "16:9";
	}
	if (rand < 0.85) {
		return Math.random() < 0.5 ? "2:3" : "9:16";
	}
	return Math.random() < 0.5 ? "4:3" : "3:4";
}

const collections: Collection[] = [
	"Architecture",
	"Interior Design",
	"Product Design",
	"Branding",
	"Web Design",
];

function randomCollection(): Collection {
	return collections[Math.floor(Math.random() * collections.length)];
}

// ============================================================================
// EXAMPLE DATA
// ============================================================================

const imageSeedNumbers = Array.from({ length: 30 }, (_, i) => i + 100);

const titles = [
	"Riverside Residence",
	"Urban Loft",
	"Coastal Villa",
	"Mountain Retreat",
	"City Apartment",
	"Modern Office",
	"Minimalist Home",
	"Industrial Space",
	"Garden House",
	"Studio Design",
	"Contemporary Living",
	"Open Plan Space",
	"Boutique Hotel",
	"Workspace Design",
	"Retail Interior",
	"Exhibition Space",
	"Private Residence",
	"Commercial Build",
	"Cultural Center",
	"Mixed Use Development",
	"Adaptive Reuse",
	"Penthouse Suite",
	"Beach House",
	"Forest Cabin",
	"Desert Home",
	"Lakeside Property",
	"Historic Renovation",
	"New Construction",
	"Sustainable Design",
	"Smart Home",
];

/**
 * Example gallery data using Lorem Picsum for images
 * Replace with real data in production
 */
export const exampleGalleryItems: GalleryItem[] = Array.from(
	{ length: 30 },
	(_, i) => {
		const seed = imageSeedNumbers[i];
		return {
			id: `gallery-item-${i + 1}`,
			title: titles[i],
			collection: randomCollection(),
			aspectRatio: randomAspectRatio(),
			scaleFactor: randomScale(),
			imageUrl: `https://picsum.photos/seed/${seed}/800/600`,
		};
	}
);
