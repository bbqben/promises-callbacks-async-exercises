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
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }).then((response) => {
        return (response.id);
    })
}

pokeApp.catchAllPokemon = () => {
    pokeApp.findPokemon('ditto').then((data) => {
        pokeApp.transferPokemonToPc(data);
    })
    pokeApp.findPokemon('zapdos').then((data) => {
        pokeApp.transferPokemonToPc(data);
    })
    pokeApp.findPokemon('mewtwo').then((data) => {
        pokeApp.transferPokemonToPc(data);
    })
}

pokeApp.init = () => {
    pokeApp.catchAllPokemon();

    pokeApp.sendToDaycare();
}








pokeApp.transferPokemonToPc = (pokemon) => {
    pokeApp.pokemonBox.push(pokemon);
}

pokeApp.sendToDaycare = () => {
    console.log('sending pokemon to daycare');
    pokeApp.pokemonBox.map((pokemon, index) => {
        const selectedPokemon = '#pokemon' + (index + 1) + ' img';
        const pokemonImage = './images/' + pokemon + '.png';
        $(selectedPokemon).attr('src', pokemonImage);
    })
}

$(() => {
    pokeApp.init();
});