(function($){
    // 첫화면 로딩
    $(window).load(function(){
        $('.loadingBox').delay(1000).fadeOut(500)
    })

    // 햄버거 메뉴 누르면 전체창뜨기
    $('.topbar a').on('click',function(e){
        e.preventDefault()
        $('.topmenu .topbar-close-outlayer').addClass('on')

    })
    $('.topbar-close a').on('click',function(e){
        e.preventDefault()
        $('.topmenu .topbar-close-outlayer').removeClass('on')

    })

    // 스크롤 이벤트
     var sct = 0;
     $(window).scroll(function(){
         sct = $(this).scrollTop();
         var scrollSize = $(document).height()-$('#header').height()-$(window).height()
         winHeight = $(this).height()
         winWidth = $(this).width

         // 헤더 색상변경
         if ( sct >= $('#header').height() ){
            $('#header').css({
                background:'black',
                zIndex:9999999
            })
        } else {
            if($('html').hasClass('pc')){
            $('#header').css({
                background:'none',
                zIndex:999999
            })
            } else if ( $('html').hasClass('mobile')){
                $('#header').css({
                    background:'rgba(0,0,0,0.5)',
                    zIndex:9999999
                })
            }
        }

        // top scrollbar 넓이변경
        $('.scrolling-bar').css({
            zIndex:99999999,
            opacity:1,
            width:(( sct / scrollSize )*100) + '%' })



            // go top 맨위로 버튼
         if(sct >= $(this).height()){
             $('.gotop').addClass('on').stop().animate({opacity:1},200)
         } else {
             $('.gotop').removeClass('on').stop().animate({
                 opacity:0
             },200)
         }

         //business 애니메이션, company 애니메이션

        if( $('#onContainer').children().is('#business_section') ){
            bizScroll()
        }
    })
    //스크롤 이벤트 끝

     function bizScroll(){
        var titleWrapNear = $('.titleWrap').offset().top - $(this).height()/2
        
        if(sct >= titleWrapNear){
            $('.areaWrap').addClass('on')
        } else if (sct===0){
            $('.areaWrap').removeClass('on')
        }

     }
     // 맨위로 버튼
     $('.gotop').on('click',function(){
         $('body,html').stop().animate({
             scrollTop:'0'
         },300,'linear')
     })


     // 리사이즈 이벤트
     init()
     function init(){
         var ww=$(window).width()
         if( ww>768 && !$('html').hasClass('pc')){
             $('html').addClass('pc').removeClass('mobile')
              $('.topmenu .topNav').show()
              $('.open-nav, .close-nav, .depth2').hide()
              $('#header').css({
                  background:'none',
                  zIndex:999999
              })    
         } else if ( ww<=768 && !$('html').hasClass('mobile')) {
            $('html').addClass('mobile').removeClass('pc')
              $('.open-nav, .open-login').show()
              $('.topmenu .topNav, .depth2, .close-nav').hide()
              $('#header').css({
                  background:'rgba(0,0,0,0.5)',
                  zIndex:9999999
              })
         }
     }
     $(window).on('resize',function(){
         init()
     })

     // 로그인 페이지 로드하기

    $('#onBox').load('main.html')

    $('.open-login a').on('click',function(e){
        e.preventDefault()
        var url = $(this).attr('href')
        $('#onContainer').remove()
        $('#onBox').load(url)
    })

    $('.login ul li a').on('click',function(e){
        e.preventDefault()
        var url = $(this).attr('href')
        $('#onContainer').remove()
        $('#onBox').load(url)
    })


     // 모바일화면에서 1단계메뉴 클릭했을때 2단계메뉴 보이게 하고,
     // 2단계 메뉴가 없으면 1단계메뉴 페이지 로드시키기
     $('.depth1 > li > a').on('click',function(e){
         e.preventDefault()
         if($('html').hasClass('mobile')){
             if($(this).next().next().is('.depth2')){
                 $(this).parent().toggleClass('on')
                 $(this).parent().find('.depth2').stop().slideToggle(300)
                 $(this).parent().siblings().each(function(){
                     if($(this).find('.depth2').css('display')==='block'){
                         $(this).find('.depth2').slideUp(300)
                         $(this).removeClass('on')
                     }
                 }) 
             } else if(!$(this).next().next().is('.depth2')){
                 var url = $(this).attr('href')
                 $('#onContainer').remove()
                 $('#onBox').load(url);
                 $('.open-nav').show();
                 $('.topmenu .topNav, .close-nav').hide()
                 $('.depth1 > li > a').removeClass('on')
             } 
         } else if ($('html').hasClass('pc')){
                var url = $(this).attr('href')
                $('#onContainer').remove()
                $('#onBox').load(url)
                $('.depth1 > li > a').removeClass('on')
         }
     })

     // pc화면에서 1단계메뉴에 호버했을때 2단계메뉴 보이게 하기
      $('.depth1 > li').hover(
          function(){
            if($('html').hasClass('pc')){
                $(this).find('.depth2').stop().slideDown(300)
              }
          },
          function(){
            if($('html').hasClass('pc')){
                $(this).find('.depth2').stop().slideUp(300)
            }
          }
      )

      // 2단계 메뉴 클릭하면 pc랑 모바일 화면에서 페이지 로드시키기
    $('.topNav .depth2 > li > a').on('click', function(e){
        e.preventDefault()
        var url = $(this).attr('href')
        $('#onContainer').remove()
        $('#onBox').load(url)
        if ($('html').hasClass('mobile')) {
            $('.open-nav, .open-login').show()
            $('.topmenu .topNav, .topNav .depth2, .close-nav').hide()
        }
    })


     // 햄버거 버튼 네비열기
     $('.open-nav').on('click',function(){
         $(this).next().slideDown(300)
         $(this).hide()
         $(this).nextAll('.close-nav').css({display:'block'})
     })
     $('.close-nav').on('click',function(){
         $(this).prev().slideUp(300)
         $(this).hide()
         $(this).prevAll('.open-nav').css({display:'block'})
         $('.depth2').hide()
     })

    
     
     
     
    
 
    
    



})(jQuery)