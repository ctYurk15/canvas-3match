class Progress
{
    scores = 0;
    total_seconds = 0;
    end_time_action = null;
    interval = null;

    constructor(scores_text_container, time_text_container, total_seconds, engine)
    {
        this.scores_text_container = scores_text_container;
        this.time_text_container = time_text_container;
        this.current_seconds = total_seconds;
        this.total_seconds = total_seconds;
        this.engine = engine;
    }

    restoreProgress()
    {
        this.current_seconds = this.total_seconds;
        clearInterval(this.interval);
        this.scores = 0;
        this.updateUI();
    }

    addScores(scores)
    {
        this.scores += scores;
        this.updateUI();
    }

    checkLevelHighscoreStorage()
    {
        if(localStorage.getItem('levels_highscore') == null)
        {
            localStorage.setItem('levels_highscore', '[0, 0, 0]');
        }
    }

    setLevelHighscore(scores, level = 0)
    {
        this.checkLevelHighscoreStorage();

        const records = JSON.parse(localStorage.getItem('levels_highscore'));
        if(records[level] < scores)
        {
            records[level] = scores;
            localStorage.setItem('levels_highscore', JSON.stringify(records));

            return scores;
        }

        return records[level];
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

        this.interval = setInterval(function(){

            if(self.current_seconds <= 0)
            {
                clearInterval(self.interval);
                self.end_time_action();
            }
            else
            {
                if(self.engine.is_working && !self.engine.paused)
                {
                    self.current_seconds--;
                    self.time_text_container.innerHTML = 'Time left: '+self.current_seconds+'s';
                }
            }


        }, 1000);
    }

    setEndTimeAction(endTimeAction)
    {
        this.end_time_action = endTimeAction;
    }
}