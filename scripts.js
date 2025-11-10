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
    console.log(`✅ Binary ${canvasId.replace('binary-', '')} cargado`);
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    const cols = Math.floor(this.canvas.width / 20);
    this.columns = [];
    for (let i = 0; i < cols; i++) {
      this.columns.push(Math.random() * this.canvas.height);
    }
  }

  update() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = "16px monospace";
    this.columns.forEach((y, i) => {
      const char = Math.random() > 0.5 ? "0" : "1";
      ctx.fillText(char, i * 20, y);
      this.columns[i] += this.speed + Math.random();
      if (this.columns[i] > this.canvas.height) this.columns[i] = 0;
    });
    requestAnimationFrame(() => this.update());
  }
}

new BinaryBackground("binary-header", 1.5);
new BinaryBackground("binary-footer", 1.5);

// -------------------- TYPEWRITER --------------------
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

// -------------------- SUBBLOQUE TOGGLE --------------------
document.addEventListener("DOMContentLoaded", () => {
  const subblocks = document.querySelectorAll(".subblock-header");
  console.log(`🔍 Subbloques detectados: ${subblocks.length}`);

  subblocks.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      if (!content) return;

      // obtener display real aunque venga del CSS
      const style = window.getComputedStyle(content);
      const isHidden = style.display === "none";

      // cerrar todos los subbloques del mismo bloque (opcional)
      const parentBlock = header.closest(".block");
      const allContents = parentBlock.querySelectorAll(".subblock-content");
      allContents.forEach(c => c.style.display = "none");

      // abrir/cerrar este subbloque
      content.style.display = isHidden ? "block" : "none";

      // animación fade para <li>
      const fadeLis = content.querySelectorAll("li");
      fadeLis.forEach((li, i) => {
        li.style.opacity = 0;
        li.style.transform = "translateY(10px)";
        li.style.animation = `fadeInUp 0.5s forwards`;
        li.style.animationDelay = `${0.2 * (i + 1)}s`;
      });

      // typewriter para cada <p>
      const paragraphs = content.querySelectorAll(".typewriter p");
      paragraphs.forEach((p, idx) => {
        setTimeout(() => typeWriter(p), idx * 600);
      });
    });
  });

  // efecto fade para "sobre-mi" inicial
  const sobreLis = document.querySelectorAll(".sobre-mi-list li");
  sobreLis.forEach((li, i) => {
    li.style.opacity = 0;
    li.style.transform = "translateY(10px)";
    li.style.animation = `fadeInUp 0.5s forwards`;
    li.style.animationDelay = `${0.2 * (i + 1)}s`;
  });
});
