import type { CSSProperties } from "react";

const NON_ALPHANUMERIC = /[^a-z0-9]/gi;

function sanitizeIdentifier(value: string): string {
	const normalized = value.split("/").pop() || value;
	return normalized.replace(NON_ALPHANUMERIC, "-").slice(0, 40).toLowerCase();
}

export function getPortfolioImageId(
	collectionSlug: string,
	imageSrc: string
): string {
	const imageId = sanitizeIdentifier(imageSrc);
	return `${collectionSlug}-${imageId}`;
}

export function getViewTransitionStyle(
	transitionName?: string
): CSSProperties & { viewTransitionName?: string } {
	if (!transitionName) {
		return {};
	}

	return {
		viewTransitionName: transitionName,
	};
}
