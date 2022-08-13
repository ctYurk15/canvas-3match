//in-game state
//let matrix = [];
let current_square_id = null;
let current_square_point = null;

function start(engine, matrix)
{
    matrix.regenerateArray(square_width, square_colors, engine);
    engine.start();
}

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, 'aqua');
const progress_tracker = new Progress();
const matrix = new Matrix(matrix_coordinates.x, matrix_coordinates.y, matrix_size.x, matrix_size.x, minimum_squares_combination, swap_back_time);
engine.addObject(matrix);

//detect click on square
window.addEventListener('click', function(event){
    
    if(matrix.can_swap)
    {
        matrix.checkSquares(function(square, square_point){

            let swaped = false;
            if(square.pointInRectangle(event.x, event.y))
            {
                if(current_square_id != null)
                {
                    let previous_square = matrix.getSquare(current_square_point);
                    if(previous_square != null) 
                    {
                        previous_square.unselect();
    
                        //we can only swap squares, which collide with each other
                        let current_square_position = square.centerCoordinates();
                        let previous_square_position = previous_square.centerCoordinates();
                        
                        if(current_square_position.distanceFrom(previous_square_position) <= square_width)
                        {
                            matrix.swapSquares(square_point, current_square_point);
                            matrix.checkCombinations(square_point, current_square_point);
                            swaped = true;
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
        });
    }

});

start(engine, matrix);

//game loop
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();