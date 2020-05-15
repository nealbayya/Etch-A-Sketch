/*
Neal Bayya
The Odin Project
5/14/2020
*/

//Change the color of grid cell
function changeColor(e) {
    switch (palette) {
        case 0: 
            this.style['background-color'] = 'black';
            break;
        case 1:
            this.style['background-color'] = getRandomColor();
            break;
        case 2:
            if (gradLVal > 99 && gradLValInc) {
                gradLValInc = false;
            } else if (gradLVal <= 10 && !gradLValInc) {
                gradLValInc = true;
            }
            this.style['background-color'] = `hsl(${gradHue}, ${100}%, ${gradLVal}%)`;
            gradLVal += (gradLValInc) ? 3 : -3;
            break;
    }
    
}

//Helper function for random palette
//Method code from https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Creates grid using CSS Grid
function setupGrid(dim) {
    let gridContainer = document.querySelector('.grid-container');

    gridContainer.style['grid-template-rows'] = `repeat(${dim}, 1f)`; 
    gridContainer.style['grid-template-columns'] = `repeat(${dim}, 1f)`;

    //loop through each cell and set style
    for (let i = 0; i < dim * dim; i++) {
        let row = 1 + Math.floor(i / dim);
        let col = 1 + i % dim;

        let gridItem = document.createElement('div');

        gridItem.style.gridColumnStart = col;
        gridItem.style.gridColumnEnd = 1 + col;
        gridItem.style.gridRowStart = row;
        gridItem.style.gridRowEnd = 1 + row;

        gridItem.style.border = "0.75px solid black";
        gridItem.style.paddingTop = "80%";
        
        gridItem.classList.add('gi');
        gridContainer.appendChild(gridItem);
    }

    const gridItems = Array.from(document.querySelectorAll(".gi"));
    gridItems.forEach(i => i.addEventListener('mouseover', changeColor))    //bind color change to hover
}

//code for resetting grid display with empty button
function empty() {
    let gridContainer = document.querySelector('.grid-container');
    const gridItems = Array.from(document.querySelectorAll(".gi"));
    gridItems.forEach(i => i.style['background-color'] = "white");
    //remove all grid cells to clear DOM
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    updateGridSize();
    setupGrid(dim);
}


function resetPaletteButtons() {
    let paletteButtons = document.querySelectorAll('.palette');
    paletteButtons.forEach(pb => {
        pb.style.backgroundColor = "white";
        pb.style.background = '';
        pb.style.color = "black";
    });
}

function setupControlsPanel() {
    let controlsContainer = document.querySelector('.controls-container');

    //event listening for empty button
    let emptyButton = document.createElement('button');
    emptyButton.textContent = "empty";
    emptyButton.classList.add('control-func');

    controlsContainer.appendChild(emptyButton);
    emptyButton.addEventListener('click', empty);

    //event listening for palette
    let bwButton = document.createElement('button');
    bwButton.textContent = "black & white"
    bwButton.classList.add('control-func');
    bwButton.classList.add('palette');
    bwButton.addEventListener('click', () => {
        resetPaletteButtons();
        palette = 0;
        console.log("here");
        bwButton.style.backgroundColor = 'black';
        bwButton.style.color = 'white';
    });

    let randButton = document.createElement('button');
    randButton.textContent = "random"
    randButton.classList.add('control-func');
    randButton.classList.add('palette');
    randButton.addEventListener('click', () => {
        resetPaletteButtons();
        palette = 1;
        randButton.style.backgroundColor = getRandomColor();
        randButton.style.color = 'black';
    });

    let gradButton = document.createElement('button');
    gradButton.textContent = "gradient"
    gradButton.classList.add('control-func');
    gradButton.classList.add('palette');
    gradButton.addEventListener('click', () => {
        resetPaletteButtons();
        palette = 2;
        gradHue = Math.floor(Math.random() * 360);
        gradButton.style.background = `linear-gradient(${Math.round(Math.random()*90)}deg, 
                hsl(${gradHue}, ${100}%, ${64}%), hsl(${gradHue}, ${100}%, ${100}%))`;
        gradButton.style.color = 'black';
    });

    controlsContainer.appendChild(bwButton);
    controlsContainer.appendChild(randButton);
    controlsContainer.appendChild(gradButton);

    //style control funcs
    let controlFuncs = document.querySelectorAll('.control-func');
    controlFuncs.forEach(f => {
        f.style.padding = `${0.5}em`;
        f.style.margin = `${0.5}em`;
        f.style.fontFamily = "Jost";
        f.style.fontSize = `${18}px`;
    });


}

//prompt user input for grid size
function updateGridSize() {
    dim = prompt("Grid size: ", 16)
    console.log(dim);
}

let dim;
let palette = 0; // 0 -> black/white; 1 -> random; 2 -> gradient
let gradHue;
let gradLVal = 95;
let gradLValInc = false;
updateGridSize();
setupGrid(dim);
setupControlsPanel();

