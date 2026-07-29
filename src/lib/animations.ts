import { gsap } from 'gsap';

export const fadeIn = (element: HTMLElement | null, duration = 0.5) => {
  if (!element) return;
  gsap.fromTo(element, 
    { opacity: 0 },
    { opacity: 1, duration, ease: 'power2.out' }
  );
};

export const slideUp = (element: HTMLElement | null, duration = 0.5, delay = 0) => {
  if (!element) return;
  gsap.fromTo(element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
};

export const slideIn = (element: HTMLElement | null, direction = 'left', duration = 0.5) => {
  if (!element) return;
  const x = direction === 'left' ? -30 : 30;
  gsap.fromTo(element,
    { opacity: 0, x },
    { opacity: 1, x: 0, duration, ease: 'power2.out' }
  );
};

export const scaleIn = (element: HTMLElement | null, duration = 0.5) => {
  if (!element) return;
  gsap.fromTo(element,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration, ease: 'back.out(1.7)' }
  );
};

export const staggerChildren = (parent: HTMLElement | null, selector: string, duration = 0.5) => {
  if (!parent) return;
  gsap.fromTo(
    parent.querySelectorAll(selector),
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0, 
      duration, 
      stagger: 0.1, 
      ease: 'power2.out' 
    }
  );
};
