console.log('connected');

function startGame(){
    //creating variables for the game
    const startButton = document.querySelector('#start');
    const restartButton = document.querySelector('#restart');
    restartButton.style.display = 'none';
    let round = 1;
    let roundDisplay = document.querySelector('#display');
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
    //initiating the game
    playRound();




    function playRound(){
        // disabling the start button
        startButton.removeEventListener('click', startGame);
        // changing the inner html to '...' while the computer plays
        
        //creating a for loop that loops through the possible moves and places one into the empty computersequence array
        for (let i = 0; i < 1; i++){
            computerSequence.push(possibleMoves[Math.floor(Math.random() * possibleMoves.length)]);
            animateSequence();
        }
    
        //creating a function that picks each body part in a set amount of time
        function animateSequence(){
            let i = 0;
            const interval = setInterval(function() {
                computerMove(computerSequence[i]);
                i++;
                if (i >= computerSequence.length) {
                    clearInterval(interval);
                    startButton.innerHTML = 'Your Turn';
                }
            }, 1000);
        }//end of animate sequence

        //creating a function that animates each body part in a set amount of time
        function computerMove(bodypart){
            startButton.innerHTML = '...';
            bodypart.style.background = 'pink';
            setTimeout(function(){
                bodypart.style.background = '#fafafa';
            }, 500);
        }//end of gameMove function

        console.log(computerSequence);
        getPlayerSequence();
        //adding event listeners to all the body parts
        function getPlayerSequence(){
            for (let i = 0; i < possibleMoves.length; i++){
            possibleMoves[i].addEventListener('click',function(){
                let playerMove = possibleMoves[i];
                if (playerSequence.length !== round){
                    playerSequence.push(playerMove);
                } 
                if (playerSequence.length === round){
                     checkSequence();
                }
                console.log(playerSequence);
            }); 
            
            } 
        } // end of get player sequence function  
    } //end of playRound function
    

    function checkSequence(){
        console.log('checking sequence', round);
        if (playerSequence.length === computerSequence.length){
            for (let i = 0; i < round; i++){
                if(playerSequence[i] === computerSequence[i]){
                    continue;
                    
                }   
                else {
                    startButton.innerHTML = 'Uh Oh!';
                    restartButton.style.display = 'inline-block';
                    console.log('game over');
                    break;
                }
            }
            startButton.innerHTML = 'Great Job!';
            setTimeout(function(){
                round++;
                time = time + 1000;
                roundDisplay.innerHTML = round;
                playerSequence = [];
                playRound();
            }, 1000);
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
    // setting an event listener to start the game when the start button or restart button is clicked
    document.querySelector('#start').addEventListener('click', startGame);
    document.querySelector('#restart').addEventListener('click', startGame);
    // setting an event listener to display the game instructions on the click
    document.querySelector('#instructions').addEventListener('click', showInstructions);
}



                   // playerMove.style.background = 'green';
                    //     setTimeout(function(){
                    //         playerMove.style.background = '#fafafa';
                    //     }, 500);