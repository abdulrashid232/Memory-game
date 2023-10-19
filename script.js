const flipCards = document.querySelectorAll('.flip-card');
let timerStarted = false; 

flipCards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('flipped')) {
            unflipCard(card);
        } else {
            flipCard(card);

            if (!timerStarted) {
                timerStarted = true;
                setInterval(setTime, 1000);
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
