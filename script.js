fetch('shoes.json')
    .then(response => response.json())
    .then(data => {console.log(data)

let arrayShoes = data.results;

for (i = 0; i < arrayShoes.length; i++) {

    document.getElementById('shoes').innerHTML += `<div class="movie">
    <img class="imgMovie" src="${arrayShoes[i].picture}" alt="">
    <p class="title">${arrayShoes[i].original_name}</p>
    <p class="summary">${arrayShoes[i].description} ...</p>
</div>`
};
})
