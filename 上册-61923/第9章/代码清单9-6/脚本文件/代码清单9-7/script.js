onmessage=function(event){
    let intArray=new Array(100);    //随机数组
    //生成100个随机数
    for(let i=0;i<100;i++)
        intArray[i]=parseInt(Math.random()*100);
    let worker;
    //创建子线程
    worker=new Worker("worker2.js");
    //把随机数组提交给子线程进行挑选工作
    worker.postMessage(JSON.stringify(intArray));
    worker.onmessage = function(event) {
        //把挑选结果返回主页面
        postMessage(event.data);
    }
}
