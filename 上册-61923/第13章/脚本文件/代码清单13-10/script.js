function draw(id) 
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    context.fillStyle = "#EEEEFF";  
    context.fillRect(0, 0, 400, 300); 
    const dx = 150;  
    const dy = 150;  
    const s = 100;  
    context.beginPath();  
    context.globalCompositeOperation ='and';  
    context.fillStyle = 'rgb(100,255,100)';  
    let x = Math.sin(0);  
    let y = Math.cos(0);  
    const dig = Math.PI / 15 * 11;  
    context.moveTo(dx,dy);  
    for(var i = 0; i < 30; i++) 
    {  
        x = Math.sin(i * dig);  
        y = Math.cos(i * dig);  
        context.bezierCurveTo(dx + x * s,dy + y * s - 100,dx + x * s + 100,dy + y * s,dx + x * s,dy + y * s);  
    }     
    context.closePath();  
    context.fill();  
    context.stroke();  
}




