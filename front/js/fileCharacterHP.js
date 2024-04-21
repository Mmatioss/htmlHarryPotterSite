function fetchCaracter(){
    let url = window.location.search;
    let slug = new URLSearchParams(url).get('slug');
    return fetch('https://hp-api.lainocs.fr/characters/'+slug)
    .then((response) => response.json())
}

async function displayCaracter(){
    const data = await fetchCaracter()
    document.querySelector('#character').innerHTML = `
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
    `
}
displayCaracter()