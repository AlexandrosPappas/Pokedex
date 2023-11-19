const pokedex = document.getElementById("pokedex");
const searchInput = document.querySelector("[data-search]");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  console.log(value);
});

const fetchPokemon = () => {
  const promises = [];

  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      nimage: data.sprites.front_default,
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    hideLoading();
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
  <li class="card">
    <img src="${pokeman.nimage}"/>
    <h2>${pokeman.id}. ${pokeman.name}</h2>
    <p>Type: ${pokeman.type}</p>
  </li>`
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

function showLoading() {
  document.getElementById("loadingGif").style.display = "block";
}

// Function to hide the loading GIF
function hideLoading() {
  document.getElementById("loadingGif").style.display = "none";
}

fetchPokemon();
