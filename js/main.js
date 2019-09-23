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
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

function isElementsValueEmpty(elements) {
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

function startQuiz(start_formElements) {

    document.getElementById("correctAnswers").disabled = true;
    let [userName, numberOfQuestions] = getElementsValues(start_formElements);
    let quiz = new Quiz(userName, numberOfQuestions);
    let contentToChange = document.getElementsByClassName("quizContent");
    quiz.toggleHideShowElements(contentToChange);
    quiz.viewQuestion();

    document.getElementById("quizGame").addEventListener("click", (event) => {
        if (event.target.className === 'answers') {
            let DOMForm = document.getElementById("quiz__form");
            let radioChecked = quiz.getDOMElementThatsCheckedFromForm(DOMForm);
            if (radioChecked) {
                quiz.controllIfAnswerIsCorrect(radioChecked);
                quiz.updateAnsweredQuestions();
            }

            if (quiz.getTotalAnsweredQuestions() === quiz.getTotalQuestions()) {
                document.getElementById("correctAnswers").disabled = false;
            }
        }
    });

    document.getElementById("sidebox").addEventListener("click", (event) => {
        const nextQuestion = 1;
        const previousQuestion = -1;
        if (event.target.id === 'next' || event.target.id === 'previous') {
            if (event.target.id === 'next') {
                quiz.changeQuestion(nextQuestion);
            }
            else {
                quiz.changeQuestion(previousQuestion);
            }
        }

        if (event.target.id === 'correctAnswers') {
            console.log(quiz.questionsGuessedByUser);
        }
    });
}



document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startTheQuiz").addEventListener("click", () => {
        let start_formElements = document.forms["start_form"].getElementsByClassName("start_Form");
        if (isElementsValueEmpty(start_formElements)) {
            const numberOfQestionsFromForm = 1;
            let numberOfQuestionsFromUser = getElementsValues(start_formElements)[numberOfQestionsFromForm];
            if (numberOfQuestionsFromUser <= 10 && numberOfQuestionsFromUser > 0) {
                startQuiz(start_formElements);
            }
            else {
                console.log("You cannot choose more than 10 question or less than 1 questions!");
            }
        }
    });
});