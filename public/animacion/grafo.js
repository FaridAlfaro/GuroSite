import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';

const rootNode = document.querySelector('#rootNode');

// Añadimos el nuevo nodo y línea
const childNodes = [
  '#nodeTop', 
  '#nodeLeft', 
  '#nodeBottom', 
  '#nodeRight',
  '#nodeTopLeft' // 🆕 nuevo nodo
];

const lines = [
  '#lineToLeft',
  '#lineToTop',
  '#lineToBottom',
  '#lineToRight',
  '#lineToTopLeft' // 🆕 nueva línea
];

let animationTriggered = false;

// Prepara las líneas para la animación
function prepareLines() {
  lines.forEach(id => {
    const line = document.querySelector(id);
    const length = line.getTotalLength();
    line.setAttribute('stroke-dasharray', length);
    line.setAttribute('stroke-dashoffset', length);
    line.style.opacity = 0;
  });
}

function animateGraph() {
  // Paso 1: Animar nodo raíz
  anime({
    targets: rootNode,
    opacity: [0, 1],
    duration: 700,
    easing: 'easeOutQuad',
    complete: () => {
      // Paso 2: Nodos hijos
      anime({
        targets: childNodes.map(sel => document.querySelector(sel)),
        opacity: [0, 1],
        delay: anime.stagger(250),
        duration: 400,
        easing: 'easeOutQuad',
        complete: () => {
          // Paso 3: Líneas conectores
          lines.forEach((lineId, i) => {
            const line = document.querySelector(lineId);
            const length = line.getTotalLength();

            anime({
              targets: line,
              strokeDashoffset: [length, 0],
              opacity: [0, 1],
              duration: 800,
              delay: i * 100,
              easing: 'easeInOutSine',
            });
          });
        }
      });
    }
  });
}

// Configuración inicial
prepareLines();

// Trigger de animación al hacer scroll 100vh
window.addEventListener('scroll', () => {
  if (!animationTriggered && window.scrollY >= window.innerHeight) {
    animationTriggered = true;
    animateGraph();
  }
});
<!-- <div id="svg-container">
        <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <circle id="nodeTop" cx="150" cy="-20" r="3" fill="#2d21de" />
            <circle id="nodeLeft" cx="30" cy="75" r="3" fill="#2d21de" />
            <circle id="nodeBottom" cx="70" cy="140" r="3" fill="#2d21de" />
            <circle id="nodeRight" cx="150" cy="145" r="3" fill="#2d21de" />
          
            <circle id="nodeTopLeft" cx="110" cy="40" r="3" fill="#2d21de" />
          
            <circle id="rootNode" cx="170" cy="75" r="4" fill="#2d21de" />
          
            <line id="lineToTop" x1="170" y1="75" x2="150" y2="-20" stroke="#2d21de" stroke-width="0.6"/>
            <line id="lineToLeft" x1="170" y1="75" x2="30" y2="75" stroke="#2d21de" stroke-width="0.6"/>
            <line id="lineToBottom" x1="170" y1="75" x2="70" y2="140" stroke="#2d21de" stroke-width="0.6"/>
            <line id="lineToRight" x1="170" y1="75" x2="150" y2="145" stroke="#2d21de" stroke-width="0.6"/>
            <line id="lineToTopLeft" x1="170" y1="75" x2="110" y2="40" stroke="#2d21de" stroke-width="0.6"/>
        </svg>
          
          
    </div> -->