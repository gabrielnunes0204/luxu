/* eslint-disable */

import geral from "./geral.js";

function carregarImagens() {
  const produto1 = document.querySelector("#produto5");
  const produto2 = document.querySelector("#produto6");
  const produto3 = document.querySelector("#produto7");
  const produto4 = document.querySelector("#produto8");
  const botaoVeja = document.querySelector(".veja-mais");

  botaoVeja.addEventListener("click", (event) => {
    event.preventDefault();

    botaoVeja.innerHTML = "";

    produto1.style.display = "block";
    produto1.classList.add("ativo");

    produto2.style.display = "block";
    produto2.classList.add("ativo");

    produto3.style.display = "block";
    produto3.classList.add("ativo");

    produto4.style.display = "block";
    produto4.classList.add("ativo");
  });
}
carregarImagens();

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
