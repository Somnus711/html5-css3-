﻿function draw(id) 
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    let path1=new Path2D();    
    path1.rect(10,10,100,100);
    var path2=new Path2D(path1);
    path2.moveTo(220,60);
    path2.arc(170,60,50,0,2*Math.PI);
    context.stroke(path2);
}




