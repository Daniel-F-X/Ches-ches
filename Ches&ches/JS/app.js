// BOTÓN PARA IR AL CONSTRUCTOR

const botonComenzar = document.getElementById("botonComenzar");

botonComenzar.addEventListener("click", function() {

    document.getElementById("personaliza").scrollIntoView({
        behavior: "smooth"
    });

});


// PRECIO DE LA TABLA

let precioTabla = 0;


// SELECCIONAR TAMAÑO

const opcionesTabla = document.querySelectorAll(".opcion-tabla");

opcionesTabla.forEach(function(opcion) {

    opcion.addEventListener("click", function() {

        // Quitamos selección anterior

        opcionesTabla.forEach(function(item) {
            item.classList.remove("seleccionada");
        });

        // Seleccionamos esta opción

        opcion.classList.add("seleccionada");

        // Guardamos su precio

        precioTabla = Number(opcion.dataset.precio);

        actualizarTotal();

    });

});


// INGREDIENTES

const ingredientes = document.querySelectorAll(
    ".checkbox-opcion input"
);

ingredientes.forEach(function(ingrediente) {

    ingrediente.addEventListener("change", function() {

        actualizarTotal();

    });

});


// CALCULAR TOTAL

function actualizarTotal() {

    let total = precioTabla;

    ingredientes.forEach(function(ingrediente) {

        if (ingrediente.checked) {

            total += Number(ingrediente.value);

        }

    });

    document.getElementById("total").textContent =
        "$" + total;

}