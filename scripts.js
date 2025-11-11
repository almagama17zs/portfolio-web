document.addEventListener("DOMContentLoaded", () => {
  const subblocks = document.querySelectorAll('.subblock');

  // mostrar listas de sobre-mi y contacto al cargar
  document.querySelectorAll('.sobre-mi-list, .contacto-list').forEach(list => list.classList.add('visible'));

  subblocks.forEach(sb => {
    const header = sb.querySelector('.subblock-header');
    const content = sb.querySelector('.subblock-content');
    const list = sb.querySelector('.subblock-list');

    header.addEventListener('click', () => {
      // cerrar otros subbloques
      subblocks.forEach(other => {
        if(other !== sb){
          other.classList.remove('active');
          const oc = other.querySelector('.subblock-content');
          const ol = other.querySelector('.subblock-list');
          if(oc) { oc.style.maxHeight = '0'; oc.style.opacity='0'; oc.style.padding='0 20px'; }
          if(ol) ol.classList.remove('visible');
          other.querySelectorAll('.typewriter p').forEach(p => p.innerText = p.dataset.original || p.innerText);
        }
      });

      // toggle actual
      const isOpen = sb.classList.toggle('active');

      if(isOpen){
        // abrir subbloque
        if(content){
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
          content.style.padding = '15px 20px';
        }

        if(list){
          list.classList.add('visible');
          list.querySelectorAll('li').forEach((li, i) => {
            li.style.opacity = 0;
            li.style.transform = 'translateY(10px)';
            setTimeout(() => { li.style.opacity = 1; li.style.transform = 'translateY(0)'; }, 120*i + 120);
          });
        }

        // typewriter: solo después de abrir el subbloque
        sb.querySelectorAll('.typewriter p').forEach((p, idx) => {
          p.innerText = '';
          setTimeout(() => typeWriterElement(p, 28), 200 + idx*200);
        });

      } else {
        // cerrar subbloque
        if(content){ content.style.maxHeight = '0'; content.style.opacity = '0'; content.style.padding = '0 20px'; }
        if(list) list.classList.remove('visible');
        sb.querySelectorAll('.typewriter p').forEach(p => p.innerText = p.dataset.original || p.innerText);
      }
    });
  });
});

// Typewriter function
function typeWriterElement(el, delay = 28){
  const original = el.dataset.original || el.innerText;
  el.dataset.original = original;
  el.innerText = '';
  let i = 0;
  function step(){
    if(i < original.length){
      el.innerText += original.charAt(i);
      i++;
      setTimeout(step, delay);
    }
  }
  step();
}
