class Progress
{
    scores = 0;

    constructor(scores_text_container)
    {
        this.scores_text_container = scores_text_container;
    }

    addScores(scores)
    {
        this.scores += scores;
        this.updateScoresText();
    }

    updateScoresText()
    {
        this.scores_text_container.innerHTML = 'Scores: '+this.scores;
    }
}