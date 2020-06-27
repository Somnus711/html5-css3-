function draw(id) 
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    context.fillStyle = "#EEEEFF";  
    context.fillRect(0, 0, 400, 300);  
    context.shadowOffsetX = 10;  
    context.shadowOffsetY = 10;  
    context.shadowColor = 'rgba(100,100,100,0.5)';  
    context.shadowBlur = 7.5;  
    // 图形绘制  
    context.translate(0,50);  
    for(let i = 0;i < 3;i++)
    {  
        context.translate(50,50);  
        create5Star(context);  
        context.fill();  
    }  
}  
function create5Star(context)
{  
    const dx = 100;  
    const dy = 0;  
    const s = 50;  
    //创建路径  
    context.beginPath();  
    context.fillStyle = 'rgba(255,0,0,0.5)';  
    let x = Math.sin(0);  
    let y = Math.cos(0);  
    const dig = Math.PI / 5 * 4;  
    for(let i = 0; i < 5; i++) 
    {  
        x = Math.sin(i * dig);  
        y = Math.cos(i * dig);  
        context.lineTo( dx + x * s,dy + y * s);  
    }     
    context.closePath();  
}
