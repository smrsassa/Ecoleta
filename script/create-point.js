//fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res) {return res.json() }).then(function(data){console.log(data)})

function populateUFs() {

  const uFselect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( (res) => res.json() )
  .then( states => {
    for( states of states ) {
      uFselect.innerHTML += `<option value="${states.id}">${states.nome}</option>`
    }
  } )

}

populateUFs()

function getCities ( event ) {
  const citieSelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const citieValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${citieValue}/municipios`

  citieSelect.innerHTML = "<option value>Selecione a cidade</option>"
  citieSelect.disabled = true

  fetch(url)
  .then( (res) => res.json() )
  .then( cities => {

    for( city of cities ) {
      citieSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citieSelect.disabled = false

  } )
}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities )


// Itens de coleta
// todos os li's

const itensColeta = document.querySelectorAll(".itens-grid li")

for ( item of itensColeta ) {
  document.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem() {

  const itemLi = event.target
  // Add ou remover uma classe
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  //verificar itens selecionados
  const alreadySelected = selectedItens.findIndex( (item) => {
    return item == itemId
  })

  if ( alreadySelected >= 0 ) {
    const filterItems = selectedItens.filter( (item) => {
      return item != itemId
    })

      selectedItens = filterItems

  } else {
    selectedItens.push(itemId)
  }

  collectedItems.value = selectedItens

}