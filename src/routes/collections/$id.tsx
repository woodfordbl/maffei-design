import { createFileRoute, redirect } from "@tanstack/react-router";
import type { Block } from "@/components/collections/blocks/types";
import { CollectionPage } from "@/components/collections/collection-page";
import { getCollectionById } from "@/components/collections/example-data";
import { getFullUrl } from "@/lib/site-url";
import { generateSocialPreviewMeta } from "@/lib/social-preview";

export const Route = createFileRoute("/collections/$id")({
	component: CollectionComponent,
	loader: ({ params }) => {
		const collection = getCollectionById(params.id);
		if (!collection) {
			// Redirect to 404 page if collection not found
			throw redirect({
				to: "/$",
				replace: true,
			});
		}
		return { collection };
	},
	head: ({ loaderData, params }) => {
		if (!loaderData?.collection) {
			return {
				meta: [],
			};
		}

		const { collection } = loaderData;
		// Find the hero block
		const heroBlock = collection.blocks.find(
			(block: Block) => block.type === "hero"
		);

		if (!heroBlock || heroBlock.type !== "hero") {
			return {
				meta: [],
			};
		}

		// Construct the full URL for social sharing
		const fullUrl = getFullUrl(`/collections/${params.id}`);

		return {
			meta: generateSocialPreviewMeta({
				title: heroBlock.title,
				description: `${heroBlock.subtitle} by ${heroBlock.author}`,
				author: heroBlock.author,
				imageUrl: heroBlock.image.src,
				imageWidth: heroBlock.image.width,
				imageHeight: heroBlock.image.height,
				imageAlt: heroBlock.image.alt,
				url: fullUrl,
			}),
		};
	},
});

function CollectionComponent() {
	const { collection } = Route.useLoaderData();

	return <CollectionPage collection={collection} />;
}
