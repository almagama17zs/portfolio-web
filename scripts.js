// === EFECTO BINARIO HEADER Y FOOTER ===
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
    const cols = Math.floor(this.canvas.width / 20);
    this.columns = [];
    for (let i = 0; i < cols; i++) {
      this.columns.push(Math.random() * this.canvas.height);
    }
  }

  update() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
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

document.addEventListener("DOMContentLoaded", () => {
  new BinaryBackground("binary-header", 1.5);
  new BinaryBackground("binary-footer", 1.5);

  // === EFECTO DE ESCRITURA ===
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

  // === EFECTO FADE PARA <li> ===
  function fadeListItems(list) {
    const lis = list.querySelectorAll("li");
    lis.forEach((li, i) => {
      li.style.opacity = "0";
      li.style.transform = "translateY(10px)";
      setTimeout(() => {
        li.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        li.style.opacity = "1";
        li.style.transform = "translateY(0)";
      }, 200 * i);
    });
  }

  // === ABRIR Y CERRAR SUBBLOQUES ===
  const headers = document.querySelectorAll(".subblock-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isVisible = content.style.display === "block";

      // cerrar todos los demás subbloques del mismo bloque
      const allContents = header.closest(".block").querySelectorAll(".subblock-content");
      allContents.forEach(c => (c.style.display = "none"));

      if (!isVisible) {
        content.style.display = "block";

        // activar efectos
        const fadeList = content.querySelector(".fade");
        if (fadeList) fadeListItems(fadeList);

        const typewriterParas = content.querySelectorAll(".typewriter p");
        typewriterParas.forEach((p, index) => {
          setTimeout(() => typeWriter(p), index * 800);
        });
      }
    });
  });
});
