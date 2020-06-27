function draw(id) 
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    let path1=new Path2D("M10 10 h 80 v 80 h -80 Z ");    
    context.fill(path1);
}




