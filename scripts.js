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
    // ajustar dimensiones al tamaño real del elemento
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
    // fondo levemente transparente para efecto "rastro"
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

    ctx.fillStyle = "#0F0";
    ctx.font = "16px monospace";
    this.columns.forEach((y, i) => {
      const char = Math.random() > 0.5 ? "0" : "1";
      ctx.fillText(char, i * 18, y);
      this.columns[i] += this.speed + Math.random() * 1.2;
      if (this.columns[i] > this.canvas.offsetHeight) {
        this.columns[i] = 0;
      }
    });

    requestAnimationFrame(() => this.update());
  }
}

// iniciar canvases si existen
new BinaryBackground("binary-header", 1.1);
new BinaryBackground("binary-footer", 1.1);

// -------------------- TYPEWRITER --------------------
function typeWriterElement(el, delay = 30) {
  const original = el.dataset.original || el.innerText;
  el.dataset.original = original;
  el.innerText = '';
  let i = 0;
  function step() {
    if (i < original.length) {
      el.innerText += original.charAt(i);
      i++;
      setTimeout(step, delay);
    } else {
      // al terminar, quitar cursor (si quieres mantener, comentar)
      // el.style.borderRight = 'none';
    }
  }
  step();
}

// -------------------- SUBBLOQUES (toggle robusto) --------------------
document.addEventListener("DOMContentLoaded", () => {
  // preparar typewriter: guardar texto original y vaciar (para ejecutarlo cuando se abra)
  document.querySelectorAll('.typewriter p').forEach(p => {
    p.dataset.original = p.innerText.trim();
    p.innerText = '';
  });

  // preparar fade: las li ya tienen animaciones CSS, pero las mantenemos ocultas
  document.querySelectorAll('.fade li').forEach(li => {
    // dejar en estado inicial para que la animación se dispare cuando el elemento esté visible
    li.style.opacity = 0;
    li.style.transform = 'translateY(10px)';
  });

  const headers = document.querySelectorAll('.subblock-header');
  console.log(`🔍 Subbloques detectados: ${headers.length}`);

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const subblock = header.parentElement;
      const parentBlock = subblock.closest('.block');

      // cerrar otros subblocks del mismo bloque (si deseas permitir multiselección, comenta este bloque)
      parentBlock.querySelectorAll('.subblock').forEach(sb => {
        if (sb !== subblock) {
          sb.classList.remove('active');
          // reset visual (limpiar p typewriter para que se vuelva a escribir al reabrir)
          sb.querySelectorAll('.typewriter p').forEach(p => {
            p.innerText = '';
          });
        }
      });

      // toggle del subblock clicado
      const isActive = subblock.classList.toggle('active');

      // al abrir, disparar animaciones: fade li y typewriter p
      if (isActive) {
        // animar las li dentro de subblock-list
        const lis = subblock.querySelectorAll('.subblock-list li');
        lis.forEach((li, idx) => {
          li.style.opacity = 0;
          li.style.transform = 'translateY(10px)';
          li.style.animation = `fadeInUp 0.5s forwards`;
          li.style.animationDelay = `${0.18 * (idx + 1)}s`;
        });

        // typewriter para cada <p> (con retardo entre ellas)
        const paragraphs = subblock.querySelectorAll('.typewriter p');
        paragraphs.forEach((p, idx) => {
          setTimeout(() => {
            typeWriterElement(p, 28);
          }, idx * 550);
        });
      } else {
        // si se cierra, limpiar p para que se pueda reescribir la próxima vez
        subblock.querySelectorAll('.typewriter p').forEach(p => p.innerText = '');
      }
    });
  });

  // efecto inicial para sobre-mi (aparece en secuencia)
  const sobreLis = document.querySelectorAll('.sobre-mi-list li');
  sobreLis.forEach((li, i) => {
    li.style.opacity = 0;
    li.style.transform = 'translateY(10px)';
    li.style.animation = `fadeInUp 0.5s forwards`;
    li.style.animationDelay = `${0.2 * (i + 1)}s`;
  });

  // mostrar fade inicial para la lista de contacto (si tenía fade)
  const contactLis = document.querySelectorAll('.contacto-list.fade li');
  contactLis.forEach((li, i) => {
    li.style.opacity = 0;
    li.style.transform = 'translateY(10px)';
    li.style.animation = `fadeInUp 0.5s forwards`;
    li.style.animationDelay = `${0.2 * (i + 1)}s`;
  });
});
