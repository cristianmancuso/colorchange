// select elements:
const inputColor = document.getElementById('inputColorChoose');
const divGeneral = document.getElementById('divPrincipal');
const botonChange = document.getElementById('btnChange');
const botonSave = document.getElementById('btnSave');
const listColores = document.getElementById('listaColores');

// Load colors from localStorage
document.addEventListener('DOMContentLoaded', loadColors);

// Event listeners
inputColor.addEventListener('input', () => {});
botonChange.addEventListener('click', changeColor);
botonSave.addEventListener('click', saveColor);

// Functions
function changeColor() {
    divGeneral.style.background = inputColor.value;
}

function saveColor() {
    const colorValue = inputColor.value;

    const lista = document.createElement('LI');
    lista.classList.add('flex', 'flex-row', 'items-center', 'justify-center', 'gap-5');

    const divContent = document.createElement('div');
    divContent.classList.add('flex', 'items-center', 'justify-center');

    const pTextColor = document.createElement('P');
    pTextColor.textContent = colorValue;

    const squareColor = document.createElement('div');
    squareColor.classList.add('h-4', 'w-4', `bg-[${colorValue}]`);

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'X';
    btnDelete.classList.add('text-red-500', 'font-bold');
    btnDelete.addEventListener('click', () => {
        // Remove color from the list
        lista.remove();
        // Update localStorage
        updateLocalStorage();
    });

    // insert elements in li and div
    lista.append(pTextColor);
    lista.append(squareColor);
    lista.append(btnDelete);
    listColores.append(lista);

    // Save color to localStorage
    saveColorToLocalStorage(colorValue);
}

function saveColorToLocalStorage(color) {
    // Get colors from Localstorage  -> array empty
    const existingColors = JSON.parse(localStorage.getItem('colors')) || [];

    // Add the new color 
    existingColors.push(color);

    // Save the updated 
    localStorage.setItem('colors', JSON.stringify(existingColors));
}

function loadColors() {
    // Get colors 
    const savedColors = JSON.parse(localStorage.getItem('colors')) || [];

    // insert colors and text in UL
    savedColors.forEach((color) => {
        const lista = document.createElement('LI');
        lista.classList.add('flex', 'flex-row', 'items-center', 'justify-center', 'gap-5');

        const pTextColor = document.createElement('P');
        pTextColor.textContent = color;

        const squareColor = document.createElement('div');
        squareColor.classList.add('h-4', 'w-4', `bg-[${color}]`);

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'X';
        btnDelete.classList.add('text-red-500', 'font-bold');
        btnDelete.addEventListener('click', () => {
            lista.remove();
            updateLocalStorage();
        });

        lista.append(pTextColor);
        lista.append(squareColor);
        lista.append(btnDelete);
        listColores.append(lista);
    });
}

function updateLocalStorage() {
    // Get all colors from localStorage
    const colors = Array.from(listColores.children).map((li) =>
        li.firstChild.nextSibling.textContent
    );

    localStorage.setItem('colors', JSON.stringify(colors));
}