
var config = {
    apiKey: "AIzaSyDqmq3XxCw-wxHFgmq2cJIOk5BARZkSUtI",
    authDomain: "rps-game-ca036.firebaseapp.com",
    databaseURL: "https://rps-game-ca036.firebaseio.com",
    projectId: "rps-game-ca036",
    storageBucket: "",
    messagingSenderId: "259854508824",
    appId: "1:259854508824:web:52537e7b223982a8"
    };
  
    firebase.initializeApp(config);
  
    // Create a variable to reference the database
    var database = firebase.database();
/*
 * Global Variable
 */
var rpsStartSection=document.getElementById("rps-start-section");
var rpsCardGroup=document.getElementById("rps-card-group");
var winText=document.getElementById("winCount");
var lossText=document.getElementById("lossCount");
var tieText=document.getElementById("tieCount");
var rpsResetButton=document.getElementById("reset-button");
var userImg=document.getElementById("user-image");
var computerImg=document.getElementById("computer-image");
/*
 * Other Global Variable
 */
var wins=0;
var losses=0;
var ties=0;



function gameStart(e){
    /*
    * check if the user pressed either the 'r', 'p' or the  's' key
    */  
    if(e.key==='r'||e.key==='p'||e.key==='s' )  {
        rpsStartSection.style.display="none";
        rpsCardGroup.style.display="block";
        var computerGuess=computerPicker();
        var computerPicture=updatePicture(computerGuess);
        computerImg.src=computerPicture;
        userImg.src=updatePicture(e.key);
        updateScore(computerGuess, e.key);
        
        database.ref().set({
            userkeyfire: e.key,
            userImgfire:updatePicture(e.key), 
            computerKeyfire:computerGuess,
            computerImgfire:computerPicture,
            winfire:wins,
            lossesfire:losses,
            tiesfire:ties,


        
        });
    }else if(e.key==='q'){
        rpsStartSection.style.display="block";
        rpsCardGroup.style.display="none";
    }
}


/*
 * This function will pick a guess for the computer from the avilable Options
 */
function computerPicker(){
    var computerOptions=['r', 'p', 's'];
    var computerChoice=computerOptions[Math.floor(Math.random()*3)];
    console.log(computerChoice);
    return computerChoice;
}
/*
 * Receive a character from either the user or the computer
 * Check if the character is either an 'r','p'or 's'
 *  And return the appropriate img source
 */
function updatePicture(char){
    if(char ==='r'){
        return 'assets/images/rock.png';
    }else if(char ==='p'){
        return 'assets/images/paper.png';
    }else if(char ==='s'){
        return 'assets/images/scissor.png';
    }
}
/*
 * will receive two argument first argument is computerguess second argument is user guess
 */
function updateScore(comp, user){
    if((user ==='r' && comp==='s')||(user ==='p' && comp==='r')||(user ==='s' && comp==='p')){
        wins++;
    }else if(comp===user){
        ties++;
    } else {
        losses++
    }
    displayScore();
}
/*
 * function that sets the win, loss and tie values to zero.
 */
function initializeScores(){
    wins=0;
    losses=0;
    ties=0;
   displayScore();
}
/*
 * That will update the html value of the scores to the values in the  javascriptfile
 */
function displayScore(){
    winText.textContent=wins;
    lossText.textContent=losses;
    tieText.textContent=ties;

}
/*
 * This function will be clled everytime a user presses a key.
 */
document.onkeyup = gameStart;
/*
 * Add an event listener to our reset button when the user clicks it
 */
rpsResetButton.addEventListener("click", initializeScores);
/*
 * call this function as the file loads to initialize the scores
 */
initializeScores();