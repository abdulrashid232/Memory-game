import { createFlipCardGrid} from "../scripts/utils/card.js";

const StartBtn = document.querySelector('.btn-start');
const numbersInput = document.getElementById('numbers');
const iconsInput = document.getElementById('icons');
const onePlayerInput = document.getElementById('1');
const twoPlayerInput = document.getElementById('2');
const threePlayerInput = document.getElementById('3');
const fourPlayerInput = document.getElementById('4');
const fourByFourInput = document.getElementById('4x4');
const sixBysixInput = document.getElementById('6x6');



// Start Button EventListener

StartBtn.addEventListener('click', () => {
  if ((numbersInput.checked || iconsInput.checked) && (onePlayerInput.checked || twoPlayerInput.checked || threePlayerInput|| fourPlayerInput.checked) && (fourByFourInput.checked || sixBysixInput.checked)) {
    createFlipCardGrid();
  }
   else  {
    alert('Please select all the required options before starting the game.');
  }
});

// @Abdul-Rashid
