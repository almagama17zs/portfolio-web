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
