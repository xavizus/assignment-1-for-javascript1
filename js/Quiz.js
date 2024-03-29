class Quiz {

    constructor(addedName, sumOfQuestionsToAdd, questionsData) {

        try {
            if (isNaN(sumOfQuestionsToAdd)) {
                throw new Error(`sumOfQuestionsToAdd is not a number! You gave ${sumOfQuestionsToAdd}`);
            } else if (sumOfQuestionsToAdd === "") {
                throw new Error(`sumOfQuestionsToAdd is empty!`);
            }
        } catch (error) {
            console.error(error);
            console.log("Setting sumOfQuestionsToAdd to value: 1");
            sumOfQuestionsToAdd = 1;
        }
        this.questionsData = questionsData;
        this.sumOfQuestions = Number(sumOfQuestionsToAdd);
        this.userName = addedName;
        this.questions = [];
        this.questionsGuessedByUser = [];
        this.currentQuestionIndex = 0;
        this.generateQuestions();
    }

    /*
    Generate Questions based of how many question the user input.
    */
    generateQuestions() {
        let categories = this.questionsData.categories;
        let countOfAddedQuestions = 0;
        for (let category in categories) {
            for (let questionData of categories[category]) {
                if (countOfAddedQuestions < this.sumOfQuestions) {
                    this.questions.push(
                        new Question(category, questionData.question, questionData.wrongAlternatives, questionData.correctAnswer)
                        );
                    this.questionsGuessedByUser.push(null);
                    countOfAddedQuestions++;
                } else {
                    break;
                }
            }
        }
    }

    /*
    Controll if the answer inputed by the user is correct.
    */
    controllIfAnswerIsCorrect(radioDOMElements) {
        // the method checkIfAnswerIsCorrect is from the Question class.
        let isCorrectAnswer = this.questions[this.currentQuestionIndex].checkIfanswerIsCorrect(radioDOMElements.value);
        this.questionsGuessedByUser[this.currentQuestionIndex] = isCorrectAnswer;
    }

    /*
    Find the selected DOM-element from the DOMForm and check if that answer is correct or not.
    */
    correctTheAnswerGivenInTheForm(DOMForm) {
        //console.log(DOMForm);
        let radioChecked = "";
        for (let indexOfRadio = 0; indexOfRadio < DOMForm.length; indexOfRadio++) {
            if (DOMForm[indexOfRadio].checked) {
                radioChecked = DOMForm[indexOfRadio];
                break;
            }
        }

        if (radioChecked) {
            //check if the radio DOM-element is correct.
            this.controllIfAnswerIsCorrect(radioChecked);
            //update the total answered questions.
            this.updateAnsweredQuestions();
        }

    }

    /*
        Self-explained.
        Returns the totalt answered question(s) by the user
    */
    getTotalAnsweredQuestions() {
        let guesses = 0;
        for (let answered of this.questionsGuessedByUser) {
            if (answered !== null) {
                guesses++;
            }
        }
        return guesses;
    }

    /*
        return total questions.
    */
    getTotalQuestions() {
        return this.sumOfQuestions;
    }

    /*
        Update the total answeredQuestions by the user.
    */
    updateAnsweredQuestions() {
        document.getElementById("countOverview").textContent = `${this.getTotalAnsweredQuestions()} / ${this.getTotalQuestions()}`;
    }

    /*
        views the question based on the input index.
    */
    viewQuestion(questionIndex = this.currentQuestionIndex) {
        let questionData = "";
        try {
            if (typeof(this.questions[questionIndex]) === 'undefined') {
                throw Error("You tried to input an index outside of the question array scope! Defaulting to currentQuestionIndex: ");
            }
            questionData = this.questions[questionIndex];
        } catch (error) {
            console.error(error + this.currentQuestionIndex);
            questionData = this.questions[this.currentQuestionIndex];
        }

        /*
            Protected from XSS because it handle the content as text.
        */
        document.getElementById("countOverview").textContent = `${this.getTotalAnsweredQuestions()} / ${this.getTotalQuestions()}`;

        /**
         * Unsafe - though it's trusted data we are working with, it's okey.
         */
        document.getElementById("quiz__form").innerHTML = "";

        /*
        Just learned that, even if you just specify the array of an object, you will still get
        a referense instead of an copy.
        
        Old solution:
        let answersToShow = questionData.falseAnswers; 

        So everytime I did:
        answersToShow.splice(randomizeAnswersOrder, 0, questionData.correctAnswer);
        it went to the object questionData.falseAnswers and added the correct answer in the array. 
        Not in the "copy". Therefore I had to copy every string in to a new array.
        Didn't find another way to do this in an easier way.
        */
        let answersToShow = [];
        for (let falseAnswer of questionData.falseAnswers) {
            answersToShow.push(falseAnswer);
        }

        let randomizeAnswersOrder = this.randomNumberBetweenTwoValues(0, 2);

        //Randomly put the correct answer in the array.
        answersToShow.splice(randomizeAnswersOrder, 0, questionData.correctAnswer);

        /**
         * This example were my first solution, which I later realised this opened up for XSS-attack.
         * this.userName variable opens up for XSS, because we let HTML-code to be prased (a bit lower down at).
         * If the user set "Ditt namn" as: <a href="localhost:5500">Tryck Här</a>
         * Then a link will be displayed called "Tryck Här". 
         */
        let currentQuestionIndex = `
            <div>
                <p><span class="bold">${this.userName}</span> är på fråga ${(this.currentQuestionIndex+1)} av ${this.sumOfQuestions}</p>
            </div>
        `;

        /**
         *  A way to fight above XSS-attack, are to create a textNode.
         *  Though this require us to insert it in another way.
         * 
         * First we need to input our tag with id to the HTML
         */

        currentQuestionIndex = `
        <div>
            <p id="questionIndex"><span id="userName" class="bold"> </span> är på fråga ${(this.currentQuestionIndex+1)} av ${this.sumOfQuestions}</p>
        </div>
        `;

        /**
         * Then we need to post it to the HTML.
         */
        document.getElementById("quiz__form").insertAdjacentHTML('beforeend', currentQuestionIndex);

        /**
         * We create our string with the unsafe data
         */
        let userName = `${this.userName}`;

        /**
         * We create a textNode which phrases the string as a string, and not HTML.
         */
        userName = document.createTextNode(userName);

        /**
         * We try to find the id questionIndex and append it, with our textNode.
         * This will write the string as it's input, which will display the following text
         * <a href="localhost:5500">Tryck Här</a> är på fråga 1 av 10
         * It's no more phrased as HTML-code.
         */
        document.getElementById("userName").appendChild(userName);

        /**
         * The question that will be shown.
         */
        let questionToBeAsked = `
            <div class="question">
                <p>${questionData.question}</p>
            </div>
        `;

        /**
         * The start tags of the question form
         */
        let questionForm = `
        <div class="answers">
            <table class="center">
        `;

        let countAnswers = 0;
        for (let answerToShow of answersToShow) {

            /**
             * find out which number/letter to use
             */
            let numberToView = "";
            switch (countAnswers) {
                case 0:
                    {
                        numberToView = "1";
                        break;
                    }
                case 1:
                    {
                        numberToView = "X";
                        break;
                    }

                default:
                    {
                        numberToView = "2";
                    }

            }


            questionForm += `<tr>`;
            /**
             * Check if the user have input an answer before, and match that answer to the answer which will be shown.
             * If it's a match, automagically check that radio button
             * else, don't check it.
             */
            if (questionData.guessedAnswerFromUser && questionData.guessedAnswerFromUser === answerToShow) {
                questionForm += `<td><input type="radio" id="${numberToView}" class="answers" name="answers" value="${answerToShow}" checked="true"></td>`;
            } else {
                questionForm += `<td><input type="radio" id="${numberToView}" class="answers" name="answers" value="${answerToShow}"></td>`;
            }

            /**
             * Adds lables to the answers
             */
            questionForm += `
                    <td><label for="${numberToView}">${numberToView}.</label></td>
                    <td><label for="${numberToView}">${answerToShow}</label></td>
                    </tr>
            `;
            countAnswers++;

        }

        /**
         * End tags of the form.
         */

        questionForm += `</table></div>`;

        /*
            This could open up for XSS, though it's only trusted data that's input. Therefore okey to use.
        */
        document.getElementById("quiz__form").insertAdjacentHTML('beforeend',
            questionToBeAsked +
            questionForm
        );
    }

    /**
     * Changes the question based of wanted increased value
     */

    changeQuestion(changedValue = 1) {

        let proposedQuestionIndex = this.currentQuestionIndex + changedValue;

        // Make sure that the new value is not larger than the total questions and not less than 0.
        if ((proposedQuestionIndex >= 0 && proposedQuestionIndex < this.sumOfQuestions)) {
            this.currentQuestionIndex = proposedQuestionIndex;
            this.viewQuestion(this.currentQuestionIndex);
        } else {
            console.log(`Could not do the change question to index ${proposedQuestionIndex}`);
        }
    }

    /**
     * Self-explained
     * Toogles the hide and show class on elements
     */

    toggleHideShowElements(elements, hideClass = "hide", showClass = "show") {

        elements = Array.from(elements);

        for (let element of elements) {

            document.getElementById(element.id).classList.toggle(hideClass);

            document.getElementById(element.id).classList.toggle(showClass);

        }

    }

    /**
     * Randomize a number between values.
     */
    randomNumberBetweenTwoValues(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    viewResults() {
        document.getElementById("quiz__form").innerHTML = "";

        let resultsTable = `
        <table id="results" class="center">
        <tr>
            <th class="center">Question</th>
            <th class="center">Correct Answer</th>
            <th class="center">Your answer</th>
        </tr>
        `;

        for(let questionData of this.questions) {
            resultsTable += `
            <tr> 
                <td class="center">
                ${questionData.question}
                </td>
                <td class="center">
                ${questionData.correctAnswer}
                </td>
                `;

            if(questionData.isCorrectAnswerdFromUser) {
                resultsTable += `
                <td class="center correct">${questionData.guessedAnswerFromUser}</td>
                `;
            }else {
                resultsTable += `
                <td class="center wrong">${questionData.guessedAnswerFromUser}</td>
                `;
            }
            resultsTable+= `</tr>`;
        }

        resultsTable +="</table>";

        let restartButton = `<button id="restart" type="button">Starta om</button>`;

        document.getElementById("quiz__form").innerHTML = resultsTable + restartButton;

    }

    restartQuizGame() {
        document.getElementById("quizGame").removeEventListener("click",()=>{});
        document.getElementById("sidebox").removeEventListener("click",()=>{});
        document.getElementById("quiz__form").innerHTML = "";

        document.getElementById("start").innerHTML = `
        <p>Varmt välkommen till Quiz-spelet för unga. Frågorna är framtagna för specifikt barn mellan 4 och 10 år.
                </p>
                <p>För att delta, skriv in ditt namn och hur många frågor du önskar få i quizen.</p>
                <form name="start_form">
                    <table class="center">
                        <tr>
                            <td>
                                <label for="name">Ditt namn:</label>
                            </td>
                            <td><input id="name" class="start_Form" placeholder="Skriv ditt namn här" required></td>
                        </tr>
                        <tr>
                            <td>
                                <label for="sumOfQuestions">Antal frågor</label>
                            </td>
                            <td>
                                <input type="number" id="sumOfQuestions" class="start_Form" min="1" max="10" value="1" required>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button id="startTheQuiz" type="button">Starta Quiz</button></td>
                        </tr>
                    </table>
                </form>
                <div id="errorMessage" class="hide"></div>
        `;

        let contentToChange = document.getElementsByClassName("quizContent");

        this.toggleHideShowElements(contentToChange);
    }


}