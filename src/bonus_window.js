import * as PIXI from 'pixi.js'
class BonusWindow{
    constructor(settings,app){
        this.scale= 0;
        this.container  = new PIXI.Container();
        this.text = new PIXI.Text(
            "Win Amount 1000$",
            {
                fontSize: 36,
                fill: 0xe110da,
            }
        );
        this.text.x = settings.width/2;
        this.text.y = settings.height - 120;
        this.text.anchor.set(0.5);

        this.render = ()=>{
            app.stage.addChild(this.container);
            this.container.addChild(this.text)
            
        }
        
    }
}

export let bonusWindow = BonusWindow;