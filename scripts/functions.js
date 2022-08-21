function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getEmpty2dArray(width, height)
{
    let result = [];

    for(let y = 0; y < height; y++)
    {
        result[y] = new Array(width);
    }

    return result;
}