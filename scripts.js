// --- EFECTO DE FONDO BINARIO ---
class BinaryBackground {
  constructor(canvasId, speed = 2) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.speed = speed;
    this.columns = [];
    this.resize();
    window.addEventListener("resize", () => this.resize());
    requestAnimationFrame(() => this.update());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    const columns = Math.floor(this.canvas.width / 20);
    this.columns = [];
    for (let i = 0; i < columns; i++) {
      this.columns.push(Math.random() * this.canvas.height);
    }
  }

  update() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = "16px monospace";
    for (let i = 0; i < this.columns.length; i++) {
      const char = Math.random() > 0.5 ? "0" : "1";
      ctx.fillText(char, i * 20, this.columns[i]);
      this.columns[i] += this.speed + Math.random();
      if (this.columns[i] > this.canvas.height) this.columns[i] = 0;
    }
    requestAnimationFrame(() => this.update());
  }
}

new BinaryBackground("binary-header", 1.5);
new BinaryBackground("binary-footer", 1.5);

// --- EFECTO TYPEWRITER ---
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

// Aplicar efecto inicial
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.typewriter p').forEach(p => {
    typeWriter(p);
  });

  // --- SUBBLOQUES (abrir/cerrar) ---
  const subblockHeaders = document.querySelectorAll(".subblock-header");

  subblockHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      // Alternar apertura
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        // Cerrar otros subbloques del mismo bloque
        const parentBlock = header.closest(".block");
        const allContents = parentBlock.querySelectorAll(".subblock-content");
        allContents.forEach(c => (c.style.display = "none"));

        // Abrir este subbloque
        content.style.display = "block";

        // Animar listas <li>
        const fadeLis = content.querySelectorAll(".fade li");
        fadeLis.forEach((li, i) => {
          li.style.opacity = 0;
          li.style.transform = "translateY(10px)";
          li.style.animation = `fadeInUp 0.5s forwards`;
          li.style.animationDelay = `${0.2 * (i + 1)}s`;
        });

        // Efecto máquina de escribir en <p>
        const paragraphs = content.querySelectorAll(".typewriter p");
        paragraphs.forEach((p, index) => {
          setTimeout(() => {
            typeWriter(p);
          }, index * 600);
        });
      }
    });
  });
});