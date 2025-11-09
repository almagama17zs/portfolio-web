document.addEventListener("DOMContentLoaded", () => {
  // Máquina de escribir para <p>
  const typewriters = document.querySelectorAll(".typewriter");
  typewriters.forEach(container => {
    const paragraphs = Array.from(container.querySelectorAll("p"));
    paragraphs.forEach((p, index) => {
      const text = p.textContent;
      p.textContent = "";
      let i = 0;
      function type() {
        if (i < text.length) {
          p.textContent += text.charAt(i);
          i++;
          setTimeout(type, 40);
        } else if (index < paragraphs.length - 1) {
          setTimeout(() => paragraphs[index + 1].classList.add("start"), 200);
        }
      }
      p.classList.add("start");
      type();
    });
  });

  // Mostrar subblocks al hacer click
  const subblocks = document.querySelectorAll(".subblock-header");
  subblocks.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});