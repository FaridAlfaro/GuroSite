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
        fill: ['none', '#fff'],
        easing: 'easeInOutQuad',
        duration: 1000,
        delay: anime.stagger(100)
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  runAnimation();
});





