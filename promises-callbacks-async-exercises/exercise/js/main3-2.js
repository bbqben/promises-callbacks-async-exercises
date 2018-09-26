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

pokeApp.catchAllPokemon = () => {
    var promise1 = Promise.resolve(
        pokeApp.findPokemon('ditto').then((data) => {
            return data
        })
    );
    var promise2 = Promise.resolve(
        pokeApp.findPokemon('zapdos').then((data) => {
            return data
        })
    );
    var promise3 = Promise.resolve(
        pokeApp.findPokemon('mewtwo').then((data) => {
            return data
        })
    );

    return Promise.all([promise1, promise2, promise3]).then((pokemonList) => {
        pokemonList.map((pokemon) => {
            pokeApp.transferPokemonToPc(pokemon);
        })
    })
}

pokeApp.init = () => {
    pokeApp.catchAllPokemon().then(() => {
        pokeApp.sendToDaycare();
    });
}








pokeApp.transferPokemonToPc = (pokemon) => {
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