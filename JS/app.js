

const tablas = {

    pequena: {
        nombre: "Tabla Pequeña",
        personas: 2,
        precio: 350,
        incluidos: [
            "80 g de queso",
            "80 g de carne fría",
            "100 g de fruta"
        ]
    },

    mediana: {
        nombre: "Tabla Mediana",
        personas: 4,
        precio: 550,
        incluidos: [
            "160 g de queso",
            "160 g de carne fría",
            "200 g de fruta"
        ]
    },

    grande: {
        nombre: "Tabla Grande",
        personas: 6,
        precio: 750,
        incluidos: [
            "240 g de queso",
            "240 g de carne fría",
            "300 g de fruta"
        ]
    }

};


// ==========================================
// VARIABLES
// ==========================================

let tablaSeleccionada = null;
let precioTabla = 0;


// ==========================================
// BOTÓN "ARMA TU TABLA"
// ==========================================

const botonComenzar = document.getElementById("botonComenzar");

if (botonComenzar) {

    botonComenzar.addEventListener("click", function () {

        document.getElementById("personaliza").scrollIntoView({
            behavior: "smooth"
        });

    });

}


// ==========================================
// SELECCIONAR TAMAÑO
// ==========================================

const opcionesTabla = document.querySelectorAll(".opcion-tabla");

opcionesTabla.forEach(function (opcion) {

    opcion.addEventListener("click", function () {

        // Quitar selección anterior
        opcionesTabla.forEach(function (item) {
            item.classList.remove("seleccionada");
        });

        // Seleccionar botón
        opcion.classList.add("seleccionada");

        // Obtener tamaño
        const personas = Number(opcion.dataset.personas);

        if (personas === 2) {
            tablaSeleccionada = tablas.pequena;
        }

        if (personas === 4) {
            tablaSeleccionada = tablas.mediana;
        }

        if (personas === 6) {
            tablaSeleccionada = tablas.grande;
        }

        // Actualizar precio
        precioTabla = tablaSeleccionada.precio;

        // Mostrar información incluida
        mostrarIncluidos();

        // Actualizar total
        actualizarTotal();

    });

});


// ==========================================
// MOSTRAR LO QUE INCLUYE LA TABLA
// ==========================================

function mostrarIncluidos() {

    const contenedor = document.getElementById("incluidos");

    if (!contenedor || !tablaSeleccionada) {
        return;
    }

    contenedor.innerHTML = "";

    tablaSeleccionada.incluidos.forEach(function (producto) {

        const elemento = document.createElement("li");

        elemento.textContent = "✓ " + producto;

        contenedor.appendChild(elemento);

    });

}


// ==========================================
// INGREDIENTES EXTRA
// ==========================================

const ingredientes = document.querySelectorAll(
    ".checkbox-opcion input"
);

ingredientes.forEach(function (ingrediente) {

    ingrediente.addEventListener("change", function () {

        actualizarTotal();

    });

});


// ==========================================
// CALCULAR TOTAL
// ==========================================

function actualizarTotal() {

    let total = precioTabla;

    ingredientes.forEach(function (ingrediente) {

        if (ingrediente.checked) {

            total += Number(ingrediente.value);

        }

    });

    const totalElemento = document.getElementById("total");

    if (totalElemento) {

        totalElemento.textContent =
            "$" + total.toLocaleString("es-MX");

    }

}


// ==========================================
// PEDIDO POR WHATSAPP
// ==========================================

const botonPedido = document.getElementById("botonPedido");

if (botonPedido) {

    botonPedido.addEventListener("click", function () {

        if (!tablaSeleccionada) {

            alert("Primero selecciona el tamaño de tu tabla.");

            return;

        }

        let mensaje = "Hola, quiero pedir una tabla.%0A%0A";

        mensaje +=
            "Tabla: " +
            tablaSeleccionada.nombre +
            "%0A";

        mensaje +=
            "Personas: " +
            tablaSeleccionada.personas +
            "%0A";

        mensaje +=
            "Precio base: $" +
            tablaSeleccionada.precio +
            "%0A%0A";


        mensaje += "Incluye:%0A";

        tablaSeleccionada.incluidos.forEach(function (producto) {

            mensaje +=
                "✓ " +
                producto +
                "%0A";

        });


        let extrasSeleccionados = [];

        ingredientes.forEach(function (ingrediente) {

            if (ingrediente.checked) {

                const nombre =
                    ingrediente.parentElement.querySelector("span").textContent;

                extrasSeleccionados.push({
                    nombre: nombre,
                    precio: Number(ingrediente.value)
                });

            }

        });


        if (extrasSeleccionados.length > 0) {

            mensaje += "%0AExtras:%0A";

            extrasSeleccionados.forEach(function (extra) {

                mensaje +=
                    "+ " +
                    extra.nombre +
                    " ($" +
                    extra.precio +
                    ")%0A";

            });

        }


        let total = precioTabla;

        ingredientes.forEach(function (ingrediente) {

            if (ingrediente.checked) {

                total += Number(ingrediente.value);

            }

        });


        mensaje +=
            "%0ATotal: $" +
            total.toLocaleString("es-MX");


        // CAMBIA ESTE NÚMERO POR EL WHATSAPP DEL NEGOCIO
        const telefono = "5210000000000";

        const url =
            "https://wa.me/" +
            telefono +
            "?text=" +
            mensaje;

        window.open(url, "_blank");

    });

}

