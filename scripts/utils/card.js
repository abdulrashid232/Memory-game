import { createPopup } from "../soloPlayer.js";
import { markMatched,showFun,mobileMenu} from "./generalUtils.js";
import { multiPlayerFlipCardEventListener } from "../multiPlayer.js";


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



// grid card function

export function createFlipCardGrid() {
  const header = document.createElement('div');
  header.classList.add('header');
  const logo = document.createElement('h1');
  logo.textContent = 'Memory';
  header.appendChild(logo);
  const topNav = document.createElement('div');
  topNav.classList.add('top-nav');
  const menu = document.createElement('button');
  menu.textContent = 'Menu'
  menu.className = 'mobileBtn';
  header.appendChild(topNav);
  header.appendChild(menu);


  menu.addEventListener('click', () => {
    pauseTimer();
    mobileMenu()
    document.getElementById('myNav').style.width = '100%';

  });

  const restartBtn = document.createElement('button');
  restartBtn.className = 'btn-restart';
  restartBtn.textContent = 'Restart';
  topNav.appendChild(restartBtn);

  const newBtn = document.createElement('button');
  newBtn.className = 'btn-newGame';
  newBtn.textContent = 'New Game';
  topNav.appendChild(newBtn);

  

  restartBtn.addEventListener('click', () => {
    restartGame();
  });
  newBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  let matchedPairs = 0;
  let timerInterval;

  let playerScores = {};
  
  // solo player 
  if((fourByFourInput.checked || sixBysixInput.checked) && onePlayerInput.checked){
    if(fourByFourInput.checked){
      const bottomNav = document.createElement('div');
      bottomNav.classList.add('bot-nav');
      bottomNav.innerHTML = `<div class="bot-nav">
      <div class="time-container">
        <h5>Time</h5>
        <div class="label">
          <label id="minutes">0</label><label>:</label><label id="seconds">00</label>
        </div>
      </div>
      <div class="move-container">
        <h5>Moves</h5>
        <p class="moves">0</p>
      </div>
    </div>`;
  
    const numCards = 16;
    const container = document.createElement('div');
    container.classList.add('grid-container');
    for (let i = 0; i < numCards; i++) {
      const flipCard = document.createElement('div');
      flipCard.classList.add('flip-card');
  
      const flipCardInner = document.createElement('div');
      flipCardInner.classList.add('flip-card-inner');
  
      const flipCardFront = document.createElement('div');
      flipCardFront.classList.add('flip-card-front');
  
      const flipCardBack = document.createElement('div');
      flipCardBack.classList.add('flip-card-back');
  
      const h1 = document.createElement('h1');
      h1.textContent = '';
  
      flipCardBack.appendChild(h1);
      flipCardInner.appendChild(flipCardFront);
      flipCardInner.appendChild(flipCardBack);
      flipCard.appendChild(flipCardInner);
  
      container.appendChild(flipCard);
      document.body.innerHTML = '';
      document.body.style.backgroundColor = '#fcfcfc';
      document.body.appendChild(header);
      document.body.appendChild(container);
      document.body.appendChild(bottomNav);
      
    }
    
    const shuffledPairs = flipCardContent(numCards);
    
    const h1Elements = document.querySelectorAll('.flip-card h1');
    h1Elements.forEach((h1, index) => {
      h1.textContent = shuffledPairs[index];
    });
    const flipCards = document.querySelectorAll('.flip-card');
      flipCards.forEach(card => {
        card.addEventListener('click', () => {
          if (!card.classList.contains('flipped') && flippedCards.length < 2) {
            flipCard(card);
            flippedCards.push(card);
      
            if (!timerStarted) {
              timerStarted = true;
              timerInterval = setInterval(setTime, 1000);
            }
      
            if (flippedCards.length === 2) {
              const [card1, card2] = flippedCards;
              const h1Element1 = card1.querySelector('h1');
              const h1Element2 = card2.querySelector('h1');
      
              if (h1Element1.textContent === h1Element2.textContent) {
                card1.removeEventListener('click', flipCard);
                card2.removeEventListener('click', flipCard);
                markMatched([card1, card2]);
                matchedPairs++;
                if (matchedPairs === numCards / 2) {
                  clearInterval(timerInterval);
      
                  const timeTaken = `${minutesLabel.textContent}:${secondsLabel.textContent}`;
                  const movesTaken = `${totalMoves} Moves`;
      
                  pTime.textContent = timeTaken;
                  pMoves.textContent = movesTaken;
      
                  createPopup(pTime,pMoves);
                  showFun();
                }
              } else {
                setTimeout(() => {
                  unflipCard(card1);
                  unflipCard(card2);
                }, 500);
              }
      
              moves++;
              updateMovesDisplay();
              flippedCards = [];
            }
          }
        });
      });
    }
    else if(sixBysixInput.checked){
      const bottomNav = document.createElement('div');
      bottomNav.classList.add('bot-nav6x6');
      bottomNav.innerHTML = `<div class="bot-nav6x6">
      <div class="time-container6x6">
        <h5>Time</h5>
        <div class="label">
          <label id="minutes">0</label><label>:</label><label id="seconds">00</label>
        </div>
      </div>
      <div class="move-container6x6">
        <h5>Moves</h5>
        <p class="moves">0</p>
      </div>
    </div>`;
  
      const numCards = 36;
      const container = document.createElement('div');
      container.classList.add('grid-container6x6');
      for (let i = 0; i < numCards; i++) {
        const flipCard = document.createElement('div');
        flipCard.classList.add('flip-card6x6');
  
        const flipCardInner = document.createElement('div');
        flipCardInner.classList.add('flip-card-inner');
  
        const flipCardFront = document.createElement('div');
        flipCardFront.classList.add('flip-card-front');
  
        const flipCardBack = document.createElement('div');
        flipCardBack.classList.add('flip-card-back');
  
        const h1 = document.createElement('h1');
        h1.textContent = '';
  
        flipCardBack.appendChild(h1);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
  
        container.appendChild(flipCard);
        document.body.innerHTML = '';
        document.body.style.backgroundColor = '#fcfcfc';
        document.body.appendChild(header);
        document.body.appendChild(container);
        document.body.appendChild(bottomNav);
      }
  
      const shuffledPairs = flipCardContent(numCards);

      const h1Elements = document.querySelectorAll('.flip-card6x6 h1');
      h1Elements.forEach((h1, index) => {
        h1.textContent = shuffledPairs[index];
      });

      const flipCards = document.querySelectorAll('.flip-card6x6');
      flipCards.forEach(card => {
        card.addEventListener('click', () => {
          if (!card.classList.contains('flipped') && flippedCards.length < 2) {
            flipCard(card);
            flippedCards.push(card);
      
            if (!timerStarted) {
              timerStarted = true;
              timerInterval = setInterval(setTime, 1000);
            }
      
            if (flippedCards.length === 2) {
              const [card1, card2] = flippedCards;
              const h1Element1 = card1.querySelector('h1');
              const h1Element2 = card2.querySelector('h1');
      
              if (h1Element1.textContent === h1Element2.textContent) {
                card1.removeEventListener('click', flipCard);
                card2.removeEventListener('click', flipCard);
                markMatched([card1, card2]);
                matchedPairs++;
                if (matchedPairs === numCards / 2) {
                  clearInterval(timerInterval);
      
                  const timeTaken = `${minutesLabel.textContent}:${secondsLabel.textContent}`;
                  const movesTaken = `${totalMoves} Moves`;
      
                  pTime.textContent = timeTaken;
                  pMoves.textContent = movesTaken;
      
                  createPopup(pTime,pMoves);
                  showFun();
                }
              } else {
                setTimeout(() => {
                  unflipCard(card1);
                  unflipCard(card2);
                }, 500);
              }
      
              moves++;
              updateMovesDisplay();
              flippedCards = [];
            }
          }
        });
      });
    }


  }
// Multiplayer
  else if((fourByFourInput.checked || sixBysixInput.checked) && (twoPlayerInput.checked || threePlayerInput|| fourPlayerInput.checked)){
    const pairNav = document.createElement('div');
    pairNav.classList.add('pair-nav');

    let numPlayers;
    if (twoPlayerInput.checked) {
        numPlayers = 2;
    } else if (threePlayerInput.checked) {
        numPlayers = 3;
    } else if(fourPlayerInput.checked) {
        numPlayers = 4;
    }
    for (let i = 1; i <= numPlayers; i++) {
      playerScores[`Player${i}`] = 0;
    }
    for (let i = 1; i <= numPlayers; i++) {
      const playerContainer = document.createElement('div');
      playerContainer.classList.add('playerContainer');
  
      const playerDiv = document.createElement('div');
      playerDiv.id = `Player${i}`;
      playerDiv.classList.add('pair-container');
  
      const playerTitle = document.createElement('h5');
      playerTitle.classList.add('lg-screen');
      playerTitle.textContent = `Player ${i}`;

      const playerTitleSmall = document.createElement('h5');
      playerTitleSmall.classList.add('sm-screen');
      playerTitleSmall.textContent = `P${i}`;
  
      const pairMatch = document.createElement('p');
      pairMatch.classList.add('pairMatch');
      pairMatch.textContent = '0';
  
      const currentTurn = document.createElement('p');
      currentTurn.classList.add('currentTurn');
      currentTurn.textContent = 'CURRENT TURN';
  
      playerDiv.appendChild(playerTitle);
      playerDiv.appendChild(playerTitleSmall);
      playerDiv.appendChild(pairMatch);
  
      playerContainer.appendChild(playerDiv);
      playerContainer.appendChild(currentTurn);
  
      pairNav.appendChild(playerContainer);
    }
    if(fourByFourInput.checked){
      const numCards = 16;
      const container = document.createElement('div');
      container.classList.add('grid-container');
      for (let i = 0; i < numCards; i++) {
        const flipCard = document.createElement('div');
        flipCard.classList.add('flip-card');
  
        const flipCardInner = document.createElement('div');
        flipCardInner.classList.add('flip-card-inner');
  
        const flipCardFront = document.createElement('div');
        flipCardFront.classList.add('flip-card-front');
  
        const flipCardBack = document.createElement('div');
        flipCardBack.classList.add('flip-card-back');
  
        const h1 = document.createElement('h1');
        h1.textContent = '';
  
        flipCardBack.appendChild(h1);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
  
        container.appendChild(flipCard);
        document.body.innerHTML = '';
        document.body.style.backgroundColor = '#fcfcfc';
        document.body.appendChild(header);
        document.body.appendChild(container);
        document.body.appendChild(pairNav);
        
      }
      const currentPlayerBg = document.getElementById(`Player${currentPlayer}`);
      currentPlayerBg.classList.add('active');
  
      const shuffledPairs = flipCardContent(numCards);
  
      const h1Elements = document.querySelectorAll('.flip-card h1');
      h1Elements.forEach((h1, index) => {
        h1.textContent = shuffledPairs[index];
      });
  
      const flipCards = document.querySelectorAll('.flip-card');
      multiPlayerFlipCardEventListener(flipCards, numPlayers,playerScores, numCards,currentPlayer, matchedPairs);
    }
    else if(sixBysixInput.checked){
      const numCards = 36;
      const container = document.createElement('div');
      container.classList.add('grid-container6x6');
      for (let i = 0; i < numCards; i++) {
        const flipCard = document.createElement('div');
        flipCard.classList.add('flip-card6x6');
  
        const flipCardInner = document.createElement('div');
        flipCardInner.classList.add('flip-card-inner');
  
        const flipCardFront = document.createElement('div');
        flipCardFront.classList.add('flip-card-front');
  
        const flipCardBack = document.createElement('div');
        flipCardBack.classList.add('flip-card-back');
  
        const h1 = document.createElement('h1');
        h1.textContent = '';
  
        flipCardBack.appendChild(h1);
        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
  
        container.appendChild(flipCard);
        document.body.innerHTML = '';
        document.body.style.backgroundColor = '#fcfcfc';
        document.body.appendChild(header);
        document.body.appendChild(container);
        document.body.appendChild(pairNav);
        
      }
      const currentPlayerBg = document.getElementById(`Player${currentPlayer}`);
      currentPlayerBg.classList.add('active');
  
      const shuffledPairs = flipCardContent(numCards);
  
      const h1Elements = document.querySelectorAll('.flip-card6x6 h1');
      h1Elements.forEach((h1, index) => {
        h1.textContent = shuffledPairs[index];
      });
  
      const flipCards = document.querySelectorAll('.flip-card6x6');
      multiPlayerFlipCardEventListener(flipCards, numPlayers,playerScores, numCards,currentPlayer, matchedPairs);
      }
   

  }


  pTime = document.createElement('p'); 
  pTime.textContent = '1:53';

  pMoves = document.createElement('p');
  pMoves.textContent = '39 Moves';
  


  let minutesLabel = document.getElementById("minutes");
  let secondsLabel = document.getElementById("seconds");
  

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
  function pauseTimer() {
    if (timerStarted) {
        timerStarted = false;
        clearInterval(timerInterval);
    }
  }
 
}

