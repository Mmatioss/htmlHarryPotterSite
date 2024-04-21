function fetchCharacters() {
  // link to harry potter api
  return fetch("https://hp-api.lainocs.fr/characters").then((response) =>
    response.json()
  );
}

async function displayCharacters() {
  // display information taken from harry potter api
  const data = await fetchCharacters();
  data.forEach((character) => {
    document.querySelector("#conteneurCarte").innerHTML += `
        <a href="fileCharacterHP.html?slug=${character.slug}">
            <div class="character"> 
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}" class="imgCharacter">
                <p>${character.house}</p>
            </div>
        </a>
        `;
  });
}

displayCharacters();

const btnConnection = document.getElementById("btnConnection");

if (localStorage.getItem("token")) {
  btnConnection.innerText = "Déconnexion";
  btnConnection.href = "#";

  btnConnection.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}
