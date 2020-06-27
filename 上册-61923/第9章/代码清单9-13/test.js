onconnect = function(e) {
   let port = e.ports[0];
   port.onmessage = function(e) {
     port.postMessage(e.data*e.data);
   }
}
