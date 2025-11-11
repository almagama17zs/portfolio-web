// -------------------- BINARY BACKGROUND --------------------
class BinaryBackground {
  constructor(canvasId, speed = 1.1) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return console.warn(`Canvas ${canvasId} no encontrado`);
    this.ctx = this.canvas.getContext("2d");
    this.speed = speed;
    this.columns = [];
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.running = true;
    requestAnimationFrame(() => this.update());
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    // mantener el tamaño CSS del canvas (no forzamos altura fija)
    const w = Math.max(1, Math.floor(this.canvas.offsetWidth * dpr));
    const h = Math.max(1, Math.floor(this.canvas.offsetHeight * dpr));
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.style.width = `${this.canvas.offsetWidth}px`;
    this.canvas.style.height = `${this.canvas.offsetHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.max(2, Math.floor(this.canvas.offsetWidth / 18));
    this.columns = new Array(cols).fill(0).map(() => Math.random() * this.canvas.offsetHeight);
  }

  update() {
    if (!this.running) return;
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

    ctx.fillStyle = "#00ff99";
    ctx.font = "16px monospace";

    this.columns.forEach((y, i) => {
      const char = Math.random() > 0.5 ? "0" : "1";
      ctx.fillText(char, i * 18, y);
      this.columns[i] += this.speed + Math.random() * 1.2;
      if (this.columns[i] > this.canvas.offsetHeight) this.columns[i] = 0;
    });

    requestAnimationFrame(() => this.update());
  }
}

// iniciar canvases (si existen)
new BinaryBackground("binary-header", 1.1);
new BinaryBackground("binary-footer", 1.1);

// -------------------- TYPEWRITER --------------------
function typeWriterElement(el, delay = 28) {
  const original = el.dataset.original || el.innerText;
  el.dataset.original = original;
  el.innerText = '';
  let i = 0;
  function step() {
    if (i < original.length) {
      el.innerText += original.charAt(i);
      i++;
      setTimeout(step, delay);
    }
  }
  step();
}

// -------------------- SUBBLOQUES --------------------
document.addEventListener("DOMContentLoaded", () => {
  const subblocks = document.querySelectorAll('.subblock');

  // Preparar dataset.original para los <p> typewriter (si no tienen)
  document.querySelectorAll('.typewriter p').forEach(p => {
    if (!p.dataset.original) p.dataset.original = p.innerText.trim();
    // no borramos aquí; lo haremos solo al abrir el subbloque
  });

  // marcar las listas sobre-mi y contacto para animación inicial
  document.querySelectorAll('.sobre-mi-list li').forEach((li, i) => {
    li.style.opacity = 0;
    li.style.transform = 'translateY(10px)';
    setTimeout(() => {
      li.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      li.style.opacity = 1;
      li.style.transform = 'translateY(0)';
    }, 120 * (i + 1));
  });

  document.querySelectorAll('.contacto-list.horizontal li').forEach((li, i) => {
    li.style.opacity = 0;
    li.style.transform = 'translateY(10px)';
    setTimeout(() => {
      li.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      li.style.opacity = 1;
      li.style.transform = 'translateY(0)';
    }, 120 * (i + 1));
  });

  subblocks.forEach((sb) => {
    const header = sb.querySelector('.subblock-header');
    const content = sb.querySelector('.subblock-content');
    const list = sb.querySelector('.subblock-list');

    // asegurarse de que content tenga transición de altura
    if (content) {
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.6s ease, opacity 0.45s ease, padding 0.3s ease';
    }

    header && header.addEventListener('click', () => {
      // cerrar otros
      subblocks.forEach(other => {
        if (other !== sb) {
          other.classList.remove('active');
          const otherContent = other.querySelector('.subblock-content');
          const otherList = other.querySelector('.subblock-list');
          if (otherContent) {
            otherContent.style.maxHeight = '0';
            otherContent.style.opacity = '0';
            otherContent.style.padding = '0 20px';
          }
          if (otherList) otherList.classList.remove('visible');
          // restaurar typewriter text
          other.querySelectorAll('.typewriter p').forEach(p => {
            p.innerText = p.dataset.original || p.innerText;
          });
        }
      });

      // toggle actual
      const open = sb.classList.toggle('active');

      if (open) {
        // expandir contenido (usar scrollHeight)
        if (content) {
          // forzar recalculo antes de setear para animación limpia
          content.style.opacity = '0';
          content.style.maxHeight = '0';
          content.style.padding = '0 20px';
          requestAnimationFrame(() => {
            const h = content.scrollHeight;
            content.style.maxHeight = h + 'px';
            content.style.opacity = '1';
            content.style.padding = '15px 20px';
          });
        }

        // mostrar lista (añadir clase visible -> CSS hace que li sean visibles)
        if (list) {
          // añadimos la clase con un micro-delay para que el contenido se haya expandido
          setTimeout(() => {
            list.classList.add('visible');
            // si prefieres animación por item en JS, se puede añadir aquí
            list.querySelectorAll('li').forEach((li, i) => {
              li.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
              li.style.opacity = 0;
              li.style.transform = 'translateY(10px)';
              setTimeout(() => {
                li.style.opacity = 1;
                li.style.transform = 'translateY(0)';
              }, 120 * i + 120);
            });
          }, 120);
        }

        // lanzar typewriter en los <p> que haya dentro
        sb.querySelectorAll('.typewriter p').forEach((p, idx) => {
          p.innerText = '';
          setTimeout(() => typeWriterElement(p, 28), 120 + idx * 200);
        });

      } else {
        // colapsar contenido
        if (content) {
          content.style.maxHeight = '0';
          content.style.opacity = '0';
          content.style.padding = '0 20px';
        }
        if (list) list.classList.remove('visible');
        // restaurar textos de typewriter
        sb.querySelectorAll('.typewriter p').forEach(p => {
          p.innerText = p.dataset.original || p.innerText;
        });
      }
    });
  });
});
