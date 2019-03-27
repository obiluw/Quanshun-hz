
var HHH = $(".report_list").height();



//左导航 收起/全屏
$(".sidebar-collapse >.report").click(function(){

    if($(".sidebar-collapse").hasClass("small-sidebar-collapse")){
        //初始状态
        $(".sidebar-collapse").removeClass("small-sidebar-collapse");
        //level状态下下展开
        $(".report_list > ul > li > div").each(function(){
            if($(this).hasClass("level")){
                $(this).siblings("ul").animate({
                    height: 'toggle', opacity: 'toggle'
                }, 500);
            }
        });
    }
    else{
        $(".divScroll_lg").addClass("hide");
        //全屏状态
        $(".report_list > ul > li > div").each(function(){
            if($(this).hasClass("level")){
                $(this).siblings("ul").animate({
                    height: 'toggle', opacity: 'toggle'
                }, 500);
            }
        });
        $(".sidebar-collapse").addClass("small-sidebar-collapse");
    }
    //右侧主体
    $(".aside").toggleClass("big-aside");
});

//左导航 click
$('.report_list > ul > li >.appsTitle').on('click',function(){
    $(".report_list > ul > li > div").removeClass("active");
    $(this).addClass("active");
    //判断当前 状态：全屏/初始
    if($(".sidebar-collapse").hasClass("small-sidebar-collapse")){
        //全屏下
        $(".sidebar-collapse").removeClass("small-sidebar-collapse");//变初始状态
        //右侧主体
        $(".aside").removeClass("big-aside");

        if( $(this).hasClass("level") ){
            $(".report_li .appsTitle").each(function(){
                if( $(this).hasClass("level")){
                    $(this).siblings('ul').animate({
                        height: 'toggle', opacity: 'toggle'
                    }, 500);
                }
            });
        }else{
            $(this).addClass("level");
            $(".report_li .appsTitle").each(function(){
                if( $(this).hasClass("level")){
                    $(this).siblings('ul').animate({
                        height: 'toggle', opacity: 'toggle'
                    }, 500);
                }
            });
        }


    }
    else{
        //初始状态下
        if( $(this).hasClass("level") ){

            $(this).siblings('ul').animate({
                height: 'toggle', opacity: 'toggle'
            }, 500);
            $(this).removeClass("level");

        }else{
            if( $(this).parent().children().is("ul") ){
                $(this).addClass("level");
            }
            $(this).siblings('ul').animate({
                    height: 'toggle', opacity: 'toggle'
            }, 500);


        };
    }


})
    //二级
    $('.report_li .appsInner > li >.appsTitle').on('click',function(){

    if( $(this).hasClass("active") ){
        $(this).removeClass("active");

        $(this).siblings("ul").animate({
            height: 'toggle', opacity: 'toggle'
        }, 500);

    }else{
        if( $(this).parent().children().is("ul") ){
            $(this).addClass("active");
        }

        $(this).siblings('ul').animate({
            height: 'toggle', opacity: 'toggle'
        }, 500);

    }


})


function showQueue(){
    if( $(".report_ul").height() > $(".report_list").height() ){
        $(".divScroll_lg").remove();
        setTimeout(jsScroll(document.getElementsByClassName('report_list')[0], 7, 'divScroll_lg'),200)
    }else{
        $(".divScroll_lg").remove()
    }
    //setTimeout(showQueue,500);
}

$('.report_list').click(function(){
    setTimeout(showQueue,500);
})
$(".report_index").click(function(){
    $(".now_index").click();
})





/***********************************************************/


//table 选项卡
    var click = $('.J_menuItem');
    //构造一个add 添加函数
    function add(Name) {
        //构建一个li标签
        var add_li = $('<li ><a class="now active"><b></b><p>'+ Name +'</p><span></span></a></li>');
        //构建一个iframe标签
        var add_ifame = $('<iframe name="' + Name + '" src="#"></iframe>');
        //使其它iframe隐藏
        $('.bottom iframe').hide();
        $('.content').hide();
        $('.top ul').append(add_li);
        $('.bottom').append(add_ifame);

        $('iframe').css('height', function() { return sh-65+'px'});
    }
    // 触发 tab选项卡
    var show1a = $('.top > ul > li > a > p');
    click.click(function() {
        var texts = $(this).text();

        var nowgeshu = $('.top li').length;
        //遍历
        for (var i = 0; i < show1a.length; i++) {
            //如果text内容相同
            if (show1a.eq(i).text() == texts) {
                alert('您已打开了一个相同的标签页！')
                return false;
            }
        }
        if (nowgeshu < 8) {
            $(this).attr('target', texts);
            $('.top li a').removeClass('active');
            add(texts);
        } else if (nowgeshu == 8) {
            alert('您已打开了8个标签。请关闭部分标签后再打开新标签！');
            return false;
        }
    });
    // top 关闭按钮
    $('.top').on('click','ul li a span',function(event){
        if($(this).parent().hasClass('active')){
            $('.top ul li a').eq($('.top ul li').length-2).addClass('active');
        }
        var index = $('.top ul li').index($(this).parent().parent());
        $(this).parent().parent().remove();
        $('.bottom iframe').eq(index).remove();

        if($('.bottom iframe:visible').length==0){
            $('.bottom iframe:last-child').show();
        }else{event.stopPropagation()}
    });
    // active触发
    $('.top').on('click','ul li a',function(){
        if($(this).hasClass('active')){
            return false;
        }else{
            $(this).addClass('active').parent().siblings().children().removeClass('active');
            var index = $('.top ul li').index($(this).parent());
            $('.bottom iframe').hide().eq(index).show();
        }
    });

    //收藏按钮
    $('.top').on('click','ul li a b',function(){
        console.log(1);
        $(this).toggleClass('star_h');

    });


//设置高度
var sh=$(window).height()-55;
function height(sh){
    $('.sidebar-collapse,aside').css('height',  sh+'px');
    $('iframe').css('height',  sh-65+'px');
    $('.report_list').css('height',  sh-45+'px');

}
(height(sh));

$(window).resize(function() {
    var sh=$(window).height()-55;
    height(sh);
});

