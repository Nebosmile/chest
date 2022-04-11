let lines = document.getElementById('lines')
let column = document.getElementById('column')
let update = document.getElementById('update')

lines.addEventListener('input',(e)=>{
    if(e.target.value < 0){
        e.target.value = 1
    }else if(e.target.value >5){
        e.target.value = 5
    }
})
column.addEventListener('input',(e)=>{
    if(e.target.value < 0){
        e.target.value = 1
    }else if(e.target.value >5){
        e.target.value = 5
    }
    
})

update.addEventListener('click', ()=>{
    console.log(window.state);
    if(!window.animation || window.state ==  "pre_start"){
        
        window.emitter.emit('set_update',{
            lines:lines.value ? lines.value : 2 ,
            column:column.value ?  column.value : 3
        })
    }

})