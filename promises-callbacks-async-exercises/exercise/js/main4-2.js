/* SETUP */
const pokeApp = {};
pokeApp.pokemonBox = [];
pokeApp.baseUrl = "https://pokeapi.co/api/v2/pokemon/";
/* SETUP */


pokeApp.findPokemon = (pokemonName) => {
    return $.ajax({
        url: pokeApp.baseUrl + pokemonName,
        method: "GET",
        dataType: "JSON",
    }).then((response) => {
        return (response.id);
    })
}

pokeApp.catchAllPokemon = async () => {
    pokeApp.findPokemon('ditto').then((data) => {
        pokeApp.catchPokemon(data);
    })
    pokeApp.findPokemon('zapdos').then((data) => {
        pokeApp.catchPokemon(data);
    })
    pokeApp.findPokemon('mewtwo').then((data) => {
        pokeApp.catchPokemon(data);
    })
}

pokeApp.init = () => {
    await pokeApp.catchAllPokemon();
    pokeApp.sendToDaycare();
}









pokeApp.catchPokemon = (pokemon) => {
    pokeApp.pokemonBox.push(pokemon);
}

pokeApp.sendToDaycare = () => {
    pokeApp.pokemonBox.map((pokemon, index) => {
        const selectedPokemon = '#pokemon' + (index + 1) + ' img';
        const pokemonImage = './images/' + pokemon + '.png';
        $(selectedPokemon).attr('src', pokemonImage);
    })
}

$(() => {
    pokeApp.init();
});