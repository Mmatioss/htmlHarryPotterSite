const formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status !== 200) {
    error.innerText = "Email ou mot de passe incorrect";
    return;
  }

  const data = await response.json();

  const token = data.token;

  localStorage.setItem("token", token);
  //redirect to profile page
  window.location.href = "index.html";
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
