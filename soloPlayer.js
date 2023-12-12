// Solo popup funtion

export function createPopup(pTime,pMoves) {
  const popup = document.createElement('div');
  popup.className = 'popup';

  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';

  const topNote = document.createElement('div');
  topNote.className = 'top-note';

  const h2 = document.createElement('h2');
  h2.textContent = 'You did it!';

  const p = document.createElement('p');
  p.textContent = "Game Over! Here's how you got on...";

  topNote.appendChild(h2);
  topNote.appendChild(p);

  const scores = document.createElement('div');
  scores.className = 'scores';

  const timeBox = document.createElement('div');
  timeBox.className = 'timeBox';

  const h4Time = document.createElement('h4');
  h4Time.textContent = 'Time Elapsed';

  timeBox.appendChild(h4Time);
  timeBox.appendChild(pTime);

  const movesBox = document.createElement('div');
  movesBox.className = 'movesBox';

  const h4Moves = document.createElement('h4');
  h4Moves.textContent = 'Moves Taken';


  movesBox.appendChild(h4Moves);
  movesBox.appendChild(pMoves);
  scores.appendChild(timeBox);
  scores.appendChild(movesBox);

  const popBtn = document.createElement('div');
  popBtn.className = 'popBtn';

  const restartButton = document.createElement('button');
  restartButton.className = 'restart';
  restartButton.textContent = 'Restart';

  restartButton.addEventListener('click', () => {
    restartGame();
  });

  const newGameButton = document.createElement('button');
  newGameButton.className = 'new-game';
  newGameButton.textContent = 'Setup New Game';

  newGameButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  popBtn.appendChild(restartButton);
  popBtn.appendChild(newGameButton);

  popupContent.appendChild(topNote);
  popupContent.appendChild(scores);
  popupContent.appendChild(popBtn);

  popup.appendChild(popupContent);
  document.body.appendChild(popup);
}