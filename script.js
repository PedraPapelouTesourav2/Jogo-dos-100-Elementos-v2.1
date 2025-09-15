const elements = [
  "Rock", "Gun", "Lightning", "Devil", "Dragon",
  "Water", "Air", "Paper", "Sponge", "Wolf",
  "Tree", "Human", "Snake", "Scissors", "Fire"
];

const rules = {
  Rock: ["Fire", "Scissors", "Snake", "Human", "Wolf"],
  Gun: ["Rock", "Fire", "Scissors", "Snake", "Human"],
  Lightning: ["Gun", "Rock", "Fire", "Scissors", "Snake"],
  Devil: ["Lightning", "Gun", "Rock", "Fire", "Scissors"],
  Dragon: ["Devil", "Lightning", "Gun", "Rock", "Fire"],
  Water: ["Dragon", "Devil", "Lightning", "Gun", "Rock"],
  Air: ["Water", "Dragon", "Devil", "Lightning", "Gun"],
  Paper: ["Air", "Water", "Dragon", "Devil", "Lightning"],
  Sponge: ["Paper", "Air", "Water", "Dragon", "Devil"],
  Wolf: ["Sponge", "Paper", "Air", "Water", "Dragon"],
  Tree: ["Wolf", "Sponge", "Paper", "Air", "Water"],
  Human: ["Tree", "Wolf", "Sponge", "Paper", "Air"],
  Snake: ["Human", "Tree", "Wolf", "Sponge", "Paper"],
  Scissors: ["Snake", "Human", "Tree", "Wolf", "Sponge"],
  Fire: ["Scissors", "Snake", "Human", "Tree", "Wolf"]
};

window.addEventListener("DOMContentLoaded", () => {
  const selectSolo = document.getElementById("choiceSolo");
  const selectMulti = document.getElementById("choiceMultiplayer");

  elements.forEach(el => {
    const opt1 = document.createElement("option");
    opt1.value = el;
    opt1.textContent = el;
    selectSolo.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = el;
    opt2.textContent = el;
    selectMulti.appendChild(opt2);
  });
});

function mostrarImagem(elemento) {
  const imgDiv = document.getElementById("elemento-imagem");
  const nomeArquivo = elemento.replace(/ /g, "_") + ".png";
  imgDiv.innerHTML = `<img src="imagens/${nomeArquivo}" alt="${elemento}">`;
}

function atualizarEnergia(porcentagem) {
  document.getElementById("barra-energia").style.width = `${porcentagem}%`;
}

function tocarSom(tipo) {
  const audio = document.getElementById(`audio-${tipo}`);
  if (audio) audio.play();
}

function jogarContraBot() {
  const player = document.getElementById("playerSolo").value.trim();
  const escolhaJogador = document.getElementById("choiceSolo").value;
  const escolhaBot = elements[Math.floor(Math.random() * elements.length)];
  const resultDiv = document.getElementById("result");

  mostrarImagem(escolhaJogador);
  atualizarEnergia(Math.floor(Math.random() * 50 + 50));

  let resultado = "";

  if (escolhaJogador === escolhaBot) {
    resultado = `Empate! Ambos escolheram ${escolhaJogador}.`;
    tocarSom("empate");
  } else if (rules[escolhaJogador]?.includes(escolhaBot)) {
    resultado = `${player} venceu! ${escolhaJogador} derrota ${escolhaBot}.`;
    tocarSom("vitoria");
  } else if (rules[escolhaBot]?.includes(escolhaJogador)) {
    resultado = `Bot venceu! ${escolhaBot} derrota ${escolhaJogador}.`;
    tocarSom("derrota");
  } else {
    resultado = `Sem regra definida entre ${escolhaJogador} e ${escolhaBot}.`;
  }

  resultDiv.textContent = resultado;
}

function sendChoice() {
  const room = document.getElementById("room").value.trim();
  const player = document.getElementById("player").value.trim();
  const choice = document.getElementById("choiceMultiplayer").value;
  const resultDiv = document.getElementById("result");

  if (!room || !player) {
    alert("Preencha sala e nome.");
    return;
  }

  mostrarImagem(choice);
  atualizarEnergia(Math.floor(Math.random() * 50 + 50));
  db.ref(`salas/${room}/${player}`).set(choice);

  db.ref(`salas/${room}`).once("value", snapshot => {
    const data = snapshot.val();
    if (!data) {
      resultDiv.textContent = "Aguardando outro jogador...";
      return;
    }

    const minhaJogada = data[player];
    const outros = Object.keys(data).filter(p => p !== player);
    const outro = outros[0];
    const jogadaOutro = data[outro];

    if (!minhaJogada || !jogadaOutro) {
      resultDiv.textContent = "Aguardando outro jogador...";
      return;
    }

    let resultado = "";

    if (minhaJogada === jogadaOutro) {
      resultado = `Empate! Ambos escolheram ${minhaJogada}.`;
      tocarSom("empate");
    } else if (rules[minhaJogada]?.includes(jogadaOutro)) {
      resultado = `${player} venceu! ${minhaJogada} derrota ${jogadaOutro}.`;
      tocarSom("vitoria");
    } else if (rules[jogadaOutro]?.includes(minhaJogada)) {
      resultado = `${outro} venceu! ${jogadaOutro} derrota ${minhaJogada}.`;
      tocarSom("derrota");
    } else {
      resultado = `Sem regra definida entre ${minhaJogada} e ${jogadaOutro}.`;
    }

    resultDiv.textContent = resultado;
  });
}
