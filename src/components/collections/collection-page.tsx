import { BlockRenderer } from "./blocks/block-renderer";
import type { Collection } from "./blocks/types";

type CollectionPageProps = {
	collection: Collection;
};

export function CollectionPage({ collection }: CollectionPageProps) {
	return (
		<div className="min-h-screen bg-white">
			{collection.blocks.map((block) => (
				<BlockRenderer
					block={block}
					collectionSlug={collection.slug}
					key={block.id}
				/>
			))}
		</div>
	);
}
