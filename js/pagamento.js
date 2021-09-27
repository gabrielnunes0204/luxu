/* eslint-disable*/

import geral from "./geral.js";

//FUNÇÃO PARA TROCAR A FORMA DE PAGAMENTO (CARTÃO, BOLETO)
function mudarFormaPagamento() {
  const boleto = document.querySelector("#boleto");
  const cartao = document.querySelector("#cartao");
  const formCartao = document.querySelector(".formulario-cartao");
  const formBoleto = document.querySelector(".formulario-boleto");

  const email = document.querySelector("#emailBoleto");
  const botaoFinalizar = document.querySelector(".botao-finalizar_boleto");

  boleto.addEventListener("click", () => {
    formCartao.style.display = "none";
    formBoleto.style.display = "block";
    formBoleto.classList.add("ativo");

    botaoFinalizar.addEventListener("click", (event) => {
      if (email.value === "" || !email.value.includes("@")) {
        event.preventDefault();
        alert("Informe o e-mail corretamente");
      } else {
        alert(
          `O boleto foi enviado para ${email.value}. Obrigado por comprar com a gente.`
        );

        //Perguntando ao usuário se ele quer o comprovante da compra
        const comp = window.confirm(
          "Deseja fazer o download do comprovante da compra?"
        );

        //Gerando PDF ao fim da compra
        if (comp) {
          var doc = new jsPDF();
          doc.text(
            `Você acabou de adquirir um ${localStorage.getItem(
              "nomeProduto"
            )}, ${localStorage.getItem("valorTotal").replace("&nbsp;", "")}`,
            10,
            10
          );
          doc.save("Comprovante_Compra.pdf");
        } else {
          console.log("Compra efetuada");
        }

        //Removendo os dados do usuário ao finalizar a compra
        localStorage.removeItem("nome");
        localStorage.removeItem("email");
        localStorage.removeItem("cep");
        localStorage.removeItem("rua");
        localStorage.removeItem("numero");
        localStorage.removeItem("cidade");
        localStorage.removeItem("estado");

        //Removendo os valores totais e parcelados do localStorage
        localStorage.removeItem("valorTotal");
        localStorage.removeItem("valorParcelado");

        //Removendo o nome do produto do localStorage
        localStorage.removeItem("nomeProduto");
      }
    });
  });

  cartao.addEventListener("click", () => {
    formBoleto.style.display = "none";
    formCartao.style.display = "block";
    formCartao.classList.add("ativo");
  });
}
mudarFormaPagamento();

//FUNÇÃO PARA EFETUAR O PAGAMENTO VIA CARTÃO
function efetuarPagamentoCartao() {
  const botaoCartao = document.querySelector(".botao-finalizar");
  const inputs = document.querySelectorAll(".input");
  const arrayInputs = Array.from(inputs);

  arrayInputs[1].addEventListener("change", () => {
    const numeroCartao = arrayInputs[1].value;
    const novoNumero = numeroCartao.replace(
      /(\d{4})(\d{4})(\d{4})(\d{4})/g,
      "$1.$2.$3.$4"
    );
    arrayInputs[1].value = novoNumero;
  });

  arrayInputs[2].addEventListener("change", () => {
    const dataCartao = arrayInputs[2].value;
    const novaData = dataCartao.replace(/(\d{2})(\d{2})/g, "$1/$2");
    arrayInputs[2].value = novaData;
  });

  botaoCartao.addEventListener("click", (event) => {
    if (arrayInputs[0].value === "") {
      event.preventDefault();
      alert("Preencha o campo nome corretamente");
    } else if (
      arrayInputs[1].value === "" ||
      arrayInputs[1].value.length < 16 ||
      arrayInputs[1].value.length > 19
    ) {
      event.preventDefault();
      alert("Preencha o número do cartão corretamente");
    } else if (arrayInputs[2].value === "") {
      event.preventDefault();
      alert("Preencha a data de validade do cartão corretamente");
    } else if (arrayInputs[3].value === "") {
      event.preventDefault();
      alert("Preencha o código de segurança do cartão corretamente");
    } else {
      alert(`Compra efetuada com sucesso. Obrigado por compra com a gente.`);
      arrayInputs[0].value = "";
      arrayInputs[1].value = "";
      arrayInputs[2].value = "";
      arrayInputs[3].value = "";

      //Perguntando ao usuário se ele quer o comprovante da compra
      const comp = window.confirm(
        "Deseja fazer o download do comprovante da compra?"
      );

      //Gerando PDF ao fim da compra
      if (comp) {
        var doc = new jsPDF();
        doc.text(
          `Você acabou de adquirir um ${localStorage.getItem(
            "nomeProduto"
          )}, ${localStorage.getItem("valorTotal").replace("&nbsp;", "")}`,
          20,
          20
        );
        doc.save("Comprovante_Compra.pdf");
      } else {
        console.log("Compra efetuada");
      }

      //Removendo os dados do usuário ao finalizar a compra
      localStorage.removeItem("nome");
      localStorage.removeItem("email");
      localStorage.removeItem("cep");
      localStorage.removeItem("rua");
      localStorage.removeItem("numero");
      localStorage.removeItem("cidade");
      localStorage.removeItem("estado");

      //Removendo os valores totais e parcelados do localStorage
      localStorage.removeItem("valorTotal");
      localStorage.removeItem("valorParcelado");
    }
  });
}
efetuarPagamentoCartao();

function pagamentoParcelado() {
  const opcao1 = document.querySelector("#opc1");
  const opcao2 = document.querySelector("#opc2");

  opcao1.innerHTML = localStorage.getItem("valorTotal").replace("Por", "1x - ");
  opcao2.innerHTML = localStorage
    .getItem("valorParcelado")
    .replace("ou 2x", "2x - ");
}
pagamentoParcelado();
