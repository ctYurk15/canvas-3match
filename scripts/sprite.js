class Sprite
{
    current_frame = 0;
    animation_interval = null;

    constructor(image, frames, frame_time, crop_width, crop_height, width_multiplier = 1)
    {
        this.image = image;
        this.frames = frames-1;
        this.frame_time = frame_time;
        this.crop_width = crop_width;
        this.crop_height = crop_height;
        this.width_multiplier = width_multiplier;

        if(this.frames > 0)
        {
            this.startAnimation();
        }
    }

    draw(canvas_context, x, y, width, height)
    {
        canvas_context.drawImage(this.image, this.crop_width*this.current_frame, 0, this.crop_width,  this.crop_height, x, y, width * this.width_multiplier, height);
    }

    stopAnimation()
    {
        if(this.animation_interval != null) 
        {
            clearInterval(this.animation_interval);
            this.animation_interval = null;
        }
    }

    startAnimation()
    {
        if(this.animation_interval == null)
        {
            const self = this;
    
            this.animation_interval = setInterval(function(){
                self.current_frame++;
                if(self.current_frame > self.frames) self.current_frame = 0;
            }, self.frame_time);
        }
    }
}