const holes = document.querySelectorAll('.tanah');
const moles = document.querySelectorAll('.tikus');
const scoreBoard = document.querySelector('.score')

let lastHole;
let timeUp;
let score;

function randTime(min, max){
  return Math.round(Math.random() * (max - min) + min);
}

function randHole(holes){
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole == lastHole) {
    console.log ('Terdeteksi muncul 2 kali, mengulang kemunculan tikus bau tanah.')
    return randHole(holes);
  }

  lastHole = hole;
  return hole;
}

function bakekok(){
  const time = randTime(200, 1000);
  const hole = randHole(holes);
  hole.classList.add('muncul')
  setTimeout(() => {
    hole.classList.remove('muncul')
    if (!timeUp) bakekok();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;  
  bakekok();
  setTimeout(() => timeUp = true, 10000);
}

function bonk(e){
  if(!e.isTrusted) return; //cheater !
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk))