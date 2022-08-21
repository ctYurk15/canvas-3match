//in-game state
let current_square_id = null;
let current_square_point = null;

function start(engine, matrix, progress_tracker)
{
    matrix.regenerateArray(square_width, square_config);
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
const menu_modal = document.querySelector("#menuModal");

const start_game_button = document.querySelector('#startGameButton');
const restart_game_button = document.querySelector('#restartGameButton');

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, background_l1_sprite);
const progress_tracker = new Progress(scores_text, time_text, level_time);
const matrix = new Matrix(matrix_coordinates.x, matrix_coordinates.y, matrix_size.x, matrix_size.x, minimum_squares_combination, swap_back_time, square_width, square_config);
engine.addObject(matrix);

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
                                
                                if(current_square_position.distanceFrom(previous_square_position) <= square_width)
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
});

start_game_button.addEventListener('click', function(){
    start(engine, matrix, progress_tracker);
    menu_modal.classList.add('hidden');
});

restart_game_button.addEventListener('click', function(){
    start(engine, matrix, progress_tracker);
    end_time_modal.classList.add('hidden');
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