function fetchCaracter() {
  let url = window.location.search;
  let slug = new URLSearchParams(url).get("slug");
  return fetch("https://hp-api.lainocs.fr/characters/" + slug).then(
    (response) => response.json()
  );
}

let updateData = (_house) => {
  const data = {
    house: _house,
  };
  fetch("http://192.168.1.10:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

async function displayCaracter() {
  const data = await fetchCaracter();
  document.querySelector("#character").innerHTML = `
        <div id="characterSolo">
            <ul>
                <h2>${data.name}</h2>
                <img src="${data.image}" alt="${data.name}" id="imgSolo">
            </ul>
            <ul>
                <p>Maison: ${data.house}</p>
                <p>Role: ${data.role}</p>
                <p>yeux: ${data.eyes}</p>
                <p>cheveux: ${data.hairs}</p>
                <p>Sang: ${data.blood}</p>
                <p>Baguette: ${data.wand}</p>
                <p>Patronus: ${data.patronus}</p>
                <p>Interprété par: ${data.actor}</p>
            </ul>
        </div>
        <a href="index.html">Back</a>
    `;
  updateData(data.house);
}
displayCaracter();

const btnConnection = document.getElementById("btnConnection");

if (localStorage.getItem("token")) {
  btnConnection.innerText = "Déconnexion";
  btnConnection.href = "#";

  btnConnection.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}
