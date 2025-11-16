import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
	"placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
	{
		variants: {
			variant: {
				default:
					"border-input rounded-md border focus-visible:border-ring aria-invalid:border-destructive",
				underline:
					"border-input border-0 border-b rounded-none focus-visible:border-b-ring focus-visible:border-b-2 focus-visible:ring-0 aria-invalid:border-b-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Textarea({
	className,
	variant,
	...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(textareaVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Textarea, textareaVariants };
