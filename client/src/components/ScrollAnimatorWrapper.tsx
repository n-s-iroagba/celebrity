// ScrollAnimationWrapper.tsx
import { useEffect, useRef, ReactNode } from 'react';
import '../pages/fan/Home.css';

export const ScrollAnimationWrapper = ({ children }: { children: ReactNode }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current; // capture ref value
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px', // Trigger animation just as element enters view
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []); // no dependencies—el is captured

  return (
    <div ref={elementRef} className="animated-vertical-section">
      {children}
    </div>
  );
};
