// --- TYPEWRITER EFFECT ---
function typeWriter(element, delay = 50) {
  const text = element.innerText;
  element.innerText = '';
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      i++;
      setTimeout(typing, delay);
    }
  }
  typing();
}

// Aplicar efecto a todos los <p> dentro de typewriter
document.querySelectorAll('.typewriter p').forEach(p => {
  typeWriter(p);
});

// --- SUBBLOCK TOGGLE ---
document.querySelectorAll('.subblock-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';

      // reiniciar efectos fade y typewriter al abrir
      content.querySelectorAll('.fade li').forEach((li, index) => {
        li.style.opacity = 0;
        li.style.transform = 'translateY(10px)';
        li.style.animation = `fadeInUp 0.5s forwards ${0.2 + index*0.2}s`;
      });

      content.querySelectorAll('.typewriter p').forEach(p => {
        typeWriter(p);
      });
    }
  });
});
