fetch('shoes.json')
    .then(response => response.json())
    .then(data => {console.log(data)

let arrayShoes = data.results;

for (i = 0; i < arrayShoes.length; i++) {

    document.getElementById('allShoes').innerHTML += `<div class="shoes">
    <img class="imgShoes" src="${arrayShoes[i].picture}" alt="">
    <p class="nameShoes">${arrayShoes[i].original_name}</p>
    <p class="category">${arrayShoes[i].category}</p>
    <p class="descriptionShoes">${arrayShoes[i].description.slice(0, 50)}...</p>
</div>`
};
})
