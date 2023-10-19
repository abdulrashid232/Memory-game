const StartBtn = document.querySelector('.btn-start');
const numbersInput = document.getElementById('numbers');
const onePlayerInput = document.getElementById('1');
const fourByFourInput = document.getElementById('4x4');

// function for checking if options are selected
StartBtn.addEventListener('click', () => {
  if (numbersInput.checked && onePlayerInput.checked && fourByFourInput.checked) {
    createFlipCardGrid();
  } else {
    alert('Please select all the required options before starting the game.');
  }
});

let timerStarted = false;
let moves = 0;
let flippedCards = [];

function createFlipCardGrid() {
  const header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = `  <h1>Memory</h1>
  <div class="top-nav">
    <button class="btn restart">Restart</button>
    <button class="btn newGame">New Game</button>
  </div>`;
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

  // Create an array of pairs of numbers
  const pairs = Array.from({ length: numCards / 2 }, (_, i) => i + 1);
  const shuffledPairs = shuffleArray([...pairs, ...pairs]);

  const h1Elements = document.querySelectorAll('.flip-card h1');
  h1Elements.forEach((h1, index) => {
    h1.textContent = shuffledPairs[index];
  });

  // Flipcard event-listener
  const flipCards = document.querySelectorAll('.flip-card');
  let matchedPairs = 0;
  let timerInterval;

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
            // Matched cards, keep them flipped
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            markMatched([card1, card2]); // Change background color and mark as matched
            matchedPairs++; // Increment matched pairs count
            if (matchedPairs === numCards / 2) {
              // All pairs are matched, stop the timer
              clearInterval(timerInterval);
            }
          } else {
            // Unmatched cards, unflip them after a delay
            setTimeout(() => {
              unflipCard(card1);
              unflipCard(card2);
            }, 1000);
          }

          moves++;
          updateMovesDisplay();
          flippedCards = [];
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
  }

  function unflipCard(card) {
    card.classList.remove('flipped');
    let innerCard = card.querySelectorAll('.flip-card-inner');
    innerCard.forEach(element => {
      element.style.transform = 'rotateY(0deg)';
    });
  }

  function markMatched(cards) {
    cards.forEach(card => {
      card.classList.add('matched');
      let innerCard = card.querySelectorAll('.flip-card-back');
      innerCard.forEach(element => {
        element.style.backgroundColor = '#fda214';
      });
    });
  }

  function updateMovesDisplay() {
    const movesDisplay = document.querySelector('.moves');
    movesDisplay.textContent = moves;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
