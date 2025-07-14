let hiddenNumber = [];
let history = [];
let guessCount = 0;

function generateNumber() {
    const digits = Array.from({ length: 10 }, (_, i) => i);
    hiddenNumber = [];
    while (hiddenNumber.length < 4) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        hiddenNumber.push(digits.splice(randomIndex, 1)[0]);
    }
}

function validateInput(input) {
    if (input.length !== 4 || new Set(input).size !== 4 || !/^\d{4}$/.test(input)) {
        return false;
    }
    return true;
}

function calculateHint(input) {
    let A = 0, B = 0;
    for (let i = 0; i < 4; i++) {
        if (input[i] == hiddenNumber[i]) {
            A++;
        } else if (hiddenNumber.includes(Number(input[i]))) {
            B++;
        }
    }
    return `${A}A${B}B`;
}

function updateGuessCount() {
    document.getElementById('guess-count').textContent = `猜題次數：${guessCount}`;
}

function restartGame() {
    generateNumber();
    history = [];
    guessCount = 0;
    updateGuessCount();
    document.getElementById('result').textContent = '';
    document.getElementById('history').textContent = '';
}

function checkAnswer(userGuess) {
    const hint = calculateHint(userGuess);
    if (hint === '4A0B') {
        document.getElementById('correct-sound').play();
    }
    return hint;
}

document.getElementById('submit-btn').addEventListener('click', () => {
    const input = document.getElementById('guess-input').value;
    if (!validateInput(input)) {
        document.getElementById('result').textContent = '請輸入不重複的四位數字！';
        return;
    }
    guessCount++;
    updateGuessCount();
    const hint = checkAnswer(input);
    history.push(`${input} - ${hint}`);
    document.getElementById('result').textContent = hint;
    document.getElementById('history').textContent = history.join('<br>');
    if (hint === '4A0B') {
        document.getElementById('result').textContent = '恭喜你猜中了！';
    }
});

document.getElementById('restart-btn').addEventListener('click', restartGame);

document.getElementById('show-answer-btn').addEventListener('click', () => {
    document.getElementById('result').textContent = `標準答案是：${hiddenNumber.join('')}`;
});

restartGame();
