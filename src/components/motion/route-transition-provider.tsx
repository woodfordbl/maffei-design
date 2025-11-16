import { useRouter } from "@tanstack/react-router";
import {
	createContext,
	type MouseEvent,
	type ReactNode,
	type RefCallback,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

type ViewTransitionLike = {
	finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
	startViewTransition?: (
		callback: () => void | Promise<void>
	) => ViewTransitionLike;
};

type StartNavigationTransitionOptions = {
	transitionId?: string | null;
	navigate: () => Promise<void> | void;
};

type RouteTransitionContextValue = {
	activeTransitionId: string | null;
	isTransitioning: boolean;
	startNavigationTransition: (options: StartNavigationTransitionOptions) => void;
	registerImageReady: (imageId: string) => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(
	null
);

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
	const [activeTransitionId, setActiveTransitionId] = useState<string | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const registerImageReady = useCallback(
		(imageId: string) => {
			if (!activeTransitionId || imageId !== activeTransitionId) {
				return;
			}

			setActiveTransitionId(null);
			setIsTransitioning(false);
		},
		[activeTransitionId]
	);

	const startNavigationTransition = useCallback(
		({ transitionId = null, navigate }: StartNavigationTransitionOptions) => {
			setActiveTransitionId(transitionId);
			setIsTransitioning(Boolean(transitionId));

			const runNavigation = async () => {
				await Promise.resolve(navigate());
				if (!transitionId) {
					setIsTransitioning(false);
					setActiveTransitionId(null);
				}
			};

			if (typeof document !== "undefined") {
				const doc = document as DocumentWithViewTransition;
				if (doc.startViewTransition) {
					const transition = doc.startViewTransition(() => runNavigation());
					if (!transitionId) {
						void transition.finished.finally(() => {
							setIsTransitioning(false);
							setActiveTransitionId(null);
						});
					}
					return;
				}
			}

			void runNavigation();
		},
		[]
	);

	useEffect(() => {
		if (!activeTransitionId || typeof window === "undefined") {
			return;
		}

		const timeout = window.setTimeout(() => {
			setActiveTransitionId(null);
			setIsTransitioning(false);
		}, 1500);

		return () => window.clearTimeout(timeout);
	}, [activeTransitionId]);

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		const html = document.documentElement;
		const previousOverflow = html.style.overflow;

		if (isTransitioning) {
			html.style.overflow = "hidden";
			return () => {
				html.style.overflow = previousOverflow;
			};
		}

		return () => {
			html.style.overflow = previousOverflow;
		};
	}, [isTransitioning]);

	const contextValue = useMemo<RouteTransitionContextValue>(
		() => ({
			activeTransitionId,
			isTransitioning,
			startNavigationTransition,
			registerImageReady,
		}),
		[activeTransitionId, isTransitioning, registerImageReady, startNavigationTransition]
	);

	return (
		<RouteTransitionContext.Provider value={contextValue}>
			{children}
		</RouteTransitionContext.Provider>
	);
}

function useRouteTransitionContext() {
	const context = useContext(RouteTransitionContext);
	if (!context) {
		throw new Error(
			"useRouteTransitionContext must be used within RouteTransitionProvider"
		);
	}

	return context;
}

function useOptionalRouteTransitionContext() {
	return useContext(RouteTransitionContext);
}

type RouterNavigateOptions = Parameters<
	ReturnType<typeof useRouter>["navigate"]
>[0];

type TransitionNavigateOptions = RouterNavigateOptions & {
	transitionId?: string | null;
};

export function useViewTransitionNavigate() {
	const router = useRouter();
	const context = useRouteTransitionContext();

	return useCallback(
		(options: TransitionNavigateOptions) => {
			const { transitionId = null, ...navigateOptions } = options;
			context.startNavigationTransition({
				transitionId,
				navigate: () => router.navigate(navigateOptions),
			});
		},
		[context, router]
	);
}

export function useTransitionNavigationHandler(
	options: TransitionNavigateOptions & {
		onClick?: (event: MouseEvent<HTMLElement>) => void;
	}
) {
	const navigateWithTransition = useViewTransitionNavigate();

	return useCallback(
		(event: MouseEvent<HTMLElement>) => {
			options.onClick?.(event);
			if (
				event.defaultPrevented ||
				event.metaKey ||
				event.altKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.button !== 0
			) {
				return;
			}

			event.preventDefault();
			navigateWithTransition(options);
		},
		[navigateWithTransition, options]
	);
}

export function useTransitionImageReady(imageId?: string | null) {
	const context = useOptionalRouteTransitionContext();
	const hasSignaledRef = useRef(false);

	const signalReady = useCallback(() => {
		if (!context || !imageId || hasSignaledRef.current) {
			return;
		}

		hasSignaledRef.current = true;
		context.registerImageReady(imageId);
	}, [context, imageId]);

	const notifyAfterPaint = useCallback(() => {
		if (!context || !imageId || hasSignaledRef.current) {
			return;
		}

		requestAnimationFrame(() => {
			if (!hasSignaledRef.current) {
				signalReady();
			}
		});
	}, [context, imageId, signalReady]);

	const handleRef = useCallback<RefCallback<HTMLImageElement>>(
		(node) => {
			if (!node || hasSignaledRef.current || !imageId) {
				return;
			}

			if (node.complete) {
				void (async () => {
					try {
						await node.decode?.();
					} catch {
						// Ignore decode failures; we'll still attempt to finish.
					}
					notifyAfterPaint();
				})();
			}
		},
		[imageId, notifyAfterPaint]
	);

	return {
		onLoad: notifyAfterPaint,
		ref: handleRef,
	};
}

