// ====== EFECTO BINARIO HEADER Y FOOTER ======
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

document.addEventListener("DOMContentLoaded", () => {
  new BinaryBackground("binary-header", 1.5);
  new BinaryBackground("binary-footer", 1.5);

  console.log("✅ Binary background cargado");

  // ====== EFECTO TYPEWRITER ======
  function typeWriter(element, delay = 40) {
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

  document.querySelectorAll(".typewriter p").forEach(p => {
    typeWriter(p);
  });

  // ====== EFECTO SUBBLOQUES ======
  const subblockHeaders = document.querySelectorAll(".subblock-header");
  console.log("🔍 Subbloques detectados:", subblockHeaders.length);

  subblockHeaders.forEach(header => {
    header.addEventListener("click", () => {
      console.log("🟢 Click en:", header.innerText);
      const content = header.nextElementSibling;

      // Cerrar otros subbloques del mismo bloque
      const parent = header.closest(".block");
      parent.querySelectorAll(".subblock-content").forEach(c => {
        if (c !== content) c.style.display = "none";
      });

      // Abrir o cerrar este
      if (content.style.display === "block") {
        content.style.display = "none";
        console.log("🔴 Cerrado");
      } else {
        content.style.display = "block";
        console.log("🟢 Abierto");

        // Animar <li> con fade secuencial
        const fadeLis = content.querySelectorAll(".fade li");
        fadeLis.forEach((li, i) => {
          li.style.opacity = 0;
          li.style.transform = "translateY(10px)";
          li.style.animation = `fadeInUp 0.5s forwards`;
          li.style.animationDelay = `${0.2 * (i + 1)}s`;
        });

        // Activar typewriter en párrafos dentro
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
