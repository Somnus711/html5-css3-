function saveStorage(id)
{
    let data = document.getElementById(id).value;
    let time = new Date().getTime();
    localStorage.setItem(time,data);
    alert("数据已保存。");
    loadStorage('msg');
}
function loadStorage(id)
{
    let result = '<table border="1">';
    for(let i = 0;i < localStorage.length;i++)
    {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let date = new Date();
        date.setTime(key);
        let datestr = date.toGMTString();
        result += '<tr><td>' + value + '</td><td>' + datestr + '</td></tr>';
    }
    result += '</table>';
    let target = document.getElementById(id);
    target.innerHTML = result;
}
function clearStorage()
{
    localStorage.clear();
    alert("全部数据被清除。");
    loadStorage('msg');
}
