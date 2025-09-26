import { useEffect, useState } from "react";

/**
 * Hook to determine if autofocus should be enabled based on device type and viewport
 * Disables autofocus on mobile/touch devices to prevent unwanted keyboard popup
 */
export const useDesktopFocus = () => {
  const [shouldAutoFocus, setShouldAutoFocus] = useState(false);

  useEffect(() => {
    // Check if device supports touch (mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check viewport width (mobile breakpoint)
    const isMobileViewport = window.innerWidth < 768;
    
    // Check for specific mobile user agents as fallback
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Enable autofocus only on desktop (non-touch, larger viewports)
    const isDesktop = !isTouchDevice && !isMobileViewport && !isMobileUserAgent;
    
    setShouldAutoFocus(isDesktop);
  }, []);

  return shouldAutoFocus;
};