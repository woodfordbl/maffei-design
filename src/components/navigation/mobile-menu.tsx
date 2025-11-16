import { Dialog } from "@base-ui-components/react/dialog";
import { Slot } from "@radix-ui/react-slot";
import { useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
	type ComponentPropsWithoutRef,
	createContext,
	type ReactNode,
	useCallback,
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
	closeMenu: () => void;
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
type MobileMenuRootProps = {
	children: ReactNode;
	tileSize?: number;
};

function MobileMenuRoot({ children, tileSize = 40 }: MobileMenuRootProps) {
	const [open, setOpen] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [tilesComplete, setTilesComplete] = useState(false);
	const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });
	const actionsRef = useRef(
		null
	) as unknown as React.RefObject<Dialog.Root.Actions>;
	const router = useRouter();
	const closeMenu = useCallback(() => {
		setIsAnimating(false);
		setOpen(false);
	}, []);

	// Calculate dimensions on client-side only
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const calculateDimensions = () => {
			const calculatedCols = Math.ceil(window.innerWidth / tileSize);
			const calculatedRows = Math.ceil(window.innerHeight / tileSize);
			setDimensions({ cols: calculatedCols, rows: calculatedRows });
		};

		calculateDimensions();
		window.addEventListener("resize", calculateDimensions);
		return () => window.removeEventListener("resize", calculateDimensions);
	}, [tileSize]);

	// Close menu when route changes
	useEffect(() => {
		const unsubscribe = router.subscribe("onBeforeLoad", () => {
			if (open) {
				closeMenu();
			}
		});

		return unsubscribe;
	}, [router, open, closeMenu]);

	const handleOpenChange = (newOpen: boolean) => {
		if (newOpen) {
			// Opening: reset animation state and show dialog
			setOpen(true);
			setIsAnimating(true);
			setTilesComplete(false);
		} else {
			// Start closing animations while keeping portal mounted
			closeMenu();
		}
	};

	return (
		<MobileMenuContext.Provider
			value={{
				open,
				setOpen,
				closeMenu,
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
			>
				{children}
			</Dialog.Root>
		</MobileMenuContext.Provider>
	);
}

// Trigger Component
type MobileMenuTriggerProps = ComponentPropsWithoutRef<"button"> & {
	asChild?: boolean;
};

function MobileMenuTrigger({
	asChild = false,
	children,
	...props
}: MobileMenuTriggerProps) {
	const Comp = asChild ? Slot : "button";

	return (
		<Dialog.Trigger render={<Comp {...props} />}>{children}</Dialog.Trigger>
	);
}

// Content Component
type MobileMenuContentProps = {
	children: ReactNode;
	tileSize?: number;
	className?: string;
};

function MobileMenuContent({
	children,
	className,
	tileSize = 40,
}: MobileMenuContentProps) {
	const {
		isAnimating,
		tilesComplete,
		dimensions,
		setTilesComplete,
		actionsRef,
		open,
	} = useMobileMenuContext();

	const handleAnimationComplete = () => {
		// Called when exit animations complete
		if (!open) {
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
			<Dialog.Popup className={cn("fixed inset-0 z-60", className)}>
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
				<div className="relative z-10 flex h-full flex-col">
					<AnimatePresence>
						{isAnimating && (
							<motion.div
								animate={{ opacity: tilesComplete ? 1 : 0 }}
								className="flex h-full flex-col"
								exit={{ opacity: 0 }}
								initial={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								{children}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</Dialog.Popup>
		</Dialog.Portal>
	);
}

// Close Component (optional utility)
type MobileMenuCloseProps = ComponentPropsWithoutRef<"button"> & {
	asChild?: boolean;
};

function MobileMenuClose({
	asChild = false,
	onClick,
	children,
	...props
}: MobileMenuCloseProps) {
	const { closeMenu } = useMobileMenuContext();
	const Comp = asChild ? Slot : "button";

	const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
		closeMenu();
		onClick?.(event);
	};

	return (
		<Dialog.Close render={<Comp onClick={handleClose} {...props} />}>
			{children}
		</Dialog.Close>
	);
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
	const { closeMenu } = useMobileMenuContext();
	const Comp = asChild ? Slot : "a";

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		closeMenu();
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
