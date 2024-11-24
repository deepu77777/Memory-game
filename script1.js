const board = document.getElementById('game-board');
const symbols = ['🍎', '🍌', '🍒', '🍓', '🍉', '🍇', '🍊', '🍍', '🍎', '🍌', '🍒', '🍓', '🍉', '🍇', '🍊', '🍍'];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.innerHTML = symbol;
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (flippedCards.length === 2) return;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    if (matchedPairs === symbols.length / 2) {
      alert('You win!');
    }
  } else {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
  }

  flippedCards = [];
}

function startGame() {
  shuffle(symbols);
  board.innerHTML = '';
  symbols.forEach(symbol => {
    board.appendChild(createCard(symbol));
  });
}

startGame();
