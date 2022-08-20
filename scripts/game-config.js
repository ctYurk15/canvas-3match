//game config
const square_width = 50;
const matrix_size = {x: 10, y: 10};
const matrix_coordinates = {
    x: window.innerWidth/2 - square_width * (matrix_size.x/2), 
    y: window.innerHeight/2 - square_width * (matrix_size.y/2)
};

const square_colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
const minimum_squares_combination = 3;
const swap_back_time = 300;