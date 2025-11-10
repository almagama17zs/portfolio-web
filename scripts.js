document.addEventListener("DOMContentLoaded", () => {
  // Binary header/footer
  const canvasHeader = document.getElementById("binary-header");
  const canvasFooter = document.getElementById("binary-footer");
  if (canvasHeader) console.log("✅ Binary header cargado");
  if (canvasFooter) console.log("✅ Binary footer cargado");

  // Subbloques
  const headers = document.querySelectorAll(".subblock-header");
  console.log("🔍 Subbloques detectados:", headers.length);

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      if (!content) return;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});
