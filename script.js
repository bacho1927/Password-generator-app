'use strict'
const copyButton = document.querySelector('.copybutton')
const slider = document.getElementById("myRange");
const output = document.getElementById('slider-value');
const rangeInput = document.querySelector(".slider");
const boxes = document.querySelectorAll('.diff');
const difficulty = document.querySelector('.difficulty');
const password = document.querySelector('.password');
const numbers = document.getElementById('numbers')
const generateButton = document.querySelector('.generate-button')
const symbols = document.getElementById('symbols')
const upper = document.getElementById('uppercase')
const lower = document.getElementById('lowercase')
const checkbox = document.querySelector('.checkbox')


output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    var value = (this.value - this.min) / (this.max - this.min) * 100
    this.style.background = 'linear-gradient(to right, #A4FFAF 0%, #A4FFAF ' + value + '%, #18171F ' + value + '%, #18171F 100%)'
}

copyButton.querySelector('button').addEventListener('click', function () {
    function checkboxesChecked() {
        return symbols.checked || numbers.checked || upper.checked || lower.checked;
    }
    const copy = checkboxesChecked() ? password.innerText : '';
    navigator.clipboard.writeText(copy);
    copyButton.classList.add('active')
})

slider.addEventListener('input', function () {
    const number = +slider.value
    boxes.forEach((box, index) => {
        if (index < Math.floor(number / 5)) {
            box.classList.add('red')
        }
    })
})

/*generates password*/

function generateRandomString(length) {
    const symb = symbols.checked ? '!@#$%^&*()_+' : '';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const number = numbers.checked ? '0123456789' : '';
    const allChars = (lower.checked ? 'abcdefghijklmnopqrstuvwxyz' : '') + symb + number + (upper.checked ? uppercase : '');

    if (!symbols.checked && !upper.checked && !lower.checked && !numbers.checked) {
        password.innerHTML = 'P4$5W0rD!';
        password.style.color = 'gray'
        return;
    } else {
        password.style.color = 'white'
    }

    const result = Array.from({ length }, () => allChars[Math.floor(Math.random() * allChars.length)]).join('');
    password.innerHTML = result;
}

window.onload = function () {
    generateRandomString(slider.value)
}


generateButton.addEventListener("click", () => {
    generateRandomString(slider.value)
    copyButton.classList.remove('active')
})


/*changes color of the boxes*/

rangeInput.addEventListener("input", () => {
    const value = rangeInput.value;
    boxes.forEach((box, index) => {
        if (value >= 20) {
            box.style.backgroundColor = "#A4FFAF";
            box.style.border = "1px solid transparent";
            difficulty.innerHTML = 'Strong'
        } else if (value >= 15 && index < 4) {
            box.style.backgroundColor = "#A4FFAF";
            box.style.border = "1px solid transparent";
            difficulty.innerHTML = 'Strong'
        } else if (value >= 10 && index < 3) {
            box.style.backgroundColor = "#F8CD65";
            box.style.border = "1px solid transparent";
            difficulty.innerHTML = 'Medium'
        } else if (value >= 5 && index < 2) {
            box.style.backgroundColor = "#FB7C58";
            box.style.border = "1px solid transparent";
            difficulty.innerHTML = 'Weak'
        } else if (value < 5 && index < 1) {
            box.style.backgroundColor = "#F64A4A";
            box.style.border = "1px solid transparent";
            difficulty.innerHTML = 'Too Weak'
        }
        else {
            box.style.backgroundColor = "transparent";
            box.style.border = '1px solid white'
        }
    });
});



