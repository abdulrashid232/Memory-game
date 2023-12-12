import { createFlipCardGrid, unflipCard, flipCard,restartGame} from "./utils/card.js";


const StartBtn = document.querySelector('.btn-start');
const numbersInput = document.getElementById('numbers');
const iconsInput = document.getElementById('icons');
const onePlayerInput = document.getElementById('1');
const twoPlayerInput = document.getElementById('2');
const threePlayerInput = document.getElementById('3');
const fourPlayerInput = document.getElementById('4');
const fourByFourInput = document.getElementById('4x4');
const sixBysixInput = document.getElementById('6x6');

let flippedCards = [];



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




function MultiPlayercreatePopup(numPlayers,playerScores) {
  const popup = document.createElement('div');
  popup.className = 'popup';

  const popupContent = document.createElement('div');
  popupContent.className = 'Multi-popup-content';

  const topNote = document.createElement('div');
  topNote.className = 'top-note';

  const winners = getWinners(numPlayers,playerScores);
  const winnerText = winners.length > 1 ? 'It\'s a tie' : 'Wins\!';

  const winner = document.createElement('h2');
  winner.textContent = winners.length> 1 ? `${winnerText} `: `${winners.join(', ')} ${winnerText}`;

  const p = document.createElement('p');
  p.textContent = "Game Over! Here are the results...";

  topNote.appendChild(winner);
  topNote.appendChild(p);
  popupContent.appendChild(topNote);

  const playerData = [];
  for (let i = 1; i <= numPlayers; i++) {
    playerData.push({
      player: `Player ${i}`,
      pairs: playerScores[`Player${i}`],
    });
  }

  playerData.sort((a, b) => b.pairs - a.pairs);

  playerData.forEach((data) => {
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('multiPlayerScores');

    const playerDiv = document.createElement('div');
    playerDiv.id = data.player;
    playerDiv.classList.add('player_score');

    const playerTitle = document.createElement('h4');
    const isWinner = winners.includes(data.player) ? ' (Winner!)' : '';

    const pairMatch = document.createElement('p');
    pairMatch.classList.add('pairMatch');
    pairMatch.textContent = `${data.pairs} pairs`;
    
    playerTitle.textContent = data.player + isWinner;
    if(playerTitle.textContent.includes('(Winner!)')){
      playerDiv.style.backgroundColor= '#304859';
      playerTitle.classList.add('whiteColor');
      pairMatch.classList.add('whiteColor');
      
    }

    playerDiv.appendChild(playerTitle);
    playerDiv.appendChild(pairMatch);

    playerContainer.appendChild(playerDiv);
    popupContent.appendChild(playerContainer);
  });

  const popBtn = document.createElement('div');
  popBtn.className = 'popBtn';

  const restartButton = document.createElement('button');
  restartButton.className = 'restart';
  restartButton.textContent = 'Restart';

  restartButton.addEventListener('click', restartGame)

  const newGameButton = document.createElement('button');
  newGameButton.className = 'new-game';
  newGameButton.textContent = 'Setup New Game';

  newGameButton.addEventListener('click',() => {
    window.location.href = 'index.html';
  });

  popBtn.appendChild(restartButton);
  popBtn.appendChild(newGameButton);
  popupContent.appendChild(popBtn);

  popup.appendChild(popupContent);
  document.body.appendChild(popup);
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

export function currentPlayerTurnBg(currentPlayer,numPlayers) {
  for (let i = 1; i <= numPlayers; i++) {
      const pairContainer = document.getElementById(`Player${i}`);
      pairContainer.classList.remove('active');
  }
  const currentPlayerContainer = document.getElementById(`Player${currentPlayer}`);
  currentPlayerContainer.classList.add('active');
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


export function multiPlayerFlipCardEventListener(flipCards, numPlayers,playerScores, numCards,currentPlayer, matchedPairs){
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('flipped') && flippedCards.length < 2) {
        flipCard(card);
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          const [card1, card2] = flippedCards;
          const h1Element1 = card1.querySelector('h1');
          const h1Element2 = card2.querySelector('h1');

          if (h1Element1.textContent === h1Element2.textContent) {
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            markMatched([card1, card2]);
            matchedPairs++;

            // Update the player's score
            playerScores[`Player${currentPlayer}`]++;
            updatePlayerScore(numPlayers, playerScores);


            if (matchedPairs === numCards / 2) {
              MultiPlayercreatePopup(numPlayers,playerScores);
              showFun();

            }
          } else {
            setTimeout(() => {
              unflipCard(card1);
              unflipCard(card2);
            }, 500);
            // Switch to the next player's turn
            currentPlayer = (currentPlayer % numPlayers) + 1;
            currentPlayerTurnBg(currentPlayer,numPlayers);
          }
          flippedCards = [];
        }
      }
    });
  });
}