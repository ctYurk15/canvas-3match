class GameObject extends Point
{
    id = 0;
    paralax_force = 0;
    paralax_scroll = 0;
    tag = '';

    constructor(x, y)
    {
        super(x, y);
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