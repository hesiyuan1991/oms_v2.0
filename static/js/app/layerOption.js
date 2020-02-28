/**
 * Created by Sean.
 */
//layer 统一配置
layer.config({
    anim: 0, //默认动画风格
    resize: false
});


let openLayer = function (option) {

    if(option.title){
        option.content.find('.layer_title').remove();
        $('<h3 class="layer_title">'+ option.title +'</h3>').prependTo(option.content);
    }

    if(option.filter){
        option.content.siblings('section').addClass('filter');
    }


    let index =layer.open({
        skin: 'layui-layer-diy',
        type: 1,
        title: false,
        shade:option.shade&&0.3,
        area:option.area,
        shadeClose: true, //遮罩关闭 与filter互斥 请勿同时为true
        closeBtn: 0,
        content: option.content,
        success: function(){
        },
        end : function(){
        }
    });

    return index
};

let closeLayer = function (index) {

    layer.close(index);
    $('.filter').removeClass('filter');
    //如果你想关闭最新弹出的层，直接获取layer.index即可
    // layer.close(layer.index);
};