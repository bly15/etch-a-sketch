window.onload = play;

const DEFAULT_GRID_SIZE = 16;
let gridSize = DEFAULT_GRID_SIZE;

/**
 * Driver function of the app
 */
function play() {
    createGrid();
    //styleGrid();  // Styled in 'style.css'
    sketchGrid();
    clearGrid();
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
 * Styles the grid
 */
function styleGrid() {
    let container = document.querySelector('.container');
    container.setAttribute('style', 'display: table; position: absolute; top: 50%; transform: translateX(50%) translateY(-50%); width: 50%');

    let rowDiv = document.querySelectorAll('.row');
    rowDiv.forEach((row) => {
        row.setAttribute('style', 'display: table-row; width: 100%');
    });

    let colDiv = document.querySelectorAll('.col');
    colDiv.forEach((col) => {
        col.setAttribute('style', 'border: solid; display: table-cell; padding: 2%');
    });
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
 * Clears the grid, prompts the user for a new grid size, and regenerates a
 * grid of said size.
 */
function clearGrid() {
    let clearButton = document.querySelector('#btn-clear');
    clearButton.addEventListener('click', () => {
        let container = document.querySelector('.container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        promptGridSize();
        play();
    });
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