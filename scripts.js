// === scripts.js ===

// Animación binaria del header y footer
function binaryRain(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const fontSize = 14;
  let columns, drops;

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = 80;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = Math.random() > 0.5 ? "1" : "0";
      const x = i * fontSize;
      ctx.fillText(text, x, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  init();
  setInterval(draw, 50);
  window.addEventListener("resize", init);
}

binaryRain("binary-header");
binaryRain("binary-footer");


// === BLOQUES DESPLEGABLES ===
document.addEventListener("DOMContentLoaded", () => {
  const subblocks = document.querySelectorAll(".subblock");

  subblocks.forEach((subblock) => {
    const header = subblock.querySelector(".subblock-header");
    const content = subblock.querySelector(".subblock-content");

    // Oculta el contenido inicialmente
    content.style.maxHeight = "0";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.6s ease";

    header.addEventListener("click", () => {
      const isOpen = subblock.classList.toggle("active");

      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.overflow = "visible";
      } else {
        content.style.maxHeight = "0";
        content.style.overflow = "hidden";
      }
    });
  });
});


// === EFECTO MÁQUINA DE ESCRIBIR ===
function typewriterEffect() {
  const elements = document.querySelectorAll(".typewriter p");

  elements.forEach((p) => {
    const text = p.textContent;
    p.textContent = "";
    let i = 0;

    function type() {
      if (i < text.length) {
        p.textContent += text.charAt(i);
        i++;
        setTimeout(type, 15); // velocidad de escritura
      }
    }

    const subblock = p.closest(".subblock");
    const observer = new MutationObserver(() => {
      if (subblock.classList.contains("active") && p.textContent.length === 0) {
        type();
      }
    });
    observer.observe(subblock, { attributes: true });
  });
}

document.addEventListener("DOMContentLoaded", typewriterEffect);


// === ANIMAR ENTRADA DE LOS <li> ===
function animateLists() {
  const lists = document.querySelectorAll(".subblock-list");

  lists.forEach((ul) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ul.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(ul);
  });
}

document.addEventListener("DOMContentLoaded", animateLists);
