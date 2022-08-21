class Progress
{
    scores = 0;
    total_seconds = 0;
    end_time_action = null;

    constructor(scores_text_container, time_text_container, total_seconds)
    {
        this.scores_text_container = scores_text_container;
        this.time_text_container = time_text_container;
        this.current_seconds = total_seconds;
        this.total_seconds = total_seconds;
    }

    restoreProgress()
    {
        this.current_seconds = this.total_seconds;
        this.scores = 0;
        this.updateUI();
    }

    addScores(scores)
    {
        this.scores += scores;
        this.updateUI();
    }

    updateUI()
    {
        //show ui
        this.scores_text_container.classList.remove('hidden');
        this.time_text_container.classList.remove('hidden');
        
        this.scores_text_container.innerHTML = 'Scores: '+this.scores;
        this.time_text_container.innerHTML = 'Time left: '+this.current_seconds+'s';
    }

    startTimeUpdate()
    {
        const self = this;

        let interval = setInterval(function(){

            if(self.current_seconds <= 0)
            {
                clearInterval(interval);
                self.end_time_action();
            }
            else
            {
                self.current_seconds--;
                self.time_text_container.innerHTML = 'Time left: '+self.current_seconds+'s';
            }


        }, 1000);
    }

    setEndTimeAction(endTimeAction)
    {
        this.end_time_action = endTimeAction;
    }
}