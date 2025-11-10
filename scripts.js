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
function typeWriter(element, delay = 30) {
  const text = element.textContent;
  element.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, delay);
    }
  }
  typing();
}

// -------------------- SUBBLOQUE TOGGLE --------------------
document.addEventListener("DOMContentLoaded", () => {
  const subblocks = document.querySelectorAll(".subblock");
  console.log(`🔍 Subbloques detectados: ${subblocks.length}`);

  subblocks.forEach(block => {
    const header = block.querySelector(".subblock-header");
    header.addEventListener("click", () => {
      const isActive = block.classList.contains("active");

      // Cerrar todos los subbloques del mismo nivel
      document.querySelectorAll(".subblock.active").forEach(b => b.classList.remove("active"));

      // Si no estaba activo, abrirlo
      if (!isActive) block.classList.add("active");

      // Typewriter animación
      if (!isActive) {
        const paragraphs = block.querySelectorAll(".typewriter p");
        paragraphs.forEach((p, i) => setTimeout(() => typeWriter(p), i * 500));
      }
    });
  });

  console.log("✅ Script de subbloques activo");
});
