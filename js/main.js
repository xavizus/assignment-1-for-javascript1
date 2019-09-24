/**
 * Return the values of an array.
 */

function getElementsValues(elements) {
    try {
        //For safty reason, always convert DOM-elements to an array.
        elements = Array.from(elements);
        //Do we trust ourselves? Nope, always check if our parameter is an array
        if (!Array.isArray(elements)) {
            throw Error("You did not input an array!");
        }
        let results = [];
        for (let element of elements) {
            results.push(element.value);
        }
        return results;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Checks if the element value is empty or not. 
 */

function isAnyElementsValueEmpty(elements) {
    let results = getElementsValues(elements);
    if (results === false) {
        return false;
    }
    for (let result of results) {
        if (result == "") {
            return false;
        }
    }
    return true

}

/**
 * Starts the quiz
 */

function startQuiz(start_formElements) {

    // Make sure the correctAnswer button is disabled
    document.getElementById("correctAnswers").disabled = true;

    // getElementsValues returns an array.
    // We know that there is only two inputsfields at the start_form
    let [userName, numberOfQuestions] = getElementsValues(start_formElements);

    let quiz = new Quiz(userName, numberOfQuestions);

    //get all class names
    let contentToChange = document.getElementsByClassName("quizContent");

    //hides elements that's shown, and show elements that are hidden.
    quiz.toggleHideShowElements(contentToChange);

    //view the first question
    quiz.viewQuestion();

    //listen after all click events
    document.getElementById("quizGame").addEventListener("click", (event) => {

        //if the event matches the classname answers
        if (event.target.className === 'answers') {
            // get all elements inside the elementid.
            let DOMForm = document.getElementById("quiz__form");

            // look for a radio input. Returns the radio input element if checked, else false.
            let radioChecked = quiz.getDOMElementThatsCheckedFromForm(DOMForm);
            if (radioChecked) {
                //check if the radio DOM-element is correct.
                quiz.controllIfAnswerIsCorrect(radioChecked);
                //update the total answered questions.
                quiz.updateAnsweredQuestions();
            }

            //if we have answered all the questions in the quiz, enable the correctAnswers button.
            if (quiz.getTotalAnsweredQuestions() === quiz.getTotalQuestions()) {
                document.getElementById("correctAnswers").disabled = false;
            }
        }
    });

    // Listen for click evenet in the element ID.
    document.getElementById("sidebox").addEventListener("click", (event) => {

        //Variables just for readability 
        const nextQuestion = 1;
        const previousQuestion = -1;

        //check if we pressed the next div, or the previous div.
        if (event.target.id === 'next' || event.target.id === 'previous') {

            //if next is pressed
            if (event.target.id === 'next') {
                //change to next question
                quiz.changeQuestion(nextQuestion);
            } else {
                //change to previous question.
                quiz.changeQuestion(previousQuestion);
            }
        }

        //check if correctAnswer button is pressed.
        if (event.target.id === 'correctAnswers') {
            console.log(quiz.questionsGuessedByUser);
        }
    });
}



document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startTheQuiz").addEventListener("click", () => {
        let start_formElements = document.forms["start_form"].getElementsByClassName("start_Form");
        if (isAnyElementsValueEmpty(start_formElements)) {
            const numberOfQestionsFromForm = 1;
            let numberOfQuestionsFromUser = getElementsValues(start_formElements)[numberOfQestionsFromForm];
            if (numberOfQuestionsFromUser <= 10 && numberOfQuestionsFromUser > 0) {
                startQuiz(start_formElements);
            } else {
                console.log("You cannot choose more than 10 question or less than 1 questions!");
            }
        } else {
            console.log(document.getElementById("errorMessage"));
            document.getElementById("errorMessage").textContent = "One or more fields are not answered!";
            document.getElementById("errorMessage").classList.toggle("show");
            document.getElementById("errorMessage").classList.toggle("hide");
            setTimeout(function() {
                document.getElementById("errorMessage").classList.toggle("show");
                document.getElementById("errorMessage").classList.toggle("hide");
            }, 5000);
        }
    });
});