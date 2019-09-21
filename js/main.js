
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

function startQuiz(startFormElements) {

    let [userName, numberOfQuestions] = getElementsValues(startFormElements);

    let quiz = new Quiz(userName, numberOfQuestions);

    let contentToChange = document.getElementsByClassName("quizContent");

    toggleHideShowElements(contentToChange);

    for(let index in quiz.questions) {
        let questionProgress = document.createElement("input");
        questionProgress.setAttribute("type","checkbox");
        questionProgress.setAttribute("name","questionOverview");
        questionProgress.setAttribute("id",`question-${index}`);
        questionProgress.setAttribute("value",index);
        questionProgress.setAttribute("disabled","");
        document.getElementById("questionsOverview").append(questionProgress);
    }
    console.log( document.getElementById("countOverview"));
    
    document.getElementById("countOverview").textContent =`${quiz.getTotalAnsweredQuestions()} / ${quiz.getTotalQuestions()} frågor`;

}


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("startTheQuiz").addEventListener("click", () => {

        let startFormElements = document.forms["start_form"].getElementsByClassName("start_Form");

        if (isElementsValueEmpty(startFormElements)) {

            startQuiz(startFormElements);

        }

    });

});