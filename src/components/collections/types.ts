export type Collection = {
	id: string;
	title: string;
	subtitle: string;
	interviewer?: string;
	tags?: string[];
	hero: {
		image: string;
		alt: string;
	};
	intro: {
		paragraphs: string[];
	};
	section1: {
		image: string;
		alt: string;
		content: {
			heading?: string;
			paragraphs: string[];
		};
	};
	section2: {
		images: Array<{
			src: string;
			alt: string;
		}>;
	};
	section3: {
		leftImage: {
			src: string;
			alt: string;
		};
		content: {
			heading?: string;
			paragraphs: string[];
		};
		rightImage: {
			src: string;
			alt: string;
		};
	};
};
