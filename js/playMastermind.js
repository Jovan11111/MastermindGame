let curValues = [0, 0, 0, 0];
let curRow = 0;
let curCol = 0;
let rowFinished = false;
curRowRigth = 0;

let solution = generateSolution();

function insertValue(value){
    if(rowFinished == false){

        document.getElementById("resetButton").disabled = false;
        
        curValues[curCol] = value
        let table = document.getElementById("symbolTable");
        let rows = table.rows;
        rows[curRow].cells[curCol].innerText = value;

        curCol++;

        if(curCol == 4){
            curCol = 0;
            rowFinished = true;
            document.getElementById("submitButton").disabled = false;
        }
    }   
}

function submit(){
    curRow++;
    rowFinished = false;
    document.getElementById("submitButton").disabled = true;
    document.getElementById("resetButton").disabled = true;
    const [correctPlace, wrongPlace] = evaluateGuess(solution, curValues);
    console.log(wrongPlace);
    console.log(correctPlace);

    let colorTable = document.getElementById("colorTable");
    let cells = colorTable.rows[curRowRigth].cells;
    for(let i = 0; i < correctPlace; i++){
        cells[i].style.backgroundColor = "red";
    }
    for(let i = correctPlace; i < correctPlace + wrongPlace; i++){
        cells[i].style.backgroundColor = "yellow";
    }
    curRowRigth++;
}


function reset(){
    curValues = [0, 0, 0, 0];
    curCol = 0;
    let table = document.getElementById("symbolTable");
    let cells = table.rows[curRow].cells;
    for(let i = 0; i < cells.length; i++){
        cells[i].innerText = "";
    }
    document.getElementById("resetButton").disabled = true;
    if(document.getElementById("submitButton").disabled == false){
        document.getElementById("submitButton").disabled = true;
        rowFinished = false;
    }
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
    console.log(wrongPlace, correctPlace);
    return [correctPlace, wrongPlace];
}

function generateSolution() {
    const solution = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    console.log("Generated solution:", solution);
    return solution;
}