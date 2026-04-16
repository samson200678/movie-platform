
const API_KEY ="f63ecda6"

async function searchMovies(){
    const query = document.getElementById("inputsearch").value.trim();

    if(!query){
        alert("please enter movie name");
        return;
    }
    try{

      document.getElementById("movies").innerHTML = "<p>Loading...</p>";

        const res = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
         const data = await res.json();
        if (data.Response === "False"){
        displayMovies([]);
          return;
        }
        displayMovies(data.Search);
    } catch (error){
        console.error("Error:",error);
        document.getElementById("movies").innerHTML =
      "<p>Something went wrong </p>";
  }
    }
    


function displayMovies(movies) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  if (!movies ||movies.length === 0){
    container.innerHTML = "<p>No movies found </p>";
    return;
  }

  let html = "";
    
  movies.forEach(movie => {
    const poster =
    movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
    : "https://via.placeholder.com/300x450?text=No+Image";

        html +=`
      <div class="card" onclick="getMovieDetails('${movie.imdbID}')">
       <img src="${poster}"/>
       <h3>${movie.Title}</h3>
       <p>${movie.Year}</p>
        </div>`

    
  });
  container.innerHTML=html;
}



async function getMovieDetails(id) {
  try {
  const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );
   const movie = await res.json();

   showModal(movie);
  } catch (error) {
    console.error(error);
  }
}
function showModal(movie) {
  const modal = document.getElementById("modal");

  modal.innerHTML = `
    <div class="modal-content">
     <span class="close" onclick="closeModal()">&times;</span>
    <h2>${movie.Title}</h2>
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p>${movie.Plot}</p>
     <img src="${movie.Poster}" />
    </div>
  `;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}