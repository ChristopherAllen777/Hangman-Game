// Hangman Beer Game - Chris Allen (Javascript/jQuery)
var words, picList, blank, wrongGuess, guessRemain, currentWord, score = 0, loses = 0, wordPic, audioWin, audioLoss;
var activeList = ["pilsner", "hops", "malt", "stout", "lager", "imperial", "amber", "ipa", "paleale", "porter", "ale", "tripel"];
 setUp();
// Sets up inital game status/ reound reset basically
function setUp() {
    console.log(activeList)
    var words = ["pilsner", "hops", "malt", "stout", "lager", "imperial", "amber", "ipa", "paleale", "porter", "ale", "tripel"];
        picList = {pilsner:"assets/images/pilsner.jpg", hops:"assets/images/hops.jpg", malt:"assets/images/malt.jpg", stout:"assets/images/stout.jpg", lager:"assets/images/lager.jpg",
                  imperial: "assets/images/imperial.jpg", amber: "assets/images/amber.jpg", ipa: "assets/images/ipa.jpg", paleale: "assets/images/paleale.jpg", porter: "assets/images/porter.jpg", 
                  ale: "assets/images/ale.jpg", tripel: "assets/images/tripel.jpg"};
        ranNum = Math.floor(Math.random() * activeList.length);
        currentWord = activeList[ranNum]
        index = activeList.splice(index, 1)
        wordPic = picList[currentWord];
        wrongGuess = [];
        guessRemain = 10;
        blank = "";
        audioWin = new Audio("assets/sounds/win.mp3")
        audioLoss = new Audio("assets/sounds/loss.mp3")
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
    if  (activeList.length == 0) {
         activeList = words
    }
    for  (var i = 0; i < currentWord.length; i++) {
      // Establishes blanks for empty letters
            blank += "_" + "";
    }
};

document.onkeyup = function(event) {
      // Establishes events on key stroke
    var userGuess = event.key;
    if (availableLetters.indexOf(userGuess) == -1){
      document.getElementById("status").textContent = "Please type a valid letter";
      return // end do nothing
    };
    document.getElementById("blanks").textContent = blank;
    document.getElementById("wrongGuess").textContent = wrongGuess;
    document.getElementById("status").textContent = "Current Word";
    document.getElementById("completion").textContent = "";
// checks if guess was accurate
    checkGuess(userGuess);
    function checkGuess(userGuess) {
       if (currentWord.indexOf(userGuess) > -1) {
           for (var i = 0; i < currentWord.length; i++) {
               if (currentWord[i] === userGuess) {
                  // Shows user guess with displayLtrAt fuction
                  displayLtrAt(userGuess, i);
                  roundOver ();
           }
      }
       // If the guess is wrong it is pushed down into the wrongGuess text area   
      } else if (wrongGuess.indexOf(userGuess) === -1) {
          wrongGuess.push(userGuess);
          wrongGuess = wrongGuess.sort();
          document.getElementById("wrongGuesses").textContent = wrongGuess;
            // Subtracts 1 remaining guess
          guessRemain--;
          document.getElementById("remain").textContent = guessRemain;
          roundOver ();
      }
}
};
// Puts the user guess in where a blank would be
  function displayLtrAt(letter, index) {
      var letterGuess = "";
      for (var i = 0; i < blank.length; i++)
          if (i === index) {
              letterGuess += letter;
          } else {
              letterGuess += blank[i];
          }
      // Changes guess to upper case
      blank = letterGuess.toUpperCase();

          document.getElementById("blanks").textContent = blank;
  };
// When a round ends
function roundOver () {
    if (guessRemain === 0) {
      document.getElementById("picChange").src = ("assets/images/looser.jpg");
      document.getElementById("status").textContent = "Party Foul! You lose! The word was:";
      // Plays losing clip
      audioLoss.play();
      document.getElementById("blanks").textContent = currentWord.toUpperCase();
      document.getElementById("completion").textContent = "Press Any Key To Try Again";
      loses++;
      document.getElementById("loses").textContent = loses;
      setUp ();

    }
// Guessed the word correctly
    else if (blank.indexOf("_") === -1 && guessRemain != 0) {
        document.getElementById("status").textContent = "Yo! You win! The word was";
        // Plays winning clip
        audioWin.play();
        document.getElementById("completion").textContent = "Press Any Key To Play Again";
        document.getElementById("picChange").src = wordPic;
        score++;
        document.getElementById("score").textContent = score;
        setUp();
    }
};
















