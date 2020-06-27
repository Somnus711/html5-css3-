function draw(id) 
{ 
    let canvas = document.getElementById(id);  
    if (canvas == null)  
        return false;   
    let context = canvas.getContext('2d'); 
    context.font = 'italic 20px sans-serif';
    /* 定义绘制文字*/
    const txt = "字符串的宽度为";
    /* 获取文字宽度 */
    let tm1 = context.measureText(txt);
    /* 绘制文字 */
    context.fillText(txt, 10, 30);
    context.fillText(tm1.width, tm1.width+10, 30);
    /* 改变字体 */
    context.font = "bold  30px sans-serif";
    /* 重新获取文字宽度 */
    let tm2 = context.measureText(txt);
    /* 重新绘制文字*/
    context.fillText(txt, 10, 70);
    context.fillText(tm2.width,tm2.width+10, 70);
}
