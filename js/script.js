import geral from "./geral.js";

//FUNÇÃO PARA PUXAR A API DE PRODUTOS
async function puxarAPI() {
  const responseProdutos = await fetch("./api/produtos.json");
  const bodyProdutos = await responseProdutos.json();

  const nomeProduto = document.querySelectorAll(".nome-produto");
  const arrayNomeProduto = Array.from(nomeProduto);

  const descricaoProduto = document.querySelectorAll(".descricao-produto");
  const arrayDescricaoProduto = Array.from(descricaoProduto);

  const precoAntigo = document.querySelectorAll(".valor_antigo-produto");
  const arrayPrecoAntigo = Array.from(precoAntigo);

  const precoAtual = document.querySelectorAll(".produto-preco");
  const arrayPrecoAtual = Array.from(precoAtual);

  for (let i = 0; i < arrayNomeProduto.length && i < bodyProdutos.length; i++) {
    arrayNomeProduto[i].innerHTML = bodyProdutos[i].nome;
    arrayDescricaoProduto[i].innerHTML = bodyProdutos[i].descricao;
    arrayPrecoAntigo[i].innerHTML =
      "De " +
      bodyProdutos[i].precoAntigo.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    arrayPrecoAtual[i].innerHTML =
      "Por " +
      bodyProdutos[i].precoAtual.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
  }
}
puxarAPI();

//FUNÇÃO PARA ENVIAR MENSAGEM AO PREENCHER OS CAMPOS
function enviarMensagem() {
  const botaoEnviar = document.querySelector(".botao-enviar");
  const inputs = document.querySelectorAll(".input");
  const arrayInputs = Array.from(inputs);

  if (arrayInputs.length) {
    arrayInputs[2].addEventListener("change", () => {
      const cpf = arrayInputs[2].value;
      const novoCPF = cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
        "$1.$2.$3-$4"
      );
      arrayInputs[2].value = novoCPF;
    });
  } else {
    console.log(".");
  }

  if (botaoEnviar) {
    botaoEnviar.addEventListener("click", (event) => {
      event.preventDefault();
      if (arrayInputs[0].value === "") {
        alert("Preencha o formulário corretamente");
      } else if (
        arrayInputs[1].value === "" ||
        !arrayInputs[1].value.includes("@")
      ) {
        alert("Preencha o formulário corretamente");
      } else if (
        arrayInputs[2].value === "" ||
        arrayInputs[2].value.length < 11 ||
        arrayInputs[2].value.length > 14
      ) {
        alert("Preencha o formulário corretamente");
      } else {
        alert(
          `Mensagem enviada com sucesso, aguarde retorno em ${arrayInputs[1].value}`
        );
        arrayInputs[0].value = "";
        arrayInputs[1].value = "";
        arrayInputs[2].value = "";
      }
    });
  }
}
enviarMensagem();

//FUNÇÃO PARA ENVIAR MENSAGEM AO AMIGO AO PREENCHER OS CAMPOS
function convidarAmigo() {
  const botaoAmigo = document.querySelector(".botao-enviar_agora");
  const inputs = document.querySelectorAll(".inputAmigo");
  const arrayInputs = Array.from(inputs);

  if (botaoAmigo) {
    botaoAmigo.addEventListener("click", (event) => {
      event.preventDefault();
      if (arrayInputs[0].value === "") {
        alert("Preencha o formulário corretamente");
      } else if (
        arrayInputs[1].value === "" ||
        !arrayInputs[1].value.includes("@")
      ) {
        alert("Preencha o formulário corretamente");
      } else {
        alert(`Obrigado por nos indicar um amigo.`);
        arrayInputs[0].value = "";
        arrayInputs[1].value = "";
      }
    });
  }
}
convidarAmigo();

//FUNÇÃO PARA MOSTRAR O PRODUTO SELECIONADO NA PRÓXIMA PÁGINA, DE ACORDO COM A ESCOLHA DO USUÁRIO
function mudarProduto() {
  const botoes = document.querySelectorAll(".botao-comprar");
  const arrayBotoes = Array.from(botoes);

  arrayBotoes.forEach((item) => {
    item.addEventListener("click", (event) => {
      const nomeProduto = event.currentTarget.parentNode.children[1];
      const valorTotal = event.currentTarget.parentNode.children[4];
      const valorParcelado = event.currentTarget.parentNode.children[5];

      localStorage.setItem("nomeProduto", nomeProduto.innerHTML);
      localStorage.setItem("valorTotal", valorTotal.innerHTML);
      localStorage.setItem("valorParcelado", valorParcelado.innerHTML);
    });
  });
}
mudarProduto();
