const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let false_number = document.querySelector("#false_number");
let true_number = document.querySelector("#true_number");

ctx.fillStyle = "green";

const cols = 200;
const rows = 200;
const cellSize = 5;

let speed = null;
let started = false;

// maak 2 2d arrays.
let grid0 = Array.from(Array(cols), () => new Array(rows));
let grid1 = grid0;

// vul de array met willekeurige booleans
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        grid0[i][j] = (Math.random() < 0.05);
    }
}

drawGrid(grid0);

function clicked() {
if (!started) {
    speed = setInterval(run, 50);
    started = true;
    }
}

function run() {
	drawGrid(grid0);

    grid1 = grid0;
    live(grid1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(grid1);
    grid0 = grid1;
    live(grid0);
}

function live(grid) {
    let alive = 0;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let neighbours = 0;

            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {

                    if (x == 0 && y == 0) {
                        y++;
                    }
                    
                    if (i + x < cols && i + x >= 0 && j + y < rows && j + y >= 0) {
                        if (grid[i + x][j + y]) {
                            neighbours++;
                        }
                    }
                }
            }
            if (neighbours < 2 || neighbours > 3) {
                grid[i][j] = false;
            }
            if (neighbours == 3) {
                grid[i][j] = true;
                alive++;
            }
        }
    }
    false_number.textContent = (cols * rows) - alive;
    true_number.textContent = alive;
}

function drawGrid(grid) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j]) {
            	ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
}

