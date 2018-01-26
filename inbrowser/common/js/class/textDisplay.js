var textShowHide;

$(function(){
  textShowHide = new TextShowHide();
});

var TextShowHide = function(){
  this.initialize.apply(this,arguments);
}

TextShowHide.prototype = {
  initialize: function(){
    var ref = this;

    // // カードの情報
    ref.setElm = $('.background-blue');
    ref.showFlag = new Array();

    // カードの初期化もろもろ
    ref.resetCard();

    // アニメーション変数
    ref.showSpeed = 100;
    ref.showEasing = "easeInElastic";

    // カードの出現管理
    $(window).on('load scroll resize',function(){
      ref.checkCard();
    });

    // $.each(ref.setElm, function(i){
    //   ref.setElm.eq(i).css({'color':'#FFFFFF'});
    // });

  }

  // ---- CARD:CHECK ---------------------------------------
  ,checkCard: function() {
    var ref = this;

    $.each(ref.setElm, function(i){

      var setThis = $(this);
      var elmTop = setThis.offset().top;
      var elmHeight = setThis.height();
      var scrTop = $(window).scrollTop();
      var winHeight = $(window).height();

      if(!ref.showFlag[i]){
        if (elmTop < scrTop + winHeight - (setThis.height()/2) && elmTop + elmHeight > scrTop + (setThis.height()/2) ){
          ref.showFlag[i] = true;
          ref.showCard(i);
        }
      }else{
        if (elmTop > scrTop + winHeight || elmTop + elmHeight < scrTop ){
          ref.showFlag[i] = false;
          ref.hideCard(i);
        }
      }

    });

  }

  // ---- CARD:SHOW ---------------------------------------
  ,showCard: function(_i) {
    var ref = this;

    var i = _i;

    ref.setElm.eq(i).stop().queue([]);
    ref.setElm.eq(i).animate({
        // color : '#FFFFFF'
        color : '#3126f5'
        ,backgroundColor : '#3126f5'
    },{
        duration : Math.ceil( Math.random()*300 )
        ,easing : ref.showEasing
        ,queue : false
        ,complete : function(){
          setTimeout(
            function(){
            ref.setElm.eq(i).css({'color':'#FFFFFF'})
          }, 200);
        }
    });

    // ref.setElm.eq(i).stop().queue([]);
    // ref.setElm.eq(i).animate({
    //   marginTop : '20px'
    // },{
    //   duration : ref.showSpeed
    //   ,easing : ref.showEasing
    //   ,queue : false
    // });

  }

  // ---- CARD:HIDE ---------------------------------------
  ,hideCard: function(_i) {
    var ref = this;

    var i = _i;

    ref.setElm.eq(i).stop().queue([]);
    ref.setElm.eq(i).animate({
        color : '#FFFFFF'
        ,backgroundColor : '#FFFFFF'
    },{
        duration : ref.showSpeed
        ,easing : ref.showEasing
        ,queue : false
    });

    // ref.setElm.eq(i).stop().queue([]);
    // ref.setElm.eq(i).animate({
    //   marginTop : '0px'
    // },{
    //   duration : ref.showSpeed
    //   ,easing : ref.showEasing
    //   ,queue : false
    // });
}

  // ---- CARD:RESET ---------------------------------------
  ,resetCard: function() {
    var ref = this;

    $.each(ref.setElm, function(i){
      ref.showFlag[i] = false;
      ref.hideCard(i);
    });

  }

}



















