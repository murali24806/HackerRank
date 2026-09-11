import * as React from "react";
import { cn } from "../../lib/utils";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export const Carousel = React.forwardRef(
  (
    {
      opts,
      setApi,
      orientation = "horizontal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef(null);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const listenersRef = React.useRef(new Set());

    const updateScrollState = React.useCallback(() => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const canPrev = scrollLeft > 10;
      const canNext = scrollLeft < scrollWidth - clientWidth - 10;
      setCanScrollPrev(canPrev);
      setCanScrollNext(canNext);
      listenersRef.current.forEach((cb) => cb());
    }, []);

    const scrollPrev = React.useCallback(() => {
      if (!containerRef.current) return;
      const cardWidth = containerRef.current.firstElementChild?.firstElementChild?.clientWidth || 340;
      containerRef.current.scrollBy({ left: -(cardWidth + 20), behavior: "smooth" });
    }, []);

    const scrollNext = React.useCallback(() => {
      if (!containerRef.current) return;
      const cardWidth = containerRef.current.firstElementChild?.firstElementChild?.clientWidth || 340;
      containerRef.current.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    }, []);

    // Create shadcn/embla compatible CarouselApi
    const api = React.useMemo(() => ({
      scrollPrev,
      scrollNext,
      canScrollPrev: () => canScrollPrev,
      canScrollNext: () => canScrollNext,
      selectedScrollSnap: () => selectedIndex,
      on: (event, callback) => {
        if (event === "select") {
          listenersRef.current.add(callback);
        }
      },
      off: (event, callback) => {
        if (event === "select") {
          listenersRef.current.delete(callback);
        }
      },
    }), [scrollPrev, scrollNext, canScrollPrev, canScrollNext, selectedIndex]);

    React.useEffect(() => {
      if (setApi) {
        setApi(api);
      }
    }, [setApi, api]);

    React.useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      updateScrollState();
      container.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
      return () => {
        container.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }, [updateScrollState]);

    return (
      <CarouselContext.Provider
        value={{
          containerRef,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          updateScrollState,
        }}
      >
        <div
          ref={ref}
          className={cn("carousel-root relative w-full", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { containerRef } = useCarousel();

    return (
      <div
        ref={containerRef}
        className={cn("carousel-viewport", className)}
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "16px",
          paddingTop: "6px",
        }}
        {...props}
      >
        <div
          className="carousel-track"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "stretch",
            gap: "24px",
            width: "max-content",
            minWidth: "100%",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("carousel-item", className)}
        style={{
          flex: "0 0 auto",
          flexShrink: 0,
          display: "block",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CarouselItem.displayName = "CarouselItem";

export default Carousel;
