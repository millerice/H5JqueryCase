$(function () {

    // 1.获取相关元素
    var $slideDiv = $(".slide");
    // 图片列表标签
    var $slideList = $(".slide_list");
    var $lis = $(".slide_list li");
    // 左右按钮
    var $leftBtn = $(".prev");
    var $rightBtn = $(".next");
    // 小圆点列表 -->列表
    var $pointsList = $(".points");

    // 全局变量
    // 点击的这个脚标
    var iNowIndex = 0;

    // 记录上一张图片的脚标
    var iPreIndex = 0;

    
    // 动画之前 做准备 除了第一张显示 其他的都隐藏到760
    $lis.not(":first").css({"left":760});

    // 2.添加小圆点 根据图片的个数
    var iPicCount = $lis.length;
    for (var index = 0; index < iPicCount; index++) {



        // 1.创建 小圆点 li 标签
        var $li = $("<li>");
        // 默认选中第一个
        if(index == 0) {
            // 默认选中
            $li.addClass("active");

        }
        
        // 2.插入节点 小圆点的列表 -->内 list ul
        $pointsList.append($li);
    }

    // 3.监听小圆点的点击事件 4 click
    $pointsList.delegate("li","click",function () {
        // 1.选中小圆点 变颜色
        $(this).addClass("active").siblings().removeClass("active");

        // 2.选中对应的图片 做动画切换(动画之间 做准备 除了第一张显示 其他的都放到760)
        // 2.1即将出现的图片的脚标 局部可以 全局也可以
       iNowIndex = $(this).index();       
        // 2.2 动画切换
        fnAnimation();
    })

    // 4.监听左右按钮的点击
    // 标识 动画是否结束 变量
    var bIsOver = false;//动画结束
    $leftBtn.click(function () {

        if(bIsOver){//动画没有结束
            return;

        }
        bIsOver = true;



        // 1.左边按钮的点击 增加
        iNowIndex++;
        // 2.动画切换 判断 脚标 是否超出最大图片个数
        fnAnimation();

        // 3.小圆点 切换红色
        $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
        

    })
    $rightBtn.click(function () {


        if(bIsOver){//动画没有结束
            return;

        }
        bIsOver = true;


        // 1.右边的按钮 减少
        iNowIndex--;
        // 2.动画切换
        fnAnimation();
        // 3.小圆点 切换红色
        $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
        

    })

    // 自动播放 左边滑动

    function fnAutoPlay() {

        // 1.角标 ++
        iNowIndex++;
        // 2.动画
        fnAnimation();
        // 3.小红点
        $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
    }
    var timer = setInterval(fnAutoPlay,1000);

    // 6.鼠标的事件
    $slideDiv.mouseenter(function (){
        // 停止动画
        clearInterval(timer);
    })
    $slideDiv.mouseleave(function (){
        // 动画继续
    timer = setInterval(fnAutoPlay,1000);
    
    })

    // 动画代码
    function fnAnimation() {

        // 3.左右点击的时候 脚标是否超出最大图片个数
        if(iNowIndex > iPicCount - 1){//首尾切换
            iNowIndex = 0;//头
            iPreIndex = iPicCount - 1; //尾 上一张图 （最后一张）

            // 1.让当前即将出现的图片 inowIndex 出现在760
            $lis.eq(iNowIndex).css({"left":760});
            // 2.让上一张图片 慢慢消失 -760；
            $lis.eq(iPreIndex).animate({"left":-760});
            // 3.让即将出现的图片 慢慢出现 0;
            $lis.eq(iNowIndex).animate({"left":0},function (){
                // 标志动画结束了
                bIsOver = false;
            });
            // 4.记录脚标
            iPreIndex = iNowIndex;
            return;




        }
        // 3.1右边点击 角标 小于0
        if(iNowIndex < 0){
            iNowIndex = iPicCount - 1;
            iPreIndex = 0;
            // 1.让该出现的图片 放到该出现的位置 -760；
            $lis.eq(iNowIndex).css({"left":-760});
            // 2.让 上一张图片 慢慢消失 760；
            $lis.eq(iPreIndex).animate({"left":760});
            // 3.让当前的图片 慢慢出现 0；
            $lis.eq(iNowIndex).animate({"left":0},function (){
                // 标志动画结束
                bIsOver = false;
            });        
            // 4.记录角标
            iPreIndex = iNowIndex;
            // 记得return
            return;
        }
      
       
        // 左边滑动 脚标 从小变大
        if(iNowIndex > iPreIndex){
        // 解决跨越式点击 BUG：抢先一步将要出现的图片 丢到他该出现的位置 760
        $lis.eq(iNowIndex).css({"left":760});
        // 1.1即将消失的这张 左边  消失 从0 ---> 760;
        $lis.eq(iPreIndex).animate({"left":-760});
        // 1.2点击的现在这张 左边 出现 从760 --->0
        // $lis.eq(iNowIndex).animate({"left":0});
        // // 记录上一次的脚标
        // iPreIndex = iNowIndex;
    }

        // 2.右边滑动 角标 从大变小
        else if(iNowIndex < iPreIndex){

            // 解决跨越式点击 BUG：抢先一步将要出现的图片 丢到他该出现的位置 -760
            $lis.eq(iNowIndex).css({"left":-760});

            // 2.1上一张图片 消失动画  760;
            $lis.eq(iPreIndex).animate({"left":760});
            // 2.2选中的图片 动画出现 0
            // $lis.eq(iNowIndex).animate({"left":0});
            // // 记录上一次的脚标
            // iPreIndex = iNowIndex;   
        }
        // 提取代码 优化
        $lis.eq(iNowIndex).animate({"left":0},function (){
            // 标志动画结束
            bIsOver = false;
        });
        // 记录上一次的脚标
        iPreIndex = iNowIndex;
    

    }


})