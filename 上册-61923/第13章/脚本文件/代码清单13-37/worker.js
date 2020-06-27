onmessage = function(event) {
    fetch(event.data)
    .then(response => response.blob())
    .catch(error => self.postMessage(error))
    .then(response =>{
        createImageBitmap(response,23,5,110,85).then(imageBitmap =>self.postMessage({imageBitmap:imageBitmap}));
    });
}