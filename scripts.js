// -------------------- BINARY BACKGROUND --------------------
class BinaryBackground {
  constructor(canvasId, speed = 1.1) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
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
    const w = Math.max(1, Math.floor(this.canvas.offsetWidth * dpr));
    const h = Math.max(1, Math.floor(this.canvas.offsetHeight * dpr));
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.style.width = this.canvas.offsetWidth + 'px';
    this.canvas.style.height = this.canvas.offsetHeight + 'px';
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

new BinaryBackground("binary-header", 1.1);
new BinaryBackground("binary-footer", 1.1);

// -------------------- SUBBLOQUES Y TYPEWRITER --------------------
document.addEventListener("DOMContentLoaded", () => {
  const subblocks = document.querySelectorAll('.subblock');

  // Inicializamos las listas visibles al cargar
  document.querySelectorAll('.sobre-mi-list, .contacto-list').forEach(list => list.classList.add('visible'));

  subblocks.forEach(sb => {
    const header = sb.querySelector('.subblock-header');
    const content = sb.querySelector('.subblock-content');
    const list = sb.querySelector('.subblock-list');
    const paragraphs = sb.querySelectorAll('.typewriter p');

    // Guardar el texto original en data-original
    paragraphs.forEach(p => {
      if (!p.dataset.original) p.dataset.original = p.innerText;
      p.innerText = '';
    });

    header.addEventListener('click', () => {
      // Cerrar otros subbloques
      subblocks.forEach(other => {
        if (other !== sb) {
          other.classList.remove('active');
          const oc = other.querySelector('.subblock-content');
          const ol = other.querySelector('.subblock-list');
          if (oc) { oc.style.maxHeight = '0'; oc.style.opacity = '0'; oc.style.padding = '0 20px'; }
          if (ol) ol.classList.remove('visible');
          other.querySelectorAll('.typewriter p').forEach(p => p.innerText = p.dataset.original);
        }
      });

      // Toggle actual
      const isOpen = sb.classList.toggle('active');

      if (isOpen) {
        // Rellenar los <p> antes de medir scrollHeight
        paragraphs.forEach(p => p.innerText = p.dataset.original);

        if (content) {
          content.style.maxHeight = '0';
          content.style.opacity = '0';
          content.style.padding = '0 20px';
          requestAnimationFrame(() => {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            content.style.padding = '15px 20px';
          });
        }

        if (list) {
          setTimeout(() => {
            list.classList.add('visible');
            list.querySelectorAll('li').forEach((li, i) => {
              li.style.opacity = 0;
              li.style.transform = 'translateY(10px)';
              setTimeout(() => { li.style.opacity = 1; li.style.transform = 'translateY(0)'; }, 120 * i);
            });
          }, 150);
        }

        // Ejecutar animación typewriter
        paragraphs.forEach((p, idx) => {
          p.innerText = '';
          setTimeout(() => {
            let text = p.dataset.original;
            let i = 0;
            function step() {
              if (i < text.length) {
                p.innerText += text.charAt(i);
                i++;
                setTimeout(step, 28);
              }
            }
            step();
          }, 300 + idx * 200);
        });

      } else {
        // cerrar actual
        if (content) { content.style.maxHeight = '0'; content.style.opacity = '0'; content.style.padding = '0 20px'; }
        if (list) list.classList.remove('visible');
        paragraphs.forEach(p => p.innerText = p.dataset.original);
      }
    });
  });
});
