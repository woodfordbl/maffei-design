import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatedExternalLink } from "@/components/navigation/animated-external-link";
import { AnimatedLink } from "@/components/navigation/animated-link";
import { Input } from "@/components/ui/input";
import {
	newsletterSchema,
	subscribeNewsletter,
} from "./newsletter.utils.server";

const sitemapLinks = [
	{ label: "Portfolio", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Journal", href: "/journal" },
	{ label: "Contact", href: "/contact" },
];

export function Footer() {
	const [currentTime, setCurrentTime] = useState("");

	const newsletterForm = useForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onSubmit: newsletterSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const response = await subscribeNewsletter({ data: value });
				toast.success(response.message);
				newsletterForm.reset();
			} catch (error) {
				toast.error(
					error instanceof Error
						? error.message
						: "Unable to subscribe to newsletter, please try again"
				);
			}
		},
	});

	// Update time every second
	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const timeString = now.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			});
			setCurrentTime(timeString);
		};

		// Set initial time
		updateTime();

		// Update every second
		const interval = setInterval(updateTime, 1000);

		// Cleanup interval on unmount
		return () => clearInterval(interval);
	}, []);

	return (
		<footer className="w-full border-border border-t bg-background">
			<div className="container mx-auto px-4 py-12 lg:py-16">
				{/* Top Section: Contact Info */}
				<div className="mb-12 space-y-2">
					<div className="flex flex-col space-y-1">
						<p className="text-foreground text-sm">
							New inquiries:{" "}
							<AnimatedExternalLink href="mailto:info@maffei.design">
								info@maffei.design
							</AnimatedExternalLink>
						</p>
						<p className="text-foreground text-sm">
							Jobs:{" "}
							<AnimatedExternalLink href="mailto:careers@maffei.design">
								careers@maffei.design
							</AnimatedExternalLink>
						</p>
						<p className="text-foreground text-sm">Address: New York, NY</p>
					</div>
				</div>

				{/* Four Columns Section */}
				<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
					{/* SITEMAP Column */}
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm uppercase tracking-wide">
							(SITEMAP)
						</p>
						<nav className="flex flex-col space-y-2">
							{sitemapLinks.map((link) => (
								<AnimatedLink
									className="w-fit font-normal text-base text-foreground"
									key={link.href}
									to={link.href as "/"}
								>
									{link.label}
								</AnimatedLink>
							))}
						</nav>
					</div>

					{/* LOCATION Column */}
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm uppercase tracking-wide">
							(LOCATION)
						</p>
						<div className="flex flex-col space-y-2">
							<p className="font-normal text-base text-foreground">
								New York, NY
							</p>
							<p className="font-normal text-base text-foreground">
								{currentTime}
							</p>
						</div>
					</div>

					{/* SOCIALS Column */}
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm uppercase tracking-wide">
							(SOCIALS)
						</p>
						<div className="flex flex-col space-y-2">
							<AnimatedExternalLink
								className="w-fit font-normal text-base text-foreground"
								href="https://www.instagram.com/jillianmaffeidesigns/"
								rel="noopener noreferrer"
								target="_blank"
							>
								Instagram
							</AnimatedExternalLink>
							<AnimatedExternalLink
								className="w-fit font-normal text-base text-foreground"
								href="https://x.com"
								rel="noopener noreferrer"
								target="_blank"
							>
								X.com
							</AnimatedExternalLink>
							<AnimatedExternalLink
								className="w-fit font-normal text-base text-foreground"
								href="https://www.threads.net/@jillianmaffeidesigns"
								rel="noopener noreferrer"
								target="_blank"
							>
								Threads
							</AnimatedExternalLink>
						</div>
					</div>

					{/* NEWSLETTER Column */}
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm uppercase tracking-wide">
							(NEWSLETTER)
						</p>
						<form
							className="space-y-2"
							onSubmit={(e) => {
								e.preventDefault();
								newsletterForm.handleSubmit();
							}}
						>
							<newsletterForm.Field name="email">
								{(field) => (
									<div className="space-y-2">
										<label
											className="block font-normal text-base text-foreground"
											htmlFor="newsletter-email"
										>
											E-mail*
										</label>
										<div className="flex items-center gap-2">
											<Input
												className="flex-1"
												id="newsletter-email"
												name={field.name}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Enter your email"
												type="email"
												value={field.state.value}
												variant="underline"
											/>
											<newsletterForm.Subscribe
												selector={(state) => [state.isSubmitting]}
											>
												{([isSubmitting]) => (
													<button
														aria-label="Subscribe to newsletter"
														className="text-foreground transition-colors hover:text-foreground/80 disabled:opacity-50"
														disabled={isSubmitting}
														type="submit"
													>
														<svg
															aria-hidden="true"
															className="h-5 w-5"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																d="M9 5l7 7-7 7"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
															/>
														</svg>
													</button>
												)}
											</newsletterForm.Subscribe>
										</div>
									</div>
								)}
							</newsletterForm.Field>
						</form>
					</div>
				</div>
			</div>
		</footer>
	);
}
