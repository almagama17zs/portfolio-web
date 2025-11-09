document.addEventListener("DOMContentLoaded", () => {
  function typeWriter(el) {
    const paragraphs = el.querySelectorAll("p");
    let i = 0;

    function typeParagraph() {
      if (i >= paragraphs.length) return;
      const p = paragraphs[i];
      const text = p.textContent;
      p.textContent = "";
      let j = 0;

      const interval = setInterval(() => {
        p.textContent += text[j];
        j++;
        if (j === text.length) {
          clearInterval(interval);
          i++;
          typeParagraph();
        }
      }, 30);
    }

    typeParagraph();
  }

  document.querySelectorAll(".typewriter").forEach(el => typeWriter(el));
});