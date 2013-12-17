
//= require three.css3drenderer/index


(function(exports) {

  exports.BackgroundView = Backbone.View.extend({

    el: 'body',

    events: {
    },

    initialize: function(options) {
      this.options = options;

      var BG_PARTICLE_NUM = 5000;

      var rendererBG, cameraBG, sceneBG, particlesBG, geometryBG, materialsBG = [];

      initBGParticle();

      function initBGParticle() {
        rendererBG = new THREE.WebGLRenderer();
        rendererBG.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(rendererBG.domElement);
        rendererBG.domElement.style.position = 'absolute';
        rendererBG.domElement.style.zIndex = '0';

        cameraBG = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1,  3000);
        cameraBG.position.z = 1000;

        sceneBG = new THREE.Scene();
        geometryBG = new THREE.Geometry();

        var params = [6, 5, 4, 3, 2, 1];
        for (var i = 0; i < BG_PARTICLE_NUM; i++) {
          var vert = new THREE.Vector3();
          vert.x = Math.random() * 5000 - 2500;
          vert.y = Math.random() * 5000 - 2500;
          vert.z = Math.random() * 5000 - 2500;
          geometryBG.vertices.push( vert );
        }

         for (var i = 0; i < params.length; i++) {
           materialsBG[i] = new THREE.ParticleSystemMaterial({color: 0xFFFFFF, size: params[i]});
           particlesBG = new THREE.ParticleSystem(geometryBG, materialsBG[i]);
           particlesBG.rotation.x = Math.random() * 6.0;
           particlesBG.rotation.y = Math.random() * 6.0;
           particlesBG.rotation.z = Math.random() * 6.0;
           sceneBG.add( particlesBG );
         }
      }

      function renderBG() {
        // if (this.is3D) {
          var time = Date.now() * 0.00002;
          cameraBG.lookAt( sceneBG.position );
          for (var i = 0; i < sceneBG.children.length; i ++ ) {
            var object = sceneBG.children[ i ];
            if ( object instanceof THREE.ParticleSystem ) {
              object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
            }
          }
          rendererBG.render( sceneBG, cameraBG );
        // }
      }

      requestAnimationFrame(function() {
        renderBG();
        requestAnimationFrame(arguments.callee);
      });

    },

    on3dchange: function(model, value, options) {
      this.is3D = value;
      console.log('3d', value);
    }

  });

}).call(this, this.u || (this.u = {}));