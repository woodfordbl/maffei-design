import { AnimatedLink } from "@/components/navigation/animated-link";

export function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4">
			<h1 className="font-mono text-4xl">404</h1>
			<p className="mt-4 text-muted-foreground">Page not found</p>
			<p className="mt-2 text-center text-muted-foreground">
				The page you're looking for doesn't exist or has been moved.
			</p>
			<AnimatedLink to="/">Go back home</AnimatedLink>
		</div>
	);
}
