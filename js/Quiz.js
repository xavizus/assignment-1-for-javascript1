class Quiz {

    constructor(addedName,sumOfQuestionsToAdd) {
        this.userName = addedName;
        this.questions = [];
        this.sumOfQuestionsToAdd = sumOfQuestionsToAdd;
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
}