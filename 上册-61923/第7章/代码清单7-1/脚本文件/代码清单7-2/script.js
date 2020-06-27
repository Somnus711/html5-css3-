//sessionStorage示例 
function saveStorage(id)
{  
    let target = document.getElementById(id);  
    let str = target.value;  
    sessionStorage.setItem("message",str); 
    //或sessionStorage.message=str; 
}  
function loadStorage(id)
{  
    let target = document.getElementById(id);  
    let msg = sessionStorage.getItem("message");
    //或const msg=sessionStorage.message;  
    target.innerHTML = msg;  
}  
//localStorage示例 
function saveStorage(id)
{  
    let target = document.getElementById(id);  
    let str = target.value;  
    localStorage.setItem("message",str);
    //或localStorage.message=str;  
}  
function loadStorage(id)
{  
    let target = document.getElementById(id);  
    let msg = localStorage.getItem("message"); 
    //或let msg=localStorage.message;  
    target.innerHTML = msg;  
}

