
const API_KEY ="f63ecda6"

async function searchMovies(){
    const query = document.getElementById("inputsearch").value.trim();

    if(!query){
        alert("please enter movie name");
        return;
    }
    try{
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
      "<p>Something went wrong 😢</p>";
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
        : "https://via.placeholder.com/150";

        html +=`
        <div class = "card">
         <img src="${poster}"/>
         <h3>${movie.Title}</h3>
         <p>${movie.Year}</p>
        </div>`

    
  });
  container.innerHTML=html;
}