//$(function () {
//    var nivel2 = $('ul.nivel-2');
//    //var nivel1 = $('ul.nivel-1 > li').children('a');
//    var nivel1 = $('ul.nivel-1 > li');
//    nivel2.hide();
//    nivel1.on('mouseenter',function(){
//        //console.log($(this).parent('li').text());
//        //$(this).parent('li').children().slideDown("medium");
//        console.log($(this).children('li').text());
//        $(this).children('li').slideDown("medium");
//    }).on('mouseleave',function(){
//        nivel2.slideUp("medium");
//    });
//});



$(function () {
    var nivel1 = $('.nivel-1');
    var nivel2 = $('.nivel-2');
    nivel2.hide();
    nivel1.hover(function(item){
      console.log(item);  
    
    })
    
    //nivel1.on('mouseenter',function(){
    //    nivel2.slideDown('medium');
    //}).on('mouseleave',function(){
    //   nivel2.slideUp('medium');
    //});/*
});
