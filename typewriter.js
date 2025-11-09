// Máquina de escribir para Sobre mi y Contacto
function typeText(element, speed = 30) {
  const text = element.innerText;
  element.innerText = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Aplicar a todos los elementos con clase typing-text
document.querySelectorAll(".typing-text").forEach(el => {
  typeText(el, 25);
});
