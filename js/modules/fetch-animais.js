import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  // Cria a div contendo informações
  // com o total de animais
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // Preenche cada animal no DOM
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  // Anima os números de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }

  // Puxa os animais através de um arquivo json
  // e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      console.log("Tentando buscar JSON de:", url);
      const animaisResponse = await fetch(url);

      if (!animaisResponse.ok) {
        throw new Error(`Erro HTTP ${animaisResponse.status}`);
      }

      // Verifica se é JSON
      const contentType = animaisResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await animaisResponse.text();
        console.error("Resposta não é JSON. Recebido:", text.substring(0, 100));
        throw new Error("Resposta não é JSON");
      }

      const animaisJSON = await animaisResponse.json();
      console.log("JSON parseado com sucesso:", animaisJSON);

      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.error("Erro ao carregar animais:", erro.message);
    }
  }

  return criarAnimais();
}
