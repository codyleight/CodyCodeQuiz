var timerEl = document.getElementById('timer'); //Timer esection in top right.
var beginEl = document.getElementById('begin'); //Our Start quiz section, we mainly just want to hide this in js.
var click = document.getElementById('start'); // We will use this to handle when quiz has been started, we also want to start countdown.
var quizbox = document.getElementById('quizbox');

var question = document.getElementById('question'); //Creating question elements so we can change these as we go.
var question1 = document.getElementById('question1');
var question2 = document.getElementById('question2');
var question3 = document.getElementById('question3');
var question4 = document.getElementById('question4'); //end of questions
var hspage = document.getElementById('scores');
var quizended = false;


var hs = document.getElementById('highscores'); //highscores clickable.

var submit = document.getElementById('submit'); //submit button

var scoring = document.getElementById('scoring'); //scoring value
var answer = document.getElementById('answer'); //tells us true or false
var quizlength = 4; //current quiz length to tell us what question we are on and tell when end of quiz is.
var score = 0; //current score.



var countdown = 30; // our countdown.
quizbox.style.display = "none"; //hiding future elements on load.
results.style.display = "none";
hspage.style.display = "none";

var contentEL = document.getElementById('names'); //grabs our name section for highscores.



function quizStart(event){
    event.preventDefault();

    quizlength = 4; //current quiz length to tell us what question we are on and tell when end of quiz is.
    score = 0; //current score.

    console.log("quiz is starting, timer should start now!");

    beginEl.style.display = "none"; // takes away Start button and header text.
    quizbox.style.display = "block"; //Will DIsplay Quizbox
    

    var timerInterval = setInterval(function() { //Begin timer countdown.
        timerEl.textContent = "Time Left: " + countdown-- + "s";
    
    
        if(countdown === 0 || quizended) {
            timerEl.textContent = "";
          clearInterval(timerInterval);
          quizEnd(); //will go to quiz end function.
          
        }
    
      }, 1000);

      

    

      
        
        
      

    



};


function quizEnd(event){ //Post results here, wether we finish by running out of time or out of questions.
    quizended = true; //call back to line 49, so we can exit out of countdown early.
   console.log("Quiz has now ended.")
   quizbox.style.display = "none";
   results.style.display = "block";
   scoring.textContent = "You got a final Score of " + score + "/4";
   timerEl.textContent = "";

  
   submit.addEventListener("click", highScores);
   

}

function highScores(event){ //High Scores function, add listener for this, as well as see if you can include a button in a header element.
    event.preventDefault();
    console.log("We are now in highscores!");
    results.style.display = "none";
    quizbox.style.display = "none";
    beginEl.style.display = "none";
    hspage.style.display = "block";

    //we will handle storage here, as well as assigning the values!
    //TODO: Create List items for highscores.

    var nameContent = document.querySelector("#content1").value; //grabs value from name
    localStorage.setItem("naming", nameContent); //setting value to naming in local storage
    var bigname = localStorage.getItem("naming"); //puts value from names into bigname.

    if (quizended){
    names.textContent = bigname + " got a score of " + score + "/4";
    }

    
    
    

    

}

function submitted(datanum){ //sets questions as well as evalutes the answers on the spot.

    if (quizlength === 3){
        question.textContent = "What year was I born?"
        question1.textContent = "1986"
        question2.textContent = "2001"
        question3.textContent = "1995"
        question4.textContent = "1993"
        
        if (datanum == 1){
            answer.textContent = "True!";
            score++;
        } else {
            answer.textContent = "False :( its Cody Thompson. 5 seconds deducted";
            countdown = countdown - 5;
        }
        
    }

    if (quizlength === 2){
        question.textContent = "What car do I Own?"
        question1.textContent = "Mustang"
        question2.textContent = "Jeep"
        question3.textContent = "Monkey"
        question4.textContent = "Honda Accord"

        if (datanum == 3){
            answer.textContent = "True!";
            score++;
        } else {
            answer.textContent = "False :( its 1995. 5 Seconds deducted";
            countdown = countdown - 5;
        }
    }

    if (quizlength === 1) {
        question.textContent = "Final Question: What Programming Language do I not know?"
        question1.textContent = "Java"
        question2.textContent = "JavaScript"
        question3.textContent = "PHP"
        question4.textContent = "C#"

        if (datanum == 4){
            answer.textContent = "True!";
            score++;
        } else {
            answer.textContent = "False :( its a Honda Accord! 5 seconds deducted";
            countdown = countdown - 5;
        }
    }

    if (quizlength === 0){
        

        if (datanum == 3){
            answer.textContent = "True!";
            score++;
        } else {
            answer.textContent = "False :(, i don't know php."; //we dont need to deduct here because we end the quiz.
        }
        
        quizEnd();
    }

    
}






start.addEventListener("click", quizStart);

hs.addEventListener("click", highScores);



quizbox.addEventListener("click", function(event) { //We only want this to save answers, questions will be written outside.
    
    var element = event.target; 
    var datanum = element.getAttribute("data-number");
   

    console.log(element);
    console.log(datanum); //This will grab the selection that we choose and it will hold a number.
    //TODO: Find the selection number of selected choice then save the answer!


    if (datanum == 1 ||datanum == 2|| datanum == 3 || datanum == 4){

    quizlength--;
    
    submitted(datanum);
    
    } //if statement prevents event bubbling. although it is sloppy in this case. Should still work correctly.




  
  });

 

