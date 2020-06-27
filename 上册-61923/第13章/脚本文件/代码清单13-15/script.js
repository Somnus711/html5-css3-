function draw(id) 
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    let g1 = context.createLinearGradient(0,0,0,300);  
    g1.addColorStop(0,'rgb(255,255,0)');  
    g1.addColorStop(1,'rgb(0,255,255)');  
    context.fillStyle = g1;  
    context.fillRect(0, 0, 400, 300);  
    let g2 = context.createLinearGradient(0,0,300,0);  
    g2.addColorStop(0,'rgba(0,0,255,0.5)');  
    g2.addColorStop(1,'rgba(255,0,0,0.5)');  
    for(let i = 0; i < 10; i++) 
    {  
        context.beginPath();  
        context.fillStyle = g2;  
        context.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);  
        context.closePath();  
        context.fill();  
    }     
}





