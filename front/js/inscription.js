const formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const error = document.getElementById("error");

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
  });
  if (response.status !== 201) {
    error.innerText = "Cet email est déjà utilisé";
    return;
  }

  const data = await response.json();

  //redirect to connexion page
  window.location.href = "connexion.html";
});

const getMyProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/getMyProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log(data);
};
