let pokemonRepository=(function(){let pokemonList=[];let apiURL='https://pokeapi.co/api/v2/pokemon/?limit=150';let modalContainer=document.querySelector('#exampleModal');function add(pokemon){if(typeof pokemon==='object'&&'name' in pokemon){pokemonList.push(pokemon)}else{console.log('Pokemon is not correct')}}
function getAll(){return pokemonList}
function addListItem(pokemon){let pokemonList=document.querySelector('.pokemon-list');let listItem=document.createElement('li');let button=document.createElement('button');listItem.classList.add('listItem-class');button.innerText=pokemon.name;button.classList.add('button-class');listItem.appendChild(button);pokemonList.appendChild(listItem);loadDetails(pokemon).then(function(){let imageDiv=document.createElement('div');let pokemonImage=document.createElement('img');pokemonImage.src=pokemon.imageURL;pokemonImage.classList.add('pokemon-image');imageDiv.appendChild(pokemonImage);button.appendChild(imageDiv)})
button.addEventListener('click',function(){showDetails(pokemon,modalContainer)})}
function loadList(){return fetch(apiURL).then(function(response){return response.json()}).then(function(json){json.results.forEach(function(item){let pokemon={name:item.name,detailsURL:item.url};add(pokemon)})}).catch(function(e){console.error(e)})}
function loadDetails(pokemon){let url=pokemon.detailsURL;return fetch(url).then(function(response){return response.json()}).then(function(details){pokemon.types=details.types;pokemon.height=details.height;pokemon.weight=details.weight;pokemon.abilities=details.abilities;pokemon.imageURL=details.sprites.front_default}).catch(function(e){console.error(e)})}
function showDetails(pokemon){loadDetails(pokemon).then(function(){showModal(pokemon)})}
function showModal(pokemon){let modalBody=$('.modal-body');let modalTitle=$('.modal-title');modalTitle.empty();modalBody.empty();let pokemonName=$('<h1>'+pokemon.name+'</h1>');let pokemonImage=$('<img class="modal-img" style="width:50%">');pokemonImage.attr('src',pokemon.imageURL);let pokemonHeight=$('<p>'+'Height: '+pokemon.height+'</p>');let pokemonWeight=$('<p>'+'Weight: '+pokemon.weight+'</p>');let pokemonType=document.createElement('p');let typesCon=''
pokemon.types.forEach(element=>{typesCon+=`${element.type.name},`});pokemonType.innerText='Type(s): '+typesCon;let pokemonAbility=document.createElement('p');let abilitiesCon=''
pokemon.abilities.forEach(element=>{abilitiesCon+=`${element.ability.name},`});pokemonAbility.innerText='Abilities: '+abilitiesCon;modalTitle.append(pokemonName);modalBody.append(pokemonImage);modalBody.append(pokemonHeight);modalBody.append(pokemonWeight);modalBody.append(pokemonType);modalBody.append(pokemonAbility);$('#exampleModal').modal()}
$(document).ready(function(){$("#search-pokemon").on("keyup",function(){var value=$(this).val().toLowerCase();$(".button-class").filter(function(){$(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)})})});return{add:add,getAll:getAll,addListItem:addListItem,loadList:loadList,loadDetails:loadDetails,showDetails:showDetails,showModal:showModal}})();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(pokemon){pokemonRepository.addListItem(pokemon)})})