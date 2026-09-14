function cargarProductos() {

    fetch("productos.json")
        .then(response => response.json())
        .then(productos => {
            mostrarProductos(productos);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
}

function mostrarProductos(productos) {

    const contenedor = document.getElementById("listaProductos");

    productos.forEach(producto => {

        // Columna Bootstrap
        const columna = document.createElement("div");
        columna.classList.add("col-12", "col-md-6", "col-lg-4");

        // Card
        const card = document.createElement("div");
        card.classList.add("card", "h-100");

        card.addEventListener("mouseover", function () {
            card.classList.add("shadow");
        });

        card.addEventListener("mouseout", function () {
            card.classList.remove("shadow");
        });

        // Imagen
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.classList.add("card-img-top");

        // Cuerpo de la card
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column");

        // Título
        const titulo = document.createElement("h3");
        titulo.classList.add("card-title", "h5");
        titulo.textContent = producto.nombre;

        // Descripción
        const descripcion = document.createElement("p");
        descripcion.classList.add("card-text");
        descripcion.textContent = producto.descripcion;

        const boton = document.createElement("button");
        boton.classList.add("btn", "btn-success", "mt-auto");
        boton.textContent = "Ver producto";

        const precio = document.createElement("p");
        precio.classList.add("mt-3", "fw-bold", "text-success");
        precio.textContent = "$" + producto.precio.toLocaleString("es-CL");
        precio.style.display = "none";

        boton.addEventListener("click", function () {

            if (precio.style.display === "none") {
                precio.style.display = "block";
                boton.textContent = "Ocultar precio";
            } else {
                precio.style.display = "none";
                boton.textContent = "Ver producto";
            }

        });

        // Construcción de la card
        cardBody.appendChild(titulo);
        cardBody.appendChild(descripcion);
        cardBody.appendChild(boton);
        cardBody.appendChild(precio);

        card.appendChild(imagen);
        card.appendChild(cardBody);

        columna.appendChild(card);

        contenedor.appendChild(columna);
    });
}

function configurarFormulario() {

    const formulario = document.getElementById("formContacto");

    console.log("Formulario encontrado:", formulario);
    if (formulario) {
        formulario.addEventListener("submit", function (event) {

            event.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            if (nombre === "" || email === "" || mensaje === "") {
                alert("Por favor, completa todos los campos.");
            } else {
                const mensajeExito = document.createElement("p");
                mensajeExito.textContent = "Mensaje enviado correctamente.";
                mensajeExito.classList.add("text-success", "fw-bold", "mt-3");

                formulario.appendChild(mensajeExito);
                formulario.reset();
            }
        });
    }
}

if (document.getElementById("listaProductos")) {
    cargarProductos();
}

configurarFormulario();