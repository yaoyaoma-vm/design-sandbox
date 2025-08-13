import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Stagger animation for text characters
export const staggerText = (selector: string, delay: number = 0.1) => {
  const chars = document.querySelectorAll(selector);
  
  gsap.fromTo(chars, 
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: delay,
      ease: "back.out(1.7)",
    }
  );
};

// Scroll-triggered animation for cards
export const animateCardsOnScroll = (selector: string) => {
  gsap.fromTo(selector,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Hero section entrance animation
export const animateHero = () => {
  const tl = gsap.timeline();
  
  tl.fromTo('.hero-content',
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }
  )
  .fromTo('.hero-cta',
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    },
    "-=0.3"
  );
};

// Infinite marquee animation
export const createMarquee = (selector: string, direction: 'left' | 'right' = 'left') => {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const content = element.innerHTML;
  element.innerHTML = content + content; // Duplicate content
  
  gsap.to(selector, {
    x: direction === 'left' ? '-50%' : '50%',
    duration: 20,
    repeat: -1,
    ease: "none",
  });
};

// Project card hover animation
export const animateProjectCard = (selector: string) => {
  const cards = document.querySelectorAll(selector);
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
};
