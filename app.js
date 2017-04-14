console.log('connected');

function startGame(){
    console.log('starting the game');
    let round = 0;
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
    startGame();
    // setting an event listener to display the game instructions on the click
     document.querySelector('#instructions').addEventListener('click', showInstructions);
}