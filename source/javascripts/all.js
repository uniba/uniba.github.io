
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

  $('body').ready( function () {
    var worksDoms = $('.works-grid').children('li').children('a');
    for (var i = 0; i < worksDoms.length; i++) {
      var effectView = new exports.EffectView(worksDoms[i]);
      effectView.render();
    };
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