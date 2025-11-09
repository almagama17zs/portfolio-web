class BinaryBackground {
  constructor(canvasId, speed = 1.5) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.speed = speed;
    this.columns = [];
    this.resize();
    window.addEventListener("resize", () => this.resize());
    requestAnimationFrame(() => this.update());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    const columns = Math.floor(this.canvas.width / 20);
    this.columns = [];
    for (let i = 0; i < columns; i++) {
      this.columns.push(Math.random() * this.canvas.height);
    }
  }

  update() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = "16px monospace";
    for (let i = 0; i < this.columns.length; i++) {
      const char = Math.random() > 0.5 ? "0" : "1";
      ctx.fillText(char, i * 20, this.columns[i]);
      this.columns[i] += this.speed + Math.random();
      if (this.columns[i] > this.canvas.height) this.columns[i] = 0;
    }
    requestAnimationFrame(() => this.update());
  }
}

new BinaryBackground("binary-header", 1.5);
new BinaryBackground("binary-footer", 1.5);
