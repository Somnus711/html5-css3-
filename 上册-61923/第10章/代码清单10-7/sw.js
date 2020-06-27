//为安装设置回调函数
self.addEventListener("install",function(event){
    //执行安装过程
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            //缓存我们想要缓存的文件
            return cache.addAll([
                 '/',
                 '/index.html',
                 '/styles/main.css',
                 '/script/main.js',
                 '/fallback.html'
            ]);
        }).then(function() {
                console.log('所有资源被成功缓存');
            }).catch(function(error) {
            console.log('预抓取失败:', error);
        })
    );
});

self.addEventListener('fetch', function(event) {
  if(event.request.url=="http://localhost/test.html"){
      event.respondWith(caches.match('/fallback.html'));
  }
  else{
      event.respondWith(
          caches.match(event.request).then(function(resp) {
              return resp || fetch(event.request).then(function(response) {
                  return caches.open('v1').then(function(cache) {
                      cache.put(event.request, response.clone());
                      return response;
                  }); 
              });
        }).catch(function() {
            return caches.match('/fallback.html'); 
        })
      );
  }
});