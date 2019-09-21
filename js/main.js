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

function startQuiz(startFormElements) {

    let [userName, numberOfQuestions] = getElementsValues(startFormElements);

    let quiz = new Quiz(userName, numberOfQuestions);

    let contentToChange = document.getElementsByClassName("quizContent");

    quiz.toggleHideShowElements(contentToChange);

    quiz.viewQuestion();

    document.getElementById("sidebox").addEventListener("click", (event) => {

        if (event.target.id === 'next' || event.target.id === 'previous') {
            let DOMForm = document.getElementById("quiz__form");
            let radioChecked = quiz.getDOMElementThatsCheckedFromForm(DOMForm);

            if(radioChecked) {
                if(event.target.id === 'next') {
                    quiz.controllIfAnswerIsCorrect(radioChecked);
                    quiz.changeQuestion(1);
                } 
                else {
                    quiz.controllIfAnswerIsCorrect(radioChecked);
                    quiz.changeQuestion(-1);
                }
            } 
            else {
                if(event.target.id === 'next') {
                    quiz.changeQuestion(1);
                } 
                else {
                    quiz.changeQuestion(-1);
                }

            }
        } 
    });

}



document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("startTheQuiz").addEventListener("click", () => {

        let startFormElements = document.forms["start_form"].getElementsByClassName("start_Form");

        if (isElementsValueEmpty(startFormElements)) {

            startQuiz(startFormElements);

        }

    });

});