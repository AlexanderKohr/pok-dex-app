let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

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

        loadDetails(pokemon).then(function () {
        let imageDiv = document.createElement('div');
        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageURL;
        pokemonImage.classList.add('pokemon-image');

        imageDiv.appendChild(pokemonImage);
        button.appendChild(imageDiv);
        })

        //on-click event
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    // loadDetails(pokemon).then(function () {
    //     let imgDiv = document.createElement("div");
    //     button.appendChild(imgDiv);

    //     let pokemonImg = document.createElement("img");
    //     pokemonImg.src = pokemon.imageUrl;
    //     imgDiv.appendChild(pokemonImg);
    // })
    

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

    function loadDetails(pokemon) {
        let url = pokemon.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.types = details.types;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.abilities = details.abilities;
            pokemon.imageURL = details.sprites.front_default;
        }).catch(function (e) {
            console.error(e);
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
        
    }

    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
      
        modalContainer.innerHTML = '';
      
        let modal = document.createElement('div');
        modal.classList.add('modal');
      
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
      
        let pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name;
      
        let pokemonType = document.createElement('p');
        pokemonType.innerText = 'Type(s): ' + pokemon.types;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height;

        let pokemonWeight = document.createElement('p');
        pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

        let pokemonAbility = document.createElement('p');
        pokemonAbility.innerText = 'Abilities: ' + pokemon.abilities;

        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('pokemon-modal-image');
        pokemonImage.src = pokemon.imageURL;
      
        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonType);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonWeight);
        modal.appendChild(pokemonAbility);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);
      
        modalContainer.classList.add('is-visible');
      }

      function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
      }
      
      document.querySelector('#show-modal').addEventListener('click', () => {
        showModal();
      });

      window.addEventListener('keydown', (e) => {
          let modalContainer = document.querySelector('#modal-container');
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
              hideModal();
          }
      });

      modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
              hideModal();
          }
      });
      
     

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal

    };

})();



// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});