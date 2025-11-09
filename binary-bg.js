// Binary background animation para header y footer
class BinaryBg {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.characters = '01';
    this.fontSize = 16;
    this.columns = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initColumns();
    this.animate();
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.columns = [];
    this.initColumns();
  }

  initColumns() {
    const colCount = Math.floor(this.canvas.width / this.fontSize);
    for (let i = 0; i < colCount; i++) {
      this.columns[i] = Math.floor(Math.random() * this.canvas.height / this.fontSize);
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // semitransparente para efecto rastro
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = '#0F0'; // color verde clásico Matrix
    ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.columns.length; i++) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      const x = i * this.fontSize;
      const y = this.columns[i] * this.fontSize;
      ctx.fillText(text, x, y);

      if (y > this.canvas.height && Math.random() > 0.975) {
        this.columns[i] = 0;
      }

      this.columns[i]++;
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Inicializa animación para header y footer
document.addEventListener('DOMContentLoaded', () => {
  new BinaryBg('binary-header');
  new BinaryBg('binary-footer');
});
