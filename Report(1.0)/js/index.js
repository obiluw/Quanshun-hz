
$(document).ready(function(){
//nav 下拉联级
    //一级下拉列表
    $('#side-menu>li>a').click(function(){
        var m=$(this).siblings('ul');
        m.slideToggle("slow");
        m.toggleClass('in');
        // + - 变换
        $(this).children('span:first').toggleClass('nav_add').toggleClass('nav_remove');
    });
    //二级下拉列表
    $('.nav-second-level>li>a').click(function(){
        var m=$(this).siblings('ul');
        m.slideToggle("slow");
        m.toggleClass('in');
        // 变换
        $(this).children('span:first').toggleClass('nav_left').toggleClass('nav_down');
    });


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
        $('iframe').css('height', function() { return sh-58+'px'});
    }
    // 触发 tab选项卡
    var show1a = $('.top ul li a p');
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
        $(this).toggleClass('star_h');
    });

    //设置 自适应高

    //console.log(sh+'px');

    var sh=$(window).height()-80;

    function Adaptive(sh){
        $('.sidebar-collapse,aside').css('height',  sh+'px');
        $('iframe').css('height',  sh-58+'px');
    }
    (Adaptive(sh));



//全屏效果
    $('.top>a').click(function(){
        if( $('header,footer').hasClass("hide")){
            $('header,footer').removeClass("hide");
            $('aside').removeClass().addClass('col-md-10 col-sm-9');
            $('aside').fadeIn("slow",function(){
                $('aside').addClass('col-md-10 col-sm-9')
            });
            $('.top>a').html('全屏 <b></b>');
            $('section>div').addClass('container');
            var sh=$(window).height()-80;
            (Adaptive(sh));

        }else{
            $('header,footer').addClass("hide");
            $('aside').removeClass().addClass('col-sm-10');
            $('.top>a').html('退出全屏 <b></b>');
            $('section>div').removeClass('container');
            var sh=$(window).height();
            (Adaptive(sh));
        }
    });
//左侧隐藏
    var leftmove = function(){
        if($('.nav,.report').hasClass("hide")){
            $('.nav,.report').removeClass("hide");
            $('nav').removeClass('col-md-1 col-sm-1').addClass('col-md-2 col-sm-3');
            $('aside').removeClass('col-md-11 col-sm-11').addClass('col-md-10 col-sm-9');
            $(this).removeClass('nav_retract_transform');
            $('.sidebar-collapse').css('border','1px solid #ddd');
        }else{
            $('.nav,.report').addClass("hide");
            $('nav').removeClass('col-md-2 col-sm-3').addClass('col-md-1 col-sm-1');
            $('aside').removeClass('col-md-10 col-sm-9').addClass('col-md-11 col-sm-11');
            $(this).addClass('nav_retract_transform');
            $('.sidebar-collapse').css('border-right','none');
        }}
    var nav_h=$('.nav').innerWidth();
    $('.nav_retract').click(
        (leftmove)
    );
});

