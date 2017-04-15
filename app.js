console.log('connected');

function startGame(){
    //creating variables for the game status, round number, time, move sequence
    // let inProgress = true;
    const startButton = document.querySelector('#start');
    const restartButton = document.querySelector('#restart');
    restartButton.style.display = 'none';
    let round = 1;
    let roundDisplay = document.querySelector('#counter');
    let time = 1000;
    let computerSequence = [];
    let playerSequence = [];
    
    //locating the bunny body parts
    const a = document.querySelector('#left_ear');
    const b = document.querySelector('#right_ear');
    const c = document.querySelector('#left_paw');
    const d = document.querySelector('#right_paw');
    const e = document.querySelector('#left_leg');
    const f = document.querySelector('#right_leg');
    //creating an array of the possible moves
    const possibleMoves = [a, b, c, d, e, f];

    playRound();




    function playRound(){
        // disabling the start button and changing the inner html to '...' while the computer plays
        startButton.removeEventListener('click', startGame);
        startButton.innerHTML = '...';
        //creating a for loop that loops through the possible moves, places one into the empty computersequence array and changes its color
        for (let i = 0; i < 1; i++){
            computerSequence.push(possibleMoves[Math.floor(Math.random() * possibleMoves.length)]);
            animateSequence();
        }

        function animateSequence(){
            let i = 0;
            const interval = setInterval(function() {
                gameMove(computerSequence[i]);
                    i++;
                    if (i >= computerSequence.length) {
                        clearInterval(interval);
                    }
            }, 1000);
        }//end of animate sequence
        
        function gameMove(bodypart){
            bodypart.style.background = 'red';
            setTimeout(function(){
                bodypart.style.background = '#fafafa';
            }, 1000);
        }//end of gameMove function


        //after the computer's turn, it signals the player's turn
        setTimeout(function(){
            startButton.innerHTML = 'Your Turn';
            console.log(computerSequence);
            //adding event listeners to all the body parts and pushing the player's clicks into the playerSequence array
            for (let i = 0; i < possibleMoves.length; i++){
                possibleMoves[i].addEventListener('click', function(){
                    let playerMove = possibleMoves[i];
                    playerSequence.push(possibleMoves[i]);
                    playerMove.style.background = 'green';
                    setTimeout(function(){
                        playerMove.style.background = '#fafafa';
                    }, 500);
                    console.log(playerSequence);
                    if (playerSequence.length === computerSequence.length){
                        checkSequence();
                    }
                });
            }
        }, time); //end of player's turn functon
    } //end of playRound function
      
    function checkSequence(){
        console.log('checking sequence');
            for (let i = 0; i < computerSequence.length; i++){
                if(playerSequence[i] === computerSequence[i]){
                    startButton.innerHTML = 'Great Job!';
                    setTimeout(function(){
                        round++;
                        time = time + 1000;
                        roundDisplay.innerHTML = round;
                        playerSequence = [];
                        playRound();
                    }, 1000);
                    
                }   else {
                    startButton.innerHTML = 'Uh Oh!';
                    restartButton.addEventListener('click', startGame);
                    restartButton.style.display = 'inline-block';
                    console.log('game over');
                    //make rounds back to equal 1
                    break;
                }
            }
        }
} //end of startGame


//creating a function that toggles the instructions text on and off on the click of the tab
function showInstructions(){
    const instructions = document.querySelector('.instructions_text');
    if(instructions.style.display === 'none'){
        instructions.style.display = 'inline-block';
    } 
    else {
        instructions.style.display = 'none';
    }   
} // end of showInstructions


window.onload = function() {
    // setting an event listener to start the game when the start button is clicked
    document.querySelector('#start').addEventListener('click', startGame);
    // setting an event listener to display the game instructions on the click
    document.querySelector('#instructions').addEventListener('click', showInstructions);
}