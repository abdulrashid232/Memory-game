import { updatePlayerScore,markMatched,getWinners,showFun } from "./utils/generalUtils.js";
import { flipCard,unflipCard,restartGame } from "./utils/card.js";
let flippedCards = [];

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

function currentPlayerTurnBg(currentPlayer,numPlayers) {
  for (let i = 1; i <= numPlayers; i++) {
      const pairContainer = document.getElementById(`Player${i}`);
      pairContainer.classList.remove('active');
  }
  const currentPlayerContainer = document.getElementById(`Player${currentPlayer}`);
  currentPlayerContainer.classList.add('active');
}