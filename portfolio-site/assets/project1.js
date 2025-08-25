const puzzleContainer = document.getElementById('puzzle-container');
const shuffleBtn = document.getElementById('shuffleBtn');
const message = document.getElementById('message');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('bestTime');
const imageUpload = document.getElementById('imageUpload');
const gridSizeSelect = document.getElementById('gridSize');
const previewImage = document.getElementById('previewImage');

const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');

let tiles = [];
let moves = 0;
let timer = 0;
let timerInterval;
let gridSize = parseInt(gridSizeSelect.value);
let imageURL = 'https://picsum.photos/300'; // default image

function loadBestTime() {
    const key = `bestTime_${gridSize}`;
    const stored = localStorage.getItem(key);
    bestTimeDisplay.textContent = stored || '--';
}

// Initialize puzzle
function initPuzzle() {
    gridSize = parseInt(gridSizeSelect.value);
    loadBestTime();
    puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    tiles = [];
    for (let i = 0; i < gridSize * gridSize; i++) tiles.push(i);
    moves = 0;
    timer = 0;
    clearInterval(timerInterval);
    movesDisplay.textContent = 0;
    timerDisplay.textContent = 0;
    renderPuzzle();
}

// Render puzzle
function renderPuzzle() {
    puzzleContainer.innerHTML = '';
    const size = 300;
    const tileSize = size / gridSize;

    tiles.forEach((pos, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.width = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;

        if (pos === tiles.length - 1) {
            tile.classList.add('empty');
        } else {
            const row = Math.floor(pos / gridSize);
            const col = pos % gridSize;
            tile.style.backgroundImage = `url(${imageURL})`;
            tile.style.backgroundSize = `${size}px ${size}px`;
            tile.style.backgroundPosition = `${-col * tileSize}px ${-row * tileSize}px`;
            tile.addEventListener('click', () => moveTile(index));
        }
        puzzleContainer.appendChild(tile);
    });
}

// Move tile
function moveTile(index) {
    const emptyIndex = tiles.indexOf(tiles.length - 1);
    const validMoves = getValidMoves(emptyIndex);
    if (validMoves.includes(index)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        moves++;
        movesDisplay.textContent = moves;
        moveSound.play();
        renderPuzzle();
        checkWin();
    }
}

// Valid moves
function getValidMoves(emptyIndex) {
    const movesArr = [];
    const row = Math.floor(emptyIndex / gridSize);
    const col = emptyIndex % gridSize;

    if (row > 0) movesArr.push(emptyIndex - gridSize);
    if (row < gridSize - 1) movesArr.push(emptyIndex + gridSize);
    if (col > 0) movesArr.push(emptyIndex - 1);
    if (col < gridSize - 1) movesArr.push(emptyIndex + 1);

    return movesArr;
}

// Shuffle
function shufflePuzzle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    moves = 0;
    movesDisplay.textContent = moves;
    startTimer();
    renderPuzzle();
    message.textContent = '';
}

// Timer
function startTimer() {
    clearInterval(timerInterval);
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

// Check win
function checkWin() {
    const winState = [...Array(gridSize * gridSize).keys()];
    if (JSON.stringify(tiles) === JSON.stringify(winState)) {
        clearInterval(timerInterval);
        message.textContent = `🎉 You solved it in ${moves} moves and ${timer}s!`;
        winSound.play();
        const key = `bestTime_${gridSize}`;
        const stored = localStorage.getItem(key);
        if (!stored || timer < parseInt(stored)) {
            localStorage.setItem(key, timer);
            bestTimeDisplay.textContent = timer;
        }
    }
}

// Handle image upload
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imageURL = event.target.result;
            previewImage.src = imageURL;
            initPuzzle();
        };
        reader.readAsDataURL(file);
    }
});

// Difficulty change
gridSizeSelect.addEventListener('change', initPuzzle);
shuffleBtn.addEventListener('click', shufflePuzzle);

// Start
initPuzzle();