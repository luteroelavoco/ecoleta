 

function PopulateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then((res) => res.json())
        .then((states) => {
            for(state of states){
                ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`;
            }

        })
}

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const ufValue = event.target.value;
    const index = event.target.selectedIndex;
    stateInput.value = event.target.options[index].text;
    console.log(stateInput.value);
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`;
    fetch(url)
        .then((res) => res.json())
        .then((cities) => {
            citySelect.innerHTML = `<option value=""> Selecione um estado </option>`;
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.id}"> ${city.nome} </option>`;
            }
            citySelect.disabled = false

        })
}

PopulateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)