document.addEventListener("DOMContentLoaded", () => {
  const dataScript = document.getElementById("data-platos");
  const platos = JSON.parse(dataScript.textContent);

  const inputBusqueda = document.getElementById("busqueda");
  const btnBuscar = document.getElementById("btn-buscar");
  const contenedor = document.getElementById("platos-container");

  function renderPlatos(platosFiltrados) {
    contenedor.innerHTML = "";

    if (platosFiltrados.length === 0) {
      contenedor.innerHTML = `<div class="mensaje-error">No se encontraron resultados.</div>`;
      return;
    }

    platosFiltrados.forEach(plato => {
      const card = document.createElement("div");
      card.classList.add("plato-card");

      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-container");
      const imagen = document.createElement("img");
      imagen.src = plato.imagen;
      imagen.alt = plato.nombre;
      imgContainer.appendChild(imagen);

      const content = document.createElement("div");
      content.classList.add("plato-content");

      const titulo = document.createElement("h3");
      titulo.textContent = plato.nombre;

      const lista = document.createElement("ul");
      plato.ingredientes.forEach(ing => {
        const item = document.createElement("li");
        item.textContent = `${ing.nombre} - ${ing.cantidad}`;
        lista.appendChild(item);
      });

      content.appendChild(titulo);
      content.appendChild(lista);

      if (plato.infoExtra) {
        const btnInfo = document.createElement("button");
        btnInfo.classList.add("btn-info");
        btnInfo.textContent = "ℹ️ Info adicional";

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-extra");
        infoDiv.style.display = "none";

        for (let key in plato.infoExtra) {
          const p = document.createElement("p");
          p.textContent = `${key}: ${plato.infoExtra[key]}`;
          infoDiv.appendChild(p);
        }

        btnInfo.addEventListener("click", () => {
          infoDiv.style.display = infoDiv.style.display === "none" ? "block" : "none";
        });

        content.appendChild(btnInfo);
        content.appendChild(infoDiv);
      }

      const btnWsp = document.createElement("a");
      btnWsp.href = `https://wa.me/51998199885?text=Hola,%20quiero%20reportar%20que%20faltan%20insumos%20para%20el%20plato%20*${encodeURIComponent(plato.nombre)}*`;
      btnWsp.classList.add("btn-wsp");
      btnWsp.target = "_blank";
      btnWsp.rel = "noopener";
      btnWsp.textContent = "📲 Reportar por WhatsApp";
      content.appendChild(btnWsp);

      card.appendChild(imgContainer);
      card.appendChild(content);

      contenedor.appendChild(card);
    });
  }

  function buscarPlato() {
    const termino = inputBusqueda.value.trim().toLowerCase();
    const resultados = platos.filter(p =>
      p.nombre.toLowerCase().includes(termino)
    );
    renderPlatos(resultados);
  }

  btnBuscar.addEventListener("click", buscarPlato);
  renderPlatos(platos);
});
