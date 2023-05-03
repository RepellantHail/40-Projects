let userScore = 0
let computerScore = 0
const userScore_span = document.getElementById('user-score')
const computerScore_span = document.getElementById('computer-score')
const scoreBoard_div = document.querySelector('.score-board')
const result_div = document.querySelector('.result > p')
const rock_div = document.getElementById('r')
const paper_div = document.getElementById('p')
const scissor_div = document.getElementById('s')
const items = document.querySelectorAll('.choice')

function main (){
    rock_div.addEventListener('click', function() {
        game("r")
    })

    paper_div.addEventListener('click', function() {
        game("p")
    })

    scissor_div.addEventListener('click', function() {
        game("s")
    })
}

function getComputerChoice(){
    const choices = ['r','p','s']
     return choices[Math.floor(Math.random()*3)]
}

function convertToWord(letter){
    if(letter === "r") return "Rock"
    if(letter === "p") return "Paper"
    return "Scissors"
}

// items.forEach( function (item){
//     item.addEventListener("click", function(){
//         console.log("Picado")
//     })
// } )

function game(userChoice){
    const computerChoice = getComputerChoice();
    switch(userChoice+computerChoice){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice,computerChoice)
            break
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice,computerChoice)
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice,computerChoice)
            break
    }
}

function win(userChoice, computerChoice){
    const smallUserWord = "user".fontsize(3).sub()
    const smallCompWord = "comp".fontsize(3).sub()
    const userChoice_div = document.getElementById(userChoice)
    userScore++;
    userScore_span.innerHTML = userScore
    computerScore_span.innerHTML = computerScore
    result_div.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You Win`
    userChoice_div.classList.add('green-glow')
    setTimeout(() => userChoice_div.classList.remove('green-glow'),700)
}
function lose(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice)
    const smallUserWord = "user".fontsize(3).sub()
    const smallCompWord = "comp".fontsize(3).sub()
    computerScore++;
    userScore_span.innerHTML = userScore
    computerScore_span.innerHTML = computerScore
    result_div.innerHTML = `${convertToWord(computerChoice)}${smallUserWord} beats ${convertToWord(userChoice)}${smallCompWord}. You Lost`
    userChoice_div.classList.add('red-glow')
    setTimeout(function() {userChoice_div.classList.remove('red-glow')},700)
}
function draw(userChoice,computerChoice){ 
    const userChoice_div = document.getElementById(userChoice)
    const smallUserWord = "user".fontsize(3).sub()
    const smallCompWord = "comp".fontsize(3).sub()
    result_div.innerHTML = `${convertToWord(computerChoice)}${smallUserWord} equals ${convertToWord(userChoice)}${smallCompWord}. GG`
    userChoice_div.classList.add('gray-glow')
    setTimeout(function() {userChoice_div.classList.remove('gray-glow')},700)
}



main ()