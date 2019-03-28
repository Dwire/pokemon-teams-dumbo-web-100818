const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

getAllTrainers()

// --------------- Grabbing DOM Elements -------------------------
const trainerDiv = document.querySelector('#trainer-div')

// --------------- Add Event Listeners --------------------------

trainerDiv.addEventListener('click', handleEventLogic)

// --------------- Make Fetch Calls to Database -------------------
function getAllTrainers() {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => makeATrainerCard(trainers))
}

function deletPokemonFromDatabase(id) {
  fetch(POKEMONS_URL + `/${id}`, {
    method: 'DELETE'
  })
}

function addPokemonFetch(id) {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({trainer_id: id})
  })
  .then(res => res.json())
  .then(addPokemonToTrainerCard)
}


// --------------- Functions to manipulate data -----------------

function makeATrainerCard(trainers){
   trainers.forEach(trainer => {
     trainerDiv.innerHTML += createHtmlTrainerCard(trainer)
   })
}


function createHtmlTrainerCard(trainer) {
  return `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
      ${renderPokemon(trainer.pokemons)}
    </ul>
  </div>`
}

function renderPokemon(pokemons) {
  const mappedPokemon = pokemons.map(pokemon => {
       return createPokemonLi(pokemon)
      })

  return mappedPokemon.join(" ")
}

function createPokemonLi(pokemon) {
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}


function handleEventLogic(e) {
  if (e.target.className === 'release') {
    deletePokemonFromDom(e)
  }else if (e.target.textContent === "Add Pokemon") {
    const trainerId = e.target.dataset.trainerId
    addPokemonFetch(trainerId)
  }
}

function deletePokemonFromDom(e){
  const pokemonId = e.target.dataset.pokemonId
  e.target.parentElement.remove()

  deletPokemonFromDatabase(pokemonId)
}


function addPokemonToTrainerCard(pokemon) {
  const ul = document.querySelector(`[data-id="${pokemon.trainer_id}"] ul`)
  ul.innerHTML += createPokemonLi(pokemon)
}
