function draw(id)
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    let gr = context.createLinearGradient(0,400,300,0);  
    gr.addColorStop(0,'rgb(255,255,0)');  
    gr.addColorStop(1,'rgb(0,255,255)');  
    context.fillStyle = gr;  
    context.fillRect(0, 0, 400, 300);  
    image = new Image();  
    image.onload = function()
    {  
        drawImg(context,image);  
    };  
    image.src = "sl.jpg";  
}  

function drawImg(context,image)
{  
    create5StarClip(context);  
    context.drawImage(image,-50,-150,300,300);  
}  

function create5StarClip(context)
{  
    const dx = 100;  
    const dy = 0;  
    const s = 150;  
    context.beginPath();  
    context.translate(100,150);  
    let x = Math.sin(0);  
    let y = Math.cos(0);  
    const dig = Math.PI / 5 * 4;  
    for(let i = 0; i < 5; i++) 
    {  
        x = Math.sin(i * dig);  
        y = Math.cos(i * dig);  
        context.lineTo( dx + x * s,dy + y * s);  
    }  
    context.clip();  
}
