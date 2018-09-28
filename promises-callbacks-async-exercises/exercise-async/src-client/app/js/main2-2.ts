/* SETUP */
const pokeApp: any = {};
pokeApp.pokemonBox = [];
pokeApp.baseUrl = "https://pokeapi.co/api/v2/pokemon/";
/* SETUP */

pokeApp.findPokemon = pokemonName => {
	return $.ajax({
		url: pokeApp.baseUrl + pokemonName,
		method: "GET",
		dataType: "JSON"
	}).then(response => {
		return response.id;
	});
};

pokeApp.catchAllPokemon = () => {
	pokeApp.findPokemon("ditto").then(data => {
		pokeApp.transferPokemonToPc(data, () => {
			pokeApp.findPokemon("zapdos").then(data => {
				pokeApp.transferPokemonToPc(data, () => {
					pokeApp.findPokemon("mewtwo").then(data => {
						pokeApp.transferPokemonToPc(data, () => {
							pokeApp.sendToDaycare();
						});
					});
				});
			});
		});
	});
};

pokeApp.init = () => {
	pokeApp.catchAllPokemon();
};

pokeApp.transferPokemonToPc = (pokemon, callBack) => {
	pokeApp.pokemonBox.push(pokemon);
	callBack && callBack();
};

pokeApp.sendToDaycare = () => {
	pokeApp.pokemonBox.map((pokemon, index) => {
		const selectedPokemon = "#pokemon" + (index + 1) + " img";
		const pokemonImage = "./images/" + pokemon + ".png";
		$(selectedPokemon).attr("src", pokemonImage);
	});
};

export { pokeApp };
