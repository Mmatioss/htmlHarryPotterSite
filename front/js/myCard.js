const btnConnection = document.getElementById("btnConnection");

if (localStorage.getItem("token")) {
  btnConnection.innerText = "Déconnexion";
  btnConnection.href = "#";

  btnConnection.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}

async function fetchCard(houseCard) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:3000/getMyCard?house=" + houseCard,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  console.log(data);
  document.querySelector("#conteneurCarte").innerHTML = "";
  data.forEach(async (character) => {
    let myCharacter = await fetch(
      "https://hp-api.lainocs.fr/characters/" + character.carde
    ).then((response) => response.json());
    document.querySelector("#conteneurCarte").innerHTML += `
        <a href="fileCharacterHP.html?slug=${myCharacter.slug}">
            <div class="character"> 
                <h2>${myCharacter.name}</h2>
                <img src="${myCharacter.image}" alt="${myCharacter.name}" class="imgCharacter">
                <p>${myCharacter.house}</p>
            </div>
        </a>
        `;
  });
}

async function openBlister() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/openBlister", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
}

fetchCard(null);
