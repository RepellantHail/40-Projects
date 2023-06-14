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
    cardBody.classList.add('text-bg-primary')
    cardBody.classList.add('mb-3')

    const cardTitle = document.createElement('div')
    cardTitle.classList.add('card-header')
    cardTitle.classList.add('fs-3')
    cardTitle.textContent = pokemon.name.toString().toUpperCase()

    const cardList = document.createElement('ul')
    cardList.classList.add('list-group')
    cardList.classList.add('list-group-flush')

    const cardListElement = document.createElement('li')
    cardListElement.classList.add('list-group-item')
    cardListElement.style.margin = "0px"
    cardListElement.style.padding = "0px"

    const sprite = document.createElement('img')
    sprite.classList.add("card-img-top")
    sprite.classList.add("border")
    sprite.classList.add("border-primary-subtle")
    // sprite.style.backgroundImage = "url('https://www.clipartmax.com/png/small/129-1298464_open-pokeball-download-open-pokeball.png')"
    sprite.style.backgroundSize = "cover"
    sprite.style.backgroundPosition = "center"
    sprite.src = pokemon.sprites.front_default

    const height = document.createElement('p')
    height.style.display = ("inline-block")
    height.classList.add('card-text')
    height.style.marginRight = "10px"
    height.style.padding = "0px"
    height.classList.add('fs-5')
    height.textContent = pokemon.height*10+"cm"

    const weight = document.createElement('p')
    weight.style.display = ("inline-block")
    weight.classList.add('card-text')
    weight.style.margin = "0px"
    weight.style.padding = "0px"
    weight.classList.add('fs-5')
    weight.textContent = pokemon.weight/10+"kg"

    const number = document.createElement('p')
    number.style.margin = "0px"
    number.style.padding = "0px"
    number.classList.add('card-text')
    number.classList.add('fs-4')
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`

    let typeNames = '';
    pokemon.types.forEach((objType, index) => {
        typeNames += objType.type.name
        // .toString().charAt(0).toUpperCase()+objType.type.name.toString().slice(1);
        if (index !== pokemon.types.length - 1) 
            typeNames += ', ';
    });

    const types = document.createElement('h5')
    types.style.margin = "0px"
    types.style.padding = "0px"
    types.classList.add('card-title')
    types.classList.add('fs-3')    
    types.textContent = typeNames;
    types.style.color = "white"
    types.style.textShadow = "2px 2px 4px #000000"
    types.style.backgroundColor = typeColor(typeNames)
    types.style.textTransform = "capitalize"

    cardListElement.appendChild(number)
    cardListElement.appendChild(types)
    cardListElement.appendChild(height)
    cardListElement.appendChild(weight)
    // cardListElement.appendChild(physic)
    cardList.appendChild(cardListElement)
    cardBody.appendChild(cardList)

    card.appendChild(cardTitle)
    card.appendChild(sprite)
    card.appendChild(cardBody)
    // card.appendChild(cardBody)

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
    statsContainer.classList.add("card")
    statsContainer.classList.add("border-dark")
    statsContainer.classList.add("mb-3")

    const cardBackTitle = document.createElement("h5")
    cardBackTitle.classList.add('card-title')
    cardBackTitle.textContent = "Stats"

    const statsList = document.createElement('ul')
    statsList.classList.add("list-group")
    statsList.classList.add("list-group-flush")
    statsList.style.height = "inherit"

    for(let i = 0; i < 6; i++){
        const stat = stats[i]
        const statContainer = document.createElement("li")
        statContainer.classList.add("list-group-item")
        statContainer.style.margin = "0px"
        statContainer.style.padding = "0px"

        const statName = document.createElement("p")
        statName.textContent = stat.stat.name+`:${stat.base_stat}`
        statName.style.margin = "0px"

        const progressBar = document.createElement('div')
        progressBar.classList.add('progress')
        progressBar.style.margin = "0px"
        progressBar.setAttribute("role","progressbar")
        progressBar.setAttribute("aria-label","Basic-example")
        progressBar.setAttribute("aria-valuenow",stat.base_stat)
        progressBar.setAttribute("aria-valuemin",0)
        progressBar.setAttribute("aria-valuemax",250)

        const progress = document.createElement('div')
        progress.classList.add('progress-bar')
        progress.style.width = (stat.base_stat * 100)/255+"%"
        // progressBar.textContent = stat.base_stat

        progressBar.appendChild(progress)
        // statContainer.appendChild(statName)
        // statContainer.appendChild(progress)

        statContainer.appendChild(statName)
        statContainer.appendChild(progressBar)
        statsList.appendChild(statContainer)
        statsContainer.appendChild(cardBackTitle)
        statsContainer.appendChild(statsList)
    }
    return statsContainer
}

function typeColor(type){
    var mapColors = new Map()
    mapColors.set("fire","tomato")
    mapColors.set("water","dodgerblue")
    mapColors.set("grass","lightgreen")
    mapColors.set("poison","purple")
    mapColors.set("normal","burlywood")
    mapColors.set("electric","gold")
    mapColors.set("ice","aquamarine")
    mapColors.set("fighting","brown")
    mapColors.set("ground","bisque")
    mapColors.set("flying","cadetblue")
    mapColors.set("psychic","deeppink")
    mapColors.set("bug","olivedrab")
    mapColors.set("rock","tan")
    mapColors.set("ghost","slateblue")
    mapColors.set("dark","dimgray")
    mapColors.set("dragon","indigo")
    mapColors.set("steel","darkgray")
    mapColors.set("fairy","lightcoral")

    console.log(type)
    return mapColors.get(type)
}

fetchPokemons(offset,limit)