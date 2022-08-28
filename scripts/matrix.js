class Matrix extends GameObject
{
    array = [];
    can_swap = true;

    constructor(x, y, matrix_width, matrix_height, minimum_squares_combination, swap_back_time, square_width, square_config)
    {
        super(x, y);

        this.square_width = square_width;
        this.width = matrix_width;
        this.height = matrix_height;
        this.minimum_squares_combination = minimum_squares_combination;
        this.swap_back_time = swap_back_time;
        this.square_config = square_config;
    }

    generateRandomSquare(x, y, square_width, square_config)
    {
        const square_x = this.x + (x * square_width);
        const square_y = this.y + (y * square_width);
        const new_square_config = square_config[getRandomInt(0, square_config.length)];

        return new Square(square_x, square_y, square_width, new_square_config.color, new_square_config.sprite);
    }

    regenerateArray(square_width, square_config)
    {
        //clear old state
        this.array = getEmpty2dArray(this.width, this.height);

        //generating matrix
        for(let y = 0; y < this.height; y++)
        {
            for(let x = 0; x < this.width; x++)
            {
                const square = this.generateRandomSquare(x, y, square_width, square_config);
                this.array[y][x] = square;
            }
        }
    }

    checkSquares(functionName)
    {
        for(let y = 0; y < this.height; y++)
        {
            for(let x = 0; x < this.width; x++)
            {
                functionName(this.array[y][x], new Point(x, y));
            }
        }
    }

    checkCombinations(point1, point2)
    {
        let point1_result = this.checkCombinationsInPoint(point1);
        let point2_result = this.checkCombinationsInPoint(point2);

        const matrix = this;

        //if nothing`s changed, swap back
        if(point1_result.length == 0 && point2_result.length == 0)
        {
            this.can_swap = false;
            const timeout = setTimeout(function(){

                matrix.swapSquares(point1, point2);
                matrix.can_swap = true;
                clearTimeout(timeout);

            }, matrix.swap_back_time);

            return {points: [], scores: 0};
        }
        else
        {
            let squares_count = 0;
            let unique_points = [];

            point1_result.concat(point2_result).forEach(function(combination) {
                
                //instead of adding length, add square to count only if it's no destroyed already
                combination.points.forEach(function(point){
                    if(matrix.array[point.y][point.x] != null)
                    {
                        squares_count++;
                        unique_points.push(point);
                        matrix.array[point.y][point.x] = null;
                    }
                });

            });

            return {points: unique_points, scores: squares_count};

        }
    }

    processCombinationPoints(unique_points)
    {
        unique_points = unique_points.sort(function(point1, point2){
            return point2.y - point1.y;
        });

        this.fillDestroyedSquares(unique_points);
        this.can_swap = false;

        const timeout = setTimeout(function(){

            matrix.can_swap = true;
            clearTimeout(timeout);

        }, matrix.swap_back_time*2);
    }

    fillDestroyedSquares(points)
    {
        const matrix = this;

        points.forEach(function(point){

            if(matrix.array[point.y][point.x] == null && matrix.array[point.y][point.x] == undefined)
            {
                //moving each square one point down
                for(let global_y = point.y+1; global_y >= 0; global_y--)
                {
                    //blocks fall down
                    for(let local_y = global_y; local_y >= 0; local_y--)
                    {
                        if(matrix.array[local_y-1] != null)
                        {
                            if(matrix.array[local_y] != null && matrix.array[local_y][point.x] != null) break;

                            const upper_square = matrix.array[local_y-1][point.x];

                            if(upper_square != null && upper_square != undefined)
                            {
                                const new_square = matrix.generateRandomSquare(point.x, local_y-1, upper_square.width, [
                                    {color: upper_square.color, sprite: upper_square.sprite}
                                ]);
                                
                                matrix.array[local_y][point.x] = new_square;
                                matrix.array[local_y-1][point.x] = null;

                                //animating
                                const new_squre_destination = matrix.y + (local_y * upper_square.width);
                                gsap.to(new_square, {y: new_squre_destination, duration: matrix.swap_back_time/1000});
                            }
                        }
                    }
                }

                //wait untill all blocks will fall
                setTimeout(function(){

                    for(let global_y = point.y; global_y >= 0; global_y--)
                    {
                        //create new squares
                        if(matrix.array[global_y][point.x] == null)
                        {
                            const new_square = matrix.generateRandomSquare(point.x, global_y-1, matrix.square_width, matrix.square_config);
                            matrix.array[global_y][point.x] = new_square;

                            //animating
                            const new_squre_destination = matrix.y + (global_y * matrix.square_width);
                            gsap.to(new_square, {y: new_squre_destination, duration: matrix.swap_back_time/1000});
                        }
                    }

                }, matrix.swap_back_time);
            }

        });
    }

    checkCombinationsInPoint(point)
    {
        //check x-axis
        let x_combinations = [];
        for(let x = 0; x < this.width; x++)
        {
            const current_square = this.array[point.y][x];
            let current_cell = x_combinations[x_combinations.length-1];

            if(current_cell != undefined && current_cell.color == current_square.color)
            {
                current_cell.points.push(new Point(x, point.y));
            }
            else x_combinations.push({color: current_square.color, points: [new Point(x, point.y)]})
        }

        //check y-axis
        let y_combinations = [];
        for(let y = 0; y < this.height; y++)
        {
            const current_square = this.array[y][point.x];
            let current_cell = y_combinations[y_combinations.length-1];

            if(current_cell != undefined && current_cell.color == current_square.color)
            {
                current_cell.points.push(new Point(point.x, y));
            }
            else y_combinations.push({color: current_square.color, points: [new Point(point.x, y)]})
        }

        //merge arrays
        const matrix = this;
        let combinations = x_combinations.concat(y_combinations).filter(function(cell){
            return cell.points.length >= matrix.minimum_squares_combination && point.inPointsArray(cell.points);
        });

        return combinations;
    }

    getSquare(point)
    {
        if(point.x < this.width && point.y < this.height)
        {
            if(this.array[point.y][point.x] != null) return this.array[point.y][point.x];
        }

        return null;
    }

    swapSquares(point1, point2)
    {
        const square1 = this.array[point1.y][point1.x];
        const square2 = this.array[point2.y][point2.x];

        const square1_color = square1.color; const square2_color = square2.color;
        const square1_sprite = square1.sprite; const square2_sprite = square2.sprite;
        
        this.array[point1.y][point1.x].color = square2_color;
        this.array[point1.y][point1.x].sprite = square2_sprite;

        this.array[point2.y][point2.x].color = square1_color;
        this.array[point2.y][point2.x].sprite = square1_sprite;
    }

    render(canvas_context)
    {
        console.log(9);
        for(let y = 0; y < this.height; y++)
        {
            for(let x = 0; x < this.width; x++)
            {
                if(this.array[y][x] != null)
                {
                    this.array[y][x].render(canvas_context);
                }
            }
        }
    }
}