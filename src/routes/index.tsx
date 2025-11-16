import { createFileRoute } from "@tanstack/react-router";
import { GalleryContainer } from "@/components/portfolio/container";
import { exampleGalleryItems } from "@/components/portfolio/example-data";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	// In the future with SSR:
	// const items = Route.useLoaderData();

	return (
		<div className="min-h-screen w-full p-16">
			<GalleryContainer items={exampleGalleryItems} />
		</div>
	);
}
