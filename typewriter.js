document.addEventListener("DOMContentLoaded", function() {
  // Tipo máquina de escribir para <p>
  function typeWriter(element, speed=40) {
    const text = element.innerHTML;
    element.innerHTML = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed + Math.random()*20);
      }
    }
    type();
  }

  const typewriters = document.querySelectorAll(".typewriter");
  typewriters.forEach(el => {
    if (!el.querySelectorAll("li").length) {
      typeWriter(el);
    }
  });

  // Fade-in automático para <li>
  const detailsList = document.querySelectorAll("details");
  detailsList.forEach(d => {
    d.addEventListener("toggle", function() {
      const lis = d.querySelectorAll(".fade-in-list li");
      lis.forEach((li, index) => {
        li.style.opacity = "0";
        li.style.transform = "translateY(15px)";
        li.style.animation = `fadeInUp 0.6s forwards ${index * 0.2}s`;
      });
    });
  });
});
