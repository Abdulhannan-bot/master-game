'use strict';

// selectiong elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

let playing, score, activePlayer, scores;
// starting condition
const init = function() {
    score = 0;
    activePlayer = 0;
    scores = [0,0];
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
};

init();

diceEl.classList.add(`hidden`);
playing = false;

const switchPlayer = function() {
    score = 0;
    document.getElementById(`current--${activePlayer}`).textContent = score;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
};

btnNew.addEventListener(`click`,function() {
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-0.jpeg`;
    document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer+1}`;
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    init();
    playing = true;
});

// Rolling dice functionality
btnRoll.addEventListener(`click`,function() {
    if(playing === true) {
        let roll = Math.trunc(Math.random() * 6) + 1;
        console.log(roll);
        diceEl.src = `dice-${roll}.png`;
        if(roll !== 1) {
            score += roll;
            document.getElementById(`current--${activePlayer}`).textContent = score;
        }else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener(`click`, function() {
    if(playing===true) {
        scores[activePlayer] += score;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer] >=100) {
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
            document.getElementById(`name--${activePlayer}`).textContent += ` WINS!!!!!`;
            diceEl.classList.add(`hidden`);
            playing = false;
        }else {
            switchPlayer();
        }
    }
});