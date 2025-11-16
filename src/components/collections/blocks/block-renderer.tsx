import { HeroBlock } from "./hero-block";
import { SectionBlock } from "./section-block";
import type { Block } from "./types";

type BlockRendererProps = {
	block: Block;
	collectionSlug: string;
};

export function BlockRenderer({ block, collectionSlug }: BlockRendererProps) {
	switch (block.type) {
		case "hero":
			return <HeroBlock block={block} collectionSlug={collectionSlug} />;
		case "section":
			return <SectionBlock block={block} />;
		default:
			return null;
	}
}
