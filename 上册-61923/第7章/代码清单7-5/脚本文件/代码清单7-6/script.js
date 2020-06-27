function saveStorage()
{
    let data = new Object;
    data.name = document.getElementById('name').value;
    data.email = document.getElementById('email').value;
    data.tel = document.getElementById('tel').value;
    data.memo = document.getElementById('memo').value;
    let str = JSON.stringify(data);
    localStorage.setItem(data.name,str);
    alert("数据已保存。");
}
function findStorage(id)
{
    let find = document.getElementById('find').value;
    let str = localStorage.getItem(find);
    let data =  JSON.parse(str);
    let result = "姓名: " + data.name + '<br>';
    result += "EMAIL: " + data.email + '<br>';
    result += "电话号码: " + data.tel  + '<br>';
    result += "备注: " + data.memo + '<br>';
    let target = document.getElementById(id);
    target.innerHTML = result;
}
