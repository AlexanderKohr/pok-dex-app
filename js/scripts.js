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

// for loop that displays all pokemons of pokemonList with name an height
for (let i=0; i < pokemonList.length; i++){
    document.write(pokemonList[i].name + 
    ' (' + 'height: ' + 
    pokemonList[i].height + ')'+ ("<br>"));
// conditional for pokemon with a heigth more than 1.9
    if (pokemonList[i].height > 1.9){
        document.write(' -' + 'Wow, that\'s big! ');
    }
  }

