onmessage = function(event) {
let intArray=new Array(100);    
for(let i=0;i<100;i++)
    intArray[i]=parseInt(Math.random()*100);
postMessage(JSON.stringify(intArray));
close();
}

