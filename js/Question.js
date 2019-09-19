class Question {

    constructor(addedCategory, addedQuestion, addedCorrectAnswer) {
        this.category = addedCategory;
        this.question = addedQuestion;
        this.correctAnswer = addedCorrectAnswer;
        if(!isNaN(this.correctAnswer)) {
           this.correctAnswer = Number(addedCorrectAnswer);
        }
        this.isCorrectAnswerd = false;
    }

    isGuessedAnswerCorrect(guessedAnswer){
        if(!isNan(guessedAnswer)) {
            this.isCorrectAnswerd = this.strictCompareValues(Number(guessedAnswer), this.correctAnswer);
        } 
        else {
           this.isCorrectAnswerd = this.strictCompareValues(guessedAnswer.toLowerCase(), this.correctAnswer.toLowerCase());
        }
        return this.isCorrectAnswerd;
    }

    strictCompareValues(firstValue,secondValue) {
        return firstValue === secondValue ? true : false;
    }
}