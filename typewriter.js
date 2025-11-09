function typeWriter(el, delay = 40) {
  const text = el.innerHTML;
  el.innerHTML = '';
  let i = 0;
  function write() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(write, delay);
    }
  }
  write();
}

function applyTypewriter(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    let children = Array.from(el.children);
    let index = 0;
    function typeNext() {
      if (index < children.length) {
        typeWriter(children[index], 40);
        index++;
        setTimeout(typeNext, children[index-1].textContent.length * 40 + 300);
      }
    }
    typeNext();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTypewriter('.sobre-mi-list');
  applyTypewriter('.subblock-desc');
  applyTypewriter('.contacto-list');
  
  // Fade-in para subblocks
  const fadeElements = document.querySelectorAll('.subblock-list li');
  fadeElements.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transition = 'opacity 0.6s';
    }, i * 100);
  });
});
