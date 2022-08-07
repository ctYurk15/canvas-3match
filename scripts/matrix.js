class Matrix extends GameObject
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
        const c1 = square1.color;  const c2 = square2.color;

        this.array[point1.y][point1.x] = new Square(square2.x, square2.y, square2.width, square1.color);
        this.array[point2.y][point2.x] = new Square(square1.x, square1.y, square1.width, square2.color);
    }

    render(canvas_context)
    {
        for(let y = 0; y < this.height; y++)
        {
            for(let x = 0; x < this.width; x++)
            {
                this.array[y][x].render(canvas_context);
            }
        }
    }
}