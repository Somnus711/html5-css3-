function draw(id) 
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;  
    let context = canvas.getContext('2d');  
    context.fillStyle = "#EEEEFF";  
    context.fillRect(0, 0, 400, 300);  
    let image = new Image(); 
    image.src = "sl.jpg";  
    image.onload = function() 
    {  
        drawImg(context,image);  
    };       
}  
function drawImg(context,image)
{  
    for(let i = 0;i < 7;i++)  
       context.drawImage(image,0 + i * 50,0 + i * 25,100,100);  
}
