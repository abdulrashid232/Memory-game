import { restartGame } from "./card.js";
export function showFun() {
  const myPopup = document.querySelector('.popup');
  myPopup.classList.add('show');
}

// Mobile Menu
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




// winner funtion
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



// UpdateScore for multiplayer
export function updatePlayerScore(numPlayers,playerScores) {
  for (let i = 1; i <= numPlayers; i++) {
    const playerElement = document.getElementById(`Player${i}`);
    const pairMatch = playerElement.querySelector('.pairMatch');
    pairMatch.textContent = playerScores[`Player${i}`];
  }
}

// function to change winner bg-color
export function markMatched(cards) {
  cards.forEach(card => {
    card.classList.add('matched');
    let innerCard = card.querySelectorAll('.flip-card-back');
    innerCard.forEach(element => {
      element.style.backgroundColor = '#fda214';
    });
  });
}

// @Abdul-Rashid