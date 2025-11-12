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
    this.canvas.style.width = this.canvas.offsetWidth + "px";
    this.canvas.style.height = this.canvas.offsetHeight + "px";
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

// -------------------- TYPEWRITER --------------------
function typeWriterElement(el, delay = 28) {
  const original = el.dataset.original || el.innerText;
  el.dataset.original = original;
  el.innerText = "";
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

// -------------------- ANIMACIÓN SOBRE MI --------------------
document.addEventListener("DOMContentLoaded", () => {
  const subblocks = Array.from(document.querySelectorAll(".subblock"));
  const soloLists = Array.from(document.querySelectorAll(".sobre-mi-list")); // listas independientes

  // -------------------- Animar listas fuera de subbloques --------------------
  soloLists.forEach(list => {
    list.classList.add("visible");
    const items = Array.from(list.querySelectorAll("li"));
    items.forEach((li, i) => {
      li.style.opacity = 0;
      li.style.transform = "translateY(10px)";
      li.style.transition = "opacity 0.45s ease, transform 0.45s ease";
      setTimeout(() => {
        li.style.opacity = 1;
        li.style.transform = "translateY(0)";
      }, 120 * i + 120);
    });
  });

  // -------------------- Subbloques --------------------
  subblocks.forEach(sb => {
    const header = sb.querySelector(".subblock-header");
    const content = sb.querySelector(".subblock-content");
    const list = sb.querySelector(".subblock-list");
    const paragraphs = Array.from(sb.querySelectorAll(".typewriter p"));

    // Guardar texto original
    paragraphs.forEach(p => {
      if (!p.dataset.original) p.dataset.original = p.innerText.trim();
    });

    if (!header) return;

    header.addEventListener("click", () => {
      const isOpen = sb.classList.contains("active");

      // Cerrar si estaba abierto
      if (isOpen) {
        sb.classList.remove("active");
        if (content) {
          content.style.maxHeight = "0";
          content.style.opacity = "0";
          content.style.padding = "0 20px";
        }
        if (list) {
          list.classList.remove("visible");
          list.querySelectorAll("li").forEach(li => {
            li.style.opacity = 0;
            li.style.transform = "translateY(10px)";
          });
        }
        paragraphs.forEach(p => p.innerText = p.dataset.original);
        return;
      }

      // Cerrar otros abiertos
      subblocks.forEach(other => {
        if (other === sb) return;
        other.classList.remove("active");
        const oc = other.querySelector(".subblock-content");
        const ol = other.querySelector(".subblock-list");
        if (oc) {
          oc.style.maxHeight = "0";
          oc.style.opacity = "0";
          oc.style.padding = "0 20px";
        }
        if (ol) {
          ol.classList.remove("visible");
          ol.querySelectorAll("li").forEach(li => {
            li.style.opacity = 0;
            li.style.transform = "translateY(10px)";
          });
        }
        other.querySelectorAll(".typewriter p").forEach(p => p.innerText = p.dataset.original);
      });

      // Abrir el subbloque actual
      sb.classList.add("active");
      if (content) {
        content.style.maxHeight = content.scrollHeight + 40 + "px";
        content.style.opacity = "1";
        content.style.padding = "15px 20px 40px 20px";
      }

      // Animación li
      let liDuration = 0;
      if (list) {
        list.classList.add("visible");
        const items = Array.from(list.querySelectorAll("li"));
        items.forEach((li, i) => {
          li.style.opacity = 0;
          li.style.transform = "translateY(10px)";
          li.style.transition = "opacity 0.45s ease, transform 0.45s ease";
          setTimeout(() => {
            li.style.opacity = 1;
            li.style.transform = "translateY(0)";
          }, 120 * i + 120);
          liDuration = 120 * i + 200; // tiempo total que tarda en aparecer todos los li
        });
      }

      // Typewriter <p> uno a uno en orden
      let delayAcc = liDuration + 150; // empieza después de los li
      paragraphs.forEach((p, idx) => {
        p.innerText = ""; // vaciamos antes de animar
        setTimeout(() => {
          const original = p.dataset.original;
          let i = 0;
          const step = () => {
            if (i < original.length) {
              p.innerText += original.charAt(i);
              i++;
              setTimeout(step, 28);
            } else {
              // cuando termina un <p>, sumar tiempo para el siguiente
              delayAcc += original.length * 28 + 50;
            }
          };
          step();
        }, delayAcc);
      });

    });
  });
});
