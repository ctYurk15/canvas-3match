//game config
function generateCoordinates(level)
{
    return {
        x: window.innerWidth/2 - level.square_width * (level.matrix_size.x / 2), 
        y: window.innerHeight/2 - level.square_width * (level.matrix_size.y / 2)
    };
}

const levels = [
    {
        square_width: 50,
        matrix_size: {x: 10, y: 10},

        matrix_coordinates: {
            x: 0, 
            y: 0
        },
        
        square_config: [
            {color: 'color1', sprite: square1_l1_sprite},
            {color: 'color2', sprite: square2_l1_sprite},
            {color: 'color3', sprite: square3_l1_sprite},
            {color: 'color4', sprite: square4_l1_sprite},
            {color: 'color5', sprite: square5_l1_sprite}
        ],
        minimum_squares_combination: 3,
        swap_back_time: 300,
        
        level_time: 50,
    },
    {
        square_width: 75,
        matrix_size: {x: 5, y: 5},

        matrix_coordinates: {
            x: 0, 
            y: 0
        },
        
        square_config: [
            {color: 'color1', sprite: square1_l2_sprite},
            {color: 'color2', sprite: square2_l2_sprite},
            {color: 'color3', sprite: square3_l2_sprite},
            {color: 'color4', sprite: square4_l2_sprite},
        ],
        minimum_squares_combination: 3,
        swap_back_time: 300,
        
        level_time: 45,
    },
    {
        square_width: 25,
        matrix_size: {x: 25, y: 25},

        matrix_coordinates: {
            x: 0, 
            y: 0
        },
        
        square_config: [
            {color: 'color1', sprite: square1_l3_sprite},
            {color: 'color2', sprite: square2_l3_sprite},
            {color: 'color3', sprite: square3_l3_sprite},
            {color: 'color4', sprite: square4_l3_sprite},
            {color: 'color5', sprite: square5_l3_sprite},
            {color: 'color6', sprite: square6_l3_sprite},
        ],
        minimum_squares_combination: 3,
        swap_back_time: 300,
        
        level_time: 120,
    },
];