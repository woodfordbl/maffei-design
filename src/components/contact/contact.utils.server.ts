import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Form validation schema
export const contactFormSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be at most 50 characters"),
	email: z.email("Please enter a valid email address"),
	phone: z
		.string()
		.refine((val) => val === "" || (val.length >= 10 && val.length <= 15), {
			message: "Phone number must be between 10 and 15 characters if provided",
		}),
	subject: z
		.string()
		.min(5, "Subject must be at least 5 characters")
		.max(100, "Subject must be at most 100 characters"),
	message: z
		.string()
		.min(20, "Message must be at least 20 characters")
		.max(1000, "Message must be at most 1000 characters"),
});

export const submitForm = createServerFn({ method: "POST" })
	.inputValidator((data) => contactFormSchema.parse(data))
	.handler(async ({ data }) => {
		// Process form data
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log(data);
		return { success: true, message: "Form submitted successfully" };
	});
