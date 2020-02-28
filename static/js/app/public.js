$(function () {
    localTime();
    progressBar();
    tableCheckBox();
    navTree();
});
function showMenu() {
    $(this).next(".menuContent").slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
}


//ztree点击文字选中
function beforeClick(treeId, treeNode) {
    let zTree = $.fn.zTree.getZTreeObj(treeId);
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}
//ztree选中后input回显
function onCheck(e, treeId, treeNode) {
    let parent = "#" + treeId ;

    let zTree = $.fn.zTree.getZTreeObj(treeId),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    for (let i=0, l=nodes.length; i<l; i++) {
        v += nodes[i].name + ",";
    }
    if (v.length > 0 ) v = v.substring(0, v.length-1);
    let Ipt = $(parent).parent().siblings('.openTree');
    Ipt.attr("value", v);
}

function showMenu() {
    $(this).next(".menuContent").slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
    $(".menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
    if (!( event.target.class == "openTree" || event.target.class == "menuContent" || $(event.target).parents(".menuContent").length>0)) {
        hideMenu();
    }
}

//侧边栏事件
function navTree() {
    $('aside').on('click','.tree>li>p',function () {
        let active = !$(this).hasClass('active'),
            $ol = $(this).next();

        if(active){
            $(this).addClass('active');
            $ol.slideDown(200)
        }else{
            $(this).removeClass('active');
            $ol.slideUp(200)
        }
    });

    $('body').on('click','.slideBtn',function () {
        let active = !$(this).hasClass('active');
        if(active){
            $(this).addClass('active').parent('aside').addClass('active').siblings('.right_part').addClass('active');

        }else{
            $(this).removeClass('active').parent('aside').removeClass('active').siblings('.right_part').removeClass('active');
        }
    })
}

function tabFn(){
    $(this).addClass('active').siblings().removeClass('active');
}
function toggleSelfFn(){
    $(this).toggleClass('active');
}

//bar类型进度条  根据span里的值定义宽度
let progressBar = () => {
    $('.progress').each(function () {
        var $wdith = $(this).parent().find('.per').text();
        $(this).find('.base').css('width',$wdith)
    })
};

let tableCheckBox =()=>{

    $('body').on('click','.table .checkBox',function (event) {
        event.stopPropagation();

        let $parent = $(this).closest('.table');
        $(this).toggleClass('active');

        //选项单击后 全选状态
        if($parent.find('.checkBox.active').length === $parent.find('.checkBox').length){
            $parent.find('.checkBoxAll').addClass('active');
        }else{
            $parent.find('.checkBoxAll').removeClass('active');
        }
    });

    $('body').on('click','.table .checkBoxAll',function (event) {
        event.stopPropagation();
        var $checkParent = $(this).parents('tr').siblings('tr');
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $checkParent.find('.checkBox').removeClass('active');
        }else{
            $(this).addClass('active');
            $checkParent.find('.checkBox').addClass('active');
        }
    });
};


//获取本地时间
let localTime = () => {
    $('.dutyWrap .time').html(formatDateTime(new Date(), "HH:mm:ss"));

    //一秒刷新一次显示时间
    setTimeout(localTime, 1000);
};

let formatDateTime = (date,fmt)=> {

    if(!(date instanceof Date)){
        if(typeof date == "number" && !isNaN(date)){  //date 也可以为long类型 时间戳
            date = new Date(date);
        }else {
            return "";
        }
    }

    fmt = fmt || "yyyy-MM-dd HH:mm:ss";
    var o = {
        "M+" : date.getMonth()+1, //月份
        "d+" : date.getDate(), //日
        "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
        "H+" : date.getHours(), //小时
        "m+" : date.getMinutes(), //分
        "s+" : date.getSeconds(), //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S" : date.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "\u65e5",
        "1" : "\u4e00",
        "2" : "\u4e8c",
        "3" : "\u4e09",
        "4" : "\u56db",
        "5" : "\u4e94",
        "6" : "\u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};
