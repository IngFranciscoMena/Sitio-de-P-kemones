// Crear un clase modelo llamada Pokémon

class Pokemon {

    // crear los atributos
    constructor(id, nombre, imagen, tipo) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.tipo = tipo;
    }

    // métodos
}

// agregar eventos
document.addEventListener("DOMContentLoaded", () => {

    // agregar un evento submit a mi formulario
    document.getElementById("formPokemon").addEventListener("submit", (e) => {
        e.preventDefault();

        const pokemonName = document.getElementById("txtPokemon").value.trim().toLowerCase();

        obtenerPokemonPorNombre(pokemonName);
    });
});

// crear funciones
async function obtenerPokemonPorNombre(nombre) {

    // bloque try-catch
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${nombre}/`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Pokémon no encontrado!");
        }

        // creo un objeto
        const data = await respuesta.json();

        const pokemon = crearObjetoPokemon(data);

        console.log(pokemon);

        mostrarPokemon(pokemon);

    } catch (error) {
        console.log(error);
    }
}

function crearObjetoPokemon(json) {
    const id = json.id;
    const nombre = json.name;
    const imagen = json.sprites.front_default;
    const tipo = json.types;

    return new Pokemon(id, nombre, imagen, tipo)
}

function mostrarPokemon(pokemon) { // recibiendo un objeto pokemon
    // Crear elementos html

    // Columnas bootstrap
    const col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

    // Elemento card
    const card = document.createElement("div");
    card.classList.add("card", "h-100", "text-center", "shadow-sm");

    // Elemento img
    const img = document.createElement("img");
    img.classList.add("card-img-top", "p-3");
    // agregar referencia
    img.src = pokemon.imagen;
    img.alt = pokemon.nombre;

    // Elemento card-body
    const body = document.createElement("div");
    body.classList.add("card-body");

    // agregar ID del pokemon
    const pid = document.createElement("p");
    pid.classList.add("card-text");
    pid.textContent = pokemon.id;

    // agregar el nombre del pokemon como Titulo 
    const title = document.createElement("h4");
    title.classList.add("card-title");
    title.textContent = pokemon.nombre;

    // mostrar cada tipo
    pokemon.tipo.forEach(type => {
        // tipo de pokemon
        const tipo = document.createElement("p");
        tipo.classList.add("card-text");

        // const badge 
        const badge = document.createElement("span");

        if (type.type.name == "fire") {
            badge.classList.add("badge", "bg-danger");
            badge.textContent = type.type.name;
        } else {
            badge.classList.add("badge", "bg-info");
            badge.textContent = type.type.name;
        }

        // Esamblar el tipo con el componente badge
        tipo.appendChild(badge); // <p><span></span></p>

        // agrego cada elemento al body
        body.appendChild(tipo);
    });


    // Ensamblar elementos
    const div = document.getElementById("grid");

    // badge.appendChild(tipo); // <span><p></p></span>


    body.appendChild(title);
    body.appendChild(pid);

    card.appendChild(img);
    card.appendChild(body);

    col.appendChild(card);

    div.appendChild(col);
}