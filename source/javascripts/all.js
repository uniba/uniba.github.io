
//= require underscore/underscore
//= require jquery/jquery
//= require backbone/backbone
//= require tweenjs/build/tween.min
//= require threejs/build/three
//= require jquery.fancybox/source/jquery.fancybox
//= require timbre.js/index
//= require ./views/app_view
//= require ./models/state
//= require ./router
//= require_self

(function(exports) {

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

$(".fancybox").fancybox({
  padding: 0,
  maxWidth: 958,
  topRatio: 0.5,
  leftRatio: 0.5
});