document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll('.subblock-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const subblock = header.parentElement;
            const parentBlock = subblock.closest('.block');

            // Cerrar otros subbloques
            parentBlock.querySelectorAll('.subblock').forEach(sb => {
                if (sb !== subblock) {
                    sb.classList.remove('active');
                    // Reiniciar li y typewriter
                    sb.querySelectorAll('.subblock-list li').forEach(li => {
                        li.style.opacity = 0;
                        li.style.transform = 'translateY(10px)';
                        li.style.animation = '';
                    });
                    sb.querySelectorAll('.typewriter p').forEach(p => {
                        p.innerText = p.dataset.original || p.innerText;
                    });
                }
            });

            // Toggle del subbloque
            const isActive = subblock.classList.toggle('active');

            if (isActive) {
                // Animación de li
                subblock.querySelectorAll('.subblock-list li').forEach((li, idx) => {
                    li.style.opacity = 0;
                    li.style.transform = 'translateY(10px)';
                    li.style.animation = `fadeInUp 0.5s forwards`;
                    li.style.animationDelay = `${0.18 * (idx + 1)}s`;
                });

                // Typewriter de p
                subblock.querySelectorAll('.typewriter p').forEach((p) => {
                    typeWriterElement(p, 28);
                });
            } else {
                // Opcional: reset li cuando se cierra
                subblock.querySelectorAll('.subblock-list li').forEach(li => {
                    li.style.opacity = 0;
                    li.style.transform = 'translateY(10px)';
                    li.style.animation = '';
                });
            }
        });
    });

    // Animación inicial sobre-mi
    document.querySelectorAll('.sobre-mi-list li').forEach((li, i) => {
        li.style.opacity = 0;
        li.style.transform = 'translateY(10px)';
        li.style.animation = `fadeInUp 0.5s forwards`;
        li.style.animationDelay = `${0.2 * (i + 1)}s`;
    });

    // Animación inicial contacto
    document.querySelectorAll('.contacto-list.horizontal li').forEach((li, i) => {
        li.style.opacity = 0;
        li.style.transform = 'translateY(10px)';
        li.style.animation = `fadeInUp 0.5s forwards`;
        li.style.animationDelay = `${0.2 * (i + 1)}s`;
    });
});
