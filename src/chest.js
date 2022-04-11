import * as PIXI from 'pixi.js'
class Chest{
    constructor(settings,resources,container){
        this.open_close ="close"
        this.chest_type = (settings.type == 1)? "loss" : (settings.type == 2) ?  "win"  : "bonus"
        this.blur = new PIXI.filters.BlurFilter();
        this.animation_type = (this.chest_type == "loss")? "loss" : "win"
        this.open_texture = resources.spritesheet.data.animations[this.animation_type].map((elem)=>PIXI.Texture.from(elem))
        this.opening = new PIXI.AnimatedSprite(this.open_texture);
        this.opening.filters = [this.blur];
        this.opening.interactive = true;
        this.opening.animationSpeed = 0.1;
        this.opening.loop=false

        this.opening.width = settings.width;
        this.opening.height = settings.height;
        this.opening.x = settings.x;
        this.opening.y = settings.y;

        this.opening.on('pointerdown', this.play.bind(this));
        this.opening.onComplete = ()=>{
            this.state = "open";
            window.emitter.emit('message', this.chest_type) 
        };
        this.render = ()=>{
            container.addChild(this.opening);
        }
        
        window.emitter.on('goPlay',()=>{
            this.opening.filters = []
        })

    }

    setX(x){
        this.opening.x = x;
    }
    eventHandler(){
        
    }
    play(){
        if(!window.animation){
            this.opening.gotoAndPlay (0)
            this.opening.interactive = false;
            window.animation = true;
        }

    }
    // setResurce()

}

export let chest = Chest;