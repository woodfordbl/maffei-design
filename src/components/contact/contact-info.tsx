import { AnimatedExternalLink } from "@/components/navigation/animated-external-link";

export function ContactInfo() {
	return (
		<div className="flex flex-col space-y-8 lg:col-span-2">
			<h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
				CONTACT
			</h1>

			{/* Contact Items List */}
			<div className="flex flex-col space-y-6">
				{/* New Inquiries */}
				<div className="space-y-2 border-border border-b pb-6">
					<p className="font-normal text-muted-foreground text-sm uppercase tracking-wide">
						(NEW INQUIRIES)
					</p>
					<AnimatedExternalLink href="mailto:info@maffei.design">
						info@maffei.design
					</AnimatedExternalLink>
				</div>

				{/* Jobs */}
				<div className="space-y-2 border-border border-b pb-6">
					<p className="font-normal text-muted-foreground text-sm uppercase tracking-wide">
						(JOBS)
					</p>
					<AnimatedExternalLink href="mailto:careers@maffei.design">
						careers@maffei.design
					</AnimatedExternalLink>
				</div>

				{/* Address */}
				<div className="space-y-2 border-border border-b pb-6">
					<p className="font-normal text-muted-foreground text-sm uppercase tracking-wide">
						(LOCATION)
					</p>
					<p className="font-normal text-foreground text-lg">New York, NY</p>
				</div>

				{/* Socials */}
				<div className="space-y-2">
					<p className="font-normal text-muted-foreground text-sm uppercase tracking-wide">
						(SOCIALS)
					</p>
					<div className="flex flex-col space-y-2">
						<AnimatedExternalLink
							href="https://www.instagram.com/jillianmaffeidesigns/"
							rel="noopener noreferrer"
							target="_blank"
						>
							Instagram
						</AnimatedExternalLink>
						<AnimatedExternalLink
							href="https://www.threads.net/@jillianmaffeidesigns"
							rel="noopener noreferrer"
							target="_blank"
						>
							Threads
						</AnimatedExternalLink>
					</div>
				</div>
			</div>
		</div>
	);
}
