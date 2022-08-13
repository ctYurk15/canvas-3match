class Matrix extends GameObject
{
    array = [];
    can_swap = true;

    constructor(x, y, matrix_width, matrix_height, minimum_squares_combination, swap_back_time)
    {
        super(x, y);

        this.width = matrix_width;
        this.height = matrix_height;
        this.minimum_squares_combination = minimum_squares_combination;
        this.swap_back_time = swap_back_time;
    }

    generateRandomSquare(x, y, square_width, square_colors)
    {
        const square_x = this.x + (x * square_width);
        const square_y = this.y + (y * square_width);
        const square_color = square_colors[getRandomInt(0, square_colors.length)];

        return new Square(square_x, square_y, square_width, square_color);
    }

    regenerateArray(square_width, square_colors)
    {
        //clear old state
        this.array = getEmpty2dArray(this.width, this.height);

        //generating matrix
        for(let y = 0; y < this.height; y++)
        {
            for(let x = 0; x < this.width; x++)
            {
                const square = this.generateRandomSquare(x, y, square_width, square_colors);
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

        //if nothing`s changed, swap back
        if(point1_result.length == 0 && point2_result.length == 0)
        {
            this.can_swap = false;

            const matrix = this;
            const timeout = setTimeout(function(){

                matrix.swapSquares(point1, point2);
                matrix.can_swap = true;
                clearTimeout(timeout);

            }, matrix.swap_back_time)
        }
        else
        {
            let squares_count = 0;
            let unique_points = [];

            const matrix = this;
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

            console.log(squares_count, unique_points);
        }
    }

    fillDestroyedSquares(points)
    {

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
        const square1 = structuredClone(this.array[point1.y][point1.x]);
        const square2 =  structuredClone(this.array[point2.y][point2.x]);
        
        this.array[point1.y][point1.x].color = square2.color;
        this.array[point2.y][point2.x].color = square1.color;
    }

    render(canvas_context)
    {
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