// ----------- URLS -----------------------
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// ----- Grab Core Elements from DOM ------------

const main = document.querySelector('main')

// ----------------ADD Event Listeners-----------

main.addEventListener('click', handleClickEvent)

// -------------- FETCH TO DATABASE -------------------------
fetch(TRAINERS_URL)
.then(res => res.json())
.then(createTrainerCards)

function releasePokemon(id) {
  return fetch(`${POKEMONS_URL}/${id}`, {
    method: 'DELETE'
  })
}

function addPokemon(id){
  return fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({trainer_id: id})
  })
  .then(res => res.json())
  // .then(console.log)
}

function createTrainerCards(trainers) {
  trainers.forEach(trainer => {
    main.innerHTML +=`
    <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>
        ${createPokemonLis(trainer.pokemons)}
      </ul>
    </div>
    `
  })
}

function createPokemonLis(pokemons) {
  let pokemonList = pokemons.map(pokemon => {
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  })

  return pokemonList.join(" ")
}

function handleClickEvent(e) {
  if (e.target.className === "release") {
    const pokemonId = e.target.dataset.pokemonId
    releasePokemon(pokemonId).then(res => e.target.parentElement.remove())
  }else if (e.target.textContent === 'Add Pokemon') {
    const trainerId = e.target.dataset.trainerId
    addPokemon(trainerId).then(res => {
      e.target.nextElementSibling.innerHTML += `<li>${res.nickname} (${res.species}) <button class="release" data-pokemon-id="${res.id}">Release</button></li>`
    })
  }
}


// const test = document.querySelector(`button[data-trainer-id=${res.trainer_id}] > ul`)
