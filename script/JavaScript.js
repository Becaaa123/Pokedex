//Funções globais usadas para indentificar o pokemon, tanto pelo número como pelo nome
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_Imge');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttomPrev = document.querySelector('.btn-prev');
const buttomNext = document.querySelector('.btn-next');

let searchPokemon = 1;

//A função receberá um pokemon como um parametro e ela irá busca as informações desse pokemon
const fetchPokemon = async (pokemon) => {
    const APIresponde = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

//If usado para testar se a pesquisa é verdadeira ou falsa
    if (APIresponde.status === 200) {
        const data = await APIresponde.json();
        return data;
    }
}

// Essa função redenriza os dados dos pokemons para aparecer em nossa tela
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

//Avisa para o usuario se o que ele pesquisou é verdadeiro ou falso
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id; 
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else{
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = ''; 
        pokemonImage.style.display = 'none';
    }
}

//Função usada para fazer a pesquisa do pokemon
form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

//Botões
buttomPrev.addEventListener('click', () => {

    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon); 
    }
});

buttomNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);