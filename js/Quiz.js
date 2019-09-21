class Quiz {

    constructor(addedName,sumOfQuestionsToAdd) {

        try {
            if(isNaN(sumOfQuestionsToAdd)) {
                throw new Error(`sumOfQuestionsToAdd is not a number! You gave ${sumOfQuestionsToAdd}`);
            } 
            else if (sumOfQuestionsToAdd === "") {
                throw new Error(`sumOfQuestionsToAdd is empty!`);
            }   
            else {
                this.sumOfQuestionsToAdd = Number(sumOfQuestionsToAdd);
            }
        }
        catch(error) {
            console.error(error);
            console.log("Setting sumOfQuestionsToAdd to value: 1");
            this.sumOfQuestionsToAdd = 1;
        }

        this.userName = addedName;
        this.questions = [];
        this.countCorrectGuesses = 0;
        this.countWrongGuesses = 0;
    
        this.generateQuestions();
    }

    generateQuestions() {
        let categories = questionsData.categories;
        let countOfAddedQuestions = 0;
        for(let category in categories) {
            for(let questionData of categories[category]) {
                if(countOfAddedQuestions < this.sumOfQuestionsToAdd) {
                    this.questions.push(new Question(category,questionData.question,questionData.wrongAlternatives,questionData.correctAnswer));
                    countOfAddedQuestions++;
                } else {
                    break;
                }
            }
        }
    }

    checkIfAnswersAreCorrect() {
        
    }

    getTotalAnsweredQuestions() {
        return this.countCorrectGuesses + this.countWrongGuesses;
    }

    getTotalQuestions() {
        return this.questions.length;
    }

}