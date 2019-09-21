class Question {

    constructor(addedCategory, addedQuestion, addedFalseAnswers, addedCorrectAnswer) {

        if (!Array.isArray(addedFalseAnswers)) {
            return ("addedFalseAnswers must be an array!");
        }
        this.falseAnswers = addedFalseAnswers;

        this.category = addedCategory;

        this.question = addedQuestion;

        this.correctAnswer = addedCorrectAnswer;

        this.isCorrectAnswerdFromUser = null;
    }


    checkIfanswerIsCorrect(answer) {
        if (this.correctAnswer === answer) {
            this.isCorrectAnswerdFromUser = true;
        } else {
            this.isCorrectAnswerdFromUser = false;
        }

        return this.isCorrectAnswerdFromUser;
    }
}