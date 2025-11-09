// Máquina de escribir para <p> y <li>
class TypeWriter {
  constructor(element, speed = 40) {
    this.element = element;
    this.text = element.textContent;
    this.element.textContent = '';
    this.speed = speed;
    this.index = 0;
    this.type();
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }
}

// Aplica efecto a párrafos y a <li> de cada details y bloques
document.addEventListener("DOMContentLoaded", () => {
  // Sobre mí
  document.querySelectorAll('.sobre-mi .texto p').forEach(el => new TypeWriter(el, 30));
  // Bloques y contacto
  document.querySelectorAll('section.bloques p, section.bloques li, section.contacto p').forEach(el => new TypeWriter(el, 20));
});
