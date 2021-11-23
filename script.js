//Afficher les articles selon la catégories choisies
function displayShoes(filtre){
    fetch('shoes.json')
    .then(response => response.json())
    .then(data => {(data)

let arrayShoes = data.results;
document.getElementById('allShoes').innerHTML ='';
for (i = 0; i < arrayShoes.length; i++) {
    if(filtre == 'All' || arrayShoes[i].category == filtre){
        document.getElementById('allShoes').innerHTML += `<div class="shoes">
        <img class="imgShoes" src="${arrayShoes[i].picture}" alt="">
        <p class="nameShoes">${arrayShoes[i].original_name}</p>
        <p class="categoryShoes">${arrayShoes[i].category}</p>
        <p class="descriptionShoes">${arrayShoes[i].description.slice(0, 60)}...</p>
        <div class="gridAdd"><p class="priceShoes">${arrayShoes[i].price} €</p>
        <button class="addShoes">Ajouter</button></div>
        </div>`
    }
};
})
}

displayShoes('All')
document.addEventListener('click', displayFilter);

function displayFilter(element){
    if(element.target.className == 'choiceCat'){
        let catButton = element.target.textContent;
        displayShoes(catButton);
    }
}


//Afficher et fermer le panier
document.getElementById('basket').onclick = () => {
    document.getElementById('modalBasket').style.display = 'block';

}

document.getElementsByClassName('close')[0].onclick = () => {
    document.getElementById('modalBasket').style.display = 'none';
}


function displayArticlesBasket(){
    
}

