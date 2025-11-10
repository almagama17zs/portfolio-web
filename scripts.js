// -------------------- BINARY BACKGROUND --------------------
class BinaryBackground {
  constructor(canvasId, speed = 2) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return console.warn(`Canvas ${canvasId} no encontrado`);
    this.ctx = this.canvas.getContext("2d");
    this.speed = speed;
    this.columns = [];
    this.resize();
    window.addEventListener("resize", () => this.resize());
    requestAnimationFrame(() => this.update());
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.floor(this.canvas.offsetWidth * dpr));
    this.canvas.height = Math.max(1, Math.floor(this.canvas.offsetHeight * dpr));
    this.canvas.style.width = `${this.canvas.offsetWidth}px`;
    this.canvas.style.height = `${this.canvas.offsetHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.floor(this.canvas.offsetWidth / 18);
    this.columns = [];
    for (let i = 0; i < cols; i++) {
      this.columns.push(Math.random() * this.canvas.offsetHeight);
    }
  }

  update() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.22)";
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
  // Guardar textos originales para typewriter
  document.querySelectorAll('.typewriter p').forEach(p => {
    p.dataset.original = p.innerText.trim();
    p.innerText = '';
  });

  // Animar sobre-mi
  document.querySelectorAll('.sobre-mi-list li').forEach((li, i) => {
    li.style.opacity = 0;
    li.style.transform = 'translateY(10px)';
    li.style.animation = `fadeInUp 0.5s forwards`;
    li.style.animationDelay = `${0.2 * (i + 1)}s`;
  });

  // Animar contacto
  document.querySelectorAll('.contacto-list.fade li').forEach((li, i) => {
    li.style.opacity = 0;
    li.style.transform = 'translateY(10px)';
    li.style.animation = `fadeInUp 0.5s forwards`;
    li.style.animationDelay = `${0.2 * (i + 1)}s`;
  });

  const headers = document.querySelectorAll('.subblock-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const subblock = header.parentElement;
      const parentBlock = subblock.closest('.block');

      // Cerrar otros subbloques
      parentBlock.querySelectorAll('.subblock').forEach(sb => {
        if (sb !== subblock) {
          sb.classList.remove('active');
          sb.querySelectorAll('.typewriter p').forEach(p => p.innerText = '');
        }
      });

      const isActive = subblock.classList.toggle('active');

      if (isActive) {
        // Animar li
        const lis = subblock.querySelectorAll('.subblock-list li');
        lis.forEach((li, idx) => {
          li.style.opacity = 0;
          li.style.transform = 'translateY(10px)';
          li.style.animation = `fadeInUp 0.5s forwards`;
          li.style.animationDelay = `${0.18 * (idx + 1)}s`;
        });

        // Animar typewriter
        const paragraphs = subblock.querySelectorAll('.typewriter p');
        const delayOffset = lis.length * 200 + 400;
        paragraphs.forEach((p, idx) => {
          setTimeout(() => typeWriterElement(p, 28), delayOffset + idx * 550);
        });
      } else {
        subblock.querySelectorAll('.typewriter p').forEach(p => p.innerText = '');
      }
    });
  });
});
