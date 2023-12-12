const numbersInput = document.getElementById('numbers');
const iconsInput = document.getElementById('icons');
const onePlayerInput = document.getElementById('1');
const twoPlayerInput = document.getElementById('2');
const threePlayerInput = document.getElementById('3');
const fourPlayerInput = document.getElementById('4');
const fourByFourInput = document.getElementById('4x4');
const sixBysixInput = document.getElementById('6x6');

let totalMoves = 0; 
let pTime; 
let pMoves;
let timerStarted = false;
let moves = 0;
let flippedCards = [];
let currentPlayer = 1;
let totalSeconds = 0;
let pairs;
let shuffledPairs;

export function flipCardContent(numCards,){
  if (numbersInput.checked) {
    pairs = Array.from({ length: numCards / 2 }, (_, i) => i + 1);
  } else if (iconsInput.checked) {
    pairs = generateShuffledIcons(numCards / 2);
  }

  shuffledPairs = shuffleArray([...pairs, ...pairs]);
  
  return shuffledPairs;
}

function generateShuffledIcons(numPairs) {
  const icons = ['🎉', '🚀', '🌟', '🍎', '🌈', '🐱', '🎸', '🚗', '🍕', '📚', '🎨', '🦄', '🌺', '🎈', '🍪', '🐼', '🍉', '🌞'];
  const shuffledIcons = shuffleArray(icons);
  return shuffledIcons.slice(0, numPairs);
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}