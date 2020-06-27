function draw(id)
{
    fetch('sl.jpg')
    .then(response => response.blob())
    .catch(error => console.error('Error:', error))
    .then(response =>{
        let canvas=document.getElementById(id);
        let context=canvas.getContext("2d");
        createImageBitmap(response,23,5,110,85).then(imageBitmap => context.drawImage(imageBitmap,0,0));
    });
}
