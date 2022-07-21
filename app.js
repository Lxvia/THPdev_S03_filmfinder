import API_KEY from './API_KEY.js';
let movieData = [];

const searchBar = document.getElementById('search');
const submitBtn = document.getElementById('button');
const resultDiv = document.getElementById('result');
const popupDiv = document.getElementById('popup');

const getMovieData = (incomingUrl) => {
    fetch (incomingUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(movieData = data.Search);
        movieDisplay();
        observe();
        const popupBtn = document.querySelectorAll("a");
        popupBtn.forEach((button) => {
            button.addEventListener("click", () => {
              getDetailData(button);
            });
          });
    });

};

const movieDisplay = () => {
    //await getMovieData();
    resultDiv.innerHTML = movieData.map((movie) => 
    `<div class="card mb-4" style="width: 18rem;">
    <img src="${movie.Poster}" class="card-img-top" alt="">
    <div class="card-body d-flex">
      <h5 class="text-center card-title">${movie.Title}</h5>
      <p class="card-text">${movie.Year}</p>
      </div>
      <a id="${movie.imdbID}" class="btn btn-primary">See more</a>
    </div>`
    ).join(" ")
};

const getUrl = () => {
    let searchContent = searchBar.value.replace(" ", "+");
    console.log(searchContent);
    let url = `http://www.omdbapi.com/?s=${searchContent}&apikey=${API_KEY}`;
    return url;
};

submitBtn.addEventListener('click', () => {
    let finalUrl = getUrl();
    getMovieData(finalUrl);
});

let observer = new IntersectionObserver(function (observables) {
    observables.forEach(function (observable) {
        if (observable.intersectionRatio > 0.5) {
            observable.target.classList.remove('not-visible')
            observer.unobserve(observable.target)
            console.log('Item visible')
        }
    })
}, {
    threshold: [0.5]
});

const observe = () => {
    let items = document.querySelectorAll('.card')
    items.forEach(function (item) {
        item.classList.add('not-visible')
        observer.observe(item)
    });
};

// POP UP

const getDetailData = (button) => {
    fetch(`http://www.omdbapi.com/?i=${button.id}&apikey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) =>{
        popupDiv.style.display = "flex";
        popupDiv.innerHTML = movieDetail(data);
        console.log(popupDiv);
        closeBtnPopup();
    });
};

const movieDetail = (data) => {
    return `
     <div class="card mb-3" style = "max-width: 540px; display: flex">
        <button type=button class='btn-close' id="close-button" data-bs-dismiss="alert" aria-label="Close"></button>
        <div class="column">
           <div class= "col-md-4">
           <img src ="${data.Poster}" class="card-img-top" alt="...">
           </div>
           <div class="col-md-8">
              <div class="card-body">
                 <h5 class="card-title">${data.Title}</h5>
                 <p class="card-text">${data.Plot}</p>
                 <p class="card-text"><small class="text-muted">${data.Released}</small></p>
              </div>
           </div>
        </div>
    </div>
     `;
  };

const closeBtnPopup = () => {
let closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", () => {
    closePopup();
});
};

const closePopup = () => {
    popupDiv.style.display = "none";
    popupDiv.innerHTML = "";
};