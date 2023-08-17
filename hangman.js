// Importa o módulo 'readline' para lidar com entrada e saída no terminal
const readline = require('readline');

// Lista de palavras para adivinhar
const words = ["javascript", "programming", "developer", "computer", "internet"];

// Escolhe uma palavra aleatória da lista
const chosenWord = words[Math.floor(Math.random() * words.length)];

// Array para armazenar as letras adivinhadas
let guessedLetters = [];

// Número de tentativas disponíveis
let attempts = 6;

// Cria uma interface readline para ler entrada e escrever saída
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para exibir as letras adivinhadas e espaços vazios para as letras não adivinhadas
function displayWord() {
  let display = '';
  for (let letter of chosenWord) {
    if (guessedLetters.includes(letter)) {
      display += letter + ' ';
    } else {
      display += '_ ';
    }
  }
  console.log(display);
}

// Função para verificar se o jogador ganhou
function checkWin() {
  if (chosenWord.split('').every(letter => guessedLetters.includes(letter))) {
    return true;
  }
  return false;
}

// Função para exibir a representação visual da forca
function displayHangman() {
  const hangmanParts = [
    "   _______\n   |     |\n         |\n         |\n         |\n         |\n=========",
    "   _______\n   |     |\n   O     |\n         |\n         |\n         |\n=========",
    "   _______\n   |     |\n   O     |\n   |     |\n         |\n         |\n=========",
    "   _______\n   |     |\n   O     |\n  /|     |\n         |\n         |\n=========",
    "   _______\n   |     |\n   O     |\n  /|\\    |\n         |\n         |\n=========",
    "   _______\n   |     |\n   O     |\n  /|\\    |\n  /      |\n         |\n=========",
    "   _______\n   |     |\n   O     |\n  /|\\    |\n  / \\    |\n         |\n========="
  ];
  
  console.log(hangmanParts[6 - attempts]);
}

// Função para processar o palpite do jogador
function makeGuess(guess) {
  if (!guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
    if (chosenWord.includes(guess)) {
      displayWord();
      if (checkWin()) {
        console.log("Parabéns! Você ganhou!");
        rl.close();
        return;
      }
    } else {
      attempts--;
      displayHangman();
      console.log(`Tentativas restantes: ${attempts}`);
      if (attempts === 0) {
        console.log(`Você perdeu! A palavra era: ${chosenWord}`);
        rl.close();
        return;
      }
    }
  } else {
    console.log("Você já tentou essa letra!");
  }

  promptGuess();
}

// Inicia o jogo e exibe mensagem de boas-vindas
console.log("Bem-vindo ao Jogo de Forca!");
console.log("Adivinhe a palavra. Você tem 6 tentativas.");

// Exibe a palavra oculta inicialmente
displayWord();

// Função para solicitar ao jogador um palpite
function promptGuess() {
  rl.question("Digite uma letra: ", (guess) => {
    makeGuess(guess.toLowerCase());
  });
}

// Inicia o jogo pedindo ao jogador um palpite
promptGuess();
