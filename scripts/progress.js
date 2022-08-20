class Progress
{
    scores = 0;
    end_time_action = null;

    constructor(scores_text_container, time_text_container, total_seconds)
    {
        this.scores_text_container = scores_text_container;
        this.time_text_container = time_text_container;
        this.total_seconds = total_seconds;
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

    startTimeUpdate()
    {
        const self = this;

        let interval = setInterval(function(){

            if(self.total_seconds <= 0)
            {
                clearInterval(interval);
                self.end_time_action();
            }
            else
            {
                self.total_seconds--;
                self.time_text_container.innerHTML = 'Time left: '+self.total_seconds+'s';
            }


        }, 1000);
    }

    setEndTimeAction(endTimeAction)
    {
        this.end_time_action = endTimeAction;
    }
}