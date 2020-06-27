onmessage = function(event) 
{
    let num = event.data;
    let result = 0;
    for (let i = 0; i <= num; i++) 
result += i;
    //向线程创建源送回消息
    postMessage(result);
}
