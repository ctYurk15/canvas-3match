class Point
{
    constructor(x, y)
    {
        this.x = x; 
        this.y = y;
    }
    
    distanceFrom(point)
    {
        const square_dist = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
        return Math.pow(square_dist, 0.5);
    }
}