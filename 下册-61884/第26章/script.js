window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB ||  
window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||  
window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange|| window.webkitIDBKeyRange || 
window.msIDBKeyRange;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;	
const dbName = 'MyData'; //数据库名
const dbVersion = 20150504; //版本号
let idb,datatable; 
function window_onload(){
    datatable=document.getElementById("datatable");
    let dbConnect = indexedDB.open(dbName, dbVersion); //连接数据库
 
    dbConnect.onsuccess = function(e){//连接成功    
        idb = e.target.result; //获取数据库 
        alert('数据库连接成功');
        let tx = idb.transaction(['orders'],"readonly");
        let store = tx.objectStore('orders'); 
        let req = store.count();
        req.onsuccess = function(){
            if(this.result==0) readDataFromServer();
            else showAllData(true);         
        }
        
    };
    dbConnect.onerror = function(){
        alert('数据库连接失败');
    };	
    dbConnect.onupgradeneeded = function(e){        
        idb = e.target.result;
        if(!idb.objectStoreNames.contains('orders'))
        {
            let tx = e.target.transaction;
            tx.oncomplete = function(){
                showAllData(true);
            }        
            tx.onabort = function(e){
                alert('对象仓库创建失败');
            };
            let name = 'orders';
            let optionalParameters = {
                keyPath: 'id',
                autoIncrement: true
            };
            let store = idb.createObjectStore(name,  optionalParameters);
            alert('对象仓库创建成功');
            name =  'codeIndex';
            let keyPath = 'code';
            optionalParameters = {
                unique: true,
                multiEntry: false 
            }; 
            let idx = store.createIndex(name, keyPath, optionalParameters);
            alert('索引创建成功');  
        }  
    };
    if(localStorage.currentData){
        readFormLocalStorage(JSON.parse(localStorage.currentData));
    }
}
function tbxCountPrice_onblur(elem)
{
    const count=parseInt(document.getElementById("tbxCount").value);
    const price=parseFloat(document.getElementById("tbxPrice").value);
    if (isNaN(count*price))
    {
        elem.value="0";
        document.getElementById("tbxMoney").value="0";
    }
    else
        document.getElementById("tbxMoney").value=count * price;
}
function btnAdd_onclick()
{
    let data=new Object();
    data.code=document.getElementById("tbxCode").value;
    data.date=document.getElementById("tbxDate").value;
    data.goodsCode=document.getElementById("tbxGoodsCode").value;
    data.brand=document.getElementById("tbxBrand").value;
    data.count=document.getElementById("tbxCount").value;
    data.price=document.getElementById("tbxPrice").value;
    data.person=document.getElementById("tbxPerson").value;
    data.email=document.getElementById("tbxEmail").value;
    let tx = idb.transaction(['orders'],"readwrite"); 
    let chkErrorMsg="";
    tx.oncomplete = function(){
        if(chkErrorMsg!="")
            alert(chkErrorMsg);
        else{
            alert('追加数据成功');
            showAllData(false); 
            btnNew_onclick(); 
        }
    }
    tx.onabort = function(){alert('追加数据失败'); }
    let store = tx.objectStore('orders');
    let idx = store.index('codeIndex');
    let req = idx.count(data.code);
    req.onsuccess = function(){
        let count = this.result;
        if(count>0){       
            chkErrorMsg="输入的订单编号在数据库中已存在!";
        }
        else{
            store.put(data); 
        }
    }
    req.onerror = function(){
        alert('追加数据失败');
    }   
}
function btnUpdate_onclick()
{
    let data=new Object();
    data.code=document.getElementById("tbxCode").value;
    data.date=document.getElementById("tbxDate").value;
    data.goodsCode=document.getElementById("tbxGoodsCode").value;
    data.brand=document.getElementById("tbxBrand").value;
    data.count=document.getElementById("tbxCount").value;
    data.price=document.getElementById("tbxPrice").value;
    data.person=document.getElementById("tbxPerson").value;
    data.email=document.getElementById("tbxEmail").value;
    let tx = idb.transaction(['orders'],"readwrite"); 
    tx.oncomplete = function(){
        alert('修改数据成功');
        showAllData(false); 
    }
    tx.onabort = function(){alert('修改数据失败'); }
    let store = tx.objectStore('orders');
    let idx = store.index('codeIndex');
    let range = IDBKeyRange.only(data.code);
    const direction ="next"; 
    let req = idx.openCursor(range, direction);
    req.onsuccess = function(){
        let cursor = this.result;
        if(cursor){       
            data.id=cursor.value.id;
            cursor.update(data); 
        }        
    }
    req.onerror = function(){
        alert('修改数据失败');
    }   
}
function btnDelete_onclick()
{
    let tx = idb.transaction(['orders'],"readwrite"); 
    tx.oncomplete = function(){
        alert('删除数据成功');
        showAllData(false);
        btnNew_onclick(); 
    }
    tx.onabort = function(){alert('删除数据失败'); }
    let store = tx.objectStore('orders');
    let idx = store.index('codeIndex');
    let range = IDBKeyRange.only(document.getElementById("tbxCode").value);
    const direction = "next"; 
    let req = idx.openCursor(range, direction);
    req.onsuccess = function(){
        let cursor = this.result;
        if(cursor){       
            cursor.delete(); 
        }        
    }
    req.onerror = function(){
        alert('删除数据失败');
    }     
}
function btnNew_onclick()
{
    document.getElementById("form1").reset();
    document.getElementById("tbxCode").removeAttribute("readonly");
    document.getElementById("btnAdd").disabled="";
    document.getElementById("btnUpdate").disabled="disabled";
    document.getElementById("btnDelete").disabled="disabled";
}
function btnClear_onclick()
{
    document.getElementById("tbxDate").value="";
    document.getElementById("tbxGoodsCode").value="";      
    document.getElementById("tbxBrand").value="";
    document.getElementById("tbxCount").value="0";
    document.getElementById("tbxPrice").value="0";
    document.getElementById("tbxMoney").value="0";
    document.getElementById("tbxPerson").value="";
    document.getElementById("tbxEmail").value="";
}
function btnSubmit_onclick(){
    let tx = idb.transaction(['orders'],"readonly"); //开启事务
    let store = tx.objectStore('orders');
    let req = store.getAll();
    req.onsuccess = function(){
        let goods = this.result;
        fetch('/test.php', {
            method:"post",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(goods)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response =>{         
            let str="您提交的商品为:\n";
            for(let good of response){
                str+="订单编号:"+good.code+"\n";
                str+="订单日期:"+good.date+"\n";
                str+="商品编号:"+good.goodsCode+"\n";
                str+="商标:"+good.brand+"\n";
                str+="数量:"+good.count+"\n";
                str+="单价:"+good.price+"\n";
                str+="负责人:"+good.person+"\n";
                str+="Email:"+good.email+"\n";
            }  
            console.log(str); 
        });
    }
    req.onerror = function(){
        alert('检索数据失败');
    } 
}
function btnSaveCurrent_onclick(){
    let data=new Object();
    data.Code=document.getElementById("tbxCode").value;
    data.Date=document.getElementById("tbxDate").value;
    data.GoodsCode=document.getElementById("tbxGoodsCode").value;
    data.Brand=document.getElementById("tbxBrand").value;
    data.Count=document.getElementById("tbxCount").value;
    data.Price=document.getElementById("tbxPrice").value;
    data.Money=document.getElementById("tbxMoney").value;
    data.Person=document.getElementById("tbxPerson").value;
    data.Email=document.getElementById("tbxEmail").value;
    localStorage.currentData=JSON.stringify(data);
}
function tr_onclick(tr,i)
{
    document.getElementById("tbxCode").value=tr.children.item(0).innerHTML;
    document.getElementById("tbxDate").value=tr.children.item(1).innerHTML;
    document.getElementById("tbxGoodsCode").value=tr.children.item(2).innerHTML;      
    document.getElementById("tbxBrand").value=tr.children.item(3).innerHTML;
    document.getElementById("tbxCount").value=tr.children.item(4).innerHTML;
    document.getElementById("tbxPrice").value=tr.children.item(5).innerHTML;
    document.getElementById("tbxMoney").value=tr.children.item(6).innerHTML;
    document.getElementById("tbxPerson").value=tr.children.item(7).innerHTML;
    document.getElementById("tbxEmail").value=tr.children.item(8).innerHTML;
    document.getElementById("tbxCode").setAttribute("readonly",true);
    document.getElementById("btnAdd").disabled="disabled";
    document.getElementById("btnUpdate").disabled="";
    document.getElementById("btnDelete").disabled="";
}
function showAllData(loadPage) 
{  
    if(!loadPage)
        removeAllData();
    let tx = idb.transaction(['orders'],"readonly"); //开启事务
    let store = tx.objectStore('orders');
    let req = store.getAll();
    let i=0;
    req.onsuccess = function(){
        let goods = this.result;
        for(let good of goods){
            i+=1;
            showData(good,i); 
        }
    }
    req.onerror = function(){
        alert('检索数据失败');
    } 
}
function removeAllData()
{  
    for (let i =datatable.childNodes.length-1; i>1; i--) 
        datatable.removeChild(datatable.childNodes[i]);  
}  
function showData(row,i) 
{ 
    let tr = document.createElement('tr');
    tr.setAttribute("onclick","tr_onclick(this,"+i+")");
    let td1 = document.createElement('td');  
    td1.innerHTML = row.code;  
    let td2 = document.createElement('td');  
    td2.innerHTML = row.date;  
    let td3 = document.createElement('td');  
    td3.innerHTML = row.goodsCode;   
    let td4 = document.createElement('td');  
    td4.innerHTML = row.brand; 
    let td5 = document.createElement('td');  
    td5.innerHTML = row.count; 
    let td6 = document.createElement('td');  
    td6.innerHTML = row.price; 
    let td7 = document.createElement('td');  
    td7.innerHTML = parseInt(row.count)*parseFloat(row.price); 
    let td8 = document.createElement('td');  
    td8.innerHTML = row.person; 
    let td9= document.createElement('td');  
    td9.innerHTML = row.email; 
    tr.appendChild(td1);  
    tr.appendChild(td2);  
    tr.appendChild(td3);  
    tr.appendChild(td4); 
    tr.appendChild(td5); 
    tr.appendChild(td6); 
    tr.appendChild(td7); 
    tr.appendChild(td8);
    tr.appendChild(td9);
    datatable.appendChild(tr);
}  

function readFormLocalStorage(data){
    document.getElementById("tbxCode").value=data.Code;
    document.getElementById("tbxDate").value=data.Date;
    document.getElementById("tbxGoodsCode").value=data.GoodsCode;
    document.getElementById("tbxBrand").value=data.Brand;
    document.getElementById("tbxCount").value=data.Count;
    document.getElementById("tbxPrice").value=data.Price;
    document.getElementById("tbxMoney").value=data.Money;
    document.getElementById("tbxPerson").value=data.Person;
    document.getElementById("tbxEmail").value=data.Email;
}
function readDataFromServer(){
    fetch("/goods.json")
    .then( 
        function(response){
            if(response.status!=200){
                alert("读取商品信息时发生网络错误");
                return;
            }
            response.json().then(function(data){
                let tx = idb.transaction(['orders'],"readwrite"); 
                tx.onabort = function(){alert('追加数据失败'); }
                tx.oncomplete= function(e){showAllData(true); };
                let store = tx.objectStore('orders');
                for(let c of data){
                    store.put(c);
                }
            });
        })
    .catch(function(err){
        alert("读取商品信息时发生网络错误:"+err.message);
    });	
}
