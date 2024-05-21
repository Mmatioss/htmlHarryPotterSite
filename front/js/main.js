let defaultFetch = window.fetch;

window.fetch = async function (url, options) {
  try {
    const response = await defaultFetch(url, options);
    if (response.status === 405) {
      localStorage.clear();
      window.location.href = "connexion.html";
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
