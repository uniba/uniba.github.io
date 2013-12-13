
//= require underscore/underscore
//= require jquery/jquery
//= require backbone/backbone
//= require threejs/build/three
//= require_tree .

(function(exports) {

  var router = exports.router = new exports.Router();
  Backbone.history.start();

  $(function() {
    router.navigate(location.pathname, { trigger: true });
  });

}).call(this, this.u || (this.u = {}));