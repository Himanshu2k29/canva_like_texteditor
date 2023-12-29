let lastSelectedInput = null;  
let isDragging = false;
let offsetX, offsetY;

// Event listeners for dropdowns
document.getElementById('font-select').addEventListener('change', applyStylesToLastSelectedInput);
document.getElementById('size-select').addEventListener('change', applyStylesToLastSelectedInput);

// Event listener for color picker
document.getElementById('color-select').addEventListener('change', function(event) {
    if (lastSelectedInput) {
        lastSelectedInput.style.color = event.target.value;
    }
});

// Event listener for clicks inside the template div
document.querySelector('.template').addEventListener('click', function(event) {
    if (event.target.tagName === 'INPUT') {
        lastSelectedInput = event.target;
    }
});

// Event listener for mouse down on the input element
document.querySelector('.template').addEventListener('mousedown', function(event) {
    if (event.target.tagName === 'INPUT') {
        isDragging = true;
        offsetX = event.clientX - event.target.getBoundingClientRect().left;
        offsetY = event.clientY - event.target.getBoundingClientRect().top;
    }
});

// Event listener for mouse up to stop dragging
document.addEventListener('mouseup', function() {
    isDragging = false;
});

// Event listener for mouse move to move the input element
document.addEventListener('mousemove', function(event) {
    if (isDragging && lastSelectedInput) {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        lastSelectedInput.style.left = `${x}px`;
        lastSelectedInput.style.top = `${y}px`;
    }
});

// Function to apply styles to the last selected input element inside the template
function applyStylesToLastSelectedInput() {
    if (!lastSelectedInput) return;

    const selectedFont = document.getElementById('font-select').value;
    const selectedSize = document.getElementById('size-select').value;

    lastSelectedInput.style.fontFamily = selectedFont;
    lastSelectedInput.style.fontSize = selectedSize + 'px';
}

// Event listener for the "Add Text" button
document.getElementById('add-text-btn').addEventListener('click', function() {
    createNewInputInsideTemplate();
});

// Function to create a new input element inside the template
function createNewInputInsideTemplate() {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Enter your text here...';
    newInput.style.border = 'none'; 
    newInput.style.padding = '10px'; 
    newInput.style.display = 'block'; 
    newInput.style.position = 'absolute';  
    newInput.style.left = '50%';
    newInput.style.transform = 'translateX(-50%)';
    newInput.style.top = '30px';

    const templateDiv = document.querySelector('.template');
    templateDiv.appendChild(newInput);

    lastSelectedInput = newInput;  

    // Apply styles immediately upon creation
    applyStylesToLastSelectedInput();
}
