function typeWriter(element, speed = 50, callback) {
  const text = element.textContent;
  element.textContent = '';
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  }
  typing();
}

document.addEventListener('DOMContentLoaded', () => {
  // Sobre Mi
  const sobreMiItems = document.querySelectorAll('.sobre-mi-list li');
  let index = 0;
  function typeNext() {
    if (index < sobreMiItems.length) {
      typeWriter(sobreMiItems[index], 30, () => { index++; typeNext(); });
    }
  }
  typeNext();

  // Subbloques
  const subblocks = document.querySelectorAll('.subblock');
  subblocks.forEach(sb => {
    sb.querySelector('.subblock-header').addEventListener('click', () => {
      const content = sb.querySelector('.subblock-content');
      content.classList.toggle('show');
      const descItems = content.querySelectorAll('.typewriter li');
      descItems.forEach(item => item.textContent = item.textContent); // reset
      let idx = 0;
      function typeSub() {
        if (idx < descItems.length) {
          typeWriter(descItems[idx], 20, () => { idx++; typeSub(); });
        }
      }
      typeSub();
      // fade in li
      const liFade = content.querySelectorAll('.fade li');
      liFade.forEach((li, i) => li.style.animationDelay = `${i*0.1}s`);
    });
  });

  // Contacto
  const contactoItems = document.querySelectorAll('.contacto-list li');
  let cIndex = 0;
  function typeContacto() {
    if (cIndex < contactoItems.length) {
      typeWriter(contactoItems[cIndex], 30, () => { cIndex++; typeContacto(); });
    }
  }
  typeContacto();
});
