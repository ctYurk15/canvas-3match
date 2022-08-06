//in-game state
let matrix = [];
let current_square_id = null;

function start(engine)
{
    //clear old state
    matrix = getEmpty2dArray(matrix_size.x, matrix_size.y);

    //generating matrix
    for(let y = 0; y < matrix_size.y; y++)
    {
        for(let x = 0; x < matrix_size.x; x++)
        {
            const square_x = matrix_coordinates.x + (x * square_width);
            const square_y = matrix_coordinates.y + (y * square_width);
            const square_color = square_colors[getRandomInt(0, square_colors.length)];

            const square = new Square(square_x, square_y, square_width, square_color);
            matrix[y][x] = square;
            engine.addObject(square);

        }
    }

    engine.start();
}

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, 'aqua');
const progress_tracker = new Progress();

//detect click on square
window.addEventListener('click', function(event){
    
    for(let y = 0; y < matrix_size.y; y++)
    {
        for(let x = 0; x < matrix_size.x; x++)
        {
            const square = matrix[y][x];
            if(square.pointInRectangle(event.x, event.y))
            {
                if(current_square_id != null)
                {
                    let previous_square = engine.getObjectById(current_square_id);
                    if(previous_square != null) previous_square.unselect();
                }

                current_square_id = square.id;
                square.select();
            }
        }
    }

});

start(engine);

//game loop
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();