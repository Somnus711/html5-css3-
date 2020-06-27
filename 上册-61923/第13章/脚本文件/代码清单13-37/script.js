function draw(id)
{

    let canvas=document.getElementById(id);
    let context=canvas.getContext("2d");
    let worker = new Worker("worker.js");
    worker.postMessage('sl.jpg');
    worker.onmessage = (evt) => {
        if (evt.data.err)
            console.log(evt.data.message);
        context.drawImage(evt.data.imageBitmap,0,0);
    };
}
