
//= require underscore/underscore
//= require jquery/jquery
//= require backbone/backbone
//= require tweenjs/build/tween.min
//= require threejs/build/three
//= require jquery.easing/js/jquery.easing.min
//= require jquery.fancybox/source/jquery.fancybox
//= require timbre.js/index
//= require ./views/app_view
//= require ./models/state
//= require ./router
//= require_self

(function(exports) {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 140) {
      $('.nav').addClass("nav-fixed");
    } else {
      $('.nav').removeClass("nav-fixed");
    }
    return false;
  });

  $(".fancybox").fancybox({
    padding: 0,
    maxWidth: 958,
    topRatio: 0.5,
    leftRatio: 0.5
  });

  return;

  var state = exports.state = new exports.State();
  var router = exports.router = new exports.Router();
  Backbone.history.start();

  $(function() {
    var app = exports.app = new exports.AppView({
      state: state,
      router: router,
    });
    router.navigate(location.pathname, { trigger: true });
  });

}).call(this, this.u || (this.u = {}));


$(function() {
  $(".nav .page-scroll").click(function() {
    var $target = $(this.hash);
    var offset = $target.offset().top;
    $('html, body').stop().animate({scrollTop: offset}, 1000, 'easeOutExpo');
    return false;
  });
});

$(function(){
  window.visibleW = $('#movie').width(); 
  var animationID;
  var $target;
  var end;
  //init...
  $('.screenshots ul').each(function(index, el) {
    var end = $(this).innerWidth();
    $(this).data("pos",0).data('end',end);
  });
  $('.screenshots ul').on({
    'mouseenter':function(){
      $target = $(this);
      end = $(this).data('end');
      animationID = setInterval(function(){slideFilms($target,end)},1000/24);
    },
    'mouseleave':function(){
      clearInterval(animationID);
      if ($(this).hasClass('END')) {
        $(this).animate({
          'margin-left': 0},
          300, function(){
            $(this).removeClass('END');
            $(this).data('pos', 0);
        });
      }
    }
  });
  $(window).resize(function(event) {
    window.visibleW = $('#moive').width(); 
  });
  //hover でスライド
  function slideFilms($el,end){
    var pos = $el.data('pos');
    //check now position...
    if(window.visibleW - end > pos){
      console.log(window.visibleW*2 - end , pos);
      $el.addClass('END');
      return;
    }
    console.log(window.visibleW - end , pos);
    $el.css('margin-left',pos-10);
    $el.data('pos',pos-10);
  }
});