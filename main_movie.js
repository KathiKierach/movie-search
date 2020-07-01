"use strict";


//Abholen der Daten + push in Array
const api = 'https://ghibliapi.herokuapp.com/films/';
const movies = [];

fetch(api)
    //umwandeln des Data-Blobs in String
    .then(answer => answer.json())
    //push ins Array, spread-syntax um Arrays zusammenzuführen
    //Array im Array zu verhindern
    .then(data => movies.push(...data))


//Finde Eingabe im Array
//Übergeben werden Eingabe (this.value) und Array der Filme
function findMatches(wordMatches, movies) {
    return movies.filter(movie => {
        //RegExp(muster [, flags])
        //'gi' = g = general, i = gro/kleinschreibung ignorieren 
        const regex = new RegExp(wordMatches, 'gi');
        //Gib zurück Filmtitel oder Regisseur die Eingabe matchen
        return movie.title.match(regex) || movie.director.match(regex) || movie.release_date.match(regex);
    })
}


//Gib gefiltertes Array aus
let searchInput = document.querySelector('#input');
let suggestions = document.querySelector('#list');

function displayMatches() {
    const matchArray = findMatches(this.value, movies);

    const listElements = matchArray.map(movie => {
        const regex = new RegExp(this.value, 'gi');
        //finde Filmtitel 
        //replace Teile des Titels mit gehighlighteter
        const movieName = movie.title.replace(regex,
            `<span class="highlight">${this.value}</span>`);
        const directorName = movie.director.replace(regex,
            `<span class="highlight">${this.value}</span>`);
        const year = movie.release_date.replace(regex,
            `<span class="highlight">${this.value}</span>`);
        const description = movie.description;

        if (this.value == 0) return suggestions.innerHTML = "";

        return `<li> 
                <div class="tooltip">
                    <span class="tooltiptext">
                    ${movieName}, ${directorName}, ${year} 
                    <br> ${description}</span>
                    <span class="movieName">${movieName}</span>
                    </div>
                    <br>
                    <span class="directorName">${directorName}, ${year}</span>
                </li>`
    }).join('');

    suggestions.innerHTML = listElements;
}

searchInput.addEventListener('keyup', displayMatches); 