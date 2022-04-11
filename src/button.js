import * as PIXI from 'pixi.js'
class PlayButton{
    constructor(settings,container){
        this.scale= 0;
        this.container  = new PIXI.Container();
        this.blur = new PIXI.filters.BlurFilter()
        this.container.on('pointerdown', ()=>{
            window.state =  "game"
            this.container.interactive= false;
            window.animation = false;
            window.emitter.emit('goPlay')
            this.text.filters = [this.blur];
        });
        this.container.interactive = true;
        this.text = new PIXI.Text(
            "Play",
            {
                fontSize: 24,
                fill: 0xed0d0d,
            }
        );
        this.text.x = settings.width/2;
        this.text.y = settings.height - 60;
        this.text.anchor.set(0.5);

        this.background  =  new PIXI.Graphics();
        this.background.beginFill(0xffffff);
        this.background.drawRect(0,0,200,50);
        this.background.endFill();
        this.background.x = settings.width/2;
        this.background.y = settings.height - 60;
        this.background.pivot.set(this.background.width/2, this.background.height/2)
        this.render = ()=>{
            container.addChild(this.container);
            this.container.addChild(this.background)
            this.container.addChild(this.text)
            
        }
        this.reset = ()=>{
            this.text.filters = []
            this.container.interactive = true;
            window.animation = true;
        }
        window.emitter.on('restart',this.reset)
        window.emitter.on('set_update',this.reset)
        
    }

}

export let button = PlayButton;