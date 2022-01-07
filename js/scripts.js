let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
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

    

    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageURL = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
        
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

})();



// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});