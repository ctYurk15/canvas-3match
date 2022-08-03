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

    pointInRectangle(point_x, point_y)
    {
        console.log(this.x <= point_x, this.x + this.width >= point_x, this.y <= point_y, this.y + this.height >= point_y)
        if(this.x <= point_x 
            && this.x + this.width >= point_x 
            && this.y <= point_y
            && this.y + this.height >= point_y
            ) return true;

        return false;
    }
}