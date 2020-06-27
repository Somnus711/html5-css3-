onconnect = function(e) {
   let port = e.ports[0];
   port.postMessage('你好');
}
