let currentPage = 1;
const charactersPerPage = 10;

function renderCharacters(personagens) {
  const listaElement = document.getElementById("lista");
  listaElement.innerHTML = "";

  personagens.forEach((personagem) => {
    const liElement = document.createElement("li");
    liElement.classList.add("character-item");

    const imgElement = document.createElement("img");
    imgElement.src = personagem.image;
    liElement.appendChild(imgElement);

    const infoElement = document.createElement("div");

    const camposExibir = [
      "id",
      "name",
      "status",
      "species",
      "gender",
      "location",
    ];

    camposExibir.forEach((campo) => {
      const spanElement = document.createElement("span");
      console.log(campo);

      spanElement.textContent = `${campo}: ${personagem[campo]}`;
      infoElement.appendChild(spanElement);
      if (campo === "location") {
        spanElement.textContent = `${campo}: ${personagem[campo].name}`;
        infoElement.appendChild(spanElement);
      }
    });

    liElement.appendChild(infoElement);

    listaElement.appendChild(liElement);
  });
}

function fetchCharacters(page) {
  const searchTerm = document.getElementById("searchInput").value;
  const offset = (page - 1) * charactersPerPage;
  const newBaseUrl = `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`;

  axios
    .get(newBaseUrl)
    .then((response) => {
      const personagens = response.data.results;
      renderCharacters(personagens);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function searchCharacters() {
  currentPage = 1;
  fetchCharacters(currentPage);
  updateCurrentPage();
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
    updateCurrentPage();
  }
}

function nextPage() {
  currentPage++;
  fetchCharacters(currentPage);
  updateCurrentPage();
}

function updateCurrentPage() {
  document.getElementById("currentPage").textContent = currentPage;
}

// Initial fetch
fetchCharacters(currentPage);
