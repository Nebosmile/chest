console.log("Hello World1!");

import * as PIXI from 'pixi.js'
const Chest = require('./chest.js').chest
const Message = require('./message.js').message
const Button = require('./button.js').button
const BonusWindow = require('./bonus_window.js').bonusWindow
const Emitter = require("events");

require("./form_control.js")

let emitter = new Emitter();
window.emitter =emitter

window.animation = true;
window.opened = 0;




let messageWindow;


let width = 640,
    height = 360,
    line = 2,
    column = 3,
    margin_bottom = 100,
    coefficient = 0.625,//how much % of the height are the chests 62.5% 
    box_height, 
    box_width,
    width_step,
    height_step

function updateSizes(){
    window.maxOpened = line * column;
    box_height = (height - margin_bottom) * coefficient/line;
    box_width = box_height;
    width_step = (width - box_width *column)/(column+1);
    height_step = (height - margin_bottom - box_height *line)/(line+1);
}
updateSizes()




const app = new PIXI.Application({width, height});

document.body.appendChild(app.view);


app.loader
    .add('spritesheet', './boxes/open.json')
    .load(onAssetsLoaded);



function onAssetsLoaded(loader, resources) {

    let game_container  = new PIXI.Container();


    app.stage.addChild(game_container)

    let chest_arr = [];
    function generateChestSettings(){
        for(let i=0; i < line; i++ ){
            for(let b=0; b < column; b++ ){
                let new_chest = {
                    x: width_step*(b+1) + box_width * b,
                    y: height_step*(i+1) + box_height * i,
                    width: box_width,
                    height: box_height,
                    type:randomInteger(1,3)  // 1-loose/2-win/3bonus
                }
                chest_arr.push(new_chest)
    
            }
        }
    }
    generateChestSettings()

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
      

    function generateChest(){
        let painted_chests =[]
        chest_arr.forEach((set_one)=>{
            let chest_obj = new Chest(set_one, resources, game_container);
            painted_chests.push(chest_obj);
        })
        return painted_chests
    }
    let painted_chest = generateChest()
    function showChest(){
        painted_chest.forEach(elem => {
            elem.render()
        });
    }
    showChest()

    let button = new Button({width,height},game_container)
    button.render()
    let bonus = new BonusWindow({width,height},app)


    emitter.on('message', function(message){
        let settings ={
            width:width,
            height:height
        }
        window.message = message;
        if(message == 'win' || message == 'loss'){
            messageWindow = new Message(settings,app)
            messageWindow.render()
        }
        if(message == "bonus"){
            app.stage.removeChildren()
            messageWindow = new Message(settings,app)
            messageWindow.render()
            bonus.render()
        }

    });
    function Restart(){
        window.emitter.removeAllListeners('goPlay');
        window.opened = 0;
        chest_arr = [];
        generateChestSettings()
        game_container.removeChildren()
        app.stage.removeChildren()
        app.stage.addChild(game_container)
        painted_chest = generateChest()
        showChest()
        button.render()
    }
    emitter.on('set_update',(data)=>{
        column = Number(data.column);
        line = Number(data.lines);
        updateSizes()
        Restart()
    })

    emitter.on('restart',Restart)


    app.ticker.add(() => {
        if(messageWindow  &&   messageWindow.scale >=2){
            messageWindow.close();
            if(window.message == "bonus"){
                app.stage.removeChildren()
                app.stage.addChild(game_container)
            }
            messageWindow = undefined;
            window.animation = false;
            window.opened +=1;
            if(window.opened == window.maxOpened){
                window.emitter.emit('restart') 
            }
        }else  if( messageWindow && messageWindow.scale < 2){
            messageWindow.setScale();
        }

      });
      
  
}