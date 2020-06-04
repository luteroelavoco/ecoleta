 

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
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`;
    citySelect.innerHTML = `<option value=""> Selecione uma cidade </option>`;
    citySelect.disabled = true;
    fetch(url)
        .then((res) => res.json())
        .then((cities) => {
            citySelect.innerHTML = `<option value=""> Selecione uma cidade </option>`;
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`;
            }
            citySelect.disabled = false

        })
}

PopulateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)

// itens de coleta

const itemsToColect = document.querySelectorAll(".items-grid li");
const inputItem = document.querySelector("input[name=items]")
let selectedItems = [] 

for(const item of itemsToColect){
    item.addEventListener("click", handleSelectedItem)
}

// 


function handleSelectedItem(event){
    const itemLi = event.target;
   
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id;
    
    const alreadySelected = selectedItems.findIndex(item => item === itemId);
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => item !== itemId);
        selectedItems = filteredItems; 
    }else{
        selectedItems.push(itemId);
    }

    inputItem.value = selectedItems;
}