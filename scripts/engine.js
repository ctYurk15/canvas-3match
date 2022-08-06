class Engine
{
    game_objects = [];
    keys = {};
    button_actions = [];
    release_button_actions = [];
    frame_actions = [];
    is_working = false;
    paused = false;
    next_id = 1;

    constructor(canvas, background)
    {
        this.canvas = canvas;
        this.background = background;
        this.context = canvas.getContext('2d');

        this.registerEvents();
    }

    registerEvents()
    {
        this.checkButtonsPress();
    }

    start()
    {
        this.is_working = true;
        this.registerEvents();
    }

    stop()
    {
        this.is_working = false;
    }

    togglePause(pause_element)
    {
        this.paused = !this.paused;
        if(this.paused) pause_element.classList.remove('hidden');
        else pause_element.classList.add('hidden');
    }

    stopPause(pause_element)
    {
        this.paused = false;
        pause_element.classList.add('hidden');
    }

    addButtonPressEvent(button, action)
    {
        this.button_actions.push({code: button, action: action});
    }

    addButtonReleaseEvent(button, action)
    {
        this.release_button_actions.push({code: button, action: action});
    }

    addFrameAction(action)
    {
        this.frame_actions.push(action);
    }

    render()
    {
        if(this.is_working && !this.paused)
        {
            this.clear();

            const context = this.context;

            this.game_objects.forEach(function(game_object){
                game_object.render(context);
            });

            this.frame_actions.forEach(function(frame_action){
                frame_action();
            });
        }
    }

    clear()
    {
        switch(this.background.constructor.name)
        {
            case 'String':
                this.context.fillStyle = this.background;
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                break;
            case 'Sprite':
                this.background.draw(this.context, 0, 0, this.canvas.width, this.canvas.height);
                break;
        }
    }

    addObject(game_object)
    {
        game_object.id = this.next_id;
        this.next_id++;
        this.game_objects.push(game_object);
        return game_object.id;
    }

    deleteObject(object_id)
    {
        this.game_objects = this.game_objects.filter(function(game_object){
            if(game_object.id == object_id) game_object.onDelete('singleDelete');
            return game_object.id != object_id
        });
    }

    getObjectById(object_id)
    {
        let result = null;

        for(let object of this.game_objects)
        {
            if(object.id == object_id)
            {
                result = object;
                break;
            }
        }

        return result;
    }

    clearObjects()
    {
        this.game_objects.forEach(function(object){
            object.onDelete('clearScene');
        });

        this.game_objects = [];
        this.clear();
    }

    checkButtonsPress()
    {
        const self = this;

        if(this.is_working && !this.paused)
        {
            //press button, check all currently pressed butons
            window.addEventListener('keydown', function(e){

                self.keys[e.code] = true;
                        
                self.button_actions.forEach(function(button_action){
                    
                    if(self.keys[button_action.code])
                    {
                        button_action.action();
                    }
        
                });

            });
    
            //release button, check only one released currently button
            window.addEventListener('keyup', function(e){

                self.keys[e.code] = false;
            
                self.release_button_actions.forEach(function(release_button_action){
                    
                    if(e.code == release_button_action.code)
                    {
                        release_button_action.action();
                    }
        
                });

            });
        }
    }

    paralaxMoveX(speed)
    {
        this.game_objects.forEach(function(game_object){
            let movement = game_object.paralax_force * speed;

            game_object.x += movement;
            game_object.paralax_scroll += movement;
        });
    }

}