// Card Content
export function flipCardContent(numCards,){
  if (numbersInput.checked) {
    pairs = Array.from({ length: numCards / 2 }, (_, i) => i + 1);
  } else if (iconsInput.checked) {
    pairs = generateShuffledIcons(numCards / 2);
  }

  shuffledPairs = shuffleArray([...pairs, ...pairs]);
  
  return shuffledPairs;
}

// Icons generater
function generateShuffledIcons(numPairs) {
  const icons = ['🎉', '🚀', '🌟', '🍎', '🌈', '🐱', '🎸', '🚗', '🍕', '📚', '🎨', '🦄', '🌺', '🎈', '🍪', '🐼', '🍉', '🌞'];
  const shuffledIcons = shuffleArray(icons);
  return shuffledIcons.slice(0, numPairs);
}
// Shuffle Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// flip function
export function flipCard(card) {
  card.classList.add('flipped');
  let innerCard = card.querySelectorAll('.flip-card-inner');
  innerCard.forEach(element => {
    element.style.transform = 'rotateY(180deg)';
  });
}
// unflip function
export function unflipCard(card) {
  card.classList.remove('flipped');
  let innerCard = card.querySelectorAll('.flip-card-inner');
  innerCard.forEach(element => {
    element.style.transform = 'rotateY(0deg)';
  });
}
// update moves
function updateMovesDisplay() {
  totalMoves = moves; 
  pMoves.textContent = `${totalMoves} Moves`;
  const movesDisplay = document.querySelector('.moves');
  movesDisplay.textContent = totalMoves;
}

// restartGame function

export function restartGame() {
  const container = document.querySelector('.grid-container');
  const container6x6 = document.querySelector('.grid-container6x6');
  if (container) {
    container.remove();
    timerStarted = false;
    moves = 0;
    flippedCards = [];
    totalMoves = 0;
    totalSeconds = 0;
    pMoves.textContent = '0 Moves';
    currentPlayer = 1;
    createFlipCardGrid();
  }else if(container6x6) {
    container6x6.remove();
    createFlipCardGrid();
    timerStarted = false;
    moves = 0;
    flippedCards = [];
    totalMoves = 0;
    totalSeconds = 0;
    pMoves.textContent = '0 Moves';
    currentPlayer = 1;
  }


}

// @Abdul-Rashid