function draw(id)
{  
    let image = new Image();      
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;     
    let context = canvas.getContext('2d'); 
    image.src = "sl.jpg"; 
    image.onload = function()
    {  
        //创建填充样式，全方向平铺
        let ptrn = context.createPattern(image,'repeat'); 
        //指定填充样式
        context.fillStyle = ptrn;  
        //填充画布
        context.fillRect(0,0,400,300);  
    };        
}
