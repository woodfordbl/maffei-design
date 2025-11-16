import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Newsletter subscription validation schema
export const newsletterSchema = z.object({
	email: z.email("Please enter a valid email address"),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
	.inputValidator((data) => newsletterSchema.parse(data))
	.handler(async ({ data }) => {
		// Process newsletter subscription
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log("Newsletter subscription:", data.email);
		return {
			success: true,
			message: "Successfully subscribed to newsletter",
		};
	});
