
function changeColor(e) {
    this.style['background-color'] = 'black';
    console.log(this);
}

function setupGrid(dim) {
    let gridContainer = document.querySelector('.grid-container');

    gridContainer.style['grid-template-rows'] = `repeat(${dim}, 1f)`;
    gridContainer.style['grid-template-columns'] = `repeat(${dim}, 1f)`;

    for (let i = 0; i < dim * dim; i++) {
        let row = 1 + Math.floor(i / dim);
        let col = 1 + i % dim;

        let gridItem = document.createElement('div');

        gridItem.style.gridColumnStart = col;
        gridItem.style.gridColumnEnd = 1 + col;
        gridItem.style.gridRowStart = row;
        gridItem.style.gridRowEnd = 1 + row;

        gridItem.style.border = "1px solid black";
        gridItem.style.paddingTop = "100%";
        
        gridItem.classList.add('gi');
        gridContainer.appendChild(gridItem);
    }

    const gridItems = Array.from(document.querySelectorAll(".gi"));
    gridItems.forEach(i => i.addEventListener('mouseover', changeColor))
}

function setupControlsPanel() {
    let controlsContainer = document.querySelector('controls-container');
    let emptyButton = document.createElement('empty');
    
}

function updateGridSize() {
    dim = prompt("Grid size: ", 16)
}

let dim = 16;
setupGrid(dim);


