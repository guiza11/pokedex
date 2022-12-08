const pokeAPI = {}

function convertPokeAPIDetail(pokemonDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeAPI.getPokemoonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then((convertPokeAPIDetail))
}

pokeAPI.getPokemons = (offset = 0, limit = 30 ) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url) //busca da lista na api
        .then((response) => response.json()) //converter para json
        .then((jsonBody) => jsonBody.results)//pega a lista
        .then((pokemons) => pokemons.map(pokeAPI.getPokemoonDetail))//transforma na lista de promisses da nova requisição
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}
