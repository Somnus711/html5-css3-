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
        drawImg(canvas,context,image);  
    };        
}  
function drawImg(canvas,context,image)
{  
    //平铺比例
    const scale=5
    //缩小后图像宽度
    const n1=image.width/scale;
   //缩小后图像高度
    const n2=image.height/scale;
   //平铺横向个数
    const n3=canvas.width/n1;
   //平铺纵向个数
    const n4=canvas.height/n2;
    for(let i=0;i<n3;i++)
        for(let j=0;j<n4;j++)
         context.drawImage(image,i*n1,j*n2,n1,n2);
}
