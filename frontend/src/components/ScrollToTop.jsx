import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Cada vez que cambia la ruta (pathname), hace scroll al tope de la página.
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;
