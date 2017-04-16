console.log('connected');

// function startGame(){
    //creating variables for the game
    var startButton = document.querySelector('#start');
    var restartButton = document.querySelector('#restart');
    restartButton.style.display = 'none';
    var round = 1;
    var roundDisplay = document.querySelector('#display');
    var time = 1000;
    var computerSequence = [];
    // var playerSequence = [];
    
    //locating the bunny body parts
    var a = document.querySelector('#left_ear');
    var b = document.querySelector('#right_ear');
    var c = document.querySelector('#left_paw');
    var d = document.querySelector('#right_paw');
    var e = document.querySelector('#left_leg');
    var f = document.querySelector('#right_leg');
    //creating an array of the possible moves
    var possibleMoves = [a, b, c, d, e, f];
    //initiating the game
    // playRound();




    function playRound(){
        // disabling the start button
        // startButton.removeEventListener('click', startGame);
        // changing the inner html to '...' while the computer plays
        
        //creating a for loop that loops through the possible moves and places one into the empty computersequence array
        for (let i = 0; i < 1; i++){
            computerSequence.push(possibleMoves[Math.floor(Math.random() * 6)]);
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
        console.log('computer plays', computerSequence);
        getPlayerSequence();
    } //new playround end
        

    //adding event listeners to all the body parts
    function getPlayerSequence(){
        playerSequence = [];
        for (let i = 0; i < possibleMoves.length; i++){
    	    possibleMoves[i].addEventListener('click',listenMove);
        }
    } // end of get player sequence function
            
    function listenMove(event){
    // console.log(event.target.id);
    // console.log(event);      
        let playerMove = document.querySelector('#' + event.target.id);

        if (playerSequence.length !== round){
            playerSequence.push(playerMove);
        } 
        if (playerSequence.length === round){
            console.log('player plays', playerSequence);
            document.querySelector('#bunny').removeEventListener('click', listenMove);
            checkSequence();
        }
    } 

    function checkSequence(){
        console.log('checking sequence', round);
        var is_same = computerSequence.length == playerSequence.length && computerSequence.every(function(element, index) {
            return element === playerSequence[index]; 
        });
         if(is_same && round === 5) {
            startButton.innerHTML = 'You Win!';
            return false;
        }
        if (is_same){
            startButton.innerHTML = 'Great Job!';
            setTimeout(function(){
                round++;
                time = time + 1000;
                roundDisplay.innerHTML = round;
                playRound();
            }, 1000);
        }
         
        else {
            startButton.innerHTML = 'Uh Oh!';
            // restartButton.style.display = 'inline-block';
            console.log('game over');
            return false;
        }
    }
// } //end of startGame


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
//creating a function that toggles the instructions text on and off on the click of the ;
    document.querySelector('#start').addEventListener('click', playRound);
    // setting an event listener to display the game instructions on the click
    document.querySelector('#instructions').addEventListener('click', showInstructions);
}