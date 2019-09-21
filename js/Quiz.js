class Quiz {

    constructor(addedName, sumOfQuestionsToAdd) {

        try {
            if (isNaN(sumOfQuestionsToAdd)) {
                throw new Error(`sumOfQuestionsToAdd is not a number! You gave ${sumOfQuestionsToAdd}`);
            } else if (sumOfQuestionsToAdd === "") {
                throw new Error(`sumOfQuestionsToAdd is empty!`);
            } 
        } catch (error) {
            console.error(error);
            console.log("Setting sumOfQuestionsToAdd to value: 1");
            this.sumOfQuestions = 1;
        }

        this.sumOfQuestions = Number(sumOfQuestionsToAdd);
        this.userName = addedName;
        this.questions = [];
        this.questionsGuessedByUser = [];
        this.currentQuestionIndex = 0;
        this.generateQuestions();
    }

    generateQuestions() {
        let categories = questionsData.categories;
        let countOfAddedQuestions = 0;
        for (let category in categories) {
            for (let questionData of categories[category]) {
                if (countOfAddedQuestions < this.sumOfQuestions) {
                    this.questions.push(new Question(category, questionData.question, questionData.wrongAlternatives, questionData.correctAnswer));
                    this.questionsGuessedByUser.push(null);
                    countOfAddedQuestions++;
                } else {
                    break;
                }
            }
        }
    }

    controllIfAnswerIsCorrect(radioDOMElement){
        let isCorrectAnswer = this.questions[this.currentQuestionIndex].checkIfanswerIsCorrect(radioDOMElement.value);
        this.questionsGuessedByUser[this.currentQuestionIndex] = isCorrectAnswer;
    }

    getDOMElementThatsCheckedFromForm(DOMForm) {
        for(let indexOfRadio = 0; indexOfRadio < DOMForm.length; indexOfRadio++ ) {
            if(DOMForm[indexOfRadio].checked) {
                return DOMForm[indexOfRadio];
            }
        }

        return false;


    }

    getTotalAnsweredQuestions() {
        let guesses = 0;
        for(let answered of this.questionsGuessedByUser) {
            if(answered !== null)  {
                guesses++;
            }
        }
        return guesses;
    }

    getTotalQuestions() {
        return this.questions.length;
    }

    viewQuestion(questionIndex = this.currentQuestionIndex) {
        let questionData = this.questions[questionIndex];

        document.getElementById("countOverview").textContent = `${this.getTotalAnsweredQuestions()} / ${this.getTotalQuestions()}`;
        
        if(this.getTotalAnsweredQuestions() === this.getTotalQuestions()) {
            document.getElementById("correctAnswers").disabled = false;
        }

        document.getElementById("quiz__form").innerHTML = "";
        let randomizeAnswersOrder = this.randomNumberBetweenTwoValues(0, 2);

        /*
        Just learned that, even if you just specify the array of an object, you will still get
        a referense instead of an copy.
        
        Old solution:
        let answersToShow = questionData.falseAnswers; 

        So everytime I did:
        answersToShow.splice(randomizeAnswersOrder, 0, questionData.correctAnswer);
        it went to the object questionData.falseAnswers and added the correct answer in the object. 
        Not in the "copy". Therefore I had to copy every string in to a new array.
        */
        let answersToShow = [];
        for (let falseAnswer of questionData.falseAnswers) {
            answersToShow.push(falseAnswer);
        }


        answersToShow.splice(randomizeAnswersOrder, 0, questionData.correctAnswer);
        console.log(answersToShow);
        document.getElementById("quiz__form").insertAdjacentHTML('beforeend',
            `<div class="question">
            <p>${questionData.question}</p>
    </div>
    <div class="answers">
        <table class="center">
            <tr>
                <td><input type="radio" class="answers" name="answers" value="${answersToShow[0]}"></td>
                <td><label for="1">1.</label></td>
                <td><label for="1">${answersToShow[0]}</label></td>
            </tr>
            <tr>
                <td><input type="radio" class="answers" name="answers" value="${answersToShow[1]}"></td>
                <td><label for="2">X.</label></td>
                <td><label for="2">${answersToShow[1]}</label></td>
            </tr>
            <tr>
                <td><input type="radio" class="answers" name="answers" value="${answersToShow[2]}"></td>
                <td><label for="3">2.</label></td>
                <td><label for="3">${answersToShow[2]}</label></td>
            </tr>
        </table>
    </div>`
        );
    }

    changeQuestion(changedValue) {

        let proposedQuestionIndex = this.currentQuestionIndex + changedValue;

        if((proposedQuestionIndex >= 0 && proposedQuestionIndex < this.sumOfQuestions))  {
            this.currentQuestionIndex = proposedQuestionIndex;
            this.viewQuestion(this.currentQuestionIndex);

        }
        else {
            console.log(`Could not do the change question to index ${proposedQuestionIndex}`);
        }
    }

    toggleHideShowElements(elements, hideClass = "hide", showClass = "show") {

        elements = Array.from(elements);
    
        for (let element of elements) {
    
            if (element.classList.contains("hide")) {
    
                document.getElementById(element.id).classList.remove(hideClass);
    
                document.getElementById(element.id).classList.add(showClass);
    
            } else {
    
                document.getElementById(element.id).classList.add(hideClass);
    
                document.getElementById(element.id).classList.remove(showClass);
    
            }
    
        }
    
    }

    randomNumberBetweenTwoValues(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



}