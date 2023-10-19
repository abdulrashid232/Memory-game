const StartBtn = document.querySelector('.btn-start');
StartBtn.addEventListener('click',createFlipCardGrid)
let timerStarted = false;
let moves = 0;
let flippedCards = [];


function createFlipCardGrid() {
  const header = document.createElement('div')
  header.classList.add('header');
  header.innerHTML = `  <h1>Memory</h1>
  <div class="top-nav">
    <button class="btn restart">Restart</button>
    <button class="btn newGame">New Game</button>
  </div>`;
  const bottomNav = document.createElement('div')
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
  const container = document.createElement('div')
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
      h1.textContent = '1';

      flipCardBack.appendChild(h1);
      flipCardInner.appendChild(flipCardFront);
      flipCardInner.appendChild(flipCardBack);
      flipCard.appendChild(flipCardInner);

      container.appendChild(flipCard);
      document.body.innerHTML = '';
      document.body.style.backgroundColor= '#fcfcfc'
      document.body.appendChild(header);
      document.body.appendChild(container);
      document.body.appendChild(bottomNav);
 
  }
  // Flipcard event-listener
  const flipCards = document.querySelectorAll('.flip-card');
  let firstFlippedCard = null; // Track the first flipped card

  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('flipped')) {
        unflipCard(card);
      } else {
        if (flippedCards.length < 2) {
          flipCard(card);
          flippedCards.push(card);

          if (!timerStarted) {
            timerStarted = true;
            setInterval(setTime, 1000);
          }
        }

        if (flippedCards.length === 2) {
          // Two cards are flipped
          moves++; // Increment the moves count
          updateMovesDisplay();
          flippedCards = []; // Reset flippedCards array
        }
      }
    });
  });

function flipCard(card) {
    card.classList.add('flipped');
    let innerCard = card.querySelectorAll('.flip-card-inner');
    innerCard.forEach(element => {
        element.style.transform = 'rotateY(180deg)';
    });
    // moves++;
    // updateMovesDisplay();

}

function unflipCard(card) {
    card.classList.remove('flipped');
    let innerCard = card.querySelectorAll('.flip-card-inner');
    innerCard.forEach(element => {
        element.style.transform = 'rotateY(0deg)';
    });
}
function updateMovesDisplay() {
  const movesDisplay = document.querySelector('.moves');
  movesDisplay.textContent = moves;
}
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

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


}


