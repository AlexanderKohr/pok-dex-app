let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Venomoth',
            type: ['bug', 'poison'],
            height: 1.5,
            pokedexNumber: '#49'
        },
        {
            name: 'Mr. Mime',
            type: ['psychic', 'fairy'],
            height: 1.3,
            pokedexNumber: '#122'
        },
        {
            name: 'Tyranitar',
            type: ['dark', 'rock'],
            height: 2,
            pokedexNumber: '#248'
        },
        {
            name: 'Scizor',
            type: ['steel', 'bug'],
            height: 1.8,
            pokedexNumber: '#212'
        },
        {
            name: 'Jigglypuff',
            type: ['fairy', 'normal'],
            height: 0.5,
            pokedexNumber: '#39'
        },
        {
            name: 'Ditto',
            type: 'normal',
            height: 0.3,
            pokedexNumber: '#132'
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

})();


pokemonRepository.add({
    name: 'Blitzle',
    type: 'electric',
    height: 0.8,
    pokedexNumber: '#522'
});


// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<p>' + pokemon.name + ' (' + 'height: ' + pokemon.height + ') ' + pokemon.pokedexNumber + '</p>')
});
