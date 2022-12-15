const pokemonList = document.getElementById('pokemonList')
// appendChild faz com que concatene mais um filho

const loadMore = document.getElementById('loadMore')
const showPoke = document.getElementById('about')
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
                    <div class="pokeImg">
                        <img src= "${pokemon.photo}">
                        </div>
                    <span id="texto">about</span>
                        <div class="icons">
                            <span id="peso"><img src="images/balanca.svg">${pokemon.peso/10} weight</span>
                            <span id="altura"><img src="images/regua.svg">${pokemon.altura/10} height</span>
                            <span>
                                <ol id="habilidades"><img src="images/swords.png">
                                    ${pokemon.abilities.map((abilitiy) => `<li class="habilidade">${abilitiy}</li>`).join('')}
                                </ol>
                            </span>
                        </div>
                    <span id="texto">Stats</span>
                    <div class="stats">
                        <ol id = "nomeStats">
                            ${pokemon.statsName.map((statName) => `<li class="statName">${statName}</li>`).join('')}
                        </ol>                                
                        <ol id="stat">
                            ${pokemon.stats.map((stat) => `<li class="stat">${stat}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </li>
            
        `).join('')
            pokemonList.innerHTML += newHTML
})
}

// function mostrar(pokemon, newHTML){
//     pokeAPI.getPokemoonDetail()
// }


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