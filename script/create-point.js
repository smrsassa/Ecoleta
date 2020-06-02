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

  fetch(url)
  .then( (res) => res.json() )
  .then( cities => {
    for( city of cities ) {
      citieSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
    }

    citieSelect.disabled = false

  } )
}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities )
