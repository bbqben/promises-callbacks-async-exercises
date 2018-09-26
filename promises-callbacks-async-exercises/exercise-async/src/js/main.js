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
    pokeApp.catchAllPokemon();

    setTimeout(() => {
        pokeApp.sendToDaycare();
    }, 5000);
}








pokeApp.catchPokemon = (pokemon) => {
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
    // pokeApp.init();


    async function testFunction() {

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 1000)
        });

        let result = await promise; // wait till the promise resolves (*)

        alert(result); // "done!"
    }

    testFunction();


});