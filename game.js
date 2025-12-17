const display = document.querySelector('.display');
const moveBtn = document.querySelector('.move-btn');
const shootBtn = document.querySelector('.shoot-btn');
const resetBtn = document.querySelector('.reset-btn');
let gameOver = false;
let shooting = false;

const initialTerrain = ['O', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'];

let terrain = initialTerrain;
const terrainObjs = ['_', '|'];

let random = () => Math.floor(Math.random() * 2);

function updateDisplay() {
    display.textContent = terrain.join('');
}

function reset() {
    terrain = ['O', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'];
    gameOver = false;
    updateDisplay();
}

function removeTerrain() {
    const spliced = terrain.splice(1, 1)[0];
    if (spliced === '|') {
        gameOver = true;
        alert('Game Over!');
        reset();
    }
    else {
        updateDisplay();
    }
}

function move() {
    if (!gameOver && !shooting) {
        terrain.push(terrainObjs[random()]);
        removeTerrain();
    }
}

function shoot() {
    if (gameOver || shooting) { return; }
    const danger = terrain.indexOf('|');

    shooting = true;
    let x = 1;
    let prev = null;

    const interval = setInterval(() => {
        if (prev != null && terrain[prev] === '-') {
            terrain[prev] = '_';
        }

        if ((x === danger) || (x >= terrain.length)) {
            if (x === danger) {
                terrain[x] = '_';
            }

            clearInterval(interval);
            shooting = false;
            updateDisplay();
            return;
        }

        if (terrain[x] === '_') {
            terrain[x] = '-';
        }

        updateDisplay();

        prev = x;
        x++;

    }, 30);
}

moveBtn.addEventListener('click', move);

shootBtn.addEventListener('click', shoot);

resetBtn.addEventListener('click', reset);

document.addEventListener('keydown', (e) => {

    switch (true) {
        case (e.key === 'ArrowRight'):
            e.preventDefault();
            move();
            break;
        case (e.key === ' '):
            e.preventDefault();
            shoot();
            break;
    }
});

reset();
updateDisplay();