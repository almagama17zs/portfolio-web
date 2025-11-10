document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".subblock-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      // Buscamos el content dentro del mismo subblock
      const content = header.parentElement.querySelector(".subblock-content");

      if (!content) return;

      // Toggle simple
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});

