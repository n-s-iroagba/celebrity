// ScrollAnimationWrapper.tsx
import { useEffect, useRef, ReactNode } from 'react';
import '../pages/fan/Home.css'

export const ScrollAnimationWrapper = ({ children }: { children: ReactNode }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        rootMargin: '0px 0px' // Trigger animation 100px before element enters view
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} className="animated-vertical-section">
      {children}
    </div>
  );
};