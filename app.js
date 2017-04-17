console.log('Let\'s Play Sonny Says!');

    //creating variables for the game
    var startButton = document.querySelector('#start');
    var roundDisplay = document.querySelector('#display');
    var round = 1;
    var time = 1000;
    var computerSequence = [];
    var sound = new Audio();
    sound.src = 'assets/tick.mp3';
    
    //locating the bunny body parts
    var a = document.querySelector('#left_ear');
    var b = document.querySelector('#right_ear');
    var c = document.querySelector('#left_paw');
    var d = document.querySelector('#right_paw');
    var e = document.querySelector('#left_leg');
    var f = document.querySelector('#right_leg');
    //creating an array of the possible moves
    var possibleMoves = [a, b, c, d, e, f];


    function playRound(){
        // disabling the start button
        startButton.removeEventListener('click', playRound);
        //creating a for loop that loops through the possible moves and places one into the computersequence 
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
        }

        //creating a function that animates each body part in a set amount of time
        function computerMove(bodypart){
            startButton.innerHTML = '...';
            bodypart.style.background = 'pink';
            sound.play();
            setTimeout(function(){
                bodypart.style.background = '#fafafa';
            }, 500);
        }
        console.log('computer plays', computerSequence);
        listenPlayerMove();
    } // end of playround function
        

    //adding event listeners to all the body parts
    function listenPlayerMove(){
        playerSequence = [];
        for (let i = 0; i < possibleMoves.length; i++){
    	    possibleMoves[i].addEventListener('click',getPlayerSequence);
        }
    } 

    // locating the id of the clicked event and pushing it into the playerSequence array        
    function getPlayerSequence(event){     
        let playerMove = document.querySelector('#' + event.target.id);
        if (playerSequence.length !== round){
            playerSequence.push(playerMove);
            sound.play();
        } 
        if (playerSequence.length === round){
            console.log('player plays', playerSequence);
            document.querySelector('#bunny').removeEventListener('click', getPlayerSequence);
            checkSequence();
        }
    } 


    // checking to see if the playerSequence array is the same as the computer's
    function checkSequence(){
        console.log('checking sequence', round);
        var is_same = computerSequence.length == playerSequence.length && computerSequence.every(function(element, index) {
            return element === playerSequence[index]; 
        });
         if(is_same && round === 10) {
            startButton.innerHTML = 'You Win!';
            const sound2 = new Audio();
            sound2.src = 'assets/tada.mp3';
            sound2.play();
            setTimeout(function(){
                round = 1;            
                time = 1000;
                roundDisplay.innerHTML = round;
                computerSequence = [];
                startButton.innerHTML = 'Start'; 
                document.querySelector('#start').addEventListener('click', playRound);
            }, 1000);
            return false;
        }
        if(is_same){
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
            const sound3 = new Audio();
            sound3.src = 'assets/oops.mp3';
            sound3.play();
            console.log('game over');
             setTimeout(function(){
                round = 1;            
                time = 1000;
                roundDisplay.innerHTML = round;
                computerSequence = [];
                startButton.innerHTML = 'Start'; 
                document.querySelector('#start').addEventListener('click', playRound);
            }, 1000);
            return false;
        }
    }



//creating a function that toggles the instructions text on and off on the click of the tab
function showInstructions(){
    const instructions = document.querySelector('.instructions_text');
    if(instructions.style.display === 'none'){
        instructions.style.display = 'inline-block';
    } 
    else {
        instructions.style.display = 'none';
    }   
}


window.onload = function() {
    //setting an event listener to initiate the game on the click
    document.querySelector('#start').addEventListener('click', playRound);
    // setting an event listener to display the game instructions on the click
    document.querySelector('#instructions').addEventListener('click', showInstructions);
}