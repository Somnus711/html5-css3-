function draw(id) 
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    context.beginPath();  
    context.moveTo(150,20);
    context.arcTo(150,100,50,20,30);
    context.stroke();  
}




