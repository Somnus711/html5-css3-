function draw(id)
{  
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false; 
    let context = canvas.getContext('2d');
    context.globalCompositeOperation ="darken";
    
    let image = new Image(); 
    image.src = "bg.jpg"; 
    image.onload = function() 
    {  
        context.drawImage(image,0,0);    
        let image2 = new Image(); 
        image2.src = "person.jpg";         
        image2.onload = function() 
        {  
            context.drawImage(image2,0,0);        
        };   
    };     
}





         
