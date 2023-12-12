import { createFlipCardGrid,restartGame} from "./utils/card.js";


const StartBtn = document.querySelector('.btn-start');
const numbersInput = document.getElementById('numbers');
const iconsInput = document.getElementById('icons');
const onePlayerInput = document.getElementById('1');
const twoPlayerInput = document.getElementById('2');
const threePlayerInput = document.getElementById('3');
const fourPlayerInput = document.getElementById('4');
const fourByFourInput = document.getElementById('4x4');
const sixBysixInput = document.getElementById('6x6');





StartBtn.addEventListener('click', () => {
  if ((numbersInput.checked || iconsInput.checked) && (onePlayerInput.checked || twoPlayerInput.checked || threePlayerInput|| fourPlayerInput.checked) && (fourByFourInput.checked || sixBysixInput.checked)) {
    createFlipCardGrid();
  }
   else  {
    alert('Please select all the required options before starting the game.');
  }
});





export function showFun() {
  const myPopup = document.querySelector('.popup');
  myPopup.classList.add('show');
}


export function mobileMenu(){
  const overlayDiv = document.createElement('div');
  overlayDiv.setAttribute('id', 'myNav');
  overlayDiv.classList.add('overlay');

  const overlayContentDiv = document.createElement('div');
  overlayContentDiv.classList.add('overlay-content');

  const restartButton = document.createElement('button');
  restartButton.classList.add('restart');
  restartButton.textContent = 'Restart';

  restartButton.addEventListener('click', function() {
    restartGame();   
  });

  const newGameButton = document.createElement('button');
  newGameButton.classList.add('new-game');
  newGameButton.textContent = 'New Game';
  newGameButton.addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  const resumeButton = document.createElement('button');
  resumeButton.classList.add('resume');
  resumeButton.textContent = 'Resume Game';
  resumeButton.addEventListener('click', function() {
    document.getElementById('myNav').style.width = '0';
  });


  overlayContentDiv.appendChild(restartButton);
  overlayContentDiv.appendChild(newGameButton);
  overlayContentDiv.appendChild(resumeButton);

  overlayDiv.appendChild(overlayContentDiv);
  document.body.appendChild(overlayDiv);

}





export function getWinners(numPlayers,playerScores) {
  const maxPairs = Math.max(...Object.values(playerScores));
  const winners = [];
  for (let i = 1; i <= numPlayers; i++) {
    if (playerScores[`Player${i}`] === maxPairs) {
      winners.push(`Player ${i}`);
    }
  }
  return winners;
}




export function updatePlayerScore(numPlayers,playerScores) {
  for (let i = 1; i <= numPlayers; i++) {
    const playerElement = document.getElementById(`Player${i}`);
    const pairMatch = playerElement.querySelector('.pairMatch');
    pairMatch.textContent = playerScores[`Player${i}`];
  }
}


export function markMatched(cards) {
  cards.forEach(card => {
    card.classList.add('matched');
    let innerCard = card.querySelectorAll('.flip-card-back');
    innerCard.forEach(element => {
      element.style.backgroundColor = '#fda214';
    });
  });
}


