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

// -------------------- SUBBLOQUES --------------------
document.addEventListener("DOMContentLoaded", () => {
  const subblocks = Array.from(document.querySelectorAll(".subblock"));

  // mostrar listas sobre-mi y contacto desde inicio
  document.querySelectorAll(".sobre-mi-list, .contacto-list").forEach(list => list.classList.add("visible"));

  subblocks.forEach(sb => {
    const header = sb.querySelector(".subblock-header");
    const content = sb.querySelector(".subblock-content");
    const list = sb.querySelector(".subblock-list");
    const paragraphs = Array.from(sb.querySelectorAll(".typewriter p"));

    // Guardar texto original si no está guardado
    paragraphs.forEach(p => {
      if (!p.dataset.original) p.dataset.original = p.innerText.trim();
    });

    if (!header) return;

    header.addEventListener("click", () => {
      const alreadyOpen = sb.classList.contains("active");

      // Si ya abierto: cerramos (toggle)
      if (alreadyOpen) {
        sb.classList.remove("active");
        if (content) {
          content.style.transition = "max-height 0.6s ease, opacity 0.6s ease, padding 0.4s ease";
          content.style.maxHeight = "0";
          content.style.opacity = "0";
          content.style.padding = "0 20px";
          content.style.overflow = "hidden";
        }
        if (list) {
          list.classList.remove("visible");
          // resetear li estilos
          list.querySelectorAll("li").forEach(li => {
            li.style.opacity = 0;
            li.style.transform = "translateY(10px)";
          });
        }
        // restaurar textos
        paragraphs.forEach(p => p.innerText = p.dataset.original || p.innerText);
        return;
      }

      // Cerrar todos los demás
      subblocks.forEach(other => {
        if (other === sb) return;
        other.classList.remove("active");
        const oc = other.querySelector(".subblock-content");
        const ol = other.querySelector(".subblock-list");
        if (oc) {
          oc.style.transition = "max-height 0.6s ease, opacity 0.6s ease, padding 0.4s ease";
          oc.style.maxHeight = "0";
          oc.style.opacity = "0";
          oc.style.padding = "0 20px";
          oc.style.overflow = "hidden";
        }
        if (ol) {
          ol.classList.remove("visible");
          ol.querySelectorAll("li").forEach(li => {
            li.style.opacity = 0;
            li.style.transform = "translateY(10px)";
          });
        }
        other.querySelectorAll(".typewriter p").forEach(p => p.innerText = p.dataset.original || p.innerText);
      });

      // Abrir el actual
      sb.classList.add("active");

      // Expandir content con suficiente espacio extra (para que no corte última línea)
      if (content) {
        content.style.display = "block";
        content.style.overflow = "hidden";
        content.style.opacity = "0";
        content.style.padding = "0 20px";
        // small delay to ensure layout applied
        requestAnimationFrame(() => {
          // scrollHeight es la altura real; dejamos margen extra +28 para no cortar
          const totalHeight = content.scrollHeight + 28;
          content.style.transition = "max-height 0.6s ease, opacity 0.6s ease, padding 0.4s ease";
          content.style.maxHeight = totalHeight + "px";
          content.style.opacity = "1";
          content.style.padding = "15px 20px 28px 20px";
        });
        setTimeout(() => {
          if (sb.classList.contains("active")) content.style.overflow = "visible";
        }, 700);
      }

      // Animación LI: ponemos visible y animamos cada item (aseguramos que el 1º se vea)
      let liDuration = 0;
      if (list) {
        list.classList.add("visible");
        const items = Array.from(list.querySelectorAll("li"));
        items.forEach((li, i) => {
          // asegurar estilos iniciales
          li.style.opacity = 0;
          li.style.transform = "translateY(10px)";
          li.style.transition = "opacity 0.45s ease, transform 0.45s ease";
          setTimeout(() => {
            li.style.opacity = 1;
            li.style.transform = "translateY(0)";
          }, 120 * i + 120);
          liDuration = 120 * i + 200;
        });
      }

      // Typewriter: empezamos después de que las li terminen (liDuration)
      paragraphs.forEach((p, idx) => {
        p.innerText = "";
        setTimeout(() => {
          typeWriterElement(p, 28);
        }, liDuration + 140 + idx * 200);
      });

    });
  });
});
