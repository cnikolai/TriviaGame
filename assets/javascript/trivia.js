$(document).ready(function() {

    //hide these elements until the user presses the start button
    $("#game").css('display', "none");
    $("#container2").css('display', "none");

    $("#startgame").on("click", function() { 
      TriviaGame();
    });

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredAnswers = 0;

    function TriviaGame () {
      $("#startgame").css('display', "none");
      $("#game").css('display', "block");
      $("#title").css('display', "none");
      $("#container").css('border',"0px");


      var counter = 46;
      var myTimer = setInterval(updateCounter,1000);
  
      var TriviaGame = {
        TriviaQuestions: ["What year did lewis and clark start their expedition?","What is the 4th largest state in the US?","By population, the United States of America is the _____ largest country in the world?","Who is the 44th President of the United States?","How many ammendments are there to the US constitution?"],
        TriviaAnswersToQuestion1: {1: "Jun 7, 1814",
                                    2: "May 14, 1804",
                                    3: "Mar 3, 1810", 
                                    4: "Sep 11, 1807"},
        TriviaCorrectAnswer1: "May 14, 1804", 
        TriviaAnswersToQuestion2: {1: "California",
                                    2: "Colorado",
                                    3: "Montana", 
                                    4: "Wyoming"},
        TriviaCorrectAnswer2: "3", 
        TriviaAnswersToQuestion3: {1: "7",
                                    2: "4",
                                    3: "5", 
                                    4: "3"},
        TriviaCorrectAnswer3: "4", 
        TriviaAnswersToQuestion4: {1: "President Trump",
                                    2: "President Obama",
                                    3: "President Bush", 
                                    4: "President Clinton"},
        TriviaCorrectAnswer4: "2",
        TriviaAnswersToQuestion5: {1: "23",
                                    2: "24",
                                    3: "26", 
                                    4: "27"},
        TriviaCorrectAnswer5: "4"
      };

      var TriviaGameForm = document.createElement("form");
      TriviaGameForm.setAttribute("id","TriviaGame");
      $("#game").append(TriviaGameForm);


      //print the trivia questions and answers on the page
      for (var i = 1; i <= 5; i++) {
        var TriviaQuestionDiv = document.createElement("div");
        console.log("created trivia question div");
        var name = "TriviaQuestion"+i.toString();
        //var idname = "#TriviaQuestion"+i.toString();
        console.log(name);
        //console.log(idname);
        TriviaQuestionDiv.setAttribute("id",name);
        TriviaQuestionDiv.style.fontSize = "20px";
        TriviaQuestionDiv.innerText = TriviaGame.TriviaQuestions[i-1];
        // $(idname).text(TriviaGame.TriviaQuestions[i-1]);
        $("#TriviaGame").append(TriviaQuestionDiv);
        var TriviaAnswersDiv = document.createElement("div");
        TriviaAnswersDiv.setAttribute("id","triviaAnswers"+i.toString());
        $("#TriviaGame").append(TriviaAnswersDiv);
        for (var j=1; j <=4; j++) {
          var TriviaAnswerDivInside = document.createElement("span");
          TriviaAnswersDiv.append(TriviaAnswerDivInside);

          var TriviaAnswer = document.createElement("input");
          TriviaAnswer.setAttribute("type","radio");
          TriviaAnswer.setAttribute("id","TriviaQuestion"+i.toString()+"Answer"+j.toString());
          TriviaAnswer.setAttribute("value", j.toString()); 
          TriviaAnswer.setAttribute("name","TriviaQuestion"+i.toString());   
          //TriviaAnswer.innerText = TriviaGame["TriviaAnswersToQuestion"+i.toString()][j.toString()];
          TriviaAnswerDivInside.append(TriviaAnswer);
          
          var TriviaAnswerLabel = document.createElement("label");
          TriviaAnswerLabel.setAttribute("for", "TriviaQuestion"+i.toString()+"Answer"+j.toString());
          TriviaAnswerLabel.innerText = TriviaGame["TriviaAnswersToQuestion"+i.toString()][j.toString()];
          TriviaAnswerLabel.style.paddingRight = "10px";     

          TriviaAnswerDivInside.append(TriviaAnswerLabel);
        }
        var br = document.createElement("br");
        TriviaQuestionDiv.append(br);
      }
      var TriviaGameSubmitButton = document.createElement("button");
      TriviaGameSubmitButton.setAttribute("id","submit");
      TriviaGameSubmitButton.setAttribute("type","button");
      TriviaGameSubmitButton.innerText = "Check Answers";
      //TriviaGameSubmitButton.setAttribute("value","Check Answers");
      $("#game").append(TriviaGameSubmitButton);


    function updateCounter () {
      counter--; 
      $("#gameCounter").css('fontWeight', "bold");
      $("#gameCounter").css('color', "red");
      $("#gameCounter").text("Time Remaining: " + counter);
      console.log(counter);   
      if (counter === 0) {
        console.log("inside counter === 0");
        clearInterval(myTimer); 
        $("#submit").trigger("click");
        //$( "form:first" ).trigger( "submit" );
      }
      
    }
      //on submit click, check user answers against real answers, output the results
      $("#submit").on("click", function() { 
        clearInterval(myTimer); 

        console.log("inside submit on click trigger");
         for (var i = 1; i <= 5; i++) {
          //get user answer for each question
          // if ($("input[name='"+"TriviaQuestion"+i.toString()+"']").attr('checked')) {
          //   unansweredAnswers++;
          // }
          // else {
          var radioValue = $("input[name='"+"TriviaQuestion"+i.toString()+"']:checked").val();
          //compare with correct answer for each question
          if (radioValue === TriviaGame["TriviaCorrectAnswer"+i]) {
            correctAnswers++;
            //alert("correctAnswers: " +correctAnswers);
          }
          else {
            if (radioValue <= 4) {
              incorrectAnswers++;
            }
            else {
              unansweredAnswers++;
\            }
          }
          UpdateUserScore();
         }
        // }
        });
      
        //update the user score
      function UpdateUserScore() {
        $("#game").css('display', "none");
        $("#container2").css('display', "block");
        $("#correctAnswers").text("Correct Answers: " + correctAnswers);
        $("#incorrectAnswers").text("Incorrect Answers: " + incorrectAnswers);
        $("#unansweredAnswers").text("Unanswered Answers: " + unansweredAnswers);
      }
  }
});