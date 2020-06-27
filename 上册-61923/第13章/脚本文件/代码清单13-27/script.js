function draw(id)
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false; 
    let context = canvas.getContext('2d');
    let image = new Image(); 
    image.src = "sl.jpg"; 
    image.onload = function () 
    {
       context.drawImage(image, 0, 0);
       let imagedata = context.getImageData(0,0,image.width,image.height);        
       for (let i = 0, n = imagedata.data.length; i < n; i += 4) 
      {
	       imagedata.data[i+0] = 255 - imagedata.data[i+0]; // red
	       imagedata.data[i+1] = 255 - imagedata.data[i+2]; // green
	       imagedata.data[i+2] = 255 - imagedata.data[i+1]; // blue
      }
      context.putImageData(imagedata, 0, 0);
    };      
}
