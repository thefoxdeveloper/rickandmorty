const name = prompt("Digite o nome:");
const baseUrl = `https://rickandmortyapi.com/api/character/?name=${name}`;

axios
  .get(baseUrl)
  .then((response) => {
    const personagens = response.data.results;
    const listaElement = document.getElementById("lista");

    personagens.forEach((personagem) => {
      const liElement = document.createElement("li");
      liElement.classList.add("character-item");

      const imgElement = document.createElement("img");
      imgElement.src = personagem.image;
      liElement.appendChild(imgElement);

      const infoElement = document.createElement("div");

      const camposExibir = ["id", "name", "status", "species", "gender"];

      camposExibir.forEach((campo) => {
        const spanElement = document.createElement("span");
        spanElement.textContent = `${campo}: ${personagem[campo]}`;
        infoElement.appendChild(spanElement);
      });

      liElement.appendChild(infoElement);

      listaElement.appendChild(liElement);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
