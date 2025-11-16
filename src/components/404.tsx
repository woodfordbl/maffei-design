import { setResponseStatus } from "@tanstack/react-start/server";
import { AnimatedLink } from "@/components/navigation/animated-link";

export function NotFound() {
	// Set 404 status code for SSR
	setResponseStatus(404);

	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
			<h1 className="font-bold text-6xl">404</h1>
			<p className="mt-4 text-muted-foreground">Page not found</p>
			<p className="mt-2 text-center text-muted-foreground">
				The page you're looking for doesn't exist or has been moved.
			</p>
			<AnimatedLink to="/">Go back home</AnimatedLink>
		</div>
	);
}
