
//= require timbre.js/index

(function(exports) {

  exports.AudioView = Backbone.View.extend({

    el: 'body',

    events: {
    },

    initialize: function(options) {
      this.options = options;

      var drawnNum = 120;
      var oscDrawn = new Array(drawnNum);
      var oscDrawnOriginFreq = new Array(drawnNum);

      var intervalArray = new Array(drawnNum);
      var intervalArrayOriginTime = new Array(drawnNum);

      var filterArray = new Array(drawnNum);
      var filterOriginFreq = new Array(drawnNum);

      var moursOsc;
      var mmoursEnv;
      var randomNote;

      //
      // setup関数
      //
      function timbleInit() {
        randomNote = randomNoteDefine()
        console.log(randomNote)

        for(var i = 0; i < drawnNum; ++i) {
          oscDrawn[i] = T("saw",{freq: mtof(randomNote.drawn()) + Math.random()*4, mul:0.02});
          oscDrawnOriginFreq[i] = oscDrawn[i].freq.value;

          filterArray[i] = T("lpf" , {cutoff:400 + (Math.random()*100), Q:12}, oscDrawn[i]);
          filterOriginFreq[i] = filterArray[i].freq.value;

          var param = T("param").linTo(1, "5sec")
          T("*", filterArray[i], param).play();
        }


        moursOsc = T("tri", {freq: mtof(airNoteMelody()), mul:0.25});
        var moursFilter = T("bandpass" , {freq:1000 + (Math.random()*100), Q:5}, moursOsc)
        mmoursEnv =  T("env", {table: [0.8, [0.8, 100],[0, 5]]}, moursFilter).bang();
        T("delay", {time:300, fb:0.6, mix:0.5}, mmoursEnv).play();
      }

      function mtof(val) {
        return Math.floor(440*Math.pow(2, (val-69)/12));
      }

      function  airNotation() {
        return Math.floor(Math.random()*25) * 5
      }

      function  airNoteMelody() {
        return Math.floor(Math.random()*15 + 7) * 5
      }

      function  myDarkNotation(coef) {
        if(typeof coef === 'undefined') coef = 2;
        var target = Math.floor(Math.random()*4)
        var randOct = Math.floor(Math.random()*5 + coef) * 12
        return ( [0, 2, 4, 9, 11][target] + randOct )
      }

      function randomNoteDefine() {
        var target = Math.floor(Math.random()* 2)
        if (target == 1 ) {
          return {
            drawn: function() { return airNotation() }, melody: function() { return airNoteMelody() }
          }
        } else {
           return {
            drawn: function() { return myDarkNotation() }, melody: function() { return myDarkNotation(5) }
          }
        }
      }

      timbleInit();

      /*
      renderer.domElement.addEventListener('mousewheel', function(e){
        var z_val = camera.position.z;
        var sin_val = Math.sin(z_val * 0.001);

        for(var count = 0; count < drawnNum; ++count) {
          filterArray[count].freq.value = (sin_val * 300) + filterOriginFreq[count];
          oscDrawn[count].freq.value = (sin_val * 8) + oscDrawnOriginFreq[count];
          moursOsc.freq.value =  (sin_val * 10) + moursOsc.freq.value;
        }
        cameraBG.position.z = z_val * 0.0003; // set cameraBG position by DRUG
      })
      */

      setInterval(function() {
        T.reset();
        timbleInit();
      }, 120000)

      setInterval( function() {
        if(Math.floor(Math.random()*3) % 3 == 0) {
          moursOsc.freq.value = mtof(randomNote.melody());
          mmoursEnv.bang().play();
        }
      }, 80);
    },

    on3dchange: function(model, value, options) {
      console.log('3d', value);
    }

  });

}).call(this, this.u || (this.u = {}));