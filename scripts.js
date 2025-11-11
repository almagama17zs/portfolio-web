document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todos los subbloques
  const subblocks = document.querySelectorAll(".subblock");

  subblocks.forEach(subblock => {
    const header = subblock.querySelector(".subblock-header");
    const content = subblock.querySelector(".subblock-content");
    const list = subblock.querySelector(".subblock-list");

    if (header) {
      header.addEventListener("click", () => {
        // Cerrar otros bloques antes de abrir este
        subblocks.forEach(sb => {
          if (sb !== subblock) {
            sb.classList.remove("active");
            const otherList = sb.querySelector(".subblock-list");
            if (otherList) otherList.classList.remove("visible");
          }
        });

        // Alternar el bloque clicado
        subblock.classList.toggle("active");

        // Si está activo, mostrar las listas
        if (subblock.classList.contains("active")) {
          if (list) list.classList.add("visible");
        } else {
          if (list) list.classList.remove("visible");
        }
      });
    }
  });
});
