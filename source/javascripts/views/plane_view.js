
//= require three.css3drenderer/index


(function(exports) {

  exports.PlaneView = Backbone.View.extend({

    el: 'body',

    events: {
    },

    initialize: function(options) {
      this.options = options;

      var margin = 0;
      var fov = 75;
      var aspect = window.innerHeight / window.innerWidth;
      var camera = this.camera = new THREE.PerspectiveCamera(fov, 1, 1, 100000);
      var defaultZ = this.defaultZ = camera.position.z = (window.innerWidth * 0.5) / Math.tan(fov * 0.5 * 0.01745) * aspect;
      var scene = this.scene = new THREE.Scene();

      var lastPosition = this.lastPosition = new THREE.Vector3(0, 0, 1000);
      var lastRotation = this.lastRotation = new THREE.Euler(0, 0, 0);

      var renderer = new THREE.CSS3DRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.zIndex = '1';
      document.body.appendChild(renderer.domElement);

      // var controls = new THREE.TrackballControls(camera, renderer.domElement);
      // controls.rotateSpeed = 0.5;
      // controls.addEventListener('change', render);

      var object = new THREE.CSS3DObject(this.el.querySelector('.main-container'));
      scene.add(object);

      this.listenTo(options.state, 'change:3d', this.on3dchange);

      requestAnimationFrame(function() {
        TWEEN.update();

        renderer.render(scene, camera);
        requestAnimationFrame(arguments.callee);
      });
    },

    on3dchange: function(model, value, options) {
      console.log('3d', value);

      var camera = this.camera;
      var posTween = new TWEEN.Tween(camera.position);
      var rotTween = new TWEEN.Tween(camera.rotation);

      if (value) {
        posTween
          .to(this.lastPosition, 1000)
          .easing(TWEEN.Easing.Elastic.Out)
          .start();

        rotTween
          .to({
            x: this.lastRotation.x,
            y: this.lastRotation.y,
            z: this.lastRotation.z
          }, 1000)
          .easing(TWEEN.Easing.Elastic.Out)
          .start();
      } else {
        this.lastPosition = camera.position.clone();
        this.lastRotation = camera.rotation.clone();

        posTween
          .to({ x: 0, y: 0, z: this.defaultZ }, 1000)
          .easing(TWEEN.Easing.Exponential.Out)
          .start();

        rotTween
          .to({ x: 0, y: 0, z: 0 }, 1000)
          .easing(TWEEN.Easing.Exponential.Out)
          .start();
      }
    }

  });

}).call(this, this.u || (this.u = {}));