window.onload = play;

const CLEAR_BUTTON = document.querySelector('#btn-clear');
const RESIZE_BUTTON = document.querySelector('#btn-resize');
const DEFAULT_GRID_SIZE = 16;
let gridSize = DEFAULT_GRID_SIZE;

/**
 * Driver function of the app
 */
function play() {
    createGrid();
    sketchGrid();
    
    CLEAR_BUTTON.addEventListener('click', () => {
        clearGrid();
        play();
    });

    RESIZE_BUTTON.addEventListener('click', () => {
        resizeGrid();
        play();
    });
}

/**
 * Creates a table of size (GRID_SIZE x GRID_SIZE)
 */
function createGrid() {
    let container = document.querySelector('.container');

    for (let row = 0; row < gridSize; row++) {
        let rowDiv = document.createElement('div');
        rowDiv.classList.toggle('row');

        for (let col = 0; col < gridSize; col++) {
            let colDiv = document.createElement('div');
            colDiv.classList.toggle('col');
            rowDiv.append(colDiv);
        }

        container.append(rowDiv);
    }
}

/**
 * Sketches the cells of the grid with a random color when you place your mouse
 * over a white cell. If the cell is not white, the current cell color 
 * will darken by 10% with each pass.
 */
function sketchGrid() {
    let colDiv = document.querySelectorAll('.col');
    colDiv.forEach((col) => {
        col.addEventListener('mouseover', () => {
            let color;
            if ((col.style.backgroundColor) === '') {
                color = tinycolor.random();
            } else {
                color = tinycolor(`${col.style.backgroundColor}`).darken();
            }

            col.setAttribute('style', `background: ${color}`);
        });
    });
}

/**
 * Prompts the user for a new grid size, and generates a grid of said size
 */
function resizeGrid() {
    clearGrid();
    promptGridSize();
}

/**
 * Clears the grid
 */
function clearGrid() {
    let container = document.querySelector('.container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

/**
 * Prompt the user for a new grid size. Takes in only 1 value and will
 * create (N x N) grid.
 */
function promptGridSize() {
    do {
        newGridSize = parseInt(prompt("Please input a new grid size (valid values are between 1 and 64, inclusive)."), 10);    
    } while (isNaN(newGridSize) || newGridSize < 1 || newGridSize > 64);

    gridSize = newGridSize;
}