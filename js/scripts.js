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
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'type' in pokemon &&
            'height' in pokemon
        )   {
            pokemonList.push(pokemon);
        }   else {
            console.log('Pokemon is not correct');
        }
    }


    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('listItem-class');

        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        //on-click event
        button.addEventListener('click', function() {
            showDetails(pokemon)
        });
    }


    function showDetails(pokemon) {
        console.log(pokemon);
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
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
    pokemonRepository.addListItem(pokemon);
});