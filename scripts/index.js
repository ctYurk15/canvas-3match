//in-game state
let current_square_id = null;
let current_square_point = null;
let current_level = 0;
let level_config = {};

function start(engine, matrix, progress_tracker)
{
    level_config = levels[current_level];

    progress_tracker.total_seconds = level_config.level_time;

    matrix.x = level_config.matrix_coordinates.x;
    matrix.y = level_config.matrix_coordinates.y;
    matrix.width = level_config.matrix_size.x;
    matrix.height = level_config.matrix_size.y;
    matrix.minimum_squares_combination = level_config.minimum_squares_combination;
    matrix.swap_back_time = level_config.swap_back_time;
    matrix.square_width = level_config.square_width;
    matrix.square_config = level_config.square_config;

    matrix.regenerateArray(level_config.square_width, level_config.square_config);
    progress_tracker.restoreProgress();

    progress_tracker.startTimeUpdate();

    engine.start();
}

//ui-elements
const scores_text = document.querySelector('#scoresText');
const time_text = document.querySelector('#timeText');
const end_time_scores_text = document.querySelector('#endTimeScoresText');
const highscores_text = document.querySelector('#highScoresText');

const end_time_modal = document.querySelector('#endTimeModal');
const menu_modal = document.querySelector('#menuModal');
const pause_modal = document.querySelector('#pauseModal');

const start_buttons = document.querySelectorAll('.start-game-button');
const restart_game_button = document.querySelector('#restartGameButton');
const continue_game_button = document.querySelector('#continueGameButton');
const menu_buttons = document.querySelectorAll('.menuButton');

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, background_l1_sprite);
const progress_tracker = new Progress(scores_text, time_text, 0, engine);
const matrix = new Matrix(0, 0, 0, 0,0, 0, 0, 0);

engine.addObject(matrix);

//generate coordinates
for(let i = 0; i < levels.length; i++)
{
    levels[i].matrix_coordinates = generateCoordinates(levels[i]);
}

level_config = levels[current_level];

//detect click on square
window.addEventListener('click', function(event){
    
    if(matrix.can_swap && engine.is_working)
    {
        matrix.checkSquares(function(square, square_point){

            if(square != null)
            {
                let swaped = false;
                if(square.pointInRectangle(event.x, event.y))
                {
                    if(current_square_id != null)
                    {
                        let previous_square = matrix.getSquare(current_square_point);
                        if(previous_square != null) 
                        {
                            if(square.color != previous_square.color)
                            {
                                previous_square.unselect();
        
                                //we can only swap squares, which collide with each other
                                let current_square_position = square.centerCoordinates();
                                let previous_square_position = previous_square.centerCoordinates();
                                
                                if(current_square_position.distanceFrom(previous_square_position) <= level_config.square_width)
                                {
                                    matrix.swapSquares(square_point, current_square_point);
                                    let combinations_result = matrix.checkCombinations(square_point, current_square_point);

                                    if(combinations_result.points != [])
                                    {
                                        matrix.processCombinationPoints(combinations_result.points);
                                        progress_tracker.addScores(combinations_result.scores);
                                    }

                                    swaped = true;
                                }
                            }
                            else
                            {
                                previous_square.unselect();
                                square.unselect();
                            }
                        }
                    }
        
                    if(!swaped)
                    {
                        current_square_id = square.id;
                        current_square_point = square_point;
                        square.select();
                    }
                    else 
                    {
                        current_square_id = null;
                        current_square_point = null;
                        square.unselect();
                    }
                }
            }

            
        });
    }

});

//end of the game
progress_tracker.setEndTimeAction(function(){
    engine.is_working = false;
    end_time_modal.classList.remove('hidden');
    endTimeScoresText.innerHTML = 'Scores: '+progress_tracker.scores;
    highscores_text.innerHTML = 'Highscores: '+progress_tracker.setLevelHighscore(progress_tracker.scores, current_level);
});

start_buttons.forEach(function(start_game_button){

    start_game_button.addEventListener('click', function(){
        const level = this.attributes.getNamedItem('data-level').value;
        current_level = parseInt(level);

        start(engine, matrix, progress_tracker);
        menu_modal.classList.add('hidden');
    });
    
});


restart_game_button.addEventListener('click', function(){
    start(engine, matrix, progress_tracker);
    end_time_modal.classList.add('hidden');
});

//pause
window.addEventListener('keydown', function(event){
    if(event.key == 'Escape' && engine.is_working)
    {
        engine.paused = !engine.paused;
        pause_modal.classList.toggle('hidden', !engine.paused);
    }
});

continue_game_button.addEventListener('click', function(){
    if(engine.is_working)
    {
        engine.paused = false;
        pause_modal.classList.add('hidden');
    }
});

menu_buttons.forEach(function(menu_button){

    menu_button.addEventListener('click', function(){
        
        engine.paused = false;
        engine.is_working = false;

        pause_modal.classList.add('hidden');
        menu_modal.classList.remove('hidden');
        end_time_modal.classList.add('hidden');

        scores_text.classList.add('hidden');
        time_text.classList.add('hidden');  

        engine.clear();

    });
    
});


engine.clear();

//game loop
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();