import { Dialog } from "@base-ui-components/react/dialog";
import { Slot } from "@radix-ui/react-slot";
import { useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
	type ComponentPropsWithoutRef,
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/utils";

// Context to share state between components
type MobileMenuContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	isAnimating: boolean;
	setIsAnimating: (animating: boolean) => void;
	tilesComplete: boolean;
	setTilesComplete: (complete: boolean) => void;
	dimensions: { cols: number; rows: number };
	actionsRef: React.RefObject<Dialog.Root.Actions>;
};

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

const useMobileMenuContext = () => {
	const context = useContext(MobileMenuContext);
	if (!context) {
		throw new Error(
			"MobileMenu components must be used within MobileMenu.Root"
		);
	}
	return context;
};

// Root Component
type MobileMenuRootProps = Omit<
	Dialog.Root.Props,
	"open" | "onOpenChange" | "actionsRef"
> & {
	tileSize?: number;
};

function MobileMenuRoot({
	children,
	tileSize = 40,
	...dialogProps
}: MobileMenuRootProps) {
	const [open, setOpen] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [tilesComplete, setTilesComplete] = useState(false);
	const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });
	const actionsRef = useRef(
		null
	) as unknown as React.RefObject<Dialog.Root.Actions>;
	const router = useRouter();

	// Calculate dimensions on client-side only
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const calculateDimensions = () => {
			const calculatedCols = Math.ceil(window.innerWidth / tileSize);
			const calculatedRows = Math.ceil((window.innerHeight - 64) / tileSize);
			setDimensions({ cols: calculatedCols, rows: calculatedRows });
		};

		calculateDimensions();
		window.addEventListener("resize", calculateDimensions);
		return () => window.removeEventListener("resize", calculateDimensions);
	}, [tileSize]);

	// Close menu when route changes
	useEffect(() => {
		const unsubscribe = router.subscribe("onBeforeLoad", () => {
			if (open || isAnimating) {
				setIsAnimating(false);
			}
		});

		return unsubscribe;
	}, [router, open, isAnimating]);

	const handleOpenChange = (newOpen: boolean) => {
		if (newOpen) {
			// Opening: reset animation state and show dialog
			setOpen(true);
			setIsAnimating(true);
			setTilesComplete(false);
		} else {
			// Closing: trigger exit animations but keep dialog mounted
			setIsAnimating(false);
			// Actual close will happen after animations complete
		}
	};

	return (
		<MobileMenuContext.Provider
			value={{
				open,
				setOpen,
				isAnimating,
				setIsAnimating,
				tilesComplete,
				setTilesComplete,
				dimensions,
				actionsRef,
			}}
		>
			<Dialog.Root
				actionsRef={actionsRef}
				modal
				onOpenChange={handleOpenChange}
				open={open}
				{...dialogProps}
			>
				{children}
			</Dialog.Root>
		</MobileMenuContext.Provider>
	);
}

// Trigger Component
type MobileMenuTriggerProps = Dialog.Trigger.Props & {
	asChild?: boolean;
};

function MobileMenuTrigger({
	asChild = false,
	children,
	...props
}: MobileMenuTriggerProps) {
	const Comp = asChild ? Slot : "button";

	return (
		<Dialog.Trigger {...props}>
			<Comp>{children}</Comp>
		</Dialog.Trigger>
	);
}

// Content Component
type MobileMenuContentProps = Omit<
	Dialog.Popup.Props,
	"className" | "style"
> & {
	children: ReactNode;
	className?: string;
	tileSize?: number;
};

function MobileMenuContent({
	children,
	className,
	tileSize = 40,
	...popupProps
}: MobileMenuContentProps) {
	const {
		isAnimating,
		tilesComplete,
		dimensions,
		setTilesComplete,
		actionsRef,
		open,
		setOpen,
	} = useMobileMenuContext();

	const handleAnimationComplete = () => {
		// Called when exit animations complete
		if (!isAnimating && open) {
			setOpen(false);
			actionsRef.current?.unmount();
		}
	};

	const { cols, rows } = dimensions;
	const totalTiles = cols * rows;

	// Generate tiles with delays based on diagonal pattern
	// Enter: top-right to bottom-left | Exit: bottom-left to top-right (reverse)
	const tiles = Array.from({ length: totalTiles }, (_, index) => {
		const row = Math.floor(index / cols);
		const col = index % cols;
		const enterDiagonal = cols - 1 - col + row;
		const exitDiagonal = row + col;
		return {
			index,
			enterDelay: enterDiagonal * 0.01,
			exitDelay: exitDiagonal * 0.01,
			row,
			col,
		};
	});

	return (
		<Dialog.Portal>
			<Dialog.Popup
				className={cn("fixed inset-0 z-40 pt-16", className)}
				style={{ top: "64px" }}
				{...popupProps}
			>
				{/* Tile Grid Background */}
				<div className="absolute inset-0 overflow-hidden">
					<AnimatePresence onExitComplete={handleAnimationComplete}>
						{isAnimating &&
							tiles.map((tile) => (
								<motion.div
									animate={{ opacity: 1, scale: 1 }}
									className="absolute bg-foreground"
									exit={{ opacity: 0, scale: 0 }}
									initial={{ opacity: 0, scale: 0 }}
									key={tile.index}
									onAnimationComplete={() => {
										if (isAnimating && tile.index === totalTiles - 1) {
											setTilesComplete(true);
										}
									}}
									style={{
										width: tileSize,
										height: tileSize,
										left: tile.col * tileSize,
										top: tile.row * tileSize,
									}}
									transition={{
										duration: 0.3,
										delay: isAnimating ? tile.enterDelay : tile.exitDelay,
										ease: "easeOut",
									}}
								/>
							))}
					</AnimatePresence>
				</div>

				{/* Menu Content */}

				<AnimatePresence>
					{isAnimating && (
						<motion.div
							animate={{ opacity: tilesComplete ? 1 : 0 }}
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</Dialog.Popup>
		</Dialog.Portal>
	);
}

// Close Component (optional utility)
type MobileMenuCloseProps = Dialog.Close.Props;

function MobileMenuClose({ onClick, ...props }: MobileMenuCloseProps) {
	const { setIsAnimating } = useMobileMenuContext();

	const handleClose: Dialog.Close.Props["onClick"] = (event) => {
		setIsAnimating(false);
		onClick?.(event);
	};

	return <Dialog.Close onClick={handleClose} {...props} />;
}

// Link Component (with auto-close on click)
type MobileMenuLinkProps = ComponentPropsWithoutRef<"a"> & {
	asChild?: boolean;
};

function MobileMenuLink({
	asChild = false,
	children,
	onClick,
	...props
}: MobileMenuLinkProps) {
	const { setIsAnimating } = useMobileMenuContext();
	const Comp = asChild ? Slot : "a";

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		setIsAnimating(false);
		onClick?.(event);
	};

	return (
		<Comp onClick={handleClick} {...props}>
			{children}
		</Comp>
	);
}

// Export as compound component
export const MobileMenu = {
	Root: MobileMenuRoot,
	Trigger: MobileMenuTrigger,
	Content: MobileMenuContent,
	Close: MobileMenuClose,
	Link: MobileMenuLink,
};
