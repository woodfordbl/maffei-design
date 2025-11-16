import { motion } from "motion/react";
import { Column } from "./column";
import type { SectionBlock as SectionBlockType } from "./types";

type SectionBlockProps = {
	block: SectionBlockType;
};

export function SectionBlock({ block }: SectionBlockProps) {
	const columnCount = block.columns.length;

	// Determine gap class
	let gapClass = "gap-8";
	if (block.gap === "sm") {
		gapClass = "gap-4";
	} else if (block.gap === "lg") {
		gapClass = "gap-12";
	}

	// Determine padding class
	let paddingClass = "py-20";
	if (block.padding === "sm") {
		paddingClass = "py-12";
	} else if (block.padding === "lg") {
		paddingClass = "py-32";
	}

	// For 3+ columns or if any column has explicit width, use 12-column grid
	const hasExplicitWidths = block.columns.some(
		(col) => col.width !== undefined
	);
	let gridColsClass = `lg:grid-cols-${columnCount}`;
	if (columnCount === 1) {
		gridColsClass = "lg:grid-cols-1";
	} else if (hasExplicitWidths || columnCount === 3) {
		gridColsClass = "lg:grid-cols-12";
	}

	return (
		<motion.section
			className={`container mx-auto px-6 ${paddingClass}`}
			initial={{ opacity: 0 }}
			transition={{ duration: 0.4 }}
			viewport={{ once: true, margin: "-150px" }}
			whileInView={{ opacity: 1 }}
		>
			<div className={`grid grid-cols-1 ${gridColsClass} ${gapClass}`}>
				{block.columns.map((column) => (
					<Column column={column} key={column.id} />
				))}
			</div>
		</motion.section>
	);
}
