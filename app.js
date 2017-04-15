console.log('connected');

function startGame(){
    //creating variables for the game status, round number, time, move sequence
    // let inProgress = true;
    const gameText = document.querySelector('#start');
    let round = 1;
    let roundDisplay = document.querySelector('#counter');
    let time = 2000;
    let computerSequence = [];
    let playerSequence = [];
    
    //locating the bunny body parts
    const a = document.querySelector('.left_ear');
    const b = document.querySelector('.right_ear');
    const c = document.querySelector('.left_paw');
    const d = document.querySelector('.right_paw');
    const e = document.querySelector('.left_leg');
    const f = document.querySelector('.right_leg');
    //creating an array of the possible moves
    const possibleMoves = [a, b, c, d, e, f];

    playRound();
    function playRound(){
        // locating the start button and changing the inner html to '...' while the computer plays
        gameText.removeEventListener('click', startGame);
        gameText.innerHTML = '...';
        //creating a for loop that loops through the possible moves, places one into the empty computersequence array and changes its color
        for (let i = 0; i < 1; i++){
            computerSequence.push(possibleMoves[Math.floor(Math.random() * possibleMoves.length)]);
            computerSequence[0].style.background = 'red';
        }
        //after the computer's turn, it changes the color back and signals the player's turn
        setTimeout(yourTurn, time);
        function yourTurn(){
            //replace with toggling the color off
            computerSequence[0].style.background = 'blue';
            gameText.innerHTML = 'Your Turn';

            console.log(computerSequence);
            //adding event listeners to all the body parts and pushing the player's clicks into the playerSequence array
            for (let i = 0; i < possibleMoves.length; i++){
                possibleMoves[i].addEventListener('click', function(){
                    playerSequence.push(possibleMoves[i]);
                    this.style.background = 'green';
                    console.log(playerSequence);
                    checkSequence();
                });
            }
        } //end of yourTurn functon
    } //end of playRound function
      
    function checkSequence(){
        console.log('checking for winner');
        if(playerSequence.length === computerSequence.length){
            for (let i = 0; i < playerSequence.length; i++){
                if(playerSequence[i] === computerSequence[i]){
                    gameText.innerHTML = 'Great Job!';
                    round++;
                    time = time + 2000;
                    roundDisplay.innerHTML = round;
                }   else {
                    gameText.innerHTML = 'Uh Oh!';
                }
            }
        }
    } // end of winner function
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