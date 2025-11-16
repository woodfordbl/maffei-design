import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

function ContactPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
					<ContactInfo />
					<ContactForm />
				</div>
			</div>
		</div>
	);
}
