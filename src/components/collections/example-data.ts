import type { Collection } from "./blocks/types";

export const collections: Collection[] = [
	{
		id: "wilfrid-wood-interview",
		slug: "wilfrid-wood-interview",
		title: "Product Design",
		description:
			"Product design is the process of creating a product that is useful and desirable. It is a multidisciplinary field that combines engineering, design, and marketing to create a product that is both functional and aesthetically pleasing.",
		blocks: [
			// Hero Block
			{
				type: "hero",
				id: "hero",
				title: "Talking bottoms with Wilfrid Wood",
				subtitle: "An exploration of art history through the lens of anatomy",
				author: "Henry Whaley",
				tags: ["Articles", "Interviews"],
				image: {
					src: "https://images.unsplash.com/photo-1761637928325-058cddf06ca5?w=1200&h=1600&fit=crop",
					alt: "Artist in green apron drinking from ceramic mug in studio",
					width: 1200,
					height: 1600,
					showInPortfolio: true,
					portfolioTitle: "Artist in studio",
					portfolioAspectRatio: "2:3",
					portfolioScaleFactor: 1.2,
				},
				intro: [
					"For as long as humans have been making art, they've been making it of bottoms. Show me a gallery, and I'll show you a patron peering over the top of their spectacles at a well constructed rear end.",
					"And who better to chat bottoms than Wilfrid Wood, artist and designer of the new Cubitts cleaning cloth, which features a resplendent bespectacled backside.",
					"We visited Wilfrid in his studio, to quiz him on a selection of art history's most notable rears, against a backdrop of buttocks that didn't make it onto the cloth.",
				],
			},
			// Section 1: Sticky Image + Text
			{
				type: "section",
				id: "craft",
				columns: [
					{
						id: "img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop",
								alt: "Ceramic work in progress on studio workbench",
								width: 800,
								height: 1000,
								showInPortfolio: true,
								portfolioTitle: "Studio Workspace",
								portfolioAspectRatio: "3:2",
								portfolioScaleFactor: 0.9,
							},
						],
						sticky: true,
					},
					{
						id: "content",
						type: "text",
						content: {
							heading: "The Craft of Ceramics",
							text: [
								"Wilfrid's work is deeply rooted in the tradition of ceramic sculpture, but with a contemporary twist that challenges our perceptions of the human form.",
								"Each piece begins as a lump of clay, carefully molded and shaped over hours of meticulous work. The process is both meditative and demanding, requiring patience and precision.",
								"The studio itself is a testament to years of practice - shelves lined with works in various stages of completion, tools worn smooth from use, and the ever-present smell of clay and glaze.",
								'"I think there\'s something inherently funny about the human body," Wilfrid explains, gesturing to a row of sculptural forms. "We take ourselves so seriously, but we\'re all just walking around with these ridiculous shapes."',
								"His approach to sculpture is informed by years of studying classical forms, but also by a deep appreciation for the absurd. The result is work that is both technically accomplished and delightfully irreverent.",
								'The cleaning cloth collaboration with Cubitts came about through a shared appreciation for craftsmanship and a willingness to not take things too seriously. "They approached me about creating something unexpected," he recalls. "Something that would make people smile."',
							],
						},
					},
				],
			},
			// Section 2: Side by Side Images
			{
				type: "section",
				id: "details",
				columns: [
					{
						id: "left",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=800&fit=crop",
								alt: "Detail of ceramic sculpture",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Ceramic Detail",
								portfolioAspectRatio: "4:3",
								portfolioScaleFactor: 1.0,
							},
						],
					},
					{
						id: "right",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=800&fit=crop",
								alt: "Close-up of glazed surface",
								width: 600,
								height: 800,
							},
						],
					},
				],
			},
			// Section 3: Three Column Layout
			{
				type: "section",
				id: "perspective",
				columns: [
					{
						id: "left-img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=400&h=600&fit=crop",
								alt: "Studio workspace with tools",
								width: 400,
								height: 600,
							},
						],
						sticky: true,
						width: 3,
					},
					{
						id: "middle-text",
						type: "text",
						content: {
							heading: "A Historical Perspective",
							text: [
								"Throughout art history, the human form has been a constant subject of fascination. From ancient Greek sculpture to Renaissance painting, artists have sought to capture the beauty and complexity of the body.",
								"But there's always been a tension between the idealized and the real, between what we think bodies should look like and what they actually do.",
								'"The Greeks were obsessed with the perfect form," Wilfrid notes. "But even they couldn\'t resist adding a bit of character, a bit of humanity. You can see it in the way they captured movement, the subtle imperfections."',
								"Fast forward to the Baroque period, and artists like Rubens were celebrating bodies in all their fleshy glory. The pendulum swung from idealization to celebration of abundance.",
								"In many ways, Wilfrid's work sits in this tradition - acknowledging the classical while embracing the contemporary, finding humor without losing respect for the craft.",
								"The collaboration with Cubitts represents something of a full circle moment. Eyewear, like sculpture, is about how we see and are seen. It's fitting that a cleaning cloth should feature something worth looking at.",
								'"At the end of the day," Wilfrid concludes, "art should make you feel something. Whether that\'s awe or laughter or both - that\'s when you know you\'ve made something worthwhile."',
								"His studio, filled with works in progress and finished pieces waiting to find homes, is a testament to this philosophy. Each curve and contour tells a story, each piece invites a second look.",
								"As we wrap up our conversation, it's clear that Wilfrid's approach to art - technically skilled, conceptually playful, deeply human - resonates with Cubitts' own philosophy of making things that are both functional and delightful.",
							],
						},
						width: 5,
					},
					{
						id: "right-img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&h=1200&fit=crop",
								alt: "Final ceramic piece on display",
								width: 500,
								height: 1200,
							},
						],
						width: 4,
					},
				],
			},
		],
	},
	{
		id: "riverside-residence",
		slug: "riverside-residence",
		title: "Architecture",
		description:
			"Architecture is the art and practice of designing and constructing buildings and other structures. It is a multidisciplinary field that combines engineering, design, and construction to create buildings that are both functional and aesthetically pleasing.",
		blocks: [
			{
				type: "hero",
				id: "hero",
				title: "Riverside Residence",
				subtitle: "A modern architectural masterpiece along the waterfront",
				author: "Sarah Chen",
				tags: ["Architecture", "Residential"],
				image: {
					src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=1600&fit=crop",
					alt: "Modern riverside home with large windows",
					width: 1200,
					height: 1600,
					showInPortfolio: true,
					portfolioTitle: "Riverside Residence",
					portfolioAspectRatio: "2:3",
					portfolioScaleFactor: 1.3,
				},
				intro: [
					"Nestled along the banks of a pristine river, this modern residence seamlessly blends contemporary architecture with its natural surroundings.",
					"The design philosophy centers on creating fluid transitions between indoor and outdoor spaces, allowing residents to experience the beauty of the riverside setting from every room.",
					"Large floor-to-ceiling windows frame views of the water, while sustainable materials and passive design strategies ensure the home treads lightly on its environment.",
				],
			},
			{
				type: "section",
				id: "exterior",
				columns: [
					{
						id: "img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop",
								alt: "Exterior view of modern home",
								width: 800,
								height: 1000,
								showInPortfolio: true,
								portfolioTitle: "Modern Facade",
								portfolioAspectRatio: "3:2",
								portfolioScaleFactor: 1.1,
							},
						],
						sticky: true,
					},
					{
						id: "content",
						type: "text",
						content: {
							heading: "Contemporary Design",
							text: [
								"The exterior facade combines clean lines with warm materials, creating a striking yet welcoming presence in the landscape.",
								"Local stone and sustainably sourced timber complement the modern glass and steel structure.",
								"Overhanging eaves provide shade in summer while allowing winter sun to penetrate deep into the living spaces.",
								"The architecture responds to the site's natural topography, stepping down the slope to minimize its visual impact.",
							],
						},
					},
				],
			},
			{
				type: "section",
				id: "interior",
				columns: [
					{
						id: "living",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop",
								alt: "Living room with river views",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "River View Living",
								portfolioAspectRatio: "4:3",
								portfolioScaleFactor: 0.95,
							},
						],
					},
					{
						id: "kitchen",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600&h=800&fit=crop",
								alt: "Modern kitchen design",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Kitchen Design",
								portfolioAspectRatio: "3:4",
								portfolioScaleFactor: 1.05,
							},
						],
					},
				],
			},
			{
				type: "section",
				id: "details",
				columns: [
					{
						id: "left-img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=600&fit=crop",
								alt: "Architectural detail shot",
								width: 400,
								height: 600,
							},
						],
						sticky: true,
						width: 3,
					},
					{
						id: "middle-text",
						type: "text",
						content: {
							heading: "Materials & Sustainability",
							text: [
								"Every material choice reflects a commitment to environmental responsibility and enduring quality.",
								"Locally quarried stone reduces transportation emissions while celebrating regional character.",
								"Reclaimed timber beams add warmth and history to contemporary spaces.",
								"High-performance glazing maximizes natural light while maintaining thermal comfort year-round.",
								"Integrated solar panels and geothermal heating systems minimize the home's carbon footprint.",
							],
						},
						width: 5,
					},
					{
						id: "right-img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&h=1200&fit=crop",
								alt: "Detail of materials",
								width: 500,
								height: 1200,
								showInPortfolio: true,
								portfolioTitle: "Material Details",
								portfolioAspectRatio: "9:16",
								portfolioScaleFactor: 0.85,
							},
						],
						width: 4,
					},
				],
			},
		],
	},
	{
		id: "urban-loft-renovation",
		slug: "urban-loft-renovation",
		title: "Interior Design",
		description:
			"Interior design is the art and practice of creating functional and aesthetically pleasing spaces within a building. It is a multidisciplinary field that combines architecture, design, and construction to create spaces that are both functional and aesthetically pleasing.",
		blocks: [
			{
				type: "hero",
				id: "hero",
				title: "Urban Loft Renovation",
				subtitle: "Transforming industrial space into contemporary living",
				author: "Marcus Thompson",
				tags: ["Interior Design", "Renovation"],
				image: {
					src: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&h=1600&fit=crop",
					alt: "Modern loft interior with exposed brick",
					width: 1200,
					height: 1600,
					showInPortfolio: true,
					portfolioTitle: "Urban Loft Renovation",
					portfolioAspectRatio: "3:2",
					portfolioScaleFactor: 1.15,
				},
				intro: [
					"This former textile factory has been reimagined as a sophisticated urban dwelling that honors its industrial heritage while meeting contemporary lifestyle needs.",
					"The design preserves and celebrates original architectural elements - exposed brick walls, timber beams, and steel columns - while introducing modern comforts and refined finishes.",
					"Open-plan living spaces flow seamlessly, creating a sense of spaciousness while carefully defined zones provide intimacy and functionality.",
				],
			},
			{
				type: "section",
				id: "living",
				columns: [
					{
						id: "img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop",
								alt: "Living area with industrial details",
								width: 800,
								height: 1000,
								showInPortfolio: true,
								portfolioTitle: "Industrial Living",
								portfolioAspectRatio: "16:9",
								portfolioScaleFactor: 1.0,
							},
						],
						sticky: true,
					},
					{
						id: "content",
						type: "text",
						content: {
							heading: "Industrial Elegance",
							text: [
								"The juxtaposition of raw industrial elements with refined contemporary furnishings creates a sophisticated aesthetic.",
								"Original factory windows flood the space with natural light, while new interventions remain respectful of the building's character.",
								"A neutral color palette allows the architecture to take center stage, with carefully selected furniture and art adding personality.",
								"Custom steel-framed glass partitions define spaces without compromising the loft's open feel.",
							],
						},
					},
				],
			},
			{
				type: "section",
				id: "spaces",
				columns: [
					{
						id: "bedroom",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=800&fit=crop",
								alt: "Master bedroom design",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Loft Bedroom",
								portfolioAspectRatio: "1:1",
								portfolioScaleFactor: 1.2,
							},
						],
					},
					{
						id: "bathroom",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=800&fit=crop",
								alt: "Contemporary bathroom",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Modern Bath",
								portfolioAspectRatio: "4:3",
								portfolioScaleFactor: 0.9,
							},
						],
					},
				],
			},
		],
	},
	{
		id: "coastal-villa",
		slug: "coastal-villa",
		title: "Architecture",
		description:
			"Architecture is the art and practice of designing and constructing buildings and other structures. It is a multidisciplinary field that combines engineering, design, and construction to create buildings that are both functional and aesthetically pleasing.",
		blocks: [
			{
				type: "hero",
				id: "hero",
				title: "Coastal Villa",
				subtitle: "Mediterranean luxury meets contemporary design",
				author: "Elena Rodriguez",
				tags: ["Architecture", "Residential", "Luxury"],
				image: {
					src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=1600&fit=crop",
					alt: "Luxury coastal villa with ocean views",
					width: 1200,
					height: 1600,
					showInPortfolio: true,
					portfolioTitle: "Coastal Villa",
					portfolioAspectRatio: "2:3",
					portfolioScaleFactor: 1.25,
				},
				intro: [
					"Perched on a dramatic clifftop overlooking the Mediterranean, this villa exemplifies contemporary luxury while respecting vernacular architectural traditions.",
					"The design responds to its stunning coastal setting, with every space oriented to capture spectacular views while providing shelter from prevailing winds.",
					"Indigenous materials and passive cooling strategies ensure comfort while minimizing environmental impact in this sensitive coastal ecosystem.",
				],
			},
			{
				type: "section",
				id: "design",
				columns: [
					{
						id: "img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop",
								alt: "Villa exterior with pool",
								width: 800,
								height: 1000,
								showInPortfolio: true,
								portfolioTitle: "Infinity Pool",
								portfolioAspectRatio: "3:2",
								portfolioScaleFactor: 1.1,
							},
						],
						sticky: true,
					},
					{
						id: "content",
						type: "text",
						content: {
							heading: "Design Philosophy",
							text: [
								"The villa's form follows the natural contours of the site, minimizing excavation and preserving native vegetation.",
								"White-rendered walls reflect harsh sunlight while providing a striking contrast to the azure sea.",
								"Deep overhangs and shaded terraces create comfortable outdoor living spaces year-round.",
								"An infinity pool appears to merge with the horizon, blurring boundaries between architecture and nature.",
							],
						},
					},
				],
			},
			{
				type: "section",
				id: "interiors",
				columns: [
					{
						id: "living",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=600&h=800&fit=crop",
								alt: "Ocean-view living room",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Ocean Views",
								portfolioAspectRatio: "16:9",
								portfolioScaleFactor: 1.3,
							},
						],
					},
					{
						id: "dining",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=800&fit=crop",
								alt: "Dining area",
								width: 600,
								height: 800,
							},
						],
					},
				],
			},
		],
	},
	{
		id: "minimalist-workspace",
		slug: "minimalist-workspace",
		title: "Interior Design",
		description:
			"Interior design is the art and practice of creating functional and aesthetically pleasing spaces within a building. It is a multidisciplinary field that combines architecture, design, and construction to create spaces that are both functional and aesthetically pleasing.",
		blocks: [
			{
				type: "hero",
				id: "hero",
				title: "Minimalist Workspace",
				subtitle: "Designing for focus and creativity",
				author: "James Kim",
				tags: ["Interior Design", "Commercial", "Workspace"],
				image: {
					src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=1600&fit=crop",
					alt: "Clean modern workspace with natural light",
					width: 1200,
					height: 1600,
					showInPortfolio: true,
					portfolioTitle: "Minimalist Workspace",
					portfolioAspectRatio: "3:2",
					portfolioScaleFactor: 1.0,
				},
				intro: [
					"In an era of constant distraction, this workspace design prioritizes clarity, focus, and human wellbeing.",
					"Every element has been carefully considered and refined, eliminating visual noise to create an environment conducive to deep work and creative thinking.",
					"Natural materials, abundant daylight, and biophilic design principles combine to create spaces that energize rather than deplete.",
				],
			},
			{
				type: "section",
				id: "design",
				columns: [
					{
						id: "img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=1000&fit=crop",
								alt: "Open office space",
								width: 800,
								height: 1000,
								showInPortfolio: true,
								portfolioTitle: "Open Workspace",
								portfolioAspectRatio: "4:3",
								portfolioScaleFactor: 0.95,
							},
						],
						sticky: true,
					},
					{
						id: "content",
						type: "text",
						content: {
							heading: "Principles of Clarity",
							text: [
								"A restrained material palette creates visual calm, allowing occupants to focus on their work rather than their surroundings.",
								"Flexible furniture systems adapt to different work modes throughout the day.",
								"Strategic placement of plants brings life to the space while improving air quality.",
								"Acoustic treatments ensure conversations don't disturb focused work in adjacent areas.",
							],
						},
					},
				],
			},
			{
				type: "section",
				id: "zones",
				columns: [
					{
						id: "meeting",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=600&h=800&fit=crop",
								alt: "Meeting room design",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Meeting Space",
								portfolioAspectRatio: "1:1",
								portfolioScaleFactor: 1.1,
							},
						],
					},
					{
						id: "focus",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=800&fit=crop",
								alt: "Focus work area",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Focus Zone",
								portfolioAspectRatio: "3:4",
								portfolioScaleFactor: 0.85,
							},
						],
					},
				],
			},
		],
	},
	{
		id: "brand-identity-studio",
		slug: "brand-identity-studio",
		title: "Branding",
		description:
			"Branding is the process of creating a unique and memorable identity for a business. It is a multidisciplinary field that combines marketing, design, and communication to create a brand that is both unique and memorable.",
		blocks: [
			{
				type: "hero",
				id: "hero",
				title: "Brand Identity Studio",
				subtitle: "Crafting visual narratives for modern businesses",
				author: "Olivia Martinez",
				tags: ["Branding", "Identity", "Design"],
				image: {
					src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=1600&fit=crop",
					alt: "Brand identity materials and mockups",
					width: 1200,
					height: 1600,
					showInPortfolio: true,
					portfolioTitle: "Brand Identity Studio",
					portfolioAspectRatio: "2:3",
					portfolioScaleFactor: 1.2,
				},
				intro: [
					"Effective brand identity goes beyond aesthetics - it's about creating authentic connections between businesses and their audiences.",
					"Our studio specializes in developing cohesive visual systems that tell compelling stories and differentiate brands in crowded markets.",
					"From initial strategy through to final delivery, we craft identities that are both beautiful and strategically sound.",
				],
			},
			{
				type: "section",
				id: "process",
				columns: [
					{
						id: "img",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=1000&fit=crop",
								alt: "Design process sketches",
								width: 800,
								height: 1000,
								showInPortfolio: true,
								portfolioTitle: "Design Process",
								portfolioAspectRatio: "16:9",
								portfolioScaleFactor: 1.05,
							},
						],
						sticky: true,
					},
					{
						id: "content",
						type: "text",
						content: {
							heading: "Our Approach",
							text: [
								"Every project begins with deep discovery - understanding not just what a business does, but why it matters.",
								"We develop strategic frameworks that guide all creative decisions, ensuring consistency across touchpoints.",
								"Typography, color, imagery, and voice are all carefully orchestrated to create memorable brand experiences.",
								"Comprehensive brand guidelines ensure teams can confidently execute the identity across all applications.",
							],
						},
					},
				],
			},
			{
				type: "section",
				id: "applications",
				columns: [
					{
						id: "digital",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&h=800&fit=crop",
								alt: "Digital brand applications",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Digital Identity",
								portfolioAspectRatio: "4:3",
								portfolioScaleFactor: 0.9,
							},
						],
					},
					{
						id: "print",
						type: "image",
						images: [
							{
								src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=800&fit=crop",
								alt: "Print collateral design",
								width: 600,
								height: 800,
								showInPortfolio: true,
								portfolioTitle: "Print Materials",
								portfolioAspectRatio: "1:1",
								portfolioScaleFactor: 1.15,
							},
						],
					},
				],
			},
		],
	},
];

export function getCollectionById(id: string): Collection | undefined {
	return collections.find((c) => c.id === id);
}

export function getAllCollections(): Collection[] {
	return collections;
}
