import * as PIXI from 'pixi.js'
class Message{
    constructor(settings,app){
        this.scale= 0;
        this.container  = new PIXI.Container();
        this.text = new PIXI.Text(
            window.message,
            {
                fontSize: 24,
                fill: 0x1010ff,
            }
        );
        this.text.x = settings.width/2;
        this.text.y = (settings.height -80) /2 ;
        this.text.anchor.set(0.5);

        this.background  =  new PIXI.Graphics();
        this.background.beginFill(0xfcff4d);
        this.background.drawRect(0,0,150,150);
        this.background.endFill();
        this.background.x = settings.width/2;
        this.background.y = (settings.height - 80) /2 ;
        this.background.pivot.set(this.background.width/2, (this.background.height ) /2)
        this.render = ()=>{
            app.stage.addChild(this.container);
            this.container.addChild(this.background)
            this.container.addChild(this.text)
            
        }
        
    }
    setScale(){
        this.speed = 0.02;
        if(window.message == "bonus"){
            this.speed = 0.01
        }
        this.scale += this.speed
        this.text.scale.x = this.scale;
        this.text.scale.y = this.scale;
    }
    close(){
        this.container.parent.removeChild(this.container);
    }
}

export let message = Message;