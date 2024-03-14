const btnCriptografar = document.getElementById("criptografar");
const btnDescriptografar = document.getElementById("descriptografar");
const textoRecebido = document.getElementsByTagName("textarea")[0];
const conteudo = document.getElementsByClassName("conversao_texto")[0];
const ilustracao = "../img/ilustracao.svg";
var textoCodificado;
btnCriptografar.classList.add("selecionado");

function removerAcentos(textoRecebido) {
  return textoRecebido
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "");
}

function codificador(textoRecebido) {
  var arrayTextoCodificado = removerAcentos(textoRecebido.value).split("");
  for (let i = 0; i < arrayTextoCodificado.length; i++) {
    switch (arrayTextoCodificado[i]) {
      case "a":
        arrayTextoCodificado[i] = "ai";
        break;
      case "e":
        arrayTextoCodificado[i] = "enter";
        break;
      case "i":
        arrayTextoCodificado[i] = "imes";
        break;
      case "o":
        arrayTextoCodificado[i] = "ober";
        break;
      case "u":
        arrayTextoCodificado[i] = "ufat";
        break;
      default:
        break;
    }
  }
  return (textoCodificado = arrayTextoCodificado.join(""));
}
function decodificador(textoRecebido) {
  var arrayTextoDecodificado = removerAcentos(textoRecebido.value).split("");
  var textoDescriptografado = "";
  for (i = 0; i < arrayTextoDecodificado.length; i++) {
    switch (arrayTextoDecodificado[i]) {
      case "a":
        textoDescriptografado += "a";
        i++;
        break;
      case "e":
        textoDescriptografado += "e";
        i += 4;
        break;
      case "i":
        textoDescriptografado += "i";
        i += 3;
        break;
      case "o":
        textoDescriptografado += "o";
        i += 3;
        break;
      case "u":
        textoDescriptografado += "u";
        i += 3;
        break;
      default:
        textoDescriptografado += arrayTextoDecodificado[i];
        break;
    }
  }

  return textoDescriptografado;
}

// Muda se o código irá criptografar ou descriptografar
function codificadorOuDecodificador(textoRecebido) {
  let traducao = "";
  if (btnCriptografar.classList.contains("selecionado")) {
    return (traducao = codificador(textoRecebido));
  } else if (btnDescriptografar.classList.contains("selecionado")) {
    return (traducao = decodificador(textoRecebido));
  }
}

//Função para mudar a estilização
textoRecebido.addEventListener("input", function () {
  if (textoRecebido.value == "") {
    conteudo.classList.remove("traducao");
    conteudo.innerHTML = `
        <img class="imagem_ilustracao" src="${ilustracao}" alt="Pessoa de joelhos observando um diamante com uma lupa">
        <p id="notificacao">Nenhuma mensagem<br> encontrada</p>
        <p id="descricao">Digite um texto que você deseja<br> criptografar ou descriptografar.</p>
`;
  } else {
    conteudo.innerHTML = `
        <p id="texto_de_traducao">${codificadorOuDecodificador(textoRecebido)}</p>
        <button type="button" id="btn_copiar" onClick="copiarTexto()">Copiar</button
        `;
    conteudo.classList.add("traducao");
  }
});

function copiarTexto() {
  let textoCopiado = codificadorOuDecodificador(textoRecebido);

  let textarea = document.createElement("textarea");
  textarea.value = textoCopiado;
  document.body.appendChild(textarea);

  textarea.select();
  textarea.setSelectionRange(0, 99999);
  document.execCommand("copy");

  document.body.removeChild(textarea);
}

function clicado(idBotaoClicado) {
  if (idBotaoClicado === "btnCriptografar") {
    btnCriptografar.classList.add("selecionado");
    btnDescriptografar.classList.remove("selecionado");
  } else if (idBotaoClicado === "btnDescriptografar") {
    btnDescriptografar.classList.add("selecionado");
    btnCriptografar.classList.remove("selecionado");
  }
}
