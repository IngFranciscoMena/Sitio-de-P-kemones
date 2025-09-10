// Crear un clase modelo llamada Pokémon

class Pokemon{
    
    // crear los atributos
    constructor(id, nombre, imagen, tipo){
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
    document.getElementById("formPokemon").addEventListener("submit", (e) =>{
        e.preventDefault();

        const pokemonName = document.getElementById("txtPokemon").value.trim().toLowerCase();

        obtenerPokemonPorNombre(pokemonName);
    });
});

// crear funciones
async function obtenerPokemonPorNombre(nombre){

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

    } catch(error) {
        console.log(error);
    }
}

function crearObjetoPokemon(json){
    const id = json.id;
    const nombre = json.name;
    const imagen = json.sprites.front_default;
    const tipo = json.types[0].type.name;

    return new Pokemon(id, nombre, imagen, tipo)
}