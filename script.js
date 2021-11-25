//Afficher les articles selon la catégories choisies
function displayShoes(filtre) {
    fetch('shoes.json')
        .then(response => response.json())
        .then(data => {
            (data)

            let arrayShoes = data.results;
            document.getElementById('allShoes').innerHTML = '';
            for (i = 0; i < arrayShoes.length; i++) {
                if (filtre == 'All' || arrayShoes[i].category == filtre) {
                    document.getElementById('allShoes').innerHTML += `<div class="shoes">
        <div><img class="imgShoes" src="${arrayShoes[i].picture}" alt=""></div>
        <p class="nameShoes">${arrayShoes[i].original_name}</p>
        <p class="categoryShoes">${arrayShoes[i].category}</p>
        <p class="descriptionShoes">${arrayShoes[i].description.slice(0, 60)}...</p>
        <div class="gridAdd"><p class="priceShoes">${arrayShoes[i].price} €</p>
        <button data-show data-name="${arrayShoes[i].original_name}" data-pict="${arrayShoes[i].picture}" data-ref="${arrayShoes[i].reference}" data-price="${arrayShoes[i].price}" class="addShoes">Ajouter</button></div>
        </div>`
                }
            };
        })
}

displayShoes('All')
document.addEventListener('click', displayFilter);

function displayFilter(element) {
    if (element.target.className == 'choiceCat') {
        let catButton = element.target.textContent;
        displayShoes(catButton);
    }
}


//Modifier la quantité et le prix
function changeQte(valeur, index) {
    arrayRef[index][3] = Number(valeur);
    let xTot = arrayRef[index][3] * arrayRef[index][2];
    document.getElementById("price-" + index).textContent = xTot + " €";
    document.getElementById('totalBasket').textContent = `Total panier: ${calcTotal()} €`;
    document.getElementById('countArt').textContent = countNbArt();
}


//Afficher le panier et son contenu
document.getElementById('basket').onclick = () => {
    if (countNbArt() != 0) {
        document.getElementById('modalBasket').style.display = 'block';
        document.getElementById('contentBasket').innerHTML = '';
        for (let index in arrayRef) {
            let title = arrayRef[index][0];
            let picture = arrayRef[index][1];
            let price = arrayRef[index][2];
            let qte = arrayRef[index][3];
            document.getElementById('contentBasket').innerHTML +=
                `<div class="gridModal" id="obj-${index}">
             <img class="imgModal" src="${picture}" alt="">
             <p class="nameModal">${title}</p>
             <p class="refModal">Réf.: ${index}</p>
             <p class="qteModal">Qté: <input id="${index}" class="inputQte" type="number" min="1" max="10" value="${qte}" onchange="changeQte(this.value, this.id)"></p>
             <p id="price-${index}" class="priceModal">${price*qte} €</p>
             <img src="img/trash-alt-solid.svg" id="bin-${index}" class="delete"></img>
         </div>`;
        }
        document.getElementById('totalBasket').textContent = `Total panier: ${calcTotal()} €`;
    }
}

//Fermer le panier
document.getElementsByClassName('close')[0].onclick = () => {
    document.getElementById('modalBasket').style.display = 'none';
}

//Ajouter un élément au panier au clic sur le bouton "Ajouter"
document.addEventListener('click', addItem)

let arrayRef = [];

function addItem(event) {
    if (event.target.hasAttribute('data-show')) {
        let title = event.target.dataset.name;
        let picture = event.target.dataset.pict;
        let reference = event.target.dataset.ref;
        let price = event.target.dataset.price;
        let xRef = 'R' + reference.toString();
        if (arrayRef[xRef]) {
            if (arrayRef[xRef][3] < 10) {
                arrayRef[xRef][3]++;
            }
        } else {
            arrayRef[xRef] = [title, picture, price, 1];
        }
        document.getElementById('countArt').textContent = countNbArt();
    }
}


//Supprimer un article
function deleteArticle(e) {
    if (e.target.id.includes('bin')) {
        let indexBin = e.target.id.split('-').pop();
        document.getElementById(`obj-${indexBin}`).remove();
        delete arrayRef[indexBin];
        document.getElementById('totalBasket').textContent = `Total panier: ${calcTotal()} €`;
        document.getElementById('countArt').textContent = countNbArt();
    }
    console.log(arrayRef)

}

document.addEventListener('click', deleteArticle);

//Calculer le total du panier
function calcTotal() {
    let total = 0;
    for (let index in arrayRef) {
        let price = arrayRef[index][2];
        let qte = arrayRef[index][3];
        total += price * qte;
    }
    return total;
}

//Afficher nombre d'articles dans le panier
function countNbArt() {
    let count = 0
    for (let index in arrayRef) {
        count += arrayRef[index][3];
    }
    return count;
}