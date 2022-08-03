class Rectangle extends GameObject
{
    constructor(x, y, width, height, color)
    {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(canvas_context)
    {
        canvas_context.rect(this.x, this.y, this.width, this.height);
        canvas_context.fillStyle = this.color;
    }

    rectangleCollided(object)
    {
        if(this.x + this.width >= object.x 
            && this.x <= object.x + object.width
            && this.y + this.height >= object.y
            && this.y <= object.y + object.height) return true;

        return false;
    }
}