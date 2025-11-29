import React, { useEffect, useRef } from 'react';

export default function CardCarousel({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.children.length;
    if (items <= 3) {
      container.classList.add('lg:grid', 'lg:grid-cols-3', 'lg:overflow-visible', 'cursor-default', "lg:place-items-center");
    }

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    function onMouseDown(e) {
      isDown = true;
      container.classList.add('cursor-grabbing');
      e.preventDefault();
      startX = e.pageX - container.getBoundingClientRect().left + container.scrollLeft;
      scrollLeft = container.scrollLeft;
    }

    function onMouseLeave() {
      isDown = false;
      container.classList.remove('cursor-grabbing');
    }

    function onMouseUp() {
      isDown = false;
      container.classList.remove('cursor-grabbing');
    }

    function onMouseMove(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.getBoundingClientRect().left + container.scrollLeft;
      const walk = (x - startX) * 1;
      container.scrollLeft = scrollLeft - walk;
    }

    let touchStartX = 0;
    let touchScrollLeft = 0;

    function onTouchStart(e) {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = container.scrollLeft;
    }

    function onTouchMove(e) {
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1;
      container.scrollLeft = touchScrollLeft - walk;
    }

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
    };
  }, [children]);

  return (
    <section className="overflow-visible">
      <div
        ref={containerRef}
        className="carousel-scroll flex gap-6 snap-x snap-mandatory scroll-smooth overflow-x-auto px-1 py-4 cursor-grab"
      >
        {children}
      </div>

      <style>{`
        .carousel-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .carousel-scroll::-webkit-scrollbar {
          display: none;
        }
        .carousel-scroll img {
          -webkit-user-drag: none;
          user-drag: none;
          -moz-user-select: none;
        }
        .cursor-grab { cursor: grab; }
        .cursor-grabbing { cursor: grabbing; }
      `}</style>
    </section>
  );
}