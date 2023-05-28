const pokemonContainer = document.querySelector(".pokemon-container")
const spinner = document.getElementById("spinner")
const previous = document.getElementById("previous")
const next = document.getElementById("next")

let offset = 1
let limit = 8

previous.addEventListener('click', () =>{
    if(offset != 1){
        offset -= 9
        removeChildNodes(pokemonContainer)
        fetchPokemons(offset,limit)
    }
})

next.addEventListener('click', () =>{
    offset += 9
    removeChildNodes(pokemonContainer)
    fetchPokemons(offset,limit)
})

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then((pokemon) => {
        createPokemon(pokemon)
        spinner.style.display = "none"
    })
}

function fetchPokemons(offset, limit){
    spinner.style.display = "block"
    for(let i = offset; i <= offset + limit; i++){
        fetchPokemon(i)
    }
}

function createPokemon(pokemon){
    const row = document.createElement('div')
    row.classList.add('row')

    const flipCard = document.createElement('div')
    flipCard.classList.add('flip-card')

    const cardContainer = document.createElement('div')
    cardContainer.classList.add('card-container')

    flipCard.appendChild(cardContainer)

    const card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("text-bg-primary")
    card.style.maxWidth = "18rem"

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    const cardTitle = document.createElement('div')
    cardTitle.classList.add('card-header')
    cardTitle.classList.add('fs-3')
    cardTitle.textContent = pokemon.name.toString().toUpperCase()

    const sprite = document.createElement('img')
    sprite.classList.add("card-img-top")
    sprite.classList.add("border")
    sprite.classList.add("border-primary-subtle")
    // sprite.style.backgroundImage = "url('https://www.clipartmax.com/png/small/129-1298464_open-pokeball-download-open-pokeball.png')"
    sprite.style.backgroundSize = "cover"
    sprite.style.backgroundPosition = "center"
    sprite.src = pokemon.sprites.front_default

    const number = document.createElement('p')
    number.classList.add('card-text')
    number.classList.add('fs-4')
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`

    const types = document.createElement('h5')
    types.classList.add('card-title')
    types.classList.add('fs-3')
    let typeNames = '';
    pokemon.types.forEach((objType, index) => {
        typeNames += objType.type.name
        // .toString().charAt(0).toUpperCase()+objType.type.name.toString().slice(1);
        if (index !== pokemon.types.length - 1) 
            typeNames += ', ';
    });
    types.textContent = typeNames;
    types.style.textTransform = "capitalize"

    cardBody.appendChild(types)
    cardBody.appendChild(number)


    card.appendChild(cardTitle)
    card.appendChild(sprite)
    card.appendChild(cardBody)

    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemon-block-back')
    cardBack.style.color ="black"
    cardBack.appendChild(progressBar(pokemon.stats))

    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)
    pokemonContainer.appendChild(flipCard)

}

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}


function progressBar(stats){
    const statsContainer = document.createElement("div")
    statsContainer.classList.add("stats-container")

    for(let i = 0; i < 3; i++){
        const stat = stats[i]
        const statPercent = stat.base_stat / 2 +"%"

        const statContainer = document.createElement("div")
        statContainer.classList.add("stat-container")

        const statName = document.createElement('div')
        statName.textContent = stat.stat.name

        const progress = document.createElement('div')
        progress.classList.add('progress')

        const progressBar = document.createElement('div')
        progressBar.classList.add('progress-bar')
        progressBar.setAttribute("aria-valuenow",stat.base_stat)
        progressBar.setAttribute("aria-valuemin",0)
        progressBar.setAttribute("aria-valuemax",200)
        progress.style.width = statPercent
        progressBar.textContent = stat.base_stat

        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)
        statsContainer.appendChild(statContainer)
    }
    return statsContainer
}

fetchPokemons(offset,limit)