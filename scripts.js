// -------------------- BINARY BACKGROUND --------------------
class BinaryBackground {
  constructor(canvasId, speed = 1.1) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.speed = speed;
    this.columns = [];
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.running = true;
    requestAnimationFrame(() => this.update());
  }
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.floor(this.canvas.offsetWidth * dpr));
    const h = Math.max(1, Math.floor(this.canvas.offsetHeight * dpr));
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.style.width = this.canvas.offsetWidth+'px';
    this.canvas.style.height = this.canvas.offsetHeight+'px';
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
    const cols = Math.max(2, Math.floor(this.canvas.offsetWidth/18));
    this.columns = new Array(cols).fill(0).map(()=>Math.random()*this.canvas.offsetHeight);
  }
  update() {
    if(!this.running) return;
    const ctx=this.ctx;
    ctx.fillStyle="rgba(0,0,0,0.18)";
    ctx.fillRect(0,0,this.canvas.offsetWidth,this.canvas.offsetHeight);
    ctx.fillStyle="#00ff99";
    ctx.font="16px monospace";
    this.columns.forEach((y,i)=>{
      const char = Math.random()>0.5?"0":"1";
      ctx.fillText(char,i*18,y);
      this.columns[i]+=this.speed+Math.random()*1.2;
      if(this.columns[i]>this.canvas.offsetHeight)this.columns[i]=0;
    });
    requestAnimationFrame(()=>this.update());
  }
}
new BinaryBackground("binary-header",1.1);
new BinaryBackground("binary-footer",1.1);

// -------------------- TYPEWRITER --------------------
function typeWriterElement(el, delay=28){
  const original = el.dataset.original || el.innerText;
  el.dataset.original = original;
  el.innerText = '';
  let i=0;
  function step(){
    if(i<original.length){
      el.innerText += original.charAt(i);
      i++;
      setTimeout(step, delay);
    }
  }
  step();
}

// -------------------- SUBBLOQUES --------------------
document.addEventListener("DOMContentLoaded", () => {
  const subblocks = document.querySelectorAll(".subblock");

  document.querySelectorAll(".sobre-mi-list, .contacto-list").forEach(list =>
    list.classList.add("visible")
  );

  subblocks.forEach(sb => {
    const header = sb.querySelector(".subblock-header");
    const content = sb.querySelector(".subblock-content");
    const list = sb.querySelector(".subblock-list");
    const paragraphs = sb.querySelectorAll(".typewriter p");

    // Guardamos el texto original
    paragraphs.forEach(p => p.dataset.original = p.innerText);

    header.addEventListener("click", () => {
      // Cerrar otros subbloques
      subblocks.forEach(other => {
        if(other !== sb){
          other.classList.remove("active");
          const oc = other.querySelector(".subblock-content");
          const ol = other.querySelector(".subblock-list");
          if(oc){
            oc.style.maxHeight = "0";
            oc.style.opacity = "0";
            oc.style.padding = "0 20px";
          }
          if(ol) ol.classList.remove("visible");
          other.querySelectorAll(".typewriter p").forEach(p => p.innerText = p.dataset.original);
        }
      });

      const isOpen = sb.classList.toggle("active");

      if(isOpen){
        if(content){
          // Expandimos al tamaño real del contenido
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.opacity = "1";
          content.style.padding = "15px 20px";
        }

        if(list){
          list.classList.add("visible");
          list.querySelectorAll("li").forEach((li, i) => {
            li.style.opacity = 0;
            li.style.transform = "translateY(10px)";
            setTimeout(() => {
              li.style.opacity = 1;
              li.style.transform = "translateY(0)";
            }, 120*i + 120);
          });
        }

        // Ejecutamos el typewriter tras 150ms para asegurar que el contenedor ya se ve
        paragraphs.forEach((p, idx) => {
          p.innerText = '';
          setTimeout(() => typeWriterElement(p, 28), 150 + idx * 200);
        });

      } else {
        if(content){
          content.style.maxHeight = "0";
          content.style.opacity = "0";
          content.style.padding = "0 20px";
        }
        if(list) list.classList.remove("visible");
        paragraphs.forEach(p => p.innerText = p.dataset.original);
      }
    });
  });
});
