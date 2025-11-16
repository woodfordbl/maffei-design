export type SocialPreviewOptions = {
	title: string;
	description: string;
	author?: string;
	imageUrl: string;
	imageWidth?: number;
	imageHeight?: number;
	imageAlt?: string;
	siteName?: string;
	type?: "website" | "article";
	url?: string;
};

export function generateSocialPreviewMeta(options: SocialPreviewOptions) {
	const {
		title,
		description,
		author,
		imageUrl,
		imageWidth,
		imageHeight,
		imageAlt,
		siteName = "Maffei Design",
		type = "article",
		url,
	} = options;

	const metaTags = [
		// Basic meta tags
		{
			title: `${title} - ${siteName}`,
		},
		{
			name: "description",
			content: description,
		},
		// Open Graph meta tags
		{
			property: "og:title",
			content: title,
		},
		{
			property: "og:description",
			content: description,
		},
		{
			property: "og:image",
			content: imageUrl,
		},
		{
			property: "og:type",
			content: type,
		},
		{
			property: "og:site_name",
			content: siteName,
		},
		// Twitter Card meta tags
		{
			name: "twitter:card",
			content: "summary_large_image",
		},
		{
			name: "twitter:title",
			content: title,
		},
		{
			name: "twitter:description",
			content: description,
		},
		{
			name: "twitter:image",
			content: imageUrl,
		},
	];

	// Add optional author meta tags
	if (author) {
		metaTags.push(
			{
				name: "author",
				content: author,
			},
			{
				property: "article:author",
				content: author,
			},
			{
				name: "twitter:creator",
				content: author,
			}
		);
	}

	// Add optional image dimensions
	if (imageWidth) {
		metaTags.push({
			property: "og:image:width",
			content: String(imageWidth),
		});
	}

	if (imageHeight) {
		metaTags.push({
			property: "og:image:height",
			content: String(imageHeight),
		});
	}

	// Add optional image alt text
	if (imageAlt) {
		metaTags.push(
			{
				property: "og:image:alt",
				content: imageAlt,
			},
			{
				name: "twitter:image:alt",
				content: imageAlt,
			}
		);
	}

	// Add optional URL
	if (url) {
		metaTags.push(
			{
				property: "og:url",
				content: url,
			},
			{
				name: "twitter:url",
				content: url,
			}
		);
	}

	return metaTags;
}
