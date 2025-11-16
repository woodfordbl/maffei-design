import { useEffect, useState } from "react";

const USER_AGENT_MOBILE_REGEX =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/**
 * Hook to detect if the current device is a mobile device.
 * Uses a combination of screen width and touch capability detection.
 *
 * @returns {boolean} true if the device is mobile, false otherwise
 */
export function useMobile(): boolean {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			// Check if the device has touch capability and small screen
			const hasTouchScreen =
				"ontouchstart" in window ||
				navigator.maxTouchPoints > 0 ||
				// @ts-expect-error - msMaxTouchPoints is not in standard types
				navigator.msMaxTouchPoints > 0;

			// Check screen width (typical mobile breakpoint)
			const hasSmallScreen = window.innerWidth < 768;

			// Consider it mobile if it has both touch and small screen
			// or if user agent suggests mobile
			const userAgentMobile = USER_AGENT_MOBILE_REGEX.test(navigator.userAgent);

			setIsMobile((hasTouchScreen && hasSmallScreen) || userAgentMobile);
		};

		// Check on mount
		checkMobile();

		// Check on resize
		window.addEventListener("resize", checkMobile);

		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	return isMobile;
}
