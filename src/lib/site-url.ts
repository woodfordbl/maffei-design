/**
 * Get the base site URL from environment variables
 * Falls back to localhost for development if not set
 */
export function getSiteUrl(): string {
	return (
		import.meta.env.VITE_SITE_URL ||
		(typeof window !== "undefined"
			? window.location.origin
			: "http://localhost:3000")
	);
}

/**
 * Constructs a full URL from a path
 */
export function getFullUrl(path: string): string {
	const baseUrl = getSiteUrl();
	// Ensure path starts with /
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${baseUrl}${normalizedPath}`;
}
