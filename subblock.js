document.addEventListener("DOMContentLoaded", () => {
  const subblockHeaders = document.querySelectorAll(".subblock-header");

  subblockHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      // Abrir o cerrar
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        // Cerrar los otros subbloques del mismo bloque
        const parent = header.closest(".block");
        const allContents = parent.querySelectorAll(".subblock-content");
        allContents.forEach(c => c.style.display = "none");

        // Abrir este subbloque
        content.style.display = "block";

        // Animar fade de li
        const fadeLis = content.querySelectorAll(".fade li");
        fadeLis.forEach((li, i) => {
          li.style.opacity = 0;
          li.style.transform = "translateY(10px)";
          li.style.animation = `fadeInUp 0.5s forwards`;
          li.style.animationDelay = `${0.2 * (i+1)}s`;
        });

        // Activar typewriter en <p>
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
