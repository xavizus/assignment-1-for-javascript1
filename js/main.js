
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

    if(results === false) {

        return false;

    }

    for (let result of results) {

        if (result == "") {

            return false;

        }

    }

    return true

}

function toggleHideShowElements(elements, hideClass = "hide", showClass="show") {

    elements = Array.from(elements);

    for(let element of elements) {

        if(element.classList.contains("hide")) {

            document.getElementById(element.id).classList.remove(hideClass);

            document.getElementById(element.id).classList.add(showClass);

        }
        else {

            document.getElementById(element.id).classList.add(hideClass);

            document.getElementById(element.id).classList.remove(showClass);

        }

    }

}

function addQuestionProgressBoxes(questions) {

    for(let index in questions) {
        let questionProgress = document.createElement("input");
        questionProgress.setAttribute("type","checkbox");
        questionProgress.setAttribute("name","questionOverview");
        questionProgress.setAttribute("id",`question-${index}`);
        questionProgress.setAttribute("value",index);
        questionProgress.setAttribute("disabled","");
        document.getElementById("questionsOverview").append(questionProgress);
    }

}

function randomNumberBetweenTwoValues(min,max) {
    return Math.floor(Math.random() * (max - min +1) +  min);    
}

function viewQuestion(questionData) {
    document.getElementById("quiz__form").innerHTML = "";
    let randomizeAnswersOrder = randomNumberBetweenTwoValues(0,2);
    questionData.falseAnswers.splice(randomizeAnswersOrder,0,questionData.correctAnswer);
    document.getElementById("quiz__form").insertAdjacentHTML('beforeend',
        `<div class="question">
        <p>${questionData.question}</p>
</div>
<div class="answers">
    <table class="center">
        <tr>
            <td><input type="radio" class="answers" value="${questionData.falseAnswers[0]}"></td>
            <td><label for="1">1.</label></td>
            <td><label for="1">${questionData.falseAnswers[0]}</label></td>
        </tr>
        <tr>
            <td><input type="radio" class="answers" value="${questionData.falseAnswers[1]}"></td>
            <td><label for="2">X.</label></td>
            <td><label for="2">${questionData.falseAnswers[1]}</label></td>
        </tr>
        <tr>
            <td><input type="radio" class="answers" value="${questionData.falseAnswers[2]}"></td>
            <td><label for="3">2.</label></td>
            <td><label for="3">${questionData.falseAnswers[2]}</label></td>
        </tr>
    </table>
</div>`
    );
}

function startQuiz(startFormElements) {

    let currentQuestionIndex = 0;
    let [userName, numberOfQuestions] = getElementsValues(startFormElements);

    let quiz = new Quiz(userName, numberOfQuestions);

    let contentToChange = document.getElementsByClassName("quizContent");

    toggleHideShowElements(contentToChange);

    addQuestionProgressBoxes(quiz.questions);
    
    document.getElementById("countOverview").textContent =`${quiz.getTotalAnsweredQuestions()} / ${quiz.getTotalQuestions()} frågor`;

    viewQuestion(quiz.questions[currentQuestionIndex]);

}


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("startTheQuiz").addEventListener("click", () => {

        let startFormElements = document.forms["start_form"].getElementsByClassName("start_Form");

        if (isElementsValueEmpty(startFormElements)) {

            startQuiz(startFormElements);

        }

    });

    document.getElementById("quizGame").addEventListener("click", (event) => {
        if(event.target.className === 'answers') {
            
        }
    });

});