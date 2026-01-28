import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Automatically scrolls the window to the top whenever the route changes.
 * This ensures users always start at the top of a new page when navigating.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top smoothly on route change
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Use 'instant' for immediate scroll, 'smooth' for animated
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
