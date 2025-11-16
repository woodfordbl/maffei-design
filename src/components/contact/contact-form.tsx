/** biome-ignore-all lint/correctness/noChildrenProp: <Recomended Usage of Field component> */
import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { contactFormSchema, submitForm } from "./contact.utils.server";

export function ContactForm() {
	const [isHovered, setIsHovered] = useState(false);

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			subject: "",
			message: "",
		},
		validators: {
			onSubmit: contactFormSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const response = await submitForm({ data: value });
				toast.success(response.message);
				form.reset();
			} catch (error) {
				toast.error(
					error instanceof Error
						? error.message
						: "Unable to send message, please try again"
				);
			}
		},
	});

	return (
		<div>
			<div className="mb-8">
				<h2 className="mb-2 font-bold text-3xl text-card-foreground">
					GET IN TOUCH
				</h2>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					{/* Name Field */}
					<form.Field name="name">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Name *</FieldLabel>
									<Input
										aria-invalid={isInvalid}
										autoComplete="name"
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="John Doe"
										value={field.state.value}
										variant="underline"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>

					{/* Email Field */}
					<form.Field name="email">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Email *</FieldLabel>
									<Input
										aria-invalid={isInvalid}
										autoComplete="email"
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="john@example.com"
										type="email"
										value={field.state.value}
										variant="underline"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>

					{/* Phone Field */}
					<form.Field name="phone">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Phone (Optional)</FieldLabel>
									<Input
										aria-invalid={isInvalid}
										autoComplete="tel"
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="+1 (555) 123-4567"
										type="tel"
										value={field.state.value}
										variant="underline"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>

					{/* Subject Field */}
					<form.Field name="subject">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Subject *</FieldLabel>
									<Input
										aria-invalid={isInvalid}
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="What can we help you with?"
										value={field.state.value}
										variant="underline"
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>

					{/* Message Field */}
					<form.Field name="message">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Message *</FieldLabel>
									<Textarea
										aria-invalid={isInvalid}
										className="resize-none"
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Tell us more about your project or inquiry..."
										rows={6}
										value={field.state.value}
										variant="underline"
									/>
									<FieldDescription>
										{field.state.value.length}/1000 characters
									</FieldDescription>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
				</FieldGroup>

				<div className="mt-8 flex gap-4">
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => {
							return (
								<Button
									className="relative flex-1 cursor-pointer overflow-hidden"
									disabled={!canSubmit || isSubmitting}
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
									type="submit"
									variant="outline"
								>
									{/* Fill animation background - animates from left to right */}
									<motion.div
										animate={{ scaleX: isHovered && !isSubmitting ? 1 : 0 }}
										className="absolute inset-0 bg-primary"
										initial={{ scaleX: 0 }}
										style={{ transformOrigin: "left" }}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
									/>
									{/* Content with color transition */}
									<span
										className={cn(
											"relative z-10 transition-colors duration-300",
											isHovered && !isSubmitting
												? "text-primary-foreground"
												: "text-foreground"
										)}
									>
										{isSubmitting ? "SUBMITTING..." : "SUBMIT"}
									</span>
								</Button>
							);
						}}
					</form.Subscribe>
				</div>
			</form>
		</div>
	);
}
