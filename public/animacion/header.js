import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';

function runAnimation() {
  document.querySelectorAll('.line').forEach(el => {
    el.setAttribute('fill', 'none');
  });

  anime({
    targets: '.line',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutQuad',
    duration: 2000,
    delay: anime.stagger(100),
    loop: false,
    complete: () => {
      anime({
        targets: '.line',
        fill: ['none', '#2d21de'],
        easing: 'easeInOutQuad',
        duration: 1000,
        delay: anime.stagger(100)
      });

      setTimeout(runAnimation, 10000);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  runAnimation();
});

const scrollElement = document.scrollingElement || document.documentElement || document.body;

const logoContainer = document.querySelector('.logo-container');
const callToAction = document.querySelector('.call-to-action');

const sections = [logoContainer, callToAction];
let currentIndex = 0;
let isAnimating = false;
const duration = 1000;

const isSectionInViewport = (section) => {
  const rect = section.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
};

const scrollToSection = (index) => {
  if (index < 0 || index >= sections.length || isAnimating) return;

  const targetOffset = sections[index].offsetTop;
  isAnimating = true;

  anime({
    targets: scrollElement,
    scrollTop: targetOffset,
    duration,
    easing: 'easeInOutQuad',
    complete: () => {
      currentIndex = index;
      isAnimating = false;
    }
  });
};

const handleWheel = (e) => {
  if (isAnimating || !isSectionInViewport(sections[currentIndex])) return;

  const delta = e.deltaY;

  if (delta > 0 && currentIndex < sections.length - 1) {
    e.preventDefault();
    scrollToSection(currentIndex + 1);
  } else if (delta < 0 && currentIndex > 0) {
    e.preventDefault();
    scrollToSection(currentIndex - 1);
  }
};

const handleKeyDown = (e) => {
  if (isAnimating || !isSectionInViewport(sections[currentIndex])) return;

  if ([40, 32].includes(e.keyCode) && currentIndex < sections.length - 1) {
    e.preventDefault();
    scrollToSection(currentIndex + 1);
  } else if (e.keyCode === 38 && currentIndex > 0) {
    e.preventDefault();
    scrollToSection(currentIndex - 1);
  }
};

let touchStartY = null;

const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchMove = (e) => {
  if (touchStartY === null || isAnimating || !isSectionInViewport(sections[currentIndex])) return;

  const currentY = e.touches[0].clientY;
  const diff = touchStartY - currentY;

  if (diff > 50 && currentIndex < sections.length - 1) {
    scrollToSection(currentIndex + 1);
    touchStartY = null;
  } else if (diff < -50 && currentIndex > 0) {
    scrollToSection(currentIndex - 1);
    touchStartY = null;
  }
};

window.addEventListener('wheel', handleWheel, { passive: false });
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('touchstart', handleTouchStart, { passive: true });
window.addEventListener('touchmove', handleTouchMove, { passive: true });
