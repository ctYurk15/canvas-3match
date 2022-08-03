class GameObject
{
    id = 0;
    paralax_force = 0;
    paralax_scroll = 0;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    draw(canvas_context)
    {
        // ...
    }

    render(canvas_context)
    {
        canvas_context.beginPath();
        this.draw(canvas_context);
        canvas_context.fill();
    }

    onDelete(event_name)
    {

    }
}