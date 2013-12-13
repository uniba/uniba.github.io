
//= require backbone/backbone

(function(exports) {

  var Router = exports.Router = Backbone.Router.extend({

    routes: {
      '!/': 'index',
      '!/blog': 'blog',
      '!/movies': 'movies',
      '!/works': 'works'
    },

    index: function() {
      console.log('index');
    },

    blog: function() {
      console.log('blog');
    },

    movies: function() {
      console.log('movies');
    },

    works: function() {
      console.log('works');
    }

  });

}).call(this, this.u || (this.u = {}));