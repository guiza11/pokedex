const pokemonList = document.getElementById('pokemonList')
// appendChild faz com que concatene mais um filho

const loadMore = document.getElementById('loadMore')

const maxRecord = 151;
const limit = 12;
let offset = 0;






function loadPokemon(offset, limit){
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) =>
        `
        <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    <img src= "${pokemon.photo}">
                </div>
            </li>
        `).join('')
            pokemonList.innerHTML += newHTML
})
}


loadPokemon(offset, limit)


loadMore.addEventListener('click', () => {
    offset += limit
    const qtdrecord = offset + limit
    
    if (qtdrecord >= maxRecord){
        const newLimit = maxRecord - maxRecord
        loadPokemon(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    }else{
        loadPokemon(offset, limit)
    }
})