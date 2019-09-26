/**
 * get total questions that exists.
 */

function getTotalQuestionsThatExists() {

}

/**
 * Return the values of an array of DOM-elements.
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

function isAllElementsValueFilled(elements) {
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

function startQuiz(start_formElements, questionsData) {

    // Make sure the correctAnswer button is disabled
    document.getElementById("correctAnswers").disabled = true;

    // getElementsValues returns an array.
    // We know that there is only two inputsfields at the start_form
    let [userName, numberOfQuestions] = getElementsValues(start_formElements);

    let quiz = new Quiz(userName, numberOfQuestions, questionsData);

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
            let DOMForm = document.getElementById("quiz__form").getElementsByClassName("answers");
            // look for a radio input. Returns the radio input element if checked, else false.
            quiz.correctTheAnswerGivenInTheForm(DOMForm);

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


/**
 * Run when the event DOMContentLoaded is found.
 */
document.addEventListener("DOMContentLoaded", async function() {
    let questionsData
    try {
        let response = await fetch("./js/questions.json");
        questionsData = await response.json();
    } catch (error) {
        console.error(error);
    }

    /**
     *  Run when the event click is found at the element startTheQuiz
     */
    document.getElementById("startTheQuiz").addEventListener("click", () => {

        // retrive all elements in the start_form
        let start_formElements = document.forms["start_form"].getElementsByClassName("start_Form");

        // if all elements in the form filled.
        if (isAllElementsValueFilled(start_formElements)) {
            // variable used for readability reasons.
            const sumOfQuestionsField = 1;

            // get sumOfQuestions value
            let numberOfQuestionsFromUser = getElementsValues(start_formElements)[sumOfQuestionsField];

            // check if it's outside of our maximum numbers of questions and not lower than 1.
            if (numberOfQuestionsFromUser <= 10 && numberOfQuestionsFromUser > 0) {

                //Let's start our quiz.
                startQuiz(start_formElements, questionsData);
            } else {
                console.log("You cannot choose more than 10 question or less than 1 questions!");
            }
        } else {
            //Add error text.
            document.getElementById("errorMessage").textContent = "One or more fields are not answered!";
            // toggles classes show and hide.
            document.getElementById("errorMessage").classList.toggle("show");
            document.getElementById("errorMessage").classList.toggle("hide");
            // Hide error Message after 5 seconds.
            setTimeout(function() {
                document.getElementById("errorMessage").classList.toggle("show");
                document.getElementById("errorMessage").classList.toggle("hide");
            }, 5000);
        }
    });
});