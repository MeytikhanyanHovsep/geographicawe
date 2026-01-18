const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');
const inputMin = document.getElementById('input-min');
const inputMax = document.getElementById('input-max');
const progress = document.getElementById('slider-progress');

const minGap = 1000;
const sliderMaxValue = parseInt(rangeMin.max);
const sliderMinValue = parseInt(rangeMin.min);

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function parseNumber(str) {
    return parseInt(str.replace(/\s/g, '')) || 0;
}

function updateProgress() {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);
    const totalRange = sliderMaxValue - sliderMinValue;
    const leftPercent = ((minVal - sliderMinValue) / totalRange) * 100;
    const rightPercent = ((sliderMaxValue - maxVal) / totalRange) * 100;

    progress.style.left = leftPercent + "%";
    progress.style.right = rightPercent + "%";
}

function onRangeInput(e) {
    let minVal = parseInt(rangeMin.value);
    let maxVal = parseInt(rangeMax.value);

    if (maxVal - minVal < minGap) {
        if (e.target.id === "range-min") {
            rangeMin.value = maxVal - minGap;
        } else {
            rangeMax.value = minVal + minGap;
        }
    }
    inputMin.value = formatNumber(rangeMin.value);
    inputMax.value = formatNumber(rangeMax.value);
    updateProgress();
}

function onTextInput(e) {
    let minVal = parseNumber(inputMin.value);
    let maxVal = parseNumber(inputMax.value);

    if (minVal < sliderMinValue) minVal = sliderMinValue;
    if (maxVal > sliderMaxValue) maxVal = sliderMaxValue;

    if (maxVal - minVal >= minGap) {
        rangeMin.value = minVal;
        rangeMax.value = maxVal;
        updateProgress();
    }
    // Переформатируем ввод пользователя
    inputMin.value = formatNumber(rangeMin.value);
    inputMax.value = formatNumber(rangeMax.value);
}

rangeMin.addEventListener('input', onRangeInput);
rangeMax.addEventListener('input', onRangeInput);
inputMin.addEventListener('change', onTextInput);
inputMax.addEventListener('change', onTextInput);

// Инициализация
updateProgress();