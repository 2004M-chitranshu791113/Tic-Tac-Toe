console.log("Welcome to Tic Tac Toe");
const music = new Audio('sound/music.mp3');
const ting = new Audio('sound/ting.mp3');
const gameover = new Audio('sound/gameover.mp3');
let turnText = document.getElementById('turnText');
const reset = document.querySelector('.reset');
const boxes = document.getElementsByClassName('box');
const winningGif = document.querySelector('img');
const line = document.querySelector('.line');

music.play();

let turn = 'X';
let winner = null; 
let gameOver = false;
let turnCount = 0;

const checkWin = ()=>{
    const win = [
        [0, 1, 2, 0, 5, 0], 
        [3, 4, 5, 0, 15, 0], 
        [6, 7, 8, 0, 25, 0], 
        [0, 3, 6, -10, 15, 90], 
        [1, 4, 7, 0, 15, 90], 
        [2, 5, 8, 10, 15, 90], 
        [0, 4, 8, 0, 15, 45], 
        [2, 4, 6, 0, 15, -45], 
    ]
    win.forEach(e=>{
        if ((boxes[e[0]].innerText === boxes[e[1]].innerText) && (boxes[e[1]].innerText === boxes[e[2]].innerText) && (boxes[e[0]].innerText !== '')) {
            winner = boxes[e[0]].innerText;
            turnText.innerText = `${winner} WON !!`;
            gameOver = true;
            winningGif.style.width = '20vw';
            gameover.play();
            line.style.transform = `translateX(${e[3]}vw) translateY(${e[4]}vw) rotate(${e[5]}deg)`;
            line.style.width = '100%';
        }
    })
}

// Main Logic
Array.from(boxes).forEach((e)=>{
    e.addEventListener('click', ()=>{
        if (!gameOver && e.innerText === '') {
            e.innerText = turn;
            ting.play();
            checkWin();
            if (gameOver) return;
            turn = (turn === 'X' ? 'O' : 'X');
            turnText.innerText = `Turn for ${turn}`;
            turnCount++;
            if (turnCount === 9) {
                gameOver = true;
                turnText.innerText = `Match Draw !!`;
            }
        }
    })
})

reset.addEventListener('click', ()=>{
    Array.from(boxes).forEach((element)=>{
        element.innerText = '';
    })
    gameOver = false;
    turnCount = 0;
    turn = 'X';
    turnText.innerText = "Turn for X";
    winner = null;
    line.style.width = '0%';
    winningGif.style.width = '0px';
})