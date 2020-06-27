//为安装设置回调函数
self.addEventListener("install",function(event){
    //执行安装过程
    event.waitUntil(
        caches.open('v2').then(function(cache) {
            //缓存我们想要缓存的文件
            return cache.addAll([
                 '/',
                 '/index.html',
                 '/styles/main.css'
            ]);
        }).then(function(){
            caches.open('v3').then(function(cache) {
                //缓存我们想要缓存的文件
                return cache.addAll([
                     '/script/main.js',
                     '/fallback.html'
                ]);
            });
       }).then(function() {
                console.log('所有资源被成功缓存');
            }).catch(function(error) {
            console.log('预抓取失败:', error);
        })
    );
});
self.addEventListener("activate",function(event){
    let cacheWhitelist=["v2","v3"];
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheWhitelist.indexOf(cacheName)===-1){
                        console.log(cacheName+"缓存被删除");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});