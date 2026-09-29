

const productos = {

    franceses: {

        nombre: "Tabla de quesos franceses",

        categoria: "QUESOS",

        precio: 350,

        imagen: "img/tabla-pequena.jpg",

        descripcion:
            "Una selección de quesos para disfrutar y compartir.",

        incluye: [
            "80 g de queso",
            "80 g de carne fría",
            "100 g de fruta"
        ],

        extras: [

            {
                nombre: "Brie",
                precio: 120
            },

            {
                nombre: "Manchego",
                precio: 100
            },

            {
                nombre: "Nueces",
                precio: 30
            },

            {
                nombre: "Mermelada",
                precio: 40
            }

        ]

    },


    clasica: {

        nombre: "Tabla Clásica",

        categoria: "CHARCUTERÍA",

        precio: 550,

        imagen: "img/tabla-mediana.jpg",

        descripcion:
            "Quesos, carnes frías y complementos para compartir.",

        incluye: [
            "160 g de queso",
            "160 g de carne fría",
            "200 g de fruta"
        ],

        extras: [

            {
                nombre: "Brie",
                precio: 120
            },

            {
                nombre: "Jamón serrano",
                precio: 150
            },

            {
                nombre: "Nueces",
                precio: 30
            },

            {
                nombre: "Mermelada",
                precio: 40
            }

        ]

    },


    grande: {

        nombre: "Tabla Grande",

        categoria: "PARA COMPARTIR",

        precio: 750,

        imagen: "img/tabla-grande.jpg",

        descripcion:
            "Una tabla pensada para reuniones y ocasiones especiales.",

        incluye: [
            "240 g de queso",
            "240 g de carne fría",
            "300 g de fruta"
        ],

        extras: [

            {
                nombre: "Brie",
                precio: 120
            },

            {
                nombre: "Jamón serrano",
                precio: 150
            },

            {
                nombre: "Nueces",
                precio: 30
            },

            {
                nombre: "Mermelada",
                precio: 40
            }

        ]

    }

};


// ==========================================
// OBTENER PRODUCTO DE LA URL
// ==========================================

const parametros = new URLSearchParams(
    window.location.search
);

const productoId = parametros.get("producto");

const producto = productos[productoId];


// ==========================================
// COMPROBAR PRODUCTO
// ==========================================

if (!producto) {

    window.location.href = "index.html";

}


// ==========================================
// MOSTRAR PRODUCTO
// ==========================================

document.getElementById("productoImagen").src =
    producto.imagen;

document.getElementById("productoImagen").alt =
    producto.nombre;

document.getElementById("productoCategoria").textContent =
    producto.categoria;

document.getElementById("productoNombre").textContent =
    producto.nombre;

document.getElementById("productoDescripcion").textContent =
    producto.descripcion;

document.getElementById("productoPrecio").textContent =
    producto.precio;

document.getElementById("productoTotal").textContent =
    "$" + producto.precio;


// ==========================================
// MOSTRAR LO QUE INCLUYE
// ==========================================

const productoIncluye =
    document.getElementById("productoIncluye");


producto.incluye.forEach(function (item) {

    const li = document.createElement("li");

    li.textContent = "✓ " + item;

    productoIncluye.appendChild(li);

});


// ==========================================
// MOSTRAR EXTRAS
// ==========================================

const extrasContainer =
    document.getElementById("extras");


producto.extras.forEach(function (extra, index) {

    const label =
        document.createElement("label");

    label.className = "extra-opcion";


    label.innerHTML = `

        <input
            type="checkbox"
            value="${extra.precio}"
            data-nombre="${extra.nombre}"
            id="extra-${index}">

        <span>
            ${extra.nombre}
        </span>

        <strong>
            +$${extra.precio}
        </strong>

    `;


    extrasContainer.appendChild(label);

});


// ==========================================
// CALCULAR TOTAL
// ==========================================

const checkboxes =
    document.querySelectorAll(
        ".extra-opcion input"
    );


checkboxes.forEach(function (checkbox) {

    checkbox.addEventListener(
        "change",
        calcularTotal
    );

});


function calcularTotal() {

    let total = producto.precio;


    checkboxes.forEach(function (checkbox) {

        if (checkbox.checked) {

            total += Number(
                checkbox.value
            );

        }

    });


    document.getElementById(
        "productoTotal"
    ).textContent =
        "$" +
        total.toLocaleString("es-MX");

}


// ==========================================
// AGREGAR AL CARRITO
// ==========================================

document.getElementById(
    "btnAgregar"
).addEventListener(
    "click",
    function () {

        const extrasSeleccionados = [];


        checkboxes.forEach(function (checkbox) {

            if (checkbox.checked) {

                extrasSeleccionados.push({

                    nombre:
                        checkbox.dataset.nombre,

                    precio:
                        Number(checkbox.value)

                });

            }

        });


        const total =
            producto.precio +
            extrasSeleccionados.reduce(
                function (suma, extra) {

                    return suma + extra.precio;

                },
                0
            );


        const pedido = {

            producto: producto.nombre,

            precioBase: producto.precio,

            extras: extrasSeleccionados,

            total: total

        };


        localStorage.setItem(
            "pedidoMiTabla",
            JSON.stringify(pedido)
        );


        alert(
            "¡Producto agregado al carrito!"
        );

    }
);