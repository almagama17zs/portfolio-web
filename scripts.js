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

document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".subblock-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const subblock = header.parentElement;
      const content = subblock.querySelector(".subblock-content");
      const isActive = subblock.classList.contains("active");

      // Cerrar todos
      document.querySelectorAll(".subblock").forEach((sb) => {
        sb.classList.remove("active");
        const c = sb.querySelector(".subblock-content");
        c.style.height = "0";
      });

      // Si no estaba activo, abrirlo
      if (!isActive) {
        subblock.classList.add("active");

        // 🔹 Transición suave según altura real
        content.style.height = content.scrollHeight + "px";

        // Animar lista
        const lis = subblock.querySelectorAll(".subblock-list li");
        lis.forEach((li, idx) => {
          li.style.animation = `fadeInUp 0.4s forwards`;
          li.style.animationDelay = `${0.15 * (idx + 1)}s`;
        });

        // Efecto typewriter
        const paragraphs = subblock.querySelectorAll(".typewriter p");
        const delayOffset = lis.length * 200 + 400;
        paragraphs.forEach((p, idx) => {
          p.dataset.original = p.innerText;
          p.innerText = "";
          setTimeout(() => typeWriterElement(p, 28), delayOffset + idx * 500);
        });
      }
    });
  });
});
