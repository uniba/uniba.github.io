
//= require backbone/backbone
//= require ./plane_view
//= require ./background_view
//= require ./audio_view
//= require ./effect_view

(function(exports) {

  exports.AppView = Backbone.View.extend({

    el: 'body',

    events: {
      'resize body': 'onresize',
      'change [name=3d]': 'on3dcheckboxchange'
    },

    SubViews: [
      exports.PlaneView,
      exports.BackgroundView,
      exports.AudioView
    ],

    subViews: [],

    initialize: function(options) {
      this.options = options;
      this.$el.addClass('state-loaded');

      this.onresize = _(this.onresize).bind(this);
      this.onresize();
      $(window).on('resize', this.onresize);

      for (var i = 0; i < this.SubViews.length; ++i) {
        this.subViews.push(new this.SubViews[i]({ state: options.state }));
      }
    },

    onresize: function(e) {
      this.$('.main-container').width(window.innerWidth).height(window.innerHeight);
    },

    on3dcheckboxchange: function(e) {
      this.options.state.set('3d', e.target.checked);
    },

    on3dchange: function(model, value, options) {
      console.log('3d', value);
    },

    remove: function() {
      $(window).off('resize', this.onresize);
      return Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

}).call(this, this.u || (this.u = {}));