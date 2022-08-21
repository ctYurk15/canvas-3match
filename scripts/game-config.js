//game config
const square_width = 50;
const matrix_size = {x: 10, y: 10};
const matrix_coordinates = {
    x: window.innerWidth/2 - square_width * (matrix_size.x/2), 
    y: window.innerHeight/2 - square_width * (matrix_size.y/2)
};

const square_config = [
    {color: 'red', sprite: square1_l1_sprite},
    {color: 'green', sprite: square2_l1_sprite},
    {color: 'blue', sprite: square3_l1_sprite},
    {color: 'yellow', sprite: square4_l1_sprite},
    {color: 'orange', sprite: square5_l1_sprite}
];
const minimum_squares_combination = 3;
const swap_back_time = 300;

const level_time = 5;