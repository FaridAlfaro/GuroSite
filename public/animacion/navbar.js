import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';

const burger = document.getElementById('burger');
const burgerIcon = document.getElementById('burgerIcon');
const closeIcon = document.getElementById('closeIcon');
const menuContent = document.getElementById('menuContent');
const slideBlue = document.getElementById('slide-blue');
const slideBlack = document.getElementById('slide-black');
const slideWhite = document.getElementById('slide-white');
const navbar = document.querySelector('.navbar');


let isOpen = false;
let lastScrollTop = 0; // Posición de scroll anterior

// Detecta el scroll y muestra/oculta el navbar
navbar.classList.remove('visible-navbar');
navbar.classList.remove('hidden');


window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop <= 0) {
    // Al inicio de la página
    navbar.classList.remove('visible-navbar');
    navbar.classList.remove('hidden');
  } else if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo
    navbar.classList.add('hidden');
    navbar.classList.remove('visible-navbar');
  } else {
    // Scroll hacia arriba
    navbar.classList.remove('hidden');
    navbar.classList.add('visible-navbar');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

burger.addEventListener('click', () => {
  if (!isOpen) {
    isOpen = true;

    // Fade hamburguesa out, equis in
    burgerIcon.classList.remove('show');
    burgerIcon.classList.add('hide');
    closeIcon.classList.remove('hide');
    closeIcon.classList.add('show');

    // Animación de los slides
    anime({
      targets: slideBlue,
      top: 0,
      duration: 150,
      easing: 'easeInOutQuad',
      complete: () => {
        anime({
          targets: slideBlack,
          top: 0,
          duration: 150,
          easing: 'easeInOutQuad',
          complete: () => {
            anime({
              targets: slideWhite,
              top: 0,
              duration: 150,
              easing: 'easeInOutQuad',
              complete: () => {
                menuContent.classList.add('show');
              }
            });
          }
        });
      }
    });
  } else {
    isOpen = false;
    menuContent.classList.remove('show');

    // Animación de los slides hacia arriba
    anime({
      targets: slideWhite,
      top: '-100%',
      duration: 150,
      easing: 'easeInOutQuad',
      complete: () => {
        anime({
          targets: slideBlack,
          top: '-100%',
          duration: 150,
          easing: 'easeInOutQuad',
          complete: () => {
            anime({
              targets: slideBlue,
              top: '-100%',
              duration: 150,
              easing: 'easeInOutQuad',
              complete: () => {
                // Fade equis out, hamburguesa in
                closeIcon.classList.remove('show');
                closeIcon.classList.add('hide');
                burgerIcon.classList.remove('hide');
                burgerIcon.classList.add('show');
              }
            });
          }
        });
      }
    });
  }
});
