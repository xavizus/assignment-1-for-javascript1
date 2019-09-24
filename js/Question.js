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

        this.guessedAnswerFromUser = null;
    }

    /**
     * Check if input answer is correct.
     */
    checkIfanswerIsCorrect(answer) {
        //if the answer is strict equal to answer
        if (this.correctAnswer === answer) {
            //set that the answer is true.
            this.isCorrectAnswerdFromUser = true;
        } else {
            //set that the answer is false
            this.isCorrectAnswerdFromUser = false;
        }
        // set the guessedAnswerFromUser, to the answer input from the user.
        this.guessedAnswerFromUser = answer;

        // return the boolean.
        return this.isCorrectAnswerdFromUser;
    }
}