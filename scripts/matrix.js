class Matrix extends Point
{
    array = [];

    constructor(x, y, matrix_width, matrix_height)
    {
        super(x, y);

        this.width = matrix_width;
        this.height = matrix_height;
    }

    regenerateArray(square_width, square_colors, engine)
    {
        //clear old state
        this.array = getEmpty2dArray(this.width, this.height);

        //generating matrix
        for(let y = 0; y < this.height; y++)
        {
            for(let x = 0; x < this.width; x++)
            {
                const square_x = this.x + (x * square_width);
                const square_y = this.y + (y * square_width);
                const square_color = square_colors[getRandomInt(0, square_colors.length)];

                const square = new Square(square_x, square_y, square_width, square_color);
                this.array[y][x] = square;
                engine.addObject(square);
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

    swapSquares(point1, point2)
    {
        let tmp = this.array[point1.y][point1.x].color;
        this.array[point1.y][point1.x].color = this.array[point2.y][point2.x].color;
        this.array[point2.y][point2.x].color = tmp;
    }

    refillGameObjects(engine)
    {
        this.checkSquares(function(square, square_point){
            engine.addObject(square);
        });
    }
}