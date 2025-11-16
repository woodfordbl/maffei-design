import { createFileRoute } from "@tanstack/react-router";
import { exampleGalleryItems, GalleryContainer } from "@/components/portfolio";

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
