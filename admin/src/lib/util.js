let util = {

};

//时间戳转换日期字符串
function add(m){return m<10?'0'+m:m };
util.format = function(t) {
    var time = new Date(t);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add(m)+'-'+add(d)+' '+add(h)+':'+add(mm)+':'+add(s);
};
//延迟执行函数 参数(函数,时间[毫秒])
util.lazy=function(func,m){
    if(m==undefined) m=1000;
    setTimeout(() => {
        func();
    }, m);
}
//集合自动排序 参数(集合对象[必须包含sort字段])
util.sort=function(lst){
    util.lazy(()=>{
        lst = lst.sort(function (a, b) {return a.sort - b.sort;});
    },200);
}

export default util; 