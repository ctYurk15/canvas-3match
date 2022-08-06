class Square extends Rectangle
{
    selected = false;

    constructor(x, y, width, color)
    {
        super(x, y, width, width, color);
    }

    render(canvas_context)
    {
        canvas_context.beginPath();
        this.draw(canvas_context);
        canvas_context.fill();

        if(this.selected)
        {
            canvas_context.beginPath();
            canvas_context.rect(this.x, this.y, this.width, this.width);
            canvas_context.fillStyle =  'rgba(10, 10, 10, 0.5)';
            canvas_context.fill();
        }
    }

    select()
    {
        this.selected = true;
    }

    unselect()
    {
        this.selected = false;
    }
}