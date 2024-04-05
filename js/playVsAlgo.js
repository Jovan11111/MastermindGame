let result = [0, 0, 0, 0];
let curEl = 0;
let rowFinished = false;
let guess = [1, 1, 2, 2];
let curRow = 0;
let curCol = 0;
let curRowRigth = 0;


let possibleSolutions = [];

for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 6; j++) {
        for (let k = 1; k <= 6; k++) {
            for (let l = 1; l <= 6; l++) {
                possibleSolutions.push([i, j, k, l]);
            }
        }
    }
}

console.log(possibleSolutions);

function insertResult(value){
    if(rowFinished == false){
        document.getElementById("resetButton").disabled = false;
        let table = document.getElementById("resultTable");
        let rows = table.rows;
        result[curEl] = value;
        rows[0].cells[curEl].innerText = value;
        curEl++;
        if(curEl == 4){
            document.getElementById("submitButton").disabled = false;
            rowFinished = true;
        }
    }
}

function resetResult(){
    let table = document.getElementById("resultTable");
    let rows = table.rows;
    for(let i = 0; i < 4; i++){
        rows[0].cells[i].innerText = "";
    }
    curEl = 0;
    document.getElementById("submitButton").disabled = true;
    document.getElementById("resetButton").disabled = true;
    rowFinished = false;
}

function submitResult(){
    document.getElementById("btn1").disabled = true;
    document.getElementById("btn2").disabled = true;
    document.getElementById("btn3").disabled = true;
    document.getElementById("btn4").disabled = true;
    document.getElementById("btn5").disabled = true;
    document.getElementById("btn6").disabled = true;
    document.getElementById("submitButton").disabled = true;
    document.getElementById("resetButton").disabled = true;
    letComputerPlay();
}

function evaluateGuess(solution, guess) {
    let correctPlace = 0;
    let wrongPlace = 0;

    for (let i = 0; i < solution.length; i++) {
        if (solution[i] === guess[i]) {
            correctPlace++;
        }
    }

    let solutionCount = Array(7).fill(0); 
    let guessCount = Array(7).fill(0); 
    for (let i = 0; i < solution.length; i++) {
        solutionCount[solution[i]]++;
        guessCount[guess[i]]++;
    }

    for (let i = 1; i <= 6; i++) { 
        wrongPlace += Math.min(solutionCount[i], guessCount[i]); 
    }

    wrongPlace -= correctPlace;
    return [correctPlace, wrongPlace];
}

async function letComputerPlay(){
    console.log(result);
    for(let i = 0; i < 4; i++){
        insertValue(guess[i]);
    }
    for(let i = 0; i < 6; i++){
        let [correctPlace, wrongPlace] = evaluateGuess(result, guess);
        
        let colorTable = document.getElementById("colorTable");
        let cells = colorTable.rows[curRowRigth].cells;
        for(let i = 0; i < correctPlace; i++){
            cells[i].style.backgroundColor = "red";
        }
        for(let i = correctPlace; i < correctPlace + wrongPlace; i++){
            cells[i].style.backgroundColor = "yellow";
        }
        curRowRigth++;

        if(correctPlace == 4){
            await new Promise(resolve => setTimeout(resolve, 1500));
            restartScreen();
            break;
        }
        possibleSolutions = filterSolutions(possibleSolutions, guess, correctPlace, wrongPlace);
        guess = computerGuess(possibleSolutions);
        await new Promise(resolve => setTimeout(resolve, 3000));
        for(let i = 0; i < 4; i++){
            insertValue(guess[i]);
        }
    }
}

function computerGuess(possibleSolutions) {
    let bestGuess = possibleSolutions[0];
    let minAvgRemaining = Infinity;

    for (let guess of possibleSolutions) {
        let remainingPossibilities = [];
        for (let sol of possibleSolutions) {
            let feedback = evaluateGuess(sol, guess);
            let remaining = possibleSolutions.filter(s => isEqual(evaluateGuess(s, guess), feedback)).length;
            remainingPossibilities.push(remaining);
        }
        let avgRemaining = remainingPossibilities.reduce((acc, cur) => acc + cur, 0) / remainingPossibilities.length;
        if (avgRemaining < minAvgRemaining) {
            minAvgRemaining = avgRemaining;
            bestGuess = guess;
        }
    }

    return bestGuess;
}

function isEqual(arr1, arr2) {
    return arr1.every((val, index) => val === arr2[index]);
}

function filterSolutions(possibleSolutions, guess, correct, wrong) {
    return possibleSolutions.filter(sol => {
        const [solCorrect, solWrong] = evaluateGuess(sol, guess);
        return solCorrect === correct && solWrong === wrong;
    });
}

function sleep(milliseconds) {
    const startTime = new Date().getTime();
    while (new Date().getTime() - startTime < milliseconds) {
    }
  }

function insertValue(value){        
        let table = document.getElementById("symbolTable");
        let rows = table.rows;
        rows[curRow].cells[curCol].innerText = value;

        curCol++;

        if(curCol == 4){
            curCol = 0;
            curRow++;
        }
}

function restartScreen(){
    const modal = document.getElementById('restartModal');
    modal.style.display = 'block';
  }

function closeModal() {
    const modal = document.getElementById('restartModal');
    modal.style.display = 'none';
}

function refresh(){
    location.reload();
}
