// Global Constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const pattern = [];
//Global Variables
var volume = 0.5; //must be between 0.0 and 1.0
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var guessCounter = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
//Custom Global Variables
const secretPattern = [1, 2, 3, 1, 2, 3];//easter egg pattern
var secretCount = 0;
var secretGuess = [];
var patternSize = 0;//resize the pattern array depending on difficulty
var bestScore = 0;
var bestPattern = [];//used to store best endless run
var difficulty = "";

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}
function startGame() {
  //initialize game variables
  if(patternSize == 0) {
    //if no difficulty set, alert user
    document.getElementById("loseSound").play();
    document.getElementById("loseSound").innerHTML="Audio is Playing";
    alert("Please select a difficulty");
    return;
  }
  
  progress = 0;
  gamePlaying = true;
  disableButtons(true);//disable difficulty buttons
  
  if(difficulty == "Endless") {
    randomPattern(1);//only push one clue to start, add more in guess()
  } else {
    randomPattern(patternSize);//resize pattern[] to difficulty setting
  }
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}
function stopGame() {
  //reset necessary values
  gamePlaying = false;
  patternSize = 0;
  pattern.length = 0;
  guessCounter = 0;
  clueHoldTime = 1000;
  secretCount = 0;
  secretGuess.length = 0;
  // swap the Stop and Start buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  //remove light from difficulty button
  document.getElementById("easyBtn").classList.remove("lit");
  document.getElementById("mediumBtn").classList.remove("lit");
  document.getElementById("hardBtn").classList.remove("lit");
  document.getElementById("endlessBtn").classList.remove("lit");
  disableButtons(false);//re-enable all difficulty buttons
}
function winGame() {
  //custom per difficulty
  if(difficulty == "Easy") {
    document.getElementById("easyWin").play();
    document.getElementById("easyWin").innerHTML="Audio is Playing";
    setTimeout(function() {
      alert("Nice work! You beat Easy Mode! Try Medium next!");
    }, 400)
  }
  if(difficulty == "Medium") {
    document.getElementById("medWin").play();
    document.getElementById("medWin").innerHTML="Audio is Playing";
    setTimeout(function() {
      alert("That wasn't bad, huh? You beat Medium Mode! Ready to try Hard?");
    }, 1000)
  }
  if(difficulty == "Hard") {
    document.getElementById("hardWin").play();
    document.getElementById("hardWin").innerHTML="Audio is Playing";
    setTimeout(function() {
      alert("Congratulations! You beat Hard Mode! Ready for a challenge? Endless Awaits!");
    }, 800)
  }
  if(difficulty == "Endless") {
    //handle Endless mode cases
    if(progress > bestScore) {
      bestScore = progress;//if current game exceeds previous game's best, update
      bestPattern.length = 0;//reset bestPattern array for new best
      for(var i = 0; i < pattern.length - 1; i++) {
        bestPattern.push(pattern[i]);//store best pattern for replay
      }
      //output new best message
      document.getElementById("endWin").play();
      document.getElementById("endWin").innerHTML="Audio is Playing";
      setTimeout(function() {
        alert("Amazing! New best score! Try again?");
      }, 500)
      document.getElementById("bestScore").innerHTML = bestScore.toString(10);//update scoreboard
    } else {
      loseGame();//endless doesn't have typical lose conditions, lose condition occurs when best score hasn't been surpassed
    }   
  }
  stopGame();//stop game to reset game state
  return 0;
}
function loseGame() {
  stopGame();
  document.getElementById("loseSound").play();
  document.getElementById("loseSound").innerHTML = "Audio is Playing";
  alert("Game Over...! You lost. Try again?");
}
function guess(btn) {
  //if game isn't in play, don't start game & check easter egg
  if(!gamePlaying) {
    if(secretCount < 6) {
      secretGuess.push(btn);//push first 6 guesses from the user 
      secretCount++;
    }
    if(secretCount == 6) {
      easterEgg(secretGuess);//compare guesses with secret array
    }
    return;
  }
  //if game is in play, check user guess
  if(btn == pattern[guessCounter]) {
    //guess was correct
    if(guessCounter == progress) {
      //if Endless mode, handle game differently
      if(difficulty == "Endless") {
        progress++;
        pattern.push(getRandomBtn(5));//add a new clue once per turn
        disableButtons(true, 2);//disable buttons
        playClueSequence();
        setTimeout(function() {
          disableButtons(false, 2);//re-enable buttons until clue sequence is over
        }, (clueHoldTime * 2) * progress)
      }
      //else handle game for all difficulties besides Endless
      if(progress == pattern.length - 1 && difficulty != "Endless") {
        winGame();
      } 
      if(progress != pattern.length - 1 && difficulty != "Endless") {
        progress++;
        disableButtons(true, 2);//disable buttons
        playClueSequence();
        setTimeout(function() {
          disableButtons(false, 2);//re-enable buttons until clue sequence is over
        }, (clueHoldTime * 2) * progress)
      }
    } else {
      guessCounter++;//if user turn isn't over, check the next guess
    }    
  } else {
    if(difficulty == "Endless")
      winGame();//separate state for Endless mode
    else
      loseGame();
  }
}
// Clue Functions
function playSingleClue(btn) {
  if(gamePlaying) {
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}
function playClueSequence() {
  guessCounter = 0;
  context.resume();
  
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i = 0; i <= progress; i++) { // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  if(clueHoldTime > 400) {
    clueHoldTime -= 60;//decrement clueHoldTime to speed-up pattern sequence
  }
  if(difficulty == "Endless" && progress == 15) {
    clueHoldTime = 325;//speed-up one more time once Endless mode reaches 15 clues
  }
}
// Sound Synthesis Functions
const freqMap = {
  1: 349.23,
  2: 440.00,
  3: 493.88,
  4: 659.25, 
  5: 587.33
}
function playTone(btn,len) { 
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  },len)
}
function startTone(btn) {
  if(!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume();
    tonePlaying = true
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025);
  tonePlaying = false
}
// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
/*------------------------------------*/
/*                                    */
/*          CUSTOM FUNCTIONS          */
/*                                    */
/*------------------------------------*/
//function to generate random pattern 
function randomPattern(patternSize) {
  for(var i = 0; i < patternSize; i++){
    pattern.push(getRandomBtn(5));
  }
}
//function to generate a random button
function getRandomBtn(max){
  var num = Math.floor(Math.random() * Math.floor(max)+ 1);
  
  if(num == pattern[pattern.length - 1]){
    num = Math.floor(Math.random() * Math.floor(max)+ 1);//if generated number is the same as the last element in pattern[], retry for another button
  }
  return num;
}
//function to disable various buttons
function disableButtons() {
  //disable buttons depending on number of arguments passed in:
  //1 arg(s): disables difficulty & replay buttons
  //2 arg(s): disables game buttons
  //default: disables all buttons 
  switch (arguments.length) {
    case 1:
      if(arguments[0] == true){
        document.getElementById("easyBtn").classList.add("disable");
        document.getElementById("mediumBtn").classList.add("disable");
        document.getElementById("hardBtn").classList.add("disable");
        document.getElementById("endlessBtn").classList.add("disable");
        document.getElementById("replayBtn").classList.add("disable");
      }
      
      if(arguments[0] == false){
        document.getElementById("easyBtn").classList.remove("disable");
        document.getElementById("mediumBtn").classList.remove("disable");
        document.getElementById("hardBtn").classList.remove("disable");
        document.getElementById("endlessBtn").classList.remove("disable");
        document.getElementById("replayBtn").classList.remove("disable");
      }
      break;
    case 2:
      if(arguments[0] == true){
        document.getElementById("button1").classList.add("disable");
        document.getElementById("button2").classList.add("disable");
        document.getElementById("button3").classList.add("disable");
        document.getElementById("button4").classList.add("disable");
        document.getElementById("button5").classList.add("disable");
      }
      if(arguments[0] == false){
        document.getElementById("button1").classList.remove("disable");
        document.getElementById("button2").classList.remove("disable");
        document.getElementById("button3").classList.remove("disable");
        document.getElementById("button4").classList.remove("disable");
        document.getElementById("button5").classList.remove("disable");
      }
      break;
    default:
      document.getElementById("easyBtn").classList.remove("disable");
      document.getElementById("mediumBtn").classList.remove("disable");
      document.getElementById("hardBtn").classList.remove("disable");
      document.getElementById("endlessBtn").classList.remove("disable");
      document.getElementById("replayBtn").classList.remove("disable");
      
      document.getElementById("button1").classList.remove("disable");
      document.getElementById("button2").classList.remove("disable");
      document.getElementById("button3").classList.remove("disable");
      document.getElementById("button4").classList.remove("disable");
      document.getElementById("button5").classList.remove("disable");
      break;
  }
}
//function for easter egg feature
function easterEgg(secretGuess) {
  var flag = true;//initialize to true
  
  for(var i = 0; i < secretPattern.length; i++) {
    if(secretGuess[i] != secretPattern[i]) {
      flag = false;//if any clue in the guess sequence doesn't match secret pattern, set to false
    }
  }
  //play easter egg if arrays match
  if(flag == true) {
    document.getElementById("secretSound").play();
    document.getElementById("secretSound").innerHTML="Audio is Playing";
    setTimeout(function() {
      alert("Secret Unlocked!");
      alert("You played Saria's Song!");
      document.getElementById("sariaSong").play();
      document.getElementById("sariaSong").innerHTML="Audio is Playing";
    }, 2000)
  }
  //reset values for re-attempt
  secretGuess.length = 0;
  secretCount = 0;
  return;
}
//function to set difficulty for game state
function setDifficulty(size) {
  patternSize = size;//store into patternSize to resize pattern[]

  if(size == -1) {
    difficulty = "Endless";
    document.getElementById("endlessBtn").classList.add("lit");
    document.getElementById("easyBtn").classList.remove("lit");
    document.getElementById("mediumBtn").classList.remove("lit");
    document.getElementById("hardBtn").classList.remove("lit");
  }
  if(size == 1) {
    difficulty = "Easy";
    document.getElementById("easyBtn").classList.add("lit");
    document.getElementById("mediumBtn").classList.remove("lit");
    document.getElementById("hardBtn").classList.remove("lit");
    document.getElementById("endlessBtn").classList.remove("lit");
  }
  if(size == 2) {
    difficulty = "Medium";
    document.getElementById("mediumBtn").classList.add("lit");
    document.getElementById("easyBtn").classList.remove("lit");
    document.getElementById("hardBtn").classList.remove("lit");
    document.getElementById("endlessBtn").classList.remove("lit");
  }
  if(size == 3) {
    difficulty = "Hard";
    document.getElementById("hardBtn").classList.add("lit");
    document.getElementById("easyBtn").classList.remove("lit");
    document.getElementById("mediumBtn").classList.remove("lit");
    document.getElementById("endlessBtn").classList.remove("lit");
  }
}
//functions similar to playSingleClue(btn), but for best score replay
function playBestClue(btn) {
  lightButton(btn);
  playTone(btn,clueHoldTime);
  setTimeout(clearButton,clueHoldTime,btn);
}
//functions similar to playClueSequence(), but for best score replay
function playBestSequence() {
  if(bestPattern.length == 0){
    //if no best score, return
    document.getElementById("naviHey").play();
    document.getElementById("naviHey").innerHTML="Audio is Playing";
    document.getElementById("replayBtn").classList.add("lit");
    setTimeout(function() {
      alert("Play Endless Mode first, then see your replay!");
      document.getElementById("replayBtn").classList.remove("lit");
    }, 400)

    return;
  }
  
  //light up and disable replayBtn & disable all other buttons
  document.getElementById("replayBtn").classList.add("lit");
  document.getElementById("replayBtn").classList.add("disable");
  disableButtons(true);
  disableButtons(true, 2);
  document.getElementById("startBtn").classList.add("disable");
  
  //speed up replay to handle bigger score sequences
  clueHoldTime = 325;
  context.resume()
  //similar code block in playSequence() to play replay
  let delay = nextClueWaitTime;
  for(let i = 0; i < bestScore; i++) { 
    setTimeout(playBestClue, delay, bestPattern[i])
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  
  //wait until sequence is done playing before executing
  setTimeout(function() {
    //re-enable all buttons
    document.getElementById("startBtn").classList.remove("disable");
    disableButtons(false, 2);
    disableButtons(false);
    document.getElementById("replayBtn").classList.remove("disable");
    //keep replay button lit until replay is done
    setTimeout(function() {
      document.getElementById("replayBtn").classList.remove("lit");
    }, 800) 
  }, (clueHoldTime * 2) * bestScore)
}
