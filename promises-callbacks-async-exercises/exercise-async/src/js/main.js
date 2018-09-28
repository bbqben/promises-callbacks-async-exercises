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
        /*         headers: {
                    "Access-Control-Allow-Origin": "*",
                } */
    }).then((response) => {
        return (response.id);
    })
}

pokeApp.catchAllPokemon = async () => {
    const pokemon1 = await pokeApp.findPokemon('33');
    pokeApp.transferPokemonToPc(pokemon1);
    // const pokemon2 = await pokeApp.findPokemon('32');
    // pokeApp.transferPokemonToPc(pokemon2);
    // const pokemon3 = await pokeApp.findPokemon('88');
    // pokeApp.transferPokemonToPc(pokemon3);
};


pokeApp.init = async () => {

    await pokeApp.catchAllPokemon();

    pokeApp.sendToDaycare();
};

pokeApp.transferPokemonToPc = pokemon => {
    pokeApp.pokemonBox.push(pokemon);
};

pokeApp.sendToDaycare = () => {
    pokeApp.pokemonBox.map((pokemon, index) => {
        const selectedPokemon = "#pokemon" + (index + 1) + " img";
        const pokemonImage = "./images/" + pokemon + ".png";
        $(selectedPokemon).attr("src", pokemonImage);
    });
};

$(() => {
    pokeApp.init();
});