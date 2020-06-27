﻿function draw(id) 
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    context.fillStyle = "#EEEEFF";  
    context.fillRect(0, 0, 400, 300);  
    for(var i = 0; i < 10; i++) 
    {  
        context.beginPath();  
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);  
        //context.ellipse(i * 25, i * 25, i * 10,i * 20,30,0, Math.PI * 2,true);  
        context.closePath();  
        context.fillStyle = 'rgba(255, 0, 0, 0.25)';  
        context.fill();  
    }     
}

