import geral from "./geral.js";

//FUNÇÃO PARA PUXAR A API DE PRODUTOS
async function puxarApiProdutos() {
  const responseProdutos = await fetch("./api/produtos.json");
  const bodyProdutos = await responseProdutos.json();
  const descricaoProduto = document.querySelector(".descricao-produto");

  descricaoProduto.innerHTML = bodyProdutos[0].descricao;
}
puxarApiProdutos();

//FUNÇÃO PARA ABRIR E FECHAR MODAL
function abrirModal() {
  const modal = document.querySelector(".modal");
  const botaoModal = document.querySelector(".botao-frete");
  const botaoFechar = document.querySelector(".botao-fechar");
  const botaoConfirmarEntrega = document.querySelector(".botao-confirmar");
  const campoCep = document.querySelector("#cep");

  botaoModal.addEventListener("click", (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);

    if (campoCep.value === "" || campoCep.value.length < 8) {
      alert("Preencha o campo CEP corretamente");
    } else {
      modal.style.display = "block";
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  botaoFechar.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "none";
  });

  botaoConfirmarEntrega.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "none";

    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
abrirModal();

//FUNÇÃO COM REGEX PARA EDITAR O CPF
function editarCpf() {
  const campoCPF = document.querySelector("#cpf");

  campoCPF.addEventListener("change", () => {
    const cpf = campoCPF.value;
    const novoCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    campoCPF.value = novoCPF;
  });
}
editarCpf();

//FUNÇÃO PARA EDITAR O CEP, E PREENCHER OS OUTROS CAMPOS DE ACORDO COM O CEP PASSADO
async function editarFrete(cep) {
  const rua = document.querySelector("#rua");
  const cidade = document.querySelector("#cidade");
  const estado = document.querySelector("#estado");
  const cidadeFrete = document.querySelector("#cidade-frete");
  const valorFrete = document.querySelector("#valor-frete");
  const campoCep = document.querySelector("#cep");

  campoCep.addEventListener("change", () => {
    cep = campoCep.value;
    const novoCep = cep.replace(/(\d{5})(\d{3})/g, "$1-$2");
    campoCep.value = novoCep;

    fetch(`https://viacep.com.br/ws/${campoCep.value}/json/`).then(
      (responseCep) => {
        responseCep.json().then((bodyCep) => {
          rua.value = bodyCep.logradouro;
          cidade.value = bodyCep.localidade;
          estado.value = bodyCep.uf;
          cidadeFrete.innerHTML = bodyCep.localidade + " - " + bodyCep.uf;

          if (bodyCep.uf === "SP") {
            valorFrete.innerHTML = "Fica R$ 33,00";
          } else if (bodyCep.uf === "RJ") {
            valorFrete.innerHTML = "Fica R$ 40,00";
          } else if (bodyCep.uf === "MG") {
            valorFrete.innerHTML = "Fica R$ 52,00";
          } else if (bodyCep.uf === "BA") {
            valorFrete.innerHTML = "Fica R$ 65,00";
          } else {
            valorFrete.innerHTML = "Fica R$ 105,00";
          }
        });
      }
    );
  });
}
editarFrete();

//FUNÇÃO PARA AVANÇAR A COMPRA DEPOIS DE TODOS OS CAMPOS PREENCHIDOS CORRETAMENTE
function avancarCompra() {
  const botaoAvancar = document.querySelector(".botao-avancar");
  const inputs = document.querySelectorAll(".input");
  const arrayInputs = Array.from(inputs);

  botaoAvancar.addEventListener("click", (event) => {
    if (arrayInputs[0].value === "") {
      event.preventDefault();
      alert("Preencha o campo de nome corretamente");
    } else if (
      arrayInputs[1].value === "" ||
      arrayInputs[1].value.length < 11 ||
      arrayInputs[1].value.length > 14
    ) {
      event.preventDefault();
      alert("Preencha o campo de CPF corretamente");
    } else if (
      arrayInputs[2].value === "" ||
      !arrayInputs[2].value.includes("@")
    ) {
      event.preventDefault();
      alert("Preencha o campo de e-mail corretamente");
    } else if (arrayInputs[3].value === "") {
      event.preventDefault();
      alert("Preencha o campo de CEP corretamente");
    } else if (arrayInputs[4].value === "") {
      event.preventDefault();
      alert("Preencha o campo da rua corretamente");
    } else if (arrayInputs[5].value === "") {
      event.preventDefault();
      alert("Preencha o campo de número corretamente");
    } else if (arrayInputs[6].value === "") {
      event.preventDefault();
      alert("Preencha o campo do cidade corretamente");
    } else if (arrayInputs[7].value === "") {
      event.preventDefault();
      alert("Preencha o campo do cidade corretamente");
    } else {
      console.log("Siga");
    }
  });
}
avancarCompra();

//FUNÇÃO PARA SALVAR OS DADOS DA TABELA NO LOCALSTORAGE
function salvarDados() {
  const botao = document.querySelector(".botao-avancar");
  const nome = document.querySelector("#nome");
  const email = document.querySelector("#email");
  const cep = document.querySelector("#cep");
  const rua = document.querySelector("#rua");
  const numero = document.querySelector("#numero");
  const cidade = document.querySelector("#cidade");
  const estado = document.querySelector("#estado");

  botao.addEventListener("click", () => {
    localStorage.setItem("nome", nome.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("cep", cep.value);
    localStorage.setItem("rua", rua.value);
    localStorage.setItem("numero", numero.value);
    localStorage.setItem("cidade", cidade.value);
    localStorage.setItem("estado", estado.value);

    nome.value = localStorage.getItem("nome");
    email.value = localStorage.getItem("email");
    cep.value = localStorage.getItem("cep");
    rua.value = localStorage.getItem("rua");
    numero.value = localStorage.getItem("numero");
    cidade.value = localStorage.getItem("cidade");
    estado.value = localStorage.getItem("estado");
  });

  botao.addEventListener("dblclick", (event) => {
    event.preventDefault();
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    localStorage.removeItem("cep");
    localStorage.removeItem("rua");
    localStorage.removeItem("numero");
    localStorage.removeItem("cidade");
    localStorage.removeItem("estado");
  });

  nome.value = localStorage.getItem("nome");
  cpf.value = localStorage.getItem("cpf");
  email.value = localStorage.getItem("email");
  cep.value = localStorage.getItem("cep");
  rua.value = localStorage.getItem("rua");
  numero.value = localStorage.getItem("numero");
  cidade.value = localStorage.getItem("cidade");
  estado.value = localStorage.getItem("estado");
}
salvarDados();

function mudarDadosProduto() {
  const nome = document.querySelector(".nome-produto strong");
  const valorTotal = document.querySelector(".produto-preco");
  const valorParcelado = document.querySelector(".produto-preco_parcelado");

  nome.innerHTML = localStorage.getItem("nomeProduto");
  nome.style.fontSize = "2.5rem";
  nome.style.letterSpacing = "1.5px";

  valorTotal.innerHTML = localStorage.getItem("valorTotal");
  valorParcelado.innerHTML = localStorage.getItem("valorParcelado");
}
mudarDadosProduto();

//FUNÇÃO PARA CARREGAR A IMAGEM DO PRODUTO SELECIONADO
function carregarImagem() {
  const imagem = document.querySelector(".quadro");

  if (localStorage.getItem("nomeProduto") == "Smartphone") {
    imagem.style.background =
      "url('./images/produtos/smartphone.png') no-repeat center center";
    imagem.style.backgroundSize = "65%";
  } else if (localStorage.getItem("nomeProduto") == "Tablet") {
    imagem.style.background =
      "url('./images/produtos/tablet.png') no-repeat center center";
    imagem.style.backgroundSize = "90%";
  } else if (localStorage.getItem("nomeProduto") == "Smartwatch") {
    imagem.style.background =
      "url('./images/produtos/smartwatch.png') no-repeat center center";
    imagem.style.backgroundSize = "65%";
  } else if (localStorage.getItem("nomeProduto") == "Notebook") {
    imagem.style.background =
      "url('./images/produtos/notebook.png') no-repeat center center";
    imagem.style.backgroundSize = "100%";
  } else if (localStorage.getItem("nomeProduto") == "Console Play5") {
    imagem.style.background =
      "url('./images/produtos/play5.png') no-repeat center center";
    imagem.style.backgroundSize = "100%";
  } else if (localStorage.getItem("nomeProduto") == "Headphone") {
    imagem.style.background =
      "url('./images/produtos/headphone.png') no-repeat center center";
    imagem.style.backgroundSize = "90%";
  } else if (localStorage.getItem("nomeProduto") == "Google Glass") {
    imagem.style.background =
      "url('./images/produtos/googleGlass.png') no-repeat center center";
    imagem.style.backgroundSize = "90%";
  } else if (localStorage.getItem("nomeProduto") == "Kindle") {
    imagem.style.background =
      "url('./images/produtos/kindle.png') no-repeat center center";
    imagem.style.backgroundSize = "90%";
  }
}
carregarImagem();
