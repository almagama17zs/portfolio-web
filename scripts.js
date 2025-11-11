// -------------------- BINARY BACKGROUND --------------------
class BinaryBackground {
    constructor(canvasId, speed = 2) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return console.warn(`Canvas ${canvasId} no encontrado`);
        this.ctx = this.canvas.getContext("2d");
        this.speed = speed;
        this.columns = [];
        this.resize();
        window.addEventListener("resize", () => this.resize());
        requestAnimationFrame(() => this.update());
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = Math.max(1, Math.floor(this.canvas.offsetWidth * dpr));
        this.canvas.height = Math.max(1, Math.floor(this.canvas.offsetHeight * dpr));
        this.canvas.style.width = `${this.canvas.offsetWidth}px`;
        this.canvas.style.height = `${this.canvas.offsetHeight}px`;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cols = Math.floor(this.canvas.offsetWidth / 18);
        this.columns = [];
        for (let i = 0; i < cols; i++) {
            this.columns.push(Math.random() * this.canvas.offsetHeight);
        }
    }

    update() {
        const ctx = this.ctx;
        ctx.fillStyle = "rgba(0,0,0,0.22)";
        ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        ctx.fillStyle = "#00ff99";
        ctx.font = "16px monospace";

        this.columns.forEach((y, i) => {
            const char = Math.random() > 0.5 ? "0" : "1";
            ctx.fillText(char, i * 18, y);
            this.columns[i] += this.speed + Math.random() * 1.2;
            if (this.columns[i] > this.canvas.offsetHeight) this.columns[i] = 0;
        });

        requestAnimationFrame(() => this.update());
    }
}

// Inicializar canvas de fondo binario
new BinaryBackground("binary-header", 1.1);
new BinaryBackground("binary-footer", 1.1);

// -------------------- TYPEWRITER --------------------
function typeWriterElement(el, delay = 28) {
    const original = el.dataset.original || el.innerText;
    el.dataset.original = original;
    el.innerText = '';
    let i = 0;

    function step() {
        if (i < original.length) {
            el.innerText += original.charAt(i);
            i++;
            setTimeout(step, delay);
        }
    }
    step();
}

// -------------------- SUBBLOQUES --------------------
document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll('.subblock-header');

    // Preparar dataset.original para cada <p> de typewriter (si no tiene)
    document.querySelectorAll('.typewriter p').forEach(p => {
        if (!p.dataset.original) p.dataset.original = p.innerText.trim();
        // dejamos el texto visible por defecto; al abrir se animará
    });

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const subblock = header.parentElement;
            const parentBlock = subblock.closest('.block');

            // Cerrar otros subbloques del mismo bloque
            parentBlock.querySelectorAll('.subblock').forEach(sb => {
                if (sb !== subblock) {
                    sb.classList.remove('active');

                    // Colapsar visualmente su contenido (mejor compatibilidad con transition)
                    const otherContent = sb.querySelector('.subblock-content');
                    if (otherContent) {
                        otherContent.style.maxHeight = '0';
                        otherContent.style.opacity = '0';
                        otherContent.style.padding = '0 20px';
                    }

                    // Reset li (ocultos)
                    sb.querySelectorAll('.subblock-list li').forEach(li => {
                        li.style.opacity = 0;
                        li.style.transform = 'translateY(10px)';
                        li.style.animation = '';
                        li.style.animationDelay = '';
                    });

                    // Restaurar texto original en typewriter (para que pueda reanimarse más tarde)
                    sb.querySelectorAll('.typewriter p').forEach(p => {
                        p.innerText = p.dataset.original || p.innerText;
                    });
                }
            });

            // Toggle activo para el subblock clicado
            const isActive = subblock.classList.toggle('active');
            const content = subblock.querySelector('.subblock-content');

            if (isActive) {
                // Expandir el contenido suavemente calculando su altura real
                if (content) {
                    // forzar render antes de medir
                    content.style.opacity = '0';
                    content.style.maxHeight = '0';
                    content.style.padding = '0 20px';
                    // small delay to ensure styles applied
                    requestAnimationFrame(() => {
                        const h = content.scrollHeight;
                        content.style.maxHeight = h + 'px';
                        content.style.opacity = '1';
                        content.style.padding = '15px 20px';
                    });
                }

                // Animar li con delay (usamos animation + animationDelay por separado para compatibilidad)
                subblock.querySelectorAll('.subblock-list li').forEach((li, idx) => {
                    li.style.opacity = 0;
                    li.style.transform = 'translateY(10px)';
                    li.style.animation = `fadeInUp 0.5s forwards`;
                    li.style.animationDelay = `${0.18 * (idx + 1)}s`;
                });

                // Lanzar typewriter en cada <p> (limpiamos primero para que se vea el efecto)
                subblock.querySelectorAll('.typewriter p').forEach((p, idx) => {
                    p.innerText = ''; // limpiar antes de escribir
                    // pequeña pausa para que la expansión de contenido tenga tiempo
                    setTimeout(() => typeWriterElement(p, 28), 120 + idx * 120);
                });

            } else {
                // Colapsar el contenido
                if (content) {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                    content.style.padding = '0 20px';
                }

                // Reset animaciones de li y restaurar texto
                subblock.querySelectorAll('.subblock-list li').forEach(li => {
                    li.style.opacity = 0;
                    li.style.transform = 'translateY(10px)';
                    li.style.animation = '';
                    li.style.animationDelay = '';
                });
                subblock.querySelectorAll('.typewriter p').forEach(p => {
                    p.innerText = p.dataset.original || p.innerText;
                });
            }
        });
    });

    // Animación inicial para la lista 'sobre-mi'
    document.querySelectorAll('.sobre-mi-list li').forEach((li, i) => {
        li.style.opacity = 0;
        li.style.transform = 'translateY(10px)';
        li.style.animation = `fadeInUp 0.5s forwards`;
        li.style.animationDelay = `${0.2 * (i + 1)}s`;
    });

    // Animación inicial para contacto si existe
    document.querySelectorAll('.contacto-list.horizontal li').forEach((li, i) => {
        li.style.opacity = 0;
        li.style.transform = 'translateY(10px)';
        li.style.animation = `fadeInUp 0.5s forwards`;
        li.style.animationDelay = `${0.2 * (i + 1)}s`;
    });
});
