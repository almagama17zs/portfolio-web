// ===========================
// BINARIO HEADER Y FOOTER
// ===========================
class BinaryBackground {
  constructor(canvasId, speed = 2) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
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
    this.columns = Array.from({ length: columns }, () => Math.random() * this.canvas.height);
  }

  update() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
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

// ===========================
// EFECTO TYPEWRITER
// ===========================
function typeWriter(element, delay = 30) {
  const text = element.innerText;
  element.innerText = "";
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

// ===========================
// EFECTO FADE PARA LISTAS
// ===========================
function applyFadeEffect(list) {
  const items = list.querySelectorAll("li");
  items.forEach((li, i) => {
    li.style.opacity = 0;
    li.style.transform = "translateY(10px)";
    setTimeout(() => {
      li.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      li.style.opacity = 1;
      li.style.transform = "translateY(0)";
    }, i * 250);
  });
}

// ===========================
// SUBBLOQUES INTERACTIVOS
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const subblockHeaders = document.querySelectorAll(".subblock-header");

  subblockHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      // Cerrar todos los demás subbloques dentro del mismo bloque
      const parent = header.closest(".block");
      parent.querySelectorAll(".subblock-content").forEach(c => {
        if (c !== content) c.style.display = "none";
      });

      // Alternar este subbloque
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";

        // Reiniciar animaciones
        const fadeLists = content.querySelectorAll(".fade");
        fadeLists.forEach(applyFadeEffect);

        const typewriters = content.querySelectorAll(".typewriter p");
        typewriters.forEach((p, index) => {
          setTimeout(() => typeWriter(p), index * 1000);
        });
      }
    });
  });

  // Aplicar efecto typewriter inicial a todos los .typewriter p del DOM
  document.querySelectorAll(".typewriter p").forEach(p => {
    typeWriter(p);
  });

  // Aplicar fade inicial a listas de Sobre mí
  document.querySelectorAll(".sobre-mi-list.fade").forEach(applyFadeEffect);
});
