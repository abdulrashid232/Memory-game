



const flipCards = document.querySelectorAll('.flip-card');

    // Add click event listener to each flip card
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
          flipCardFunction()
        });
        function flipCardFunction() {
          let innerCard =card.querySelector('.flip-card-inner');
          let isFlipped = false;
          if (isFlipped) {
              innerCard.style.transform = 'rotateY(0deg)';
              isFlipped = true;
          } else {
              innerCard.style.transform = 'rotateY(180deg)';
              isFlipped = false;
          }
      }

      
    });